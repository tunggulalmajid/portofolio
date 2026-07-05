import { ExternalLink, Mail, Heart } from 'lucide-react';

interface FooterProps {
    contacts?: {
        type: string;
        url: string | null;
        label: string;
        value: string;
    }[];
}

const navLinks = [
    { label: 'About', href: '/#about' },
    { label: 'Skills', href: '/#skills' },
    { label: 'Experience', href: '/#experience' },
    { label: 'Projects', href: '/projects' },
    { label: 'Certificate', href: '/#certificates' },
    { label: 'Contact', href: '/#contact' },
];

export default function Footer({ contacts = [] }: FooterProps) {
    const socialLinks = contacts.filter((c) => ['github', 'linkedin', 'twitter', 'instagram'].includes(c.type));
    const emailContact = contacts.find((c) => c.type === 'email');

    return (
        <footer className="bg-[#151929] border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Col 1: Logo & tagline */}
                    <div className="space-y-4">
                        <a href="/" className="text-2xl font-bold text-white hover:opacity-80 transition-opacity">
                            tunggulalmajid<span className="text-green-400">.</span>
                        </a>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Senantiasa Belajar Menjadi Lebih Baik
                        </p>
                        {emailContact && (
                            <a href={`mailto:${emailContact.value}`} className="flex items-center gap-2 text-sm text-gray-400 hover:text-green-400 transition-colors">
                                <Mail size={14} />
                                {emailContact.value}
                            </a>
                        )}
                    </div>

                    {/* Col 2: Navigation */}
                    <div>
                        <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Navigation</h4>
                        <ul className="space-y-2">
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    <a href={link.href} className="text-sm text-gray-500 hover:text-green-400 transition-colors">
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Col 3: Connect */}
                    <div>
                        <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Connect</h4>
                        <div className="space-y-3">
                            {socialLinks.map((link) => (
                                <a
                                    key={link.type}
                                    href={link.url ?? '#'}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 text-sm text-gray-500 hover:text-green-400 transition-colors"
                                >
                                    <ExternalLink size={14} />
                                    <span className="capitalize">{link.label || link.type}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-gray-600">
                        &copy; 2025 TunggulAlMajid
                    </p>
                </div>
            </div>
        </footer>
    );
}
