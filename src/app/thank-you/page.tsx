'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, Home, Phone, Mail, Clock } from 'lucide-react';
import Link from 'next/link';

export default function ThankYouPage() {
  const router = useRouter();

  useEffect(() => {
    // Optional: Auto-redirect after 10 seconds
    // const timer = setTimeout(() => router.push('/'), 10000);
    // return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-sky-900">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 text-white">
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Thank You!</h1>
            <p className="text-xl text-sky-200 mb-4">
              We've received your message and appreciate you getting in touch with us.
            </p>
            <p className="text-lg text-gray-300 mb-8">
              Our team will review your inquiry and respond to you shortly. We look forward to helping you.
            </p>
          </div>
        </div>
      </section>

      {/* Next Steps Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-navy-900 mb-12 text-center">What's Next?</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Response Time */}
              <div className="bg-gradient-to-br from-navy-50 to-sky-50 p-8 rounded-xl">
                <div className="w-12 h-12 bg-navy-600 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-navy-900 mb-3">Response Time</h3>
                <p className="text-gray-600">
                  We typically respond to inquiries within 24-48 business hours. Thank you for your patience.
                </p>
              </div>

              {/* Get in Touch */}
              <div className="bg-gradient-to-br from-coral-50 to-orange-50 p-8 rounded-xl">
                <div className="w-12 h-12 bg-coral-500 rounded-lg flex items-center justify-center mb-4">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-navy-900 mb-3">Faster Response?</h3>
                <p className="text-gray-600 mb-3">
                  Call us directly at <span className="font-semibold">1800 407 508</span> during business hours for immediate assistance.
                </p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="mt-12 bg-navy-900 text-white p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-start gap-3 mb-4">
                    <Phone className="w-5 h-5 text-coral-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-sky-200">Phone</h4>
                      <p className="text-gray-300">1800 407 508</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-coral-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-sky-200">Email</h4>
                      <p className="text-gray-300">info@brightsupport.com.au</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-sky-200 mb-3">Business Hours</h4>
                  <p className="text-gray-300">Monday - Friday</p>
                  <p className="text-gray-300">9:00 AM - 5:00 PM</p>
                  <p className="text-gray-300 mt-3">Emergency Support Available</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-sky-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-6">In the Meantime</h2>
          <p className="text-sky-200 mb-8 max-w-2xl mx-auto">
            Feel free to explore more about our services and learn about how Bright Support can help.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/"
              className="bg-white text-navy-900 px-6 py-3 rounded-lg font-semibold hover:bg-sky-100 transition-colors"
            >
              <Home className="inline-block w-5 h-5 mr-2" />
              Return Home
            </Link>
            <Link
              href="/our-services"
              className="bg-coral-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-coral-600 transition-colors"
            >
              Explore Services
            </Link>
            <Link
              href="/about-us"
              className="bg-sky-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-sky-800 transition-colors border border-sky-500"
            >
              About Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
