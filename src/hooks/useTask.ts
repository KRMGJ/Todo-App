import { db } from "@/firebase";
import type { Task, TaskFilter, TaskSort, TaskStatus } from "@/types/task";
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, updateDoc } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";

const MOCK_INITIAL_TASKS: Task[] = [
    {
        id: '1',
        title: '코딩 과제 안내문 읽기',
        status: 'todo',
        dueDate: undefined,
    },
    {
        id: '2',
        title: '기본 Todo 기능 구현',
        status: 'doing',
        dueDate: undefined,
    },
    {
        id: '3',
        title: 'Firebase 연동 및 Auth',
        status: 'done',
        dueDate: undefined,
    },
];


type UseTasksResult = {
    tasks: Task[];
    loading: boolean;
    error: string | null;
    filter: TaskFilter;
    sort: TaskSort | null;
    search: string;
    setFilter: React.Dispatch<React.SetStateAction<TaskFilter>>;
    setSort: React.Dispatch<React.SetStateAction<TaskSort | null>>;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    addTask: (title: string, dueDate?: string) => Promise<void>;
    updateTaskStatus: (id: string, status: TaskStatus) => Promise<void>;
    removeTask: (id: string) => Promise<void>;
    simulateError: () => void;
    clearError: () => void;
};

/**
 * @description Custom hook to manage tasks with optional Firebase integration (Firebase 통합이 가능한 할 일 관리 커스텀 훅)
 * @author 장민규
 * @created 2025-11-20
 * @param {string | null} userId - Current user's ID (현재 사용자 ID)
 * @param {boolean} useFirebase - Whether to use Firebase integration (Firebase 통합 사용 여부)
 * @returns {UseTasksResult} - Object containing tasks and related actions (할 일 및 관련 동작을 포함하는 객체)
 */
