import React from 'react';

const PrivacyPolicy = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h1 className="text-3xl font-black text-gray-900 mb-8">Privacy Policy</h1>
            <div className="prose prose-blue max-w-none text-gray-600 space-y-6">
                <p>At Selection Mobile World, we respect your privacy and are committed to protecting your personal data.</p>

                <h3 className="text-xl font-bold text-gray-900">1. Information We Collect</h3>
                <p>We may collect personal information such as your name, phone number, and email address when you submit inquiries, request repairs, or place orders.</p>

                <h3 className="text-xl font-bold text-gray-900">2. How We Use Your Information</h3>
                <p>We use your information to:
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Process your orders and repair requests.</li>
                        <li>Communicate with you regarding your service status.</li>
                        <li>Improve our website and services.</li>
                    </ul>
                </p>

                <h3 className="text-xl font-bold text-gray-900">3. Information Sharing</h3>
                <p>We do not sell or rent your personal information to third parties. We may share data with trusted service providers who assist us in operating our business.</p>

                <h3 className="text-xl font-bold text-gray-900">4. Data Security</h3>
                <p>We implement appropriate security measures to protect your personal information from unauthorized access or disclosure.</p>

                <h3 className="text-xl font-bold text-gray-900">5. Your Rights</h3>
                <p>You have the right to request access to or correction of your personal data held by us.</p>

                <div className="bg-gray-50 p-6 rounded-xl mt-8">
                    <p className="font-bold text-gray-900 mb-2">Contact Us</p>
                    <p>If you have questions about our privacy practices, please visit our store in Chattanchal.</p>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
