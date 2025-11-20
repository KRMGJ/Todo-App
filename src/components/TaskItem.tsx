import type { Task, TaskStatus } from "@/types/task";

interface TaskItemProps {
    task: Task;
    onChangeStatus: (id: string, status: TaskStatus) => void;
    onRemove: (id: string) => void;
}

/**
 * @description Task item component to display a task with status update and removal options (할 일 컴포넌트에 상태 업데이트 및 삭제 옵션을 표시하는 컴포넌트)
 * @param {TaskItemProps} props - Component props (컴포넌트 속성)
 * @property {Task} task - Task to display (표시할 할 일)
 * @property {(id: string, status: TaskStatus) => void} onChangeStatus - Callback function to invoke when updating task status (할 일 상태 업데이트 콜백 함수)
 * @property {(id: string) => void} onRemove - Callback function to invoke when removing a task (할 일 삭제 콜백 함수)
 * @author 장민규
 * @created 2025-11-20
 */
export function TaskItem({ task, onChangeStatus, onRemove }: TaskItemProps) {
    return (
        <div className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm flex flex-col gap-3">
            <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                    <p className="font-medium text-slate-900">
                        {task.title}
                    </p>

                    {task.dueDate && (
                        <p className="mt-1 text-xs text-slate-500">
                            마감일: {task.dueDate}
                        </p>
                    )}
                </div>

                <div className="flex items-center gap-2">
                    <select
                        value={task.status}
                        onChange={(e) =>
                            onChangeStatus(task.id, e.target.value as TaskStatus)
                        }
                        className="rounded-md border border-slate-300 bg-white px-2 py-1 text-sm shadow-sm focus:border-sky-500 focus:outline-none">
                        <option value="todo">할 일</option>
                        <option value="doing">진행중</option>
                        <option value="done">완료</option>
                    </select>

                    <button
                        onClick={() => onRemove(task.id)}
                        className="rounded-md border border-red-300 bg-red-50 px-2 py-1 text-sm font-medium text-red-700 hover:bg-red-100">
                        삭제
                    </button>
                </div>
            </div>
        </div>
    );
}
