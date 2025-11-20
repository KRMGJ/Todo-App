import { useEffect, useState } from "react";
import { useAuth } from "./hooks/useAuth";
import { useTasks } from "./hooks/useTask";
import { AuthForm } from "./components/AuthForm";
import { ErrorBanner } from "./components/ErrorBanner";
import { FilterBar } from "./components/FilterBar";
import { TaskForm } from "./components/TaskForm";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { TaskList } from "./components/TaskList";
import type { TaskStatus } from "./types/task";

function App() {
  const { user, loading: authLoading, signIn, signUp, logout } = useAuth();
  const [isDark, setIsDark] = useState(false);

  const [useFirebase, setUseFirebase] = useState(false);

  /**
   * @description Apply dark mode class to document root based on isDark state (isDark 상태에 따라 다크 모드 클래스를 문서 루트에 적용)
   */
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  const userId = useFirebase && user ? user.uid : null;

  const {
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
  } = useTasks(userId, useFirebase);

  useEffect(() => {
    clearError();
  }, [useFirebase, userId]);

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-6 dark:bg-slate-950">
      <div className="mx-auto max-w-4xl space-y-4">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-slate-50">
              작업 관리 앱
            </h1>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              {useFirebase ? user ? `${user.email} 님 안녕하세요.` : 'Firebase 모드 (로그인이 필요합니다)' : 'Mock 모드 (로그인 없이 사용 가능)'}
            </p>

            <p className="mt-1 text-[11px] text-slate-400 dark:text-slate-500">
              데이터 소스: {useFirebase ? 'Firebase' : 'Mock(메모리)'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setUseFirebase((prev) => !prev)}
              className="rounded-md border px-2 py-1 text-[11px] bg-white text-slate-700 shadow-sm dark:bg-slate-800 dark:border-slate-600 dark:text-slate-100"
            >
              {useFirebase ? 'Mock 모드로 전환' : 'Firebase 모드로 전환'}
            </button>

            <button
              type="button"
              onClick={() => setIsDark((prev) => !prev)}
              className="rounded-md border px-2 py-1 text-[11px] dark:border-slate-600 dark:text-slate-100"
            >
              {isDark ? '라이트' : '다크'}
            </button>

            {useFirebase && user && (
              <button
                type="button"
                onClick={() => logout()}
                className="rounded-md bg-slate-800 px-3 py-1 text-xs font-semibold text-white dark:bg-slate-700"
              >
                로그아웃
              </button>
            )}
          </div>
        </header>

        {useFirebase && authLoading && (
          <div className="min-h-[200px] flex items-center justify-center text-sm text-slate-600 dark:text-slate-300">
            로그인 상태 확인 중...
          </div>
        )}

        {useFirebase && !authLoading && !user && (
          <AuthForm onSignIn={signIn} onSignUp={signUp} />
        )}

        {(!useFirebase || (useFirebase && !authLoading && !!user)) && (
          <>
            {error && (
              <ErrorBanner message={error} onRetry={clearError} />
            )}

            <button type="button" onClick={simulateError} className="text-xs text-red-600 underline">
              에러 상황 테스트하기
            </button>

            <FilterBar
              filter={filter}
              sort={sort}
              search={search}
              onChangeFilter={setFilter}
              onChangeSort={setSort}
              onChangeSearch={setSearch}
            />

            <TaskForm onAddTask={addTask} />

            {loading && (
              <div className="flex justify-center py-4">
                <LoadingSpinner />
              </div>
            )}

            {!loading && tasks.length > 0 && (
              <TaskList
                tasks={tasks}
                onChangeStatus={(id: string, status: TaskStatus) =>
                  updateTaskStatus(id, status)
                }
                onRemove={removeTask}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
