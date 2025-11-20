import type { TaskFilter, TaskSort } from "@/types/task";

interface FilterBarProps {
    filter: TaskFilter;
    sort: TaskSort | null;
    search: string;
    onChangeFilter: (filter: TaskFilter) => void;
    onChangeSort: (sort: TaskSort | null) => void;
    onChangeSearch: (search: string) => void;
}

export function FilterBar({
    filter,
    sort,
    search,
    onChangeFilter,
    onChangeSort,
    onChangeSearch,
}: FilterBarProps) {
    const filterClickHandler = (value: TaskFilter) => {
        onChangeFilter(value);
    };

    const sortClickHandler = (value: string | null) => {
        if (!value) {
            onChangeSort(null);
            return;
        }
        onChangeSort(value as TaskSort);
    };

    return (
        <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm flex flex-col gap-3">
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
                            : 'rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-200'
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
                            : 'rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-200'
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
                            : 'rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-200'
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
                            : 'rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-200'
                    }
                >
                    완료
                </button>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                {/* 검색 */}
                <div className="flex-1">
                    <label className="mb-1 block text-xs font-medium text-slate-500">
                        제목 검색
                    </label>
                    <input
                        type="text"
                        value={search}
                        placeholder="제목으로 검색..."
                        onChange={(e) => onChangeSearch(e.target.value)}
                        className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 placeholder:text-slate-400"
                    />
                </div>

                <div className="w-full sm:w-52">
                    <label className="mb-1 block text-xs font-medium text-slate-500">
                        정렬
                    </label>
                    <select
                        value={sort ?? ''}
                        onChange={(e) => sortClickHandler(e.target.value)}
                        className="w-full rounded-md border border-slate-300 bg-white dark:bg-slate-900 px-3 py-2 text-sm
                                    shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500">
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