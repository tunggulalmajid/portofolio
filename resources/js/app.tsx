import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

const pages = import.meta.glob('./pages/**/*.tsx');

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: async (name) => {
        const filePath = `./pages/${name}.tsx`;
        const page = pages[filePath];
        if (!page) {
            throw new Error(`Page not found: ${name} (looked for ${filePath})`);
        }
        return page();
    },
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
    progress: {
        color: '#8b5cf6',
    },
});
