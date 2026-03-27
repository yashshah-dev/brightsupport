import { Metadata } from 'next';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | Bright Support Australia',
  description: 'Learn how Bright Support collects, uses, and protects your personal information in accordance with Australian privacy legislation and the Public Records Act 1973.',
  openGraph: {
    title: 'Privacy Policy | Bright Support Australia',
    description: 'How Bright Support collects, uses, and protects your personal information in accordance with Australian privacy law.',
    url: 'https://brightsupport.com.au/privacy-policy',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Shield size={64} className="mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Privacy Policy</h1>
            <p className="text-xl text-blue-100">
              Your privacy and data security are our priorities
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <p className="text-lg text-gray-700 leading-relaxed">
              Bright Support is committed to protecting your privacy and complying with the Privacy Act 1988 (Cth), 
              Victorian privacy legislation, and relevant Australian privacy principles. This privacy policy explains 
              how we collect, use, store, and protect your personal information.
            </p>
          </div>
        </div>
      </section>

      {/* Key Privacy Points */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white rounded-xl p-6 shadow-md text-center">
                <Lock className="mx-auto mb-4 text-blue-600" size={48} />
                <h3 className="text-xl font-bold mb-3 text-gray-900">Secure Storage</h3>
                <p className="text-gray-700">
                  Your information is stored securely with appropriate technical and administrative safeguards
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md text-center">
                <Eye className="mx-auto mb-4 text-orange-600" size={48} />
                <h3 className="text-xl font-bold mb-3 text-gray-900">Transparent Use</h3>
                <p className="text-gray-700">
                  We only use your information for the purposes disclosed to you and with your consent
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md text-center">
                <FileText className="mx-auto mb-4 text-green-600" size={48} />
                <h3 className="text-xl font-bold mb-3 text-gray-900">Your Rights</h3>
                <p className="text-gray-700">
                  You have the right to access, correct, and request deletion of your personal information
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Policy Sections */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-12">
              {/* Information Collection */}
              <div>
                <h2 className="text-3xl font-bold mb-6 text-gray-900">
                  What Information is Collected and How Is It Used?
                </h2>
                <div className="prose prose-lg max-w-none text-gray-700">
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">Visitor Logs</h3>
                  <p className="mb-4">
                    When you visit our website, our web servers automatically collect non-personal information such as:
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Browser type and version</li>
                    <li>Operating system</li>
                    <li>Date and time of visit</li>
                    <li>Pages accessed and documents downloaded</li>
                    <li>Previous site visited</li>
                    <li>IP address</li>
                  </ul>
                  <p className="mb-4">
                    This information is used for statistical purposes to improve our website and services. 
                    It is not used to identify individuals.
                  </p>

                  <h3 className="text-xl font-semibold mb-3 mt-6 text-gray-900">Email Submissions</h3>
                  <p className="mb-4">
                    When you contact us via email or through our contact forms, we collect:
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Your name</li>
                    <li>Email address</li>
                    <li>Phone number (if provided)</li>
                    <li>Message content</li>
                  </ul>
                  <p>
                    This information is used solely to respond to your inquiry and provide requested services. 
                    We do not share this information with third parties without your consent.
                  </p>

                  <h3 className="text-xl font-semibold mb-3 mt-6 text-gray-900">Embedded Content</h3>
                  <p>
                    Our website may include embedded content from other websites (e.g., YouTube videos, Google Maps). 
                    These websites may collect data about you and use cookies. We recommend reviewing the privacy 
                    policies of these third-party services.
                  </p>
                </div>
              </div>

              {/* Security */}
              <div className="bg-gray-50 rounded-xl p-8">
                <h2 className="text-3xl font-bold mb-6 text-gray-900">
                  Security of Information
                </h2>
                <div className="prose prose-lg max-w-none text-gray-700">
                  <p className="mb-4">
                    Bright Support takes the security of your personal information seriously. We implement appropriate 
                    technical and administrative safeguards to protect against unauthorized access, alteration, 
                    disclosure, or destruction of your personal information.
                  </p>
                  <p className="mb-4">
                    Our security measures include:
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Secure servers and encrypted data transmission</li>
                    <li>Access controls and authentication systems</li>
                    <li>Regular security assessments and updates</li>
                    <li>Staff training on privacy and security practices</li>
                    <li>Compliance with the Public Records Act 1973 (Vic)</li>
                  </ul>
                  <p>
                    While we strive to protect your information, no method of transmission over the internet or 
                    electronic storage is 100% secure. We cannot guarantee absolute security.
                  </p>
                </div>
              </div>

              {/* Access Rights */}
              <div>
                <h2 className="text-3xl font-bold mb-6 text-gray-900">
                  Access to Information
                </h2>
                <div className="prose prose-lg max-w-none text-gray-700">
                  <p className="mb-4">
                    Under the Freedom of Information Act 1982 (Vic), you have the right to:
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Request access to your personal information held by us</li>
                    <li>Request correction of inaccurate or outdated information</li>
                    <li>Request deletion of your personal information (subject to legal obligations)</li>
                    <li>Object to certain uses of your information</li>
                  </ul>
                  <p className="mb-4">
                    To request access to or correction of your personal information, please contact us using the 
                    details provided below. We will respond to your request within a reasonable timeframe and in 
                    accordance with applicable legislation.
                  </p>
                  <p>
                    If you are not satisfied with how we handle your personal information, you may lodge a complaint 
                    with the Office of the Australian Information Commissioner (OAIC).
                  </p>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-blue-50 border-l-4 border-blue-600 rounded-lg p-8">
                <h2 className="text-3xl font-bold mb-6 text-gray-900">
                  Contact Information
                </h2>
                <div className="text-gray-700 space-y-3">
                  <p className="font-semibold text-lg">
                    If you have questions about this privacy policy or how we handle your information, please contact us:
                  </p>
                  <div className="space-y-2">
                    <p><strong>Business Name:</strong> Bright Support</p>
                    <p><strong>ABN:</strong> 32659000978</p>
                    <p><strong>Phone:</strong> <a href="tel:1800407508" className="text-blue-600 hover:text-blue-700">1800 407 508</a></p>
                    <p><strong>Email:</strong> <a href="mailto:care@brightsupport.com.au" className="text-blue-600 hover:text-blue-700">care@brightsupport.com.au</a></p>
                    <p><strong>Address:</strong> 279 Wyndham St, Shepparton VIC 3630, Australia</p>
                    <p><strong>Facebook:</strong> <a href="https://www.facebook.com/brightsupportcare" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">facebook.com/brightsupportcare</a></p>
                  </div>
                </div>
              </div>

              {/* Last Updated */}
              <div className="text-center text-gray-600">
                <p className="italic">This privacy policy was last updated on November 24, 2025</p>
                <p className="mt-2">We reserve the right to update this policy. Changes will be posted on this page.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
