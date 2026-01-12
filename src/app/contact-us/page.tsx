'use client';

import { Metadata } from 'next';
import { useState } from 'react';
import { ResponsiveImage } from '@/components/ResponsiveImage';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { getAssetPath } from '@/lib/utils';
import { trackPhoneCall, trackButtonClick, trackServiceInquiry, trackFormSubmission, trackFormError } from '@/lib/analytics';
import { useFormTracking } from '@/hooks/useAnalytics';

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const { trackInteraction, getFormMetrics } = useFormTracking();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Track form interaction
    trackInteraction();

    // Clear field error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email is invalid';
    if (!formData.subject) errors.subject = 'Please select a subject';
    if (!formData.message.trim()) errors.message = 'Message is required';

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Validate form
    if (!validateForm()) {
      trackFormError('contact_form', 'validation', 'Form validation failed');
      setIsSubmitting(false);
      return;
    }

    const formMetrics = getFormMetrics();

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        setFieldErrors({});

        // Enhanced form submission tracking
        trackFormSubmission('contact_form', true, {
          subject: formData.subject,
          has_phone: !!formData.phone,
          source: 'contact_page',
          form_completion_time: formMetrics.timeSpent,
          form_interactions: formMetrics.interactions,
        });

        // Track as lead generation
        trackServiceInquiry(formData.subject, {
          lead_value: 1, // Assign a value to form submissions
          lead_source: 'contact_form',
          customer_email: formData.email,
          customer_phone: formData.phone,
          inquiry_details: formData.message.substring(0, 100), // First 100 chars
        });
      } else {
        setSubmitStatus('error');
        trackFormSubmission('contact_form', false, {
          subject: formData.subject,
          error_type: 'server_error',
          response_status: response.status,
        });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      trackFormSubmission('contact_form', false, {
        subject: formData.subject,
        error_type: 'network_error',
        error_message: error instanceof Error ? error.message : 'Unknown error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1E4D8C] via-[#2563EB] to-[#38BDF8] text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl text-sky-100">
              We're here to help. Get in touch with us today.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-sky-50/30" style={{ contentVisibility: 'auto', containIntrinsicSize: '750px' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto mb-16">
            <div className="relative rounded-3xl overflow-hidden shadow-elegant-lg">
              <ResponsiveImage
                src="/images/contact/office-welcome.webp"
                alt="Bright Support welcoming office reception area"
                className="w-full h-auto object-cover"
                width={800}
                height={500}
              />
            </div>
          </div>
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold mb-10 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">Get In Touch</h2>

              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-br from-sky-100 to-blue-100 p-4 rounded-2xl">
                    <Phone className="text-[#1E4D8C]" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-1">Phone</h3>
                    <a
                      href="tel:1800407508"
                      className="text-[#1E4D8C] hover:text-[#38BDF8] transition-colors duration-300"
                      onClick={() => trackPhoneCall('1800 407 508', { source: 'contact_page' })}
                    >
                      1800 407 508
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-br from-red-100 to-rose-100 p-4 rounded-2xl">
                    <Mail className="text-[#DC3545]" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-1">Email</h3>
                    <a
                      href="mailto:care@brightsupport.com.au"
                      className="text-[#1E4D8C] hover:text-[#38BDF8] break-all transition-colors duration-300"
                      onClick={() => trackButtonClick('email_click', { source: 'contact_page' })}
                    >
                      care@brightsupport.com.au
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-br from-cyan-100 to-sky-100 p-4 rounded-2xl">
                    <MapPin className="text-[#38BDF8]" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-1">Address</h3>
                    <p className="text-slate-600">
                      279 Wyndham St<br />
                      Shepparton VIC 3630<br />
                      Australia
                    </p>
                    <a
                      href="https://maps.google.com/?q=279+Wyndham+St,+Shepparton+VIC+3630,+Australia"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-2 text-[#1E4D8C] hover:text-[#38BDF8] font-semibold transition-colors duration-300"
                    >
                      Get Directions →
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-br from-sky-100 to-blue-100 p-4 rounded-2xl">
                    <Clock className="text-[#1E4D8C]" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-1">Opening Hours</h3>
                    <p className="text-slate-600">
                      Monday - Friday: 08:00am - 06:00pm<br />
                      <span className="text-sm text-slate-500">24/7 Emergency Support Available</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Google Maps Embed */}
              <div className="rounded-3xl overflow-hidden shadow-elegant-lg h-64 border-4 border-white">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3179.8!2d145.395!3d-36.38!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad7b3b!2s279+Wyndham+St+Shepparton+VIC+3630!5e0!3m2!1sen!2sau!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Bright Support Location"
                ></iframe>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="bg-white rounded-3xl shadow-elegant-lg p-10 border border-slate-100">
                <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">Send Us A Message</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className={`w-full px-5 py-3 border rounded-xl focus:ring-2 focus:ring-[#1E4D8C] focus:border-[#1E4D8C] outline-none transition-all duration-300 bg-slate-50 hover:bg-white ${fieldErrors.name ? 'border-red-300 bg-red-50' : 'border-slate-200'
                        }`}
                      placeholder="John Smith"
                    />
                    {fieldErrors.name && (
                      <p className="text-red-600 text-sm mt-1">{fieldErrors.name}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={`w-full px-5 py-3 border rounded-xl focus:ring-2 focus:ring-[#1E4D8C] focus:border-[#1E4D8C] outline-none transition-all duration-300 bg-slate-50 hover:bg-white ${fieldErrors.email ? 'border-red-300 bg-red-50' : 'border-slate-200'
                        }`}
                      placeholder="john@example.com"
                    />
                    {fieldErrors.email && (
                      <p className="text-red-600 text-sm mt-1">{fieldErrors.email}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-5 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#1E4D8C] focus:border-[#1E4D8C] outline-none transition-all duration-300 bg-slate-50 hover:bg-white"
                      placeholder="0400 000 000"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-slate-700 mb-2">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className={`w-full px-5 py-3 border rounded-xl focus:ring-2 focus:ring-[#1E4D8C] focus:border-[#1E4D8C] outline-none transition-all duration-300 bg-slate-50 hover:bg-white ${fieldErrors.subject ? 'border-red-300 bg-red-50' : 'border-slate-200'
                        }`}
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="services">Services Information</option>
                      <option value="referral">Send a Referral</option>
                      <option value="career">Career Opportunities</option>
                      <option value="feedback">Feedback</option>
                    </select>
                    {fieldErrors.subject && (
                      <p className="text-red-600 text-sm mt-1">{fieldErrors.subject}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-2">
                      Your Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className={`w-full px-5 py-3 border rounded-xl focus:ring-2 focus:ring-[#1E4D8C] focus:border-[#1E4D8C] outline-none transition-all duration-300 resize-none bg-slate-50 hover:bg-white ${fieldErrors.message ? 'border-red-300 bg-red-50' : 'border-slate-200'
                        }`}
                      placeholder="How can we help you?"
                    ></textarea>
                    {fieldErrors.message && (
                      <p className="text-red-600 text-sm mt-1">{fieldErrors.message}</p>
                    )}
                  </div>

                  {submitStatus === 'success' && (
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 text-green-800 px-5 py-4 rounded-xl">
                      Thank you! Your message has been sent successfully. We'll get back to you soon.
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="bg-gradient-to-br from-red-50 to-rose-50 border border-red-200 text-red-800 px-5 py-4 rounded-xl">
                      Sorry, there was an error sending your message. Please try again or contact us directly.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-[#1E4D8C] to-[#2563EB] hover:from-[#0F2D4D] hover:to-[#1E4D8C] text-white px-10 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-elegant-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>Sending...</>
                    ) : (
                      <>
                        <Send size={20} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
