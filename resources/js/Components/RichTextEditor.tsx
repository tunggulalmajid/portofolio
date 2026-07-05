import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import { Bold, Italic, Underline as UnderlineIcon, List, ListOrdered, Link2, Undo, Redo } from 'lucide-react';

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    minHeight?: string;
}

export default function RichTextEditor({
    value,
    onChange,
    placeholder = 'Start typing...',
    minHeight = '200px',
}: RichTextEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3],
                },
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-green-400 underline hover:text-green-300',
                },
            }),
            Underline,
            Placeholder.configure({
                placeholder,
            }),
        ],
        content: value,
        editorProps: {
            attributes: {
                class: 'prose prose-invert max-w-none focus:outline-none px-4 py-3',
                style: `min-height: ${minHeight}`,
            },
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    if (!editor) {
        return null;
    }

    const setLink = () => {
        const previousUrl = editor.getAttributes('link').href;
        const url = window.prompt('URL', previousUrl);

        if (url === null) {
            return;
        }

        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }

        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    };

    return (
        <div className="border border-white/10 rounded-xl bg-[#151929] overflow-hidden focus-within:border-green-400 transition-colors">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-1 p-2 border-b border-white/5 bg-[#1a1f35]">
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={`p-2 rounded-lg transition-colors ${
                        editor.isActive('bold')
                            ? 'bg-green-400/20 text-green-400'
                            : 'text-gray-400 hover:bg-white/5 hover:text-white'
                    }`}
                    title="Bold"
                >
                    <Bold size={16} />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={`p-2 rounded-lg transition-colors ${
                        editor.isActive('italic')
                            ? 'bg-green-400/20 text-green-400'
                            : 'text-gray-400 hover:bg-white/5 hover:text-white'
                    }`}
                    title="Italic"
                >
                    <Italic size={16} />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    className={`p-2 rounded-lg transition-colors ${
                        editor.isActive('underline')
                            ? 'bg-green-400/20 text-green-400'
                            : 'text-gray-400 hover:bg-white/5 hover:text-white'
                    }`}
                    title="Underline"
                >
                    <UnderlineIcon size={16} />
                </button>

                <div className="w-px h-6 bg-white/5 mx-1" />

                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={`p-2 rounded-lg transition-colors ${
                        editor.isActive('bulletList')
                            ? 'bg-green-400/20 text-green-400'
                            : 'text-gray-400 hover:bg-white/5 hover:text-white'
                    }`}
                    title="Bullet List"
                >
                    <List size={16} />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={`p-2 rounded-lg transition-colors ${
                        editor.isActive('orderedList')
                            ? 'bg-green-400/20 text-green-400'
                            : 'text-gray-400 hover:bg-white/5 hover:text-white'
                    }`}
                    title="Numbered List"
                >
                    <ListOrdered size={16} />
                </button>

                <div className="w-px h-6 bg-white/5 mx-1" />

                <button
                    type="button"
                    onClick={setLink}
                    className={`p-2 rounded-lg transition-colors ${
                        editor.isActive('link')
                            ? 'bg-green-400/20 text-green-400'
                            : 'text-gray-400 hover:bg-white/5 hover:text-white'
                    }`}
                    title="Add Link"
                >
                    <Link2 size={16} />
                </button>

                <div className="w-px h-6 bg-white/5 mx-1" />

                <button
                    type="button"
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editor.can().undo()}
                    className="p-2 rounded-lg transition-colors text-gray-400 hover:bg-white/5 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed"
                    title="Undo"
                >
                    <Undo size={16} />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editor.can().redo()}
                    className="p-2 rounded-lg transition-colors text-gray-400 hover:bg-white/5 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed"
                    title="Redo"
                >
                    <Redo size={16} />
                </button>
            </div>

            {/* Editor Content */}
            <EditorContent editor={editor} className="text-white text-sm" />
        </div>
    );
}
