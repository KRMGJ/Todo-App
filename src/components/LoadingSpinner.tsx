/**
 * @description 로딩 중 표시 컴포넌트
 * @author 장민규
 * @created 2025-11-20
 */
export function LoadingSpinner() {
    return (
        <div className="inline-flex items-center justify-center">
            <span className="h-8 w-8 rounded-full border-2  border-slate-300 border-t-sky-600 animate-spin dark:border-slate-700 dark:border-t-sky-400 "
                aria-label="로딩 중"
            />
        </div>
    );
}