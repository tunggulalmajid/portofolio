import { Link } from '@inertiajs/react';
import { Code2, Award, Briefcase, Zap, Star, CheckCircle, ArrowRight } from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';
import type { Project } from '@/types';

interface DashboardProps {
    stats: {
        projects: number;
        certificates: number;
        experiences: number;
        skills: number;
        featured_projects: number;
        active_projects: number;
    };
    recentProjects: Project[];
}

const statCards = (stats: DashboardProps['stats']) => [
    { label: 'Total Projects', value: stats.projects, icon: Code2, href: '/admin/projects' },
    { label: 'Certificates', value: stats.certificates, icon: Award, href: '/admin/certificates' },
    { label: 'Experiences', value: stats.experiences, icon: Briefcase, href: '/admin/experiences' },
    { label: 'Skills', value: stats.skills, icon: Zap, href: '/admin/skills' },
    { label: 'Featured Projects', value: stats.featured_projects, icon: Star, href: '/admin/projects' },
    { label: 'Active Projects', value: stats.active_projects, icon: CheckCircle, href: '/admin/projects' },
];

export default function Dashboard({ stats, recentProjects }: DashboardProps) {
    return (
        <AdminLayout title="Dashboard">
            <div className="space-y-8">
                {/* Welcome */}
                <div>
                    <h2 className="text-2xl font-bold text-white">Welcome back!</h2>
                    <p className="text-gray-400 mt-1">Here's an overview of your portfolio content.</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {statCards(stats).map((card) => {
                        const Icon = card.icon;

                        return (
                            <Link
                                key={card.label}
                                href={card.href}
                                className="bg-[#1e2235] border border-white/5 rounded-xl p-4 hover:border-green-400/20 hover:bg-green-400/5 transition-all group"
                            >
                                <div className="w-8 h-8 bg-green-400/10 border border-green-400/20 rounded-lg flex items-center justify-center mb-3">
                                    <Icon size={16} className="text-green-400" />
                                </div>
                                <p className="text-2xl font-bold text-white">{card.value}</p>
                                <p className="text-xs text-gray-500 mt-1">{card.label}</p>
                            </Link>
                        );
                    })}
                </div>

                {/* Recent Projects */}
                <div className="bg-[#1e2235] border border-white/5 rounded-2xl overflow-hidden">
                    <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
                        <h3 className="text-white font-semibold">Recent Projects</h3>
                        <Link href="/admin/projects" className="text-sm text-green-400 hover:text-green-300 flex items-center gap-1">
                            View all <ArrowRight size={14} />
                        </Link>
                    </div>
                    <div className="divide-y divide-white/5">
                        {recentProjects.map((project) => (
                            <div key={project.id} className="flex items-center justify-between px-6 py-4 hover:bg-white/5 transition-colors">
                                <div>
                                    <p className="text-white text-sm font-medium">{project.title}</p>
                                    <p className="text-gray-500 text-xs mt-0.5">{project.category}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className={`px-2 py-0.5 text-xs rounded-full border ${
                                        project.is_featured
                                            ? 'bg-green-400/10 text-green-400 border-green-400/20'
                                            : 'bg-white/5 text-gray-500 border-white/10'
                                    }`}>
                                        {project.is_featured ? 'Featured' : 'Regular'}
                                    </span>
                                    <Link href={`/admin/projects/${project.id}/edit`} className="text-xs text-green-400 hover:text-green-300">
                                        Edit
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
