export function LoadingSpinner() {
    return (
        <div className="inline-flex items-center justify-center">
            <span className="h-8 w-8 rounded-full border-2  border-slate-300 border-t-sky-600 animate-spin"
                aria-label="로딩 중"
            />
        </div>
    );
}