export function useTasks(userId: string | null, useFirebase: boolean): UseTasksResult {
    const [rawTasks, setRawTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [filter, setFilter] = useState<TaskFilter>('all');
    const [sort, setSort] = useState<TaskSort | null>(null);
    const [search, setSearch] = useState<string>('');

    /**
     * @description Effect to fetch tasks from Firebase or use mock data (Firebase에서 할 일을 가져오거나 모의 데이터를 사용하는 효과)
     */
    useEffect(() => {
        let timeoutId: number | undefined;
        setError(null);

        /**
         * @description Handle case when Firebase is used but no user is logged in (Firebase를 사용하지만 사용자가 로그인하지 않은 경우 처리)
         */
        if (useFirebase && !userId) {
            setRawTasks([]);
            setLoading(false);
            return;
        }

        /**
         * @description Fetch tasks from Firebase (Firebase에서 할 일을 가져오기)
         */
        if (useFirebase && userId) {
            setLoading(true);
            const ref = collection(db, 'users', userId, 'tasks');
            const q = query(ref, orderBy('createdAt', 'desc'));

            /**
             * @description Subscribe to real-time updates from Firestore (Firestore의 실시간 업데이트 구독)
             */
            const unsubscribe = onSnapshot(
                q,
                (snapshot) => {
                    const next: Task[] = snapshot.docs.map((doc) => {
                        const data = doc.data() as any;
                        return {
                            id: doc.id,
                            title: data.title,
                            status: data.status,
                            dueDate: data.dueDate || null,
                        };
                    });
                    setRawTasks(next);
                    setLoading(false);
                },
                (err) => {
                    setError('할 일 불러오기 실패: ' + err.message);
                    setLoading(false);
                }
            );
            return () => {
                unsubscribe();
            };
        }

        /**
         * @description Use mock data with a simulated delay (모의 데이터를 지연과 함께 사용)
         */
        setLoading(true);
        timeoutId = window.setTimeout(() => {
            setRawTasks(MOCK_INITIAL_TASKS);
            setLoading(false);
        }, 1000);

        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [userId, useFirebase]);

    /**
     * @description Compute tasks based on filter, sort, and search criteria (할 일을 필터, 정렬, 검색 기준에 따른 계산)
     */
    const tasks = useMemo(() => {
        let list = [...rawTasks];

        /**
         * @description Filter tasks based on status (할 일 상태에 따른 필터링)
         */
        if (filter !== 'all') {
            list = list.filter((task) => task.status === filter);
        }

        /**
         * @description Filter tasks based on search keyword (검색 키워드에 따른 필터링)
         */
        const keyword = search.trim().toLowerCase();
        if (keyword) {
            list = list.filter((task) => task.title.toLowerCase().includes(keyword));
        }

        /**
         * @description Sort tasks based on selected criteria (선택한 기준에 따른 할 일 정렬)
         */
        if (sort === 'titleAsc') {
            list.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sort === 'titleDesc') {
            list.sort((a, b) => b.title.localeCompare(a.title));
        } else if (sort === 'dueDateAsc') {
            list.sort((a, b) => (a.dueDate ?? '').localeCompare(b.dueDate ?? ''));
        } else if (sort === 'dueDateDesc') {
            list.sort((a, b) => (b.dueDate ?? '').localeCompare(a.dueDate ?? ''));
        }
        return list;
    }, [rawTasks, filter, sort, search]);

    /**
     * @description Function to add a new task (할 일 추가 함수)
     * @author 장민규
     * @created 2025-11-20
     * @param {string} title - Title of the new task (새 할 일의 제목)
     * @param {string} [dueDate] - Optional due date of the new task (새 할 일의 선택적 마감일)
     * @returns {Promise<void>} - Promise that resolves when the task is added (할 일이 추가되면 해결되는 약속)
     */
    const addTask = async (title: string, dueDate?: string) => {
        const trimmedTitle = title.trim();
        if (!trimmedTitle) {
            setError('할 일 제목은 비어 있을 수 없습니다.');
            return;
        }

        const newTask: Task = {
            id: Date.now().toString(),
            title: trimmedTitle,
            status: 'todo',
            dueDate: dueDate || null,
        };

        try {
            if (useFirebase && userId) {
                const ref = collection(db, 'users', userId, 'tasks');
                await addDoc(ref, {
                    title: newTask.title,
                    status: newTask.status,
                    dueDate: newTask.dueDate,
                    createdAt: serverTimestamp(),
                });
            } else {
                setRawTasks((prev) => [newTask, ...prev]);
            }
        } catch (err) {
            setError('할 일 추가 실패: ' + (err as Error).message);
        }
    };

    /**
     * @description Function to update the status of a task (할 일 상태 업데이트 함수)
     * @author 장민규
     * @created 2025-11-20
     * @param {string} id - ID of the task to update (업데이트할 할 일의 ID)
     * @param {TaskStatus} status - New status of the task (업데이스트할 할 일의 새로운 상태)
     * @returns {Promise<void>} - Promise that resolves when the task status is updated (할 일 상태가 업데이스트되면 해결되는 약속)
     */
    const updateTaskStatus = async (id: string, status: TaskStatus) => {
        try {
            if (useFirebase && userId) {
                const ref = doc(db, 'users', userId, 'tasks', id);
                await updateDoc(ref, { status });
            } else {
                setRawTasks((prev) =>
                    prev.map((task) => (task.id === id ? { ...task, status } : task))
                );
            }
        } catch (err) {
            setError('할 일 상태 업데이트 실패: ' + (err as Error).message);
        }
    };

    /**
     * @description Function to remove a task (할 일 삭제 함수)
     * @author 장민규
     * @created 2025-11-20
     * @param {string} id - ID of the task to remove (삭제할 할 일의 ID)
     * @returns {Promise<void>} - Promise that resolves when the task is removed (할 일이 삭제되면 해결되는 약속)
     */
    const removeTask = async (id: string) => {
        try {
            if (useFirebase && userId) {
                const ref = doc(db, 'users', userId, 'tasks', id);
                await deleteDoc(ref);
            } else {
                setRawTasks((prev) => prev.filter((task) => task.id !== id));
            }
        } catch (err) {
            setError('할 일 삭제 실패: ' + (err as Error).message);
        }
    };

    /**
     * @description Simulate an error by setting the error state to '의도된 에러 발생!' (에러를 의도적으로 발생시키는 함수)
     * @author 장민규
     * @created 2025-11-20
     */
    const simulateError = () => {
        setError('의도된 에러 발생!');
    };

    /**
     * @description Clear the error state (에러 상태를 지움)
     * @author 장민규
     * @created 2025-11-20
     */
    const clearError = () => {
        setError(null);
    };

    return {
        tasks,
        loading,
        error,
        filter,
        sort,
        search,
        setFilter,
        setSort,
        setSearch,
        addTask,
        updateTaskStatus,
        removeTask,
        simulateError,
        clearError,
    };
}
