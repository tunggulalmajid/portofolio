import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
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
    return (
        <>
            <Head title="Tunggul Abdul Majid" />
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
