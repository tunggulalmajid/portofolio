import { Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';
import type { About } from '@/types';

interface AboutEditProps {
    about: About | null;
}

const inputClass =
    'w-full px-4 py-2.5 bg-[#151929] border border-white/10 focus:border-green-400 text-white rounded-xl outline-none text-sm transition-colors';
const cardClass =
    'bg-[#1e2235] border border-white/5 rounded-2xl p-6 space-y-4';

export default function AboutEdit({ about }: AboutEditProps) {
    const { data, setData, post, processing, errors } = useForm({
        title: about?.title ?? '',
        description: about?.description ?? '',
        short_bio: about?.short_bio ?? '',
        location: about?.location ?? '',
        email: about?.email ?? '',
        phone: about?.phone ?? '',
        years_experience: about?.years_experience ?? 0,
        is_available: about?.is_available ?? true,
        is_active: about?.is_active ?? true,
        _method: 'PUT',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/about');
    };

    return (
        <AdminLayout title="Edit About">
            <div className="max-w-3xl space-y-6">
                <div className="flex items-center gap-4">
                    <Link
                        href="/admin/about"
                        className="rounded-lg p-2 text-gray-400 transition-all hover:bg-white/5 hover:text-white"
                    >
                        <ArrowLeft size={20} />
                    </Link>
                    <h2 className="text-xl font-bold text-white">
                        Edit About Section
                    </h2>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className={cardClass}>
                        <h3 className="border-b border-white/5 pb-3 font-semibold text-white">
                            Content
                        </h3>
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-gray-400">
                                Title *
                            </label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) =>
                                    setData('title', e.target.value)
                                }
                                className={inputClass}
                            />
                            {errors.title && (
                                <p className="mt-1 text-xs text-red-400">
                                    {errors.title}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-gray-400">
                                Short Bio * (max 500 chars)
                            </label>
                            <textarea
                                rows={3}
                                value={data.short_bio}
                                onChange={(e) =>
                                    setData('short_bio', e.target.value)
                                }
                                className={inputClass}
                            />
                            {errors.short_bio && (
                                <p className="mt-1 text-xs text-red-400">
                                    {errors.short_bio}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-gray-400">
                                Description
                            </label>
                            <textarea
                                rows={4}
                                value={data.description}
                                onChange={(e) =>
                                    setData('description', e.target.value)
                                }
                                className={inputClass}
                            />
                            {errors.description && (
                                <p className="mt-1 text-xs text-red-400">
                                    {errors.description}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className={cardClass}>
                        <h3 className="border-b border-white/5 pb-3 font-semibold text-white">
                            Personal Info
                        </h3>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-gray-400">
                                    Location
                                </label>
                                <input
                                    type="text"
                                    value={data.location}
                                    onChange={(e) =>
                                        setData('location', e.target.value)
                                    }
                                    className={inputClass}
                                />
                            </div>
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-gray-400">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData('email', e.target.value)
                                    }
                                    className={inputClass}
                                />
                            </div>
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-gray-400">
                                    Phone
                                </label>
                                <input
                                    type="text"
                                    value={data.phone}
                                    onChange={(e) =>
                                        setData('phone', e.target.value)
                                    }
                                    className={inputClass}
                                />
                            </div>
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-gray-400">
                                    Years Experience *
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    value={data.years_experience}
                                    onChange={(e) =>
                                        setData(
                                            'years_experience',
                                            parseInt(e.target.value) || 0,
                                        )
                                    }
                                    className={inputClass}
                                />
                                {errors.years_experience && (
                                    <p className="mt-1 text-xs text-red-400">
                                        {errors.years_experience}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className={cardClass}>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <label className="flex cursor-pointer items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={data.is_available}
                                        onChange={(e) =>
                                            setData(
                                                'is_available',
                                                e.target.checked,
                                            )
                                        }
                                        className="h-4 w-4 rounded border-white/20 bg-[#151929] text-green-400 focus:ring-green-400"
                                    />
                                    <span className="text-sm text-gray-400">
                                        Available for work
                                    </span>
                                </label>
                                <label className="flex cursor-pointer items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={data.is_active}
                                        onChange={(e) =>
                                            setData(
                                                'is_active',
                                                e.target.checked,
                                            )
                                        }
                                        className="h-4 w-4 rounded border-white/20 bg-[#151929] text-green-400 focus:ring-green-400"
                                    />
                                    <span className="text-sm text-gray-400">
                                        Active
                                    </span>
                                </label>
                            </div>
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center gap-2 rounded-xl bg-green-400 px-6 py-2.5 text-sm font-semibold text-[#1e2235] hover:bg-green-300 disabled:opacity-60"
                            >
                                <Save size={16} />{' '}
                                {processing ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
