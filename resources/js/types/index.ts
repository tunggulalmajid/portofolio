export type * from './auth';

// Re-export from index.d.ts
export type { PageProps } from './index.d';

export interface Hero {
    id: number;
    name: string;
    tagline: string;
    description: string;
    profile_image: string | null;
    profile_image_url: string | null;
    cv_file: string | null;
    cv_file_url: string | null;
    cta_primary_text: string;
    cta_primary_link: string;
    cta_secondary_text: string | null;
    cta_secondary_link: string | null;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface About {
    id: number;
    title: string;
    description: string;
    short_bio: string;
    profile_image: string | null;
    profile_image_url: string | null;
    location: string | null;
    email: string | null;
    phone: string | null;
    years_experience: number;
    is_available: boolean;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface Position {
    title: string;
    period: string;
    responsibilities: string[];
}

export interface Experience {
    id: number;
    company: string;
    position: string;
    positions: Position[] | null;
    type: 'work' | 'education' | 'organization';
    location: string | null;
    start_date: string;
    end_date: string | null;
    is_current: boolean;
    description: string;
    responsibilities: string[] | null;
    duration: string;
    order: number;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface Project {
    id: number;
    title: string;
    slug: string;
    short_description: string;
    full_description: string;
    thumbnail: string | null;
    thumbnail_url: string | null;
    images: string[] | null;
    images_url: string[];
    technologies: string[];
    category: string;
    year: number | null;
    demo_link: string | null;
    repo_link: string | null;
    status: 'completed' | 'in_progress' | 'archived';
    is_featured: boolean;
    order: number;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface Certificate {
    id: number;
    title: string;
    issuer: string;
    issue_date: string;
    expiry_date: string | null;
    credential_id: string | null;
    credential_url: string | null;
    image: string | null;
    image_url: string | null;
    category: string | null;
    is_expired: boolean;
    order: number;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface Skill {
    id: number;
    name: string;
    category: string;
    icon_name: string | null;
    color: string | null;
    order: number;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface Contact {
    id: number;
    type: string;
    label: string;
    value: string;
    url: string | null;
    icon: string | null;
    is_active: boolean;
    order: number;
    created_at: string;
    updated_at: string;
}

export interface PaginatedData<T> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
}

export interface FlashMessage {
    success?: string;
    error?: string;
}
