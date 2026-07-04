import { Contact } from '@/types';
import { useState } from 'react';
import { Mail, Phone, Send, Globe } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { router } from '@inertiajs/react';
import { motion } from 'framer-motion';

interface ContactSectionProps {
    contacts: Contact[];
}

const iconMap: Record<string, React.ReactNode> = {
    email:     <Mail size={18} />,
    phone:     <Phone size={18} />,
    github:    <Globe size={18} />,
    linkedin:  <Globe size={18} />,
    twitter:   <Globe size={18} />,
    instagram: <Globe size={18} />,
    website:   <Globe size={18} />,
};

export default function ContactSection({ contacts }: ContactSectionProps) {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');
        
        // Send via API
        router.post('/contact', form, {
            preserveScroll: true,
            onSuccess: () => {
                setStatus('sent');
                toast.success('Message sent successfully! I will get back to you soon.');
                // Reset form
                setTimeout(() => {
                    setForm({ name: '', email: '', message: '' });
                    setStatus('idle');
                }, 3000);
            },
            onError: (errors) => {
                setStatus('idle');
                const firstError = Object.values(errors)[0];
                if (typeof firstError === 'string') {
                    toast.error(firstError);
                } else {
                    toast.error('Failed to send message. Please try again.');
                }
            },
        });
    };

    return (
        <section id="contact" className="py-24 bg-[#1e2235] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-96 h-96 bg-green-400/3 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <p className="text-green-400 font-medium text-sm tracking-widest uppercase mb-2">Get In Touch</p>
                    <h2 className="text-4xl font-bold text-white">Contact Me</h2>
                    <div className="mt-4 w-12 h-0.5 bg-green-400 mx-auto" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
                    {/* Left: Info */}
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        className="space-y-6"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <h3 className="text-2xl font-bold text-white mb-3">Let's work together</h3>
                            <p className="text-gray-400 leading-relaxed">
                                I'm always open to discussing new projects, creative ideas, or opportunities. Feel free to reach out!
                            </p>
                        </motion.div>

                        <div className="space-y-3">
                            {contacts.map((contact, index) => (
                                <motion.div 
                                    key={contact.id} 
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                                    whileHover={{ x: 5 }}
                                    className="flex items-center gap-4 p-4 bg-[#252a40] border border-white/5 rounded-xl hover:border-green-400/20 transition-all"
                                >
                                    <div className="w-9 h-9 bg-green-400/10 rounded-lg flex items-center justify-center text-green-400 flex-shrink-0">
                                        {iconMap[contact.type] ?? <Globe size={18} />}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-xs text-gray-500 capitalize mb-0.5">{contact.label || contact.type}</p>
                                        {contact.url ? (
                                            <a href={contact.url} target="_blank" rel="noopener noreferrer"
                                                className="text-sm text-white hover:text-green-400 transition-colors truncate block">
                                                {contact.value}
                                            </a>
                                        ) : (
                                            <p className="text-sm text-white truncate">{contact.value}</p>
                                        )}
                                    </div>
                                 </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right: Form */}
                    <motion.form 
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        onSubmit={handleSubmit} 
                        className="space-y-4"
                    >
                        <div>
                            <label className="block text-sm text-gray-400 mb-1.5">Your Name</label>
                            <input
                                type="text"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                required
                                className="w-full px-4 py-3 bg-[#252a40] border border-white/5 focus:border-green-400/50 text-white rounded-xl outline-none transition-colors placeholder-gray-600 text-sm"
                                placeholder="Tunggul Abdul Majid"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1.5">Your Email</label>
                            <input
                                type="email"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                required
                                className="w-full px-4 py-3 bg-[#252a40] border border-white/5 focus:border-green-400/50 text-white rounded-xl outline-none transition-colors placeholder-gray-600 text-sm"
                                placeholder="tunggul@email.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1.5">Message</label>
                            <textarea
                                rows={5}
                                value={form.message}
                                onChange={(e) => setForm({ ...form, message: e.target.value })}
                                required
                                className="w-full px-4 py-3 bg-[#252a40] border border-white/5 focus:border-green-400/50 text-white rounded-xl outline-none transition-colors placeholder-gray-600 resize-none text-sm"
                                placeholder="Tell me about your project..."
                            />
                        </div>
                        <motion.button
                            type="submit"
                            disabled={status === 'sending'}
                            whileHover={{ scale: status === 'sending' ? 1 : 1.02 }}
                            whileTap={{ scale: status === 'sending' ? 1 : 0.98 }}
                            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-green-400 hover:bg-green-300 disabled:opacity-60 text-[#1e2235] font-semibold rounded-xl transition-all text-sm"
                        >
                            <Send size={16} />
                            {status === 'sending' ? 'Sending...' : status === 'sent' ? 'Message Sent!' : 'Send Message'}
                        </motion.button>
                    </motion.form>
                </div>
            </div>
        </section>
    );
}
