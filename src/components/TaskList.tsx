import type { Task, TaskStatus } from "@/types/task";
import { TaskItem } from "./TaskItem";

interface TaskListProps {
    tasks: Task[];
    onChangeStatus: (id: string, status: TaskStatus) => void;
    onRemove: (id: string) => void;
}

/**
 * @description Task list component to display a list of tasks (할 일 목록 컴포넌트)
 * @param {TaskListProps} props - Component props (컴포넌트 속성)
 * @property {Task[]} tasks - List of tasks to display (표시할 할 일 목록)
 * @property {(id: string, status: TaskStatus) => void} onChangeStatus - Callback function to invoke when updating task status (할 일 상태 업데이트 콜백 함수)
 * @property {(id: string) => void} onRemove - Callback function to invoke when removing a task (할 일 삭제 콜백 함수)
 * @author 장민규
 * @created 2025-11-20
*/
export function TaskList({ tasks, onChangeStatus, onRemove }: TaskListProps) {
    if (tasks.length === 0) {
        return (
            <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-center text-sm text-slate-500">
                할 일이 없습니다.
            </div>
        );
    }

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-500">
                <span>총 {tasks.length}개</span>
            </div>
            <div className="space-y-2">
                {tasks.map((task) => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        onChangeStatus={onChangeStatus}
                        onRemove={onRemove}
                    />
                ))}
            </div>
        </div>
    );
}