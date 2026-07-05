import { Link, usePage } from '@inertiajs/react';

import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

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

    const handleAnchorClick = (
        e: React.MouseEvent<HTMLAnchorElement>,
        href: string,
    ) => {
        if (href.startsWith('/#')) {
            e.preventDefault();
            const id = href.substring(2);

            if (url !== '/') {
                // eslint-disable-next-line react-hooks/immutability
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
        <nav
            className={`fixed left-0 right-0 top-0 z-50 transition-all duration-200 ${
                scrolled
                    ? 'border-b border-white/5 bg-[#1e2235]/95 shadow-lg backdrop-blur-md'
                    : 'bg-transparent'
            }`}
        >
            <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="text-xl font-bold text-white transition-opacity hover:opacity-80"
                    >
                        tunggulalmajid<span className="text-green-400">.</span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden items-center gap-1 md:flex">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={(e) => handleAnchorClick(e, link.href)}
                                className={`rounded-lg px-3 py-2 text-sm font-medium transition-all ${
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
                        className="p-2 text-gray-300 transition-colors hover:text-white md:hidden"
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="bg-[#1e2235]/98 border-t border-white/5 backdrop-blur-md md:hidden">
                    <div className="flex flex-col gap-1 px-4 py-4">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={(e) => handleAnchorClick(e, link.href)}
                                className="rounded-lg px-4 py-2.5 text-sm font-medium text-gray-300 transition-all hover:text-green-400"
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
