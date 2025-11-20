import { useState, type FormEvent } from "react";

interface TaskFormProps {
    onAddTask: (title: string, dueDate?: string) => void;
}

/**
 * @description Task form component to add new tasks (새 할 일을 추가하는 할 일 폼 컴포넌트)
 * @param {TaskFormProps} props - Component props (컴포넌트 속성)
 * @property {(title: string, dueDate?: string) => void} onAddTask - Callback function to add a new task (새 할 일을 추가하는 콜백 함수)
 * @author 장민규
 * @created 2025-11-20
 */
export function TaskForm({ onAddTask }: TaskFormProps) {
    const [title, setTitle] = useState('');
    const [dueDate, setDueDate] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    /**
     * @description Handle form submission to add a new task (새 할 일을 추가하는 폼 제출 처리)
     * Prevent default form submission behavior, trim the title and validate it,
     * call the onAddTask callback with the trimmed title and optional due date,
     * and reset the title and due date to empty strings, and clear the error message.
     */
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const trimmedTitle = title.trim();
        if (!trimmedTitle) {
            setError('할 일 제목은 비어 있을 수 없습니다.');
            return;
        }

        onAddTask(trimmedTitle, dueDate || undefined);
        setTitle('');
        setDueDate('');
        setError(null);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm flex flex-col gap-3">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <div className="flex-1">
                    <label className="mb-1 block text-xs font-medium text-slate-500">
                        작업 제목
                    </label>
                    <input
                        type="text"
                        value={title}
                        placeholder="예: 코딩 과제 구현하기"
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 placeholder:text-slate-400" />
                </div>

                <div className="w-full sm:w-40">
                    <label className="mb-1 block text-xs font-medium text-slate-500">
                        마감일(선택)
                    </label>
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                    />
                </div>

                <div className="w-full sm:w-auto sm:self-end">
                    <button
                        type="submit"
                        className="inline-flex w-full items-center justify-center rounded-md bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-sm
                                hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        추가
                    </button>
                </div>
            </div>

            {error && (
                <p className="text-xs text-red-500">{error}</p>
            )}
        </form>
    );
}