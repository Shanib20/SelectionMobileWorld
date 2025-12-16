import React from 'react';

const TermsOfService = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h1 className="text-3xl font-black text-gray-900 mb-8">Terms of Service</h1>
            <div className="prose prose-blue max-w-none text-gray-600 space-y-6">
                <p>Welcome to Selection Mobile World! By accessing our website and using our services, you agree to comply with the following terms and conditions.</p>

                <h3 className="text-xl font-bold text-gray-900">1. Acceptance of Terms</h3>
                <p>By using our services, you agree to be bound by these terms. If you do not agree, please do not use our services.</p>

                <h3 className="text-xl font-bold text-gray-900">2. Products & Services</h3>
                <p>We engage in the sale of new and used mobile phones, accessories, and repair services. We strive to provide accurate descriptions, but we do not warrant that product descriptions or other content are error-free.</p>

                <h3 className="text-xl font-bold text-gray-900">3. Repairs</h3>
                <p>For repair services, we use high-quality parts. However, repairing a device may void the manufacturer\'s warranty. We are not responsible for data loss; customers are advised to backup data before submission.</p>

                <h3 className="text-xl font-bold text-gray-900">4. Pricing & Payments</h3>
                <p>All prices are listed in Indian Rupees (INR). Prices are subject to change without notice. Payment must be made in full at the time of purchase or after service completion.</p>

                <h3 className="text-xl font-bold text-gray-900">5. Authenticity</h3>
                <p>All "New" products sold are 100% original. "Second Hand" or "Used" products are tested for quality but sold as-is.</p>

                <h3 className="text-xl font-bold text-gray-900">6. Changes to Terms</h3>
                <p>We reserve the right to modify these terms at any time. Continued use of the site constitutes acceptance of the new terms.</p>

                <div className="bg-gray-50 p-6 rounded-xl mt-8">
                    <p className="font-bold text-gray-900 mb-2">Contact Us</p>
                    <p>If you have any questions about these Terms, please contact us at our store in Chattanchal.</p>
                </div>
            </div>
        </div>
    );
};

export default TermsOfService;
