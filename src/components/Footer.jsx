import React from 'react';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-white pt-12 pb-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">MobileShop</h3>
                        <p className="text-slate-400 text-sm">
                            Your one-stop destination for mobiles, accessories, repairs, and lifestyle gadgets. Quality products, trusted service.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-slate-400 text-sm">
                            <li><a href="/#about-us" className="hover:text-blue-400 transition-colors">About Us</a></li>
                            <li><a href="/#services" className="hover:text-blue-400 transition-colors">Services</a></li>
                            <li><a href="/privacy-policy" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
                            <li><a href="/terms-of-service" className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4">Contact</h4>
                        <ul className="space-y-2 text-slate-400 text-sm">
                            <li className="flex items-center"><MapPin size={16} className="mr-2" /> 123 Mobile Street, Tech City</li>
                            <li className="flex items-center"><Phone size={16} className="mr-2" /> +1 234 567 8900</li>
                            <li className="flex items-center"><Mail size={16} className="mr-2" /> support@mobileshop.com</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
                        <div className="flex space-x-4">
                            <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors"><Facebook size={24} /></a>
                            <a href="#" className="text-slate-400 hover:text-pink-500 transition-colors"><Instagram size={24} /></a>
                            <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors"><Twitter size={24} /></a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-500 text-sm flex justify-between items-center px-4">
                    <p>&copy; {new Date().getFullYear()} MobileShop. All rights reserved.</p>
                    <a href="/admin/login" className="text-slate-700 hover:text-slate-500 transition-colors text-xs">Admin Login</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
