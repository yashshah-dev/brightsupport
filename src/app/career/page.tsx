import { Metadata } from 'next';
import { ResponsiveImage } from '@/components/ResponsiveImage';
import { CheckCircle, Award, TrendingUp, Heart, Users, Clock } from 'lucide-react';
import { getAssetPath } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Career Opportunities | Join Our Team - Bright Support',
  description: 'Looking for a rewarding career in disability support? Join Bright Support and make a difference. Competitive pay, flexible roles, and professional development opportunities.',
};

export default function CareerPage() {
  const criteria = [
    'NDIS Worker Screening Clearance',
    'Minimum 2 years relevant experience',
    'Current first aid & CPR certificate',
    'Current driver\'s license',
    'Relevant qualification',
    'Current police check',
    'Car insurance and car',
  ];

  const benefits = [
    {
      icon: <Award size={32} />,
      title: 'Attractive Pay Rates',
      description: 'Competitive remuneration that reflects your skills and experience',
    },
    {
      icon: <Clock size={32} />,
      title: 'Flexibility with the Role',
      description: 'Choose shifts that work for your lifestyle and commitments',
    },
    {
      icon: <Users size={32} />,
      title: 'Work Close to Home',
      description: 'Regular clients in your local area for better work-life balance',
    },
    {
      icon: <Heart size={32} />,
      title: 'Supportive Organization',
      description: 'Join a reputable team that values and supports its staff',
    },
    {
      icon: <TrendingUp size={32} />,
      title: 'Access to LMS',
      description: 'Remote learning management system for continuous development',
    },
    {
      icon: <CheckCircle size={32} />,
      title: 'Training & Upskilling',
      description: 'Formal training opportunities to advance your career',
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Looking for a New Career Opportunity?
            </h1>
            <p className="text-xl text-indigo-100">
              Join our team and make a meaningful difference in people's lives
            </p>
          </div>
        </div>
      </section>

      {/* Career Mission */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Career at Bright Support
              </h2>
              <p className="text-lg text-slate-700 leading-relaxed">
                At Bright Support, we believe in a <strong className="text-slate-800">person-centered approach</strong> to care. 
                We're looking for passionate, qualified individuals who share our commitment to helping 
                people live independently with dignity and choice. Join a team where your work truly matters 
                and where you'll be supported to grow professionally while making a positive impact in the community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Culture */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-indigo-50/30" style={{ contentVisibility: 'auto', containIntrinsicSize: '900px' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto mb-20">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Join Our Growing Team
              </h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                Be part of a supportive, professional environment where your contribution truly matters
              </p>
            </div>
            <div className="relative rounded-3xl overflow-hidden shadow-elegant-lg">
              <ResponsiveImage
                src="/images/career/team-culture.webp"
                alt="Bright Support team members in training and collaboration session"
                className="w-full h-auto object-cover"
                width={1200}
                height={700}
                widths={[480,768,1024]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Criteria Section */}
      <section className="py-20 bg-white" style={{ contentVisibility: 'auto', containIntrinsicSize: '700px' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Our Criteria
            </h2>
            <p className="text-lg text-slate-700 text-center mb-10 leading-relaxed">
              To ensure the highest quality of care for our participants, we require:
            </p>
            <div className="bg-white rounded-2xl shadow-elegant p-10 border border-slate-100">
              <ul className="space-y-5">
                {criteria.map((item, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <CheckCircle className="text-indigo-600 flex-shrink-0 mt-1" size={24} />
                    <span className="text-lg text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              What We Offer to Our Team!
            </h2>
            <p className="text-lg text-slate-600 text-center mb-14">
              Join Bright Support and enjoy these great benefits
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 shadow-elegant border border-indigo-100 hover:shadow-elegant-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="text-indigo-600 mb-5">{benefit.icon}</div>
                  <h3 className="text-xl font-bold mb-3 text-slate-800">{benefit.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Professional Development */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-indigo-50/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-elegant p-10 border border-slate-100">
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Professional Development & Support
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-slate-700 leading-relaxed mb-4">
                  At Bright Support, we invest in our team's growth and development. All staff members 
                  have access to our Learning Management System (LMS) with remote learning capabilities, 
                  allowing you to complete training at your own pace.
                </p>
                <p className="text-slate-700 leading-relaxed mb-4">
                  We provide formal training opportunities and upskilling programs to help you advance 
                  your career. Whether you're new to the disability support sector or an experienced 
                  professional, we offer pathways for continuous improvement and career progression.
                </p>
                <p className="text-slate-700 leading-relaxed">
                  Our supportive team environment means you'll always have backup and guidance. We believe 
                  in recognizing and rewarding excellent work, and we're committed to creating a positive, 
                  inclusive workplace culture.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ready to Join */}
      <section className="py-20 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Join?
            </h2>
            <p className="text-xl mb-10 text-indigo-100 leading-relaxed">
              We're always looking for talented, compassionate individuals to join our team. 
              If you meet our criteria and are passionate about making a difference, we'd love to hear from you!
            </p>
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-10 mb-10">
              <h3 className="text-2xl font-bold mb-4">How to Apply</h3>
              <p className="text-lg text-indigo-100 mb-6">
                Send your resume and cover letter to:
              </p>
              <a
                href="mailto:care@brightsupport.com.au?subject=Career Application - Support Worker"
                className="inline-block bg-amber-500 hover:bg-amber-400 text-white px-10 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-xl"
              >
                care@brightsupport.com.au
              </a>
              <p className="text-indigo-100 mt-6">
                We also post positions on <strong>Seek</strong> - keep an eye out for our latest opportunities!
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <a
                href="tel:1800407508"
                className="bg-white hover:bg-amber-50 text-indigo-600 px-10 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-xl"
              >
                Call Us: 1800 407 508
              </a>
              <a
                href="/contact-us"
                className="border-2 border-white hover:bg-white/10 text-white px-10 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
