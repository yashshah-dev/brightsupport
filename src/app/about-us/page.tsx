import { Metadata } from 'next';
import { ResponsiveImage } from '@/components/ResponsiveImage';
import { Target, Users, Heart, Award, Download } from 'lucide-react';
import { getAssetPath } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'About Us | Bright Support - Our Story & Mission',
  description: 'Learn about Bright Support\'s journey, mission, and values. Founded in 2019, we are a trusted NDIS service provider serving Melbourne, Shepparton, and beyond.',
};

export default function AboutUsPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Us</h1>
            <p className="text-xl text-indigo-100">
              Know about Bright Support
            </p>
          </div>
        </div>
      </section>

      {/* Team Photo */}
      <section className="py-20 bg-white" style={{ contentVisibility: 'auto', containIntrinsicSize: '600px' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="relative rounded-3xl overflow-hidden shadow-elegant-lg">
              <ResponsiveImage
                src="/images/about/team-photo.webp"
                alt="Bright Support team of healthcare professionals and support workers"
                className="w-full h-auto object-cover"
                widths={[480,768,1024,1400]}
                width={1400}
                height={600}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Story & Mission */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-indigo-50/30" style={{ contentVisibility: 'auto', containIntrinsicSize: '900px' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Our Story Our Mission
              </h2>
              <a
                href="/bright-support-brochure.pdf"
                download
                className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-elegant-lg"
              >
                <Download size={20} />
                Download Brochure
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
              {/* Who We Are */}
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 shadow-elegant border border-indigo-100 hover:shadow-elegant-lg hover:-translate-y-1 transition-all duration-300">
                <div className="text-indigo-600 mb-5">
                  <Users size={48} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-slate-800">Who we are</h3>
                <p className="text-slate-600 leading-relaxed">
                  We are an NDIS Support Service Provider serving Melbourne & Shepparton with a commitment to 
                  providing high-quality, person-centered care. Our team of qualified professionals is dedicated 
                  to helping participants achieve their goals and live independently.
                </p>
              </div>

              {/* What We Do */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 shadow-elegant border border-amber-100 hover:shadow-elegant-lg hover:-translate-y-1 transition-all duration-300">
                <div className="text-amber-600 mb-5">
                  <Heart size={48} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-slate-800">What we do</h3>
                <p className="text-slate-600 leading-relaxed">
                  We offer comprehensive services including companionship, community support, disability and 
                  aged care. From daily living assistance to specialized allied health services, we provide 
                  holistic support tailored to each individual's needs.
                </p>
              </div>

              {/* How We Do It */}
              <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-8 shadow-elegant border border-pink-100 hover:shadow-elegant-lg hover:-translate-y-1 transition-all duration-300">
                <div className="text-pink-600 mb-5">
                  <Award size={48} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-slate-800">How we do it</h3>
                <p className="text-slate-600 leading-relaxed">
                  Our approach is built on core values of integrity, accountability, and honesty. We work 
                  collaboratively with participants, families, and other service providers to deliver 
                  evidence-based, culturally sensitive support.
                </p>
              </div>
            </div>

            {/* Detailed History */}
            <div className="prose prose-lg max-w-none">
              <div className="bg-gradient-to-br from-slate-50 to-indigo-50/30 rounded-2xl p-10 shadow-elegant border border-slate-100">
                <div className="flex items-center gap-3 mb-6">
                  <Target size={40} className="text-indigo-600" />
                  <h3 className="text-2xl font-bold text-slate-800 m-0">Our Journey</h3>
                </div>
                
                <p className="text-slate-700 leading-relaxed mb-4">
                  Bright Support was founded in <strong className="text-slate-800">May 2019</strong> with a vision to provide exceptional 
                  disability and aged care services. We started our journey with specialized Physiotherapy and 
                  Occupational Therapy services, quickly establishing ourselves as a trusted provider in the community.
                </p>

                <p className="text-slate-700 leading-relaxed mb-4">
                  As we grew, we recognized the diverse needs of our participants and expanded our services to 
                  offer comprehensive support across multiple domains. Today, we have a presence in major cities 
                  including <strong className="text-slate-800">Melbourne, Brisbane, and Sydney</strong>, while also offering Telehealth 
                  services to ensure accessibility for all.
                </p>

                <p className="text-slate-700 leading-relaxed mb-4">
                  Our multidisciplinary team comprises allied health professionals, support workers, and nurses 
                  who are passionate about making a positive difference in people's lives. We focus on building 
                  positive relationships with our clients, their families, and key stakeholders.
                </p>

                <p className="text-slate-700 leading-relaxed mb-4">
                  At the heart of everything we do is a <strong className="text-slate-800">person-centered approach</strong>. We believe in 
                  empowering our participants to make choices about their care and support, fostering independence, 
                  dignity, and quality of life.
                </p>

                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border-l-4 border-indigo-600 p-7 mt-8 rounded-r-xl">
                  <p className="text-slate-800 font-bold mb-3 text-lg">
                    Our Mission:
                  </p>
                  <p className="text-slate-700 leading-relaxed">
                    To provide evidence-based therapeutic supports and person-centered care that enables 
                    individuals to achieve their goals, participate fully in their communities, and live 
                    the lives they choose.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-indigo-50/30" style={{ contentVisibility: 'auto', containIntrinsicSize: '800px' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-14 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Our Core Values
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-elegant text-center border border-slate-100 hover:border-indigo-200 hover:shadow-elegant-lg hover:-translate-y-1 transition-all duration-300">
                <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <Award className="text-indigo-600" size={36} />
                </div>
                <h3 className="text-xl font-bold mb-4 text-slate-800">Integrity</h3>
                <p className="text-slate-600 leading-relaxed">
                  We maintain the highest ethical standards in all our interactions and services
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-elegant text-center border border-slate-100 hover:border-amber-200 hover:shadow-elegant-lg hover:-translate-y-1 transition-all duration-300">
                <div className="w-20 h-20 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <Target className="text-amber-600" size={36} />
                </div>
                <h3 className="text-xl font-bold mb-4 text-slate-800">Accountability</h3>
                <p className="text-slate-600 leading-relaxed">
                  We take responsibility for our actions and commitments to participants and stakeholders
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-elegant text-center border border-slate-100 hover:border-pink-200 hover:shadow-elegant-lg hover:-translate-y-1 transition-all duration-300">
                <div className="w-20 h-20 bg-gradient-to-br from-pink-100 to-rose-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <Heart className="text-pink-600" size={36} />
                </div>
                <h3 className="text-xl font-bold mb-4 text-slate-800">Honesty</h3>
                <p className="text-slate-600 leading-relaxed">
                  We communicate openly and transparently with all participants and their families
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Impact */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto mb-20">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Making a Difference in Our Community
              </h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                Every day, we help people participate fully in their communities and live the lives they choose
              </p>
            </div>
            <div className="relative rounded-3xl overflow-hidden shadow-elegant-lg">
              <ResponsiveImage
                src="/images/about/community-impact.webp"
                alt="NDIS participants and support workers enjoying community activities together"
                className="w-full h-auto object-cover"
                width={1400}
                height={600}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-indigo-50/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Where We Serve
            </h2>
            <p className="text-lg text-slate-700 mb-10 leading-relaxed">
              Bright Support is proud to serve communities across Australia. Our main service areas include 
              Melbourne, Brisbane, and Sydney, with our head office located in Shepparton, Victoria. We also 
              offer Telehealth services to ensure accessibility for participants in regional and remote areas.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {['Melbourne', 'Shepparton', 'Brisbane', 'Sydney', 'Telehealth'].map((location) => (
                <span
                  key={location}
                  className="bg-gradient-to-br from-indigo-50 to-purple-50 text-indigo-700 px-8 py-4 rounded-full font-semibold border border-indigo-200 hover:border-indigo-300 hover:shadow-elegant transition-all duration-300"
                >
                  {location}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
