import type { TaskFilter, TaskSort } from "@/types/task";

interface FilterBarProps {
    filter: TaskFilter;
    sort: TaskSort | null;
    search: string;
    onChangeFilter: (filter: TaskFilter) => void;
    onChangeSort: (sort: TaskSort | null) => void;
    onChangeSearch: (search: string) => void;
}

/**
 * @description FilterBar component to display a filter bar with task status filter and title search functionality (할 일 상태 필터 및 제목 검색 기능을 가진 필터 바 컴포넌트)
 * @param {FilterBarProps} props - Component props (컴포넌트 속성)
 * @property {TaskFilter} filter - Task status filter value (할 일 상태 필터 값)
 * @property {TaskSort | null} sort - Task sort value (할 일 정렬 값)
 * @property {string} search - Task title search value (할 일 제목 검색 값)
 * @property {(filter: TaskFilter) => void} onChangeFilter - Callback function to invoke when changing task status filter (할 일 상태 필터 변경 콜백 함수)
 * @property {(sort: TaskSort | null) => void} onChangeSort - Callback function to invoke when changing task sort (할 일 정렬 변경 콜백 함수)
 * @property {(search: string) => void} onChangeSearch - Callback function to invoke when changing task title search value (할 일 제목 검색 값 변경 콜백 함수)
 * @author 장민규
 * @created 2025-11-20
 */
export function FilterBar({ filter, sort, search, onChangeFilter, onChangeSort, onChangeSearch }: FilterBarProps) {
    /**
     * @description Callback function to invoke when changing task status filter (할 일 상태 필터 변경 콜백 함수)
     * @param {TaskFilter} value - Task status filter value (할 일 상태 필터 값)
     */
    const filterClickHandler = (value: TaskFilter) => {
        onChangeFilter(value);
    };

    /**
     * @description Callback function to invoke when changing task sort (할 일 정렬 변경 콜백 함수)
     * @param {string | null} value - Task sort value (할 일 정렬 값)
     */
    const sortClickHandler = (value: string | null) => {
        if (!value) {
            onChangeSort(null);
            return;
        }
        onChangeSort(value as TaskSort);
    };

    return (
        <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm flex flex-col gap-3
                    dark:bg-slate-900 dark:border-slate-700">
            <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    상태 필터
                </span>

                <button
                    type="button"
                    onClick={() => filterClickHandler('all')}
                    className={
                        filter === 'all'
                            ? 'rounded-full bg-sky-600 px-3 py-1 text-xs font-semibold text-white'
                            : 'rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700'
                    }
                >
                    전체
                </button>
                <button
                    type="button"
                    onClick={() => filterClickHandler('todo')}
                    className={
                        filter === 'todo'
                            ? 'rounded-full bg-sky-600 dark:bg-sky-500 px-3 py-1 text-xs font-semibold text-white'
                            : 'rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700'
                    }
                >
                    할 일
                </button>
                <button
                    type="button"
                    onClick={() => filterClickHandler('doing')}
                    className={
                        filter === 'doing'
                            ? 'rounded-full bg-sky-600 px-3 py-1 text-xs font-semibold text-white'
                            : 'rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700'
                    }
                >
                    진행중
                </button>
                <button
                    type="button"
                    onClick={() => filterClickHandler('done')}
                    className={
                        filter === 'done'
                            ? 'rounded-full bg-sky-600 px-3 py-1 text-xs font-semibold text-white'
                            : 'rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700'
                    }
                >
                    완료
                </button>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <div className="flex-1">
                    <label className="mb-1 block text-xs font-medium text-slate-500
                                    dark:text-slate-400">
                        제목 검색
                    </label>
                    <input
                        type="text"
                        value={search}
                        placeholder="제목으로 검색..."
                        onChange={(e) => onChangeSearch(e.target.value)}
                        className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 placeholder:text-slate-400
                                dark:bg-slate-900 dark:border-slate-700 dark:text-slate-50 dark:placeholder:text-slate-500"
                    />
                </div>

                <div className="w-full sm:w-52">
                    <label className="mb-1 block text-xs font-medium text-slate-500
                                    dark:text-slate-400">
                        정렬
                    </label>
                    <select
                        value={sort ?? ''}
                        onChange={(e) => sortClickHandler(e.target.value)}
                        className="w-full rounded-md border border-slate-300 bg-white dark:bg-slate-900 px-3 py-2 text-sm
                                    shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500
                                    dark:border-slate-700 dark:text-slate-50">
                        <option value="">정렬 없음</option>
                        <option value="titleAsc">제목 오름차순 (A → Z)</option>
                        <option value="titleDesc">제목 내림차순 (Z → A)</option>
                        <option value="dueDateAsc">마감일 빠른 순</option>
                        <option value="dueDateDesc">마감일 늦은 순</option>
                    </select>
                </div>
            </div>
        </div>
    );
}