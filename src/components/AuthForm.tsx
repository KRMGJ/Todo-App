import { useState, type FC, type FormEvent } from 'react';

type AuthMode = 'signin' | 'signup';

type AuthFormProps = {
    onSignIn: (email: string, password: string) => Promise<void>;
    onSignUp: (email: string, password: string) => Promise<void>;
};

/**
 * @description AuthForm component to sign in or sign up with email and password (이메일과 비밀번호로 로그인 또는 회원가입하는 컴포넌트)
 * @param {AuthFormProps} props - Component props (컴포넌트 속성)
 * @property {(email: string, password: string) => Promise<void>} onSignIn - Callback function to sign in with email and password (이메일과 비밀번호로 로그인하는 콜백 함수)
 * @property {(email: string, password: string) => Promise<void>} onSignUp - Callback function to sign up with email and password (이메일과 비밀번호로 회원가입하는 콜백 함수)
 * @author 장민규
 * @created 2025-11-20
 */
export const AuthForm: FC<AuthFormProps> = ({ onSignIn, onSignUp }) => {
    const [mode, setMode] = useState<AuthMode>('signin');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [authError, setAuthError] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setAuthError(null);

        try {
            setSubmitting(true);
            if (mode === 'signin') {
                await onSignIn(email, password);
            } else {
                await onSignUp(email, password);
            }
        } catch (err: any) {
            setAuthError(err?.message ?? '인증 중 오류가 발생했습니다.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-sm space-y-4 rounded-xl border border-slate-200 bg-white/95 shadow-xl px-6 py-7">
                <h1 className="text-xl font-semibold text-center text-slate-900">
                    {mode === 'signin' ? '로그인' : '회원가입'}
                </h1>

                <div>
                    <label className="block text-sm mb-1 text-slate-700">
                        이메일
                    </label>
                    <input
                        type="email"
                        className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm bg-white text-slate-900
                                    focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 placeholder:text-slate-400"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="email"
                    />
                </div>

                <div>
                    <label className="block text-sm mb-1 text-slate-700">
                        비밀번호
                    </label>
                    <input
                        type="password"
                        className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm bg-white text-slate-900
                                    focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 placeholder:text-slate-400"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
                    />
                </div>

                {authError && (
                    <p className="text-sm text-red-600">
                        {authError}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-2.5 rounded-md text-sm font-medium bg-sky-600 text-white hover:bg-sky-500 disabled:opacity-60 disabled:cursor-not-allowed
                                focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-100">
                    {submitting ? mode === 'signin' ? '로그인 중...' : '회원가입 중...'
                                : mode === 'signin' ? '로그인' : '회원가입'}
                </button>

                <button
                    type="button"
                    onClick={() =>
                        setMode(mode === 'signin' ? 'signup' : 'signin')
                    }
                    className="w-full py-2 text-xs underline text-slate-600 hover:text-slate-800">
                    {mode === 'signin' ? '계정이 없나요? 회원가입' : '이미 계정이 있나요? 로그인'}
                </button>
            </form>
        </div>
    );
};
