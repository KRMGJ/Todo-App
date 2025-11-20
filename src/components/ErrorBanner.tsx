interface ErrorBannerProps {
    message: string;
    onRetry: () => void;
}

/**
 * @description Error banner component to display error messages with a retry option (오류 메시지와 다시 시도 옵션을 표시하는 오류 배너 컴포넌트)
 * @param {ErrorBannerProps} props - Component props (컴포넌트 속성)
 * @property {string} message - The error message to display (표시할 오류 메시지)
 * @property {() => void} onRetry - Callback function to invoke when retrying (다시 시도할 때 호출할 콜백 함수)
 * @author 장민규
 * @created 2025-11-20
 */
export function ErrorBanner({ message, onRetry }: ErrorBannerProps) {
    return (
        <div className="w-full rounded-md border border-red-300 bg-red-50 px-4 py-3 text-red-800 shadow-sm flex items-start justify-between gap-4">
            <div className="text-sm font-medium">
                오류: {message}
            </div>
            <button type="button"
                onClick={onRetry}
                className="shrink-0 text-sm font-semibold px-3 py-1 rounded-md bg-red-100 text-red-700 hover:bg-red-200">
                다시 시도
            </button>
        </div>
    );
}