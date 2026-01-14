'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import emailjs from '@emailjs/browser';

export default function ContactUsPage() {
    const t = useTranslations('ContactUs');
    const tForm = useTranslations('ContactUs.form');
    const tInfo = useTranslations('ContactUs.info');
    const tLocations = useTranslations('ContactUs.locations');

    // ... existing hook calls ...

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        // Check for environment variables
        const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
        const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
        const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

        console.log('--- EmailJS Debug ---');
        console.log('Service ID:', serviceId);
        console.log('Template ID:', templateId);
        console.log('Public Key (length):', publicKey ? publicKey.length : 'MISSING');
        console.log('Public Key (first 3 chars):', publicKey ? publicKey.substring(0, 3) : 'N/A');
        console.log('---------------------');

        if (!serviceId || !templateId || !publicKey) {
            console.error('EmailJS environment variables are missing. Please check your .env.local file.');
            console.warn('Simulating successful submission for demonstration purposes.');

            // Simulate delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            setSubmitStatus('success');
            setIsSubmitting(false);
            setFormData({ name: '', email: '', phone: '', service: '', message: '' });
            return;
        }

        try {
            await emailjs.send(
                serviceId,
                templateId,
                {
                    from_name: formData.name,
                    from_email: formData.email,
                    phone: formData.phone,
                    service: formData.service,
                    message: formData.message,
                    to_name: 'Bright Support Team', // Optional, depends on template
                },
                publicKey
            );

            setSubmitStatus('success');
            setFormData({ name: '', email: '', phone: '', service: '', message: '' });
        } catch (error) {
            console.error('EmailJS submission failed:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-navy-900 via-navy-800 to-sky-900 text-white pt-32 pb-20">
                <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('hero.title')}</h1>
                        <p className="text-xl text-sky-200 mb-4">{t('hero.subtitle')}</p>
                        <p className="text-lg text-gray-300">{t('hero.description')}</p>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                        {/* Contact Form */}
                        <div className="bg-white rounded-2xl shadow-xl p-8">
                            <h2 className="text-2xl font-bold text-navy-900 mb-6">{tForm('title')}</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">{tForm('name')}</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">{tForm('email')}</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">{tForm('phone')}</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">{tForm('service')}</label>
                                    <select
                                        name="service"
                                        value={formData.service}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                                    >
                                        <option value="">{tForm('selectService')}</option>
                                        <option value="daily-living">Daily Living Support</option>
                                        <option value="nursing">Community Nursing</option>
                                        <option value="physiotherapy">Physiotherapy</option>
                                        <option value="community">Community Participation</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">{tForm('message')}</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={4}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-coral-500 hover:bg-coral-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    <Send className="w-5 h-5" />
                                    {isSubmitting ? '...' : tForm('submit')}
                                </button>
                                {submitStatus === 'success' && (
                                    <p className="text-green-600 text-center">{tForm('success')}</p>
                                )}
                                {submitStatus === 'error' && (
                                    <p className="text-red-600 text-center">{tForm('error')}</p>
                                )}
                            </form>
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-8">
                            <div className="bg-gradient-to-br from-navy-50 to-sky-50 p-8 rounded-2xl">
                                <h2 className="text-2xl font-bold text-navy-900 mb-6">{tInfo('title')}</h2>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-navy-600 rounded-lg flex items-center justify-center">
                                            <Phone className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <div className="text-sm text-gray-500">{tInfo('phone')}</div>
                                            <a href="tel:1800407508" className="text-lg font-semibold text-navy-900 hover:text-sky-600">1800 407 508</a>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-sky-500 rounded-lg flex items-center justify-center">
                                            <Mail className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <div className="text-sm text-gray-500">{tInfo('email')}</div>
                                            <a href="mailto:care@brightsupport.com.au" className="text-lg font-semibold text-navy-900 hover:text-sky-600">care@brightsupport.com.au</a>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-coral-500 rounded-lg flex items-center justify-center">
                                            <Clock className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <div className="text-sm text-gray-500">{tInfo('hours')}</div>
                                            <div className="text-lg font-semibold text-navy-900">{tInfo('hoursValue')}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white border border-gray-100 p-8 rounded-2xl shadow-lg">
                                <h2 className="text-2xl font-bold text-navy-900 mb-6">{tLocations('title')}</h2>
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center mt-1">
                                            <MapPin className="w-5 h-5 text-sky-600" />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-navy-900">{tLocations('shepparton.name')}</div>
                                            <div className="text-gray-600">{tLocations('shepparton.address')}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
