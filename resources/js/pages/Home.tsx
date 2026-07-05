import { Head, usePage } from '@inertiajs/react';
import Footer from '@/Components/Footer';
import Navbar from '@/Components/Navbar';
import AboutSection from '@/Components/sections/AboutSection';
import CertificatesSection from '@/Components/sections/CertificatesSection';
import ContactSection from '@/Components/sections/ContactSection';
import ExperienceSection from '@/Components/sections/ExperienceSection';
import HeroSection from '@/Components/sections/HeroSection';
import ProjectsSection from '@/Components/sections/ProjectsSection';
import SkillsSection from '@/Components/sections/SkillsSection';

import type {
    Hero,
    About,
    Experience,
    Certificate,
    Project,
    Skill,
    Contact,
} from '@/types';

interface HomeProps {
    hero: Hero | null;
    about: About | null;
    experiences: Experience[];
    projects: Project[];
    certificates: Certificate[];
    skills: Record<string, Skill[]>;
    allSkills: Skill[];
    contacts: Contact[];
}

export default function Home({
    hero,
    about,
    experiences,
    projects,
    certificates,
    skills,
    allSkills,
    contacts,
}: HomeProps) {
    const { props } = usePage();
    const appUrl = (props.appUrl as string) || 'https://tunggulalmajid.com';
    const socialLinks = contacts
        .filter((c) => c.url && ['github', 'linkedin', 'instagram', 'twitter'].includes(c.type.toLowerCase()))
        .map((c) => c.url as string);

    return (
        <>
            <Head>
                <title>Tunggul Abdul Majid - Software Developer</title>
                <meta name="description" content="Portfolio of Tunggul Abdul Majid, a web developer and student at UNEJ (Universitas Jember). Specializing in Laravel, React, Tailwind CSS, and modern web application development. View my projects, skills, certificates, and work experience." />
                <meta name="keywords" content="tunggul, tunggul abdul, tunggul abdul majid, tunggul unej, tunggul abdul majid unej, universitas jember, web developer, portfolio, laravel, react, nextjs, inertiajs" />
                <meta name="author" content="Tunggul Abdul Majid" />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href={appUrl} />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content={appUrl} />
                <meta property="og:title" content="Tunggul Abdul Majid - Web Developer Portfolio" />
                <meta property="og:description" content="Portfolio of Tunggul Abdul Majid, a web developer and student at UNEJ (Universitas Jember). Showcasing projects, skills, certificates, and experience." />
                <meta property="og:image" content={`${appUrl}/images/og-image.png`} />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:url" content={appUrl} />
                <meta name="twitter:title" content="Tunggul Abdul Majid - Web Developer Portfolio" />
                <meta name="twitter:description" content="Portfolio of Tunggul Abdul Majid, a web developer and student at UNEJ (Universitas Jember). Showcasing projects, skills, certificates, and experience." />
                <meta name="twitter:image" content={`${appUrl}/images/og-image.png`} />

                {/* Structured Data (JSON-LD) for SEO */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Person",
                        "name": "Tunggul Abdul Majid",
                        "givenName": "Tunggul",
                        "additionalName": "Abdul",
                        "familyName": "Majid",
                        "alternateName": ["Tunggul", "Tunggul Abdul", "Tunggul Unej"],
                        "url": appUrl,
                        "alumniOf": {
                            "@type": "EducationalOrganization",
                            "name": "Universitas Jember",
                            "alternateName": "UNEJ"
                        },
                        "jobTitle": "Web Developer",
                        "description": "Student at Universitas Jember (UNEJ) and Web Developer specializing in Laravel, React, and modern web systems.",
                        "sameAs": socialLinks
                    })}
                </script>
            </Head>
            <div className="min-h-screen bg-[#1e2235] text-white">
                <Navbar />
                <HeroSection hero={hero} />
                <AboutSection about={about} />
                <SkillsSection skills={skills} allSkills={allSkills} />
                <ExperienceSection experiences={experiences} />
                <ProjectsSection projects={projects} />
                <CertificatesSection certificates={certificates} />
                <ContactSection contacts={contacts} />
                <Footer contacts={contacts} />
            </div>
        </>
    );
}
