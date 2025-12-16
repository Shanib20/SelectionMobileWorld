import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

const Contact = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-12 text-center">Contact Us</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="bg-white rounded-xl shadow-md p-8">
                    <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary h-10 border px-3" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input type="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary h-10 border px-3" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Message</label>
                            <textarea className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary h-32 border p-3"></textarea>
                        </div>
                        <button className="w-full bg-primary text-white py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium">
                            Send Message
                        </button>
                    </form>
                </div>

                <div className="space-y-8">
                    <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                        <h3 className="text-xl font-semibold mb-4 text-blue-900">Store Information</h3>
                        <ul className="space-y-4 text-blue-800">
                            <li className="flex items-start">
                                <MapPin className="mr-3 flex-shrink-0" />
                                <span>123 Mobile Street, Tech City, Digital State 560001</span>
                            </li>
                            <li className="flex items-center">
                                <Phone className="mr-3" />
                                <span>+91 98765 43210</span>
                            </li>
                            <li className="flex items-center">
                                <Mail className="mr-3" />
                                <span>contact@mobileshop.com</span>
                            </li>
                        </ul>
                    </div>

                    <div className="h-64 bg-gray-200 rounded-xl flex items-center justify-center text-gray-500">
                        Map Placeholder
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
