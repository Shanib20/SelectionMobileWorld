import React from 'react';
import { MessageCircle, Wrench, Smartphone, Battery, Cpu, Droplets, Zap, ArrowRight } from 'lucide-react';

const ServicesSection = () => {
    // Hardcoded services as requested to show "what we do"
    const services = [
        {
            id: 1,
            title: 'Display Replacement',
            description: 'Broken screen? We replace displays with high-quality original parts for all major brands.',
            icon: <Smartphone className="w-8 h-8 text-blue-600" />,
            priceStart: 'Starting from $50',
            query: 'Display Replacement',
            color: 'bg-blue-50'
        },
        {
            id: 2,
            title: 'Battery Replacement',
            description: 'Phone draining fast? Get a fresh battery installed to restore your device\'s battery life.',
            icon: <Battery className="w-8 h-8 text-green-600" />,
            priceStart: 'Starting from $30',
            query: 'Battery Replacement',
            color: 'bg-green-50'
        },
        {
            id: 3,
            title: 'Charging Port Repair',
            description: 'Device not charging properly? We fix loose or damaged charging ports (CC) quickly.',
            icon: <Zap className="w-8 h-8 text-yellow-600" />,
            priceStart: 'Starting from $20',
            query: 'Charging Port Repair',
            color: 'bg-yellow-50'
        },
        {
            id: 4,
            title: 'Motherboard Repair',
            description: 'Advanced chip-level repair for dead phones, network issues, and logic board problems.',
            icon: <Cpu className="w-8 h-8 text-purple-600" />,
            priceStart: 'Custom Quote',
            query: 'Motherboard Repair',
            color: 'bg-purple-50'
        },
        {
            id: 5,
            title: 'Water Damage Fix',
            description: 'Dropped in water? Turn it off and bring it to us immediately for chemical cleaning and revival.',
            icon: <Droplets className="w-8 h-8 text-cyan-600" />,
            priceStart: 'Starting from $40',
            query: 'Water Damage Repair',
            color: 'bg-cyan-50'
        },
        {
            id: 6,
            title: 'Software & Unlocking',
            description: 'Stuck on logo? Forgot password? We handle software flashing, unlocking, and data recovery.',
            icon: <Wrench className="w-8 h-8 text-red-600" />,
            priceStart: 'Starting from $25',
            query: 'Software Issue',
            color: 'bg-red-50'
        }
    ];

    const handleWhatsAppEnquiry = (serviceName) => {
        const phoneNumber = "919876543210"; // Replace with actual number
        const message = `Hi, I want to enquire about ${serviceName}. Please let me know the details.`;
        window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
    };

    return (
        <div className="bg-gray-50 dark:bg-slate-900 py-24 scroll-mt-24 relative overflow-hidden transition-colors duration-300" id="services">
            {/* Decorative Background */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-100 dark:bg-blue-900/20 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-[120px] opacity-30 translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-100 dark:bg-purple-900/20 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-[100px] opacity-30 -translate-x-1/2 translate-y-1/2"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <span className="text-blue-600 dark:text-blue-400 font-bold tracking-wider uppercase text-sm bg-blue-50 dark:bg-blue-900/30 px-4 py-1.5 rounded-full mb-4 inline-block">Our Expertise</span>
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6">Expert Mobile Repairs</h2>
                    <p className="max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                        Fast, reliable, and professional services using high-quality parts to bring your device back to life.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service) => (
                        <div key={service.id} className="group bg-white dark:bg-slate-800 rounded-3xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 dark:border-slate-700 relative overflow-hidden">
                            <div className={`absolute top-0 right-0 w-32 h-32 ${service.color} dark:bg-opacity-10 rounded-bl-[100px] -mr-8 -mt-8 opacity-50 dark:opacity-20 transition-transform group-hover:scale-110 duration-500`}></div>

                            <div className="relative z-10">
                                <div className={`w-16 h-16 ${service.color} dark:bg-opacity-20 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform duration-300`}>
                                    {service.icon}
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{service.title}</h3>
                                <p className="text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
                                    {service.description}
                                </p>

                                <div className="flex items-center justify-between pt-6 border-t border-gray-100 dark:border-slate-700">
                                    <div className="text-sm font-bold text-gray-900 dark:text-white bg-gray-100 dark:bg-slate-700 px-3 py-1 rounded-lg">
                                        {service.priceStart}
                                    </div>
                                    <button
                                        onClick={() => handleWhatsAppEnquiry(service.query)}
                                        className="text-blue-600 dark:text-blue-400 font-bold hover:text-blue-700 dark:hover:text-blue-300 flex items-center transition-colors text-sm group/btn"
                                    >
                                        Enquire Now <ArrowRight size={16} className="ml-1 group-hover/btn:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* General Enquiry CTA */}
                <div className="mt-16 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl transform -rotate-1 opacity-20 blur-lg"></div>
                    <div className="relative bg-white dark:bg-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between overflow-hidden border border-gray-100 dark:border-slate-700">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 dark:bg-blue-900/20 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-3xl opacity-50 translate-x-1/2 -translate-y-1/2"></div>

                        <div className="mb-8 md:mb-0 md:pr-8 relative z-10 text-center md:text-left">
                            <h3 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white mb-2">Can't find your issue?</h3>
                            <p className="text-lg text-gray-600 dark:text-gray-400">Our senior technicians are ready to diagnose any complex problem.</p>
                        </div>
                        <button
                            onClick={() => handleWhatsAppEnquiry("a General Repair Enquiry")}
                            className="relative z-10 inline-flex items-center px-8 py-4 border border-transparent text-lg font-bold rounded-xl text-white bg-gray-900 dark:bg-blue-600 hover:bg-gray-800 dark:hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 whitespace-nowrap"
                        >
                            <MessageCircle className="mr-2" size={24} />
                            Chat with Expert
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServicesSection;
