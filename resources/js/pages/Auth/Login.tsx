import { Head, Link, useForm } from '@inertiajs/react';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import type { FormEventHandler} from 'react';
import { useState } from 'react';
import InputError from '@/Components/InputError';
import AuthLayout from '@/Layouts/AuthLayout';

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const [showPassword, setShowPassword] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false as boolean,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthLayout>
            <Head title="Log in" />

            <h2 className="text-2xl font-bold text-white mb-2">Welcome back</h2>
            <p className="text-gray-400 text-sm mb-8">Sign in to access the admin panel</p>

            {status && (
                <div className="mb-6 px-4 py-3 bg-green-500/10 border border-green-500/20 text-green-400 text-sm rounded-xl">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-5">
                {/* Email */}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1.5">
                        Email Address
                    </label>
                    <div className="relative">
                        <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            autoComplete="username"
                            autoFocus
                            onChange={(e) => setData('email', e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-[#151929] border border-green-400/20 focus:border-green-400 text-white rounded-xl outline-none transition-colors placeholder-gray-600 text-sm"
                            placeholder="admin@example.com"
                        />
                    </div>
                    <InputError message={errors.email} className="mt-1.5" />
                </div>

                {/* Password */}
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1.5">
                        Password
                    </label>
                    <div className="relative">
                        <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={data.password}
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                            className="w-full pl-10 pr-12 py-3 bg-[#151929] border border-green-400/20 focus:border-green-400 text-white rounded-xl outline-none transition-colors placeholder-gray-600 text-sm"
                            placeholder="••••••••"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                        >
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                    </div>
                    <InputError message={errors.password} className="mt-1.5" />
                </div>

                {/* Remember & Forgot */}
                <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', (e.target.checked || false) as false)}
                            className="w-4 h-4 rounded border-green-400/30 bg-[#151929] text-green-400 focus:ring-green-400 focus:ring-offset-0"
                        />
                        <span className="text-sm text-gray-400">Remember me</span>
                    </label>
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="text-sm text-green-400 hover:text-green-300 transition-colors"
                        >
                            Forgot password?
                        </Link>
                    )}
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={processing}
                    className="w-full py-3 bg-green-400 hover:bg-green-300 disabled:opacity-60 disabled:cursor-not-allowed text-[#1e2235] font-semibold rounded-xl transition-colors text-sm"
                >
                    {processing ? 'Signing in...' : 'Sign In'}
                </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-6">
                <Link href="/" className="text-green-400 hover:text-green-300 transition-colors">
                    ← Back to Portfolio
                </Link>
            </p>
        </AuthLayout>
    );
}
