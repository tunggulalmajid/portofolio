import { Link, usePage } from '@inertiajs/react';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/#about' },
    { label: 'Skills', href: '/#skills' },
    { label: 'Experience', href: '/#experience' },
    { label: 'Projects', href: '/projects' },
    { label: 'Certificate', href: '/#certificates' },
    { label: 'Contact', href: '/#contact' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { url } = usePage();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (href.startsWith('/#')) {
            e.preventDefault();
            const id = href.substring(2);
            if (url !== '/') {
                window.location.href = href;
                return;
            }
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                setIsOpen(false);
            }
        }
    };

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            scrolled ? 'bg-[#1e2235]/95 backdrop-blur-md border-b border-white/5 shadow-lg' : 'bg-transparent'
        }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="text-xl font-bold text-white hover:opacity-80 transition-opacity">
                        tunggulalmajid<span className="text-green-400">.</span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={(e) => handleAnchorClick(e, link.href)}
                                className={`px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                                    url === link.href
                                        ? 'text-green-400'
                                        : 'text-gray-300 hover:text-green-400'
                                }`}
                            >
                                {link.label}
                            </a>
                        ))}

                    </div>

                    {/* Mobile toggle */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 text-gray-300 hover:text-white transition-colors"
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-[#1e2235]/98 backdrop-blur-md border-t border-white/5">
                    <div className="px-4 py-4 flex flex-col gap-1">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={(e) => handleAnchorClick(e, link.href)}
                                className="px-4 py-2.5 text-gray-300 hover:text-green-400 rounded-lg transition-all font-medium text-sm"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}
