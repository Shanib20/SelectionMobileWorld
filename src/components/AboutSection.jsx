import React from 'react';
import { MapPin, Users, Award, Smile, ArrowRight } from 'lucide-react';

const AboutSection = () => {
    const team = [
        {
            name: 'Aboobacker Siddique',
            role: 'Owner',
            image: '/assets/about/owner-siddique.jpg',
        },
        {
            name: 'Musthak',
            role: 'Staff',
            image: '/assets/about/staff-musthak.jpg',
        },
        {
            name: 'Zainu',
            role: 'Staff',
            image: '/assets/about/staff-zainu.jpg',
        },
        {
            name: 'Will Inform Soon',
            role: 'Technician',
            image: null, // Placeholder handled in UI
        },
    ];

    return (
        <section id="about-us" className="py-20 bg-white scroll-mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">About Us</h2>
                    <div className="w-20 h-1.5 bg-blue-600 mx-auto rounded-full"></div>
                </div>

                {/* Main Content: Info & Logo */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
                    <div className="space-y-6">
                        <div className="inline-block bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wide">
                            Selection Mobile World
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900 leading-tight">
                            Your Trusted Mobile Partner in Chattanchal
                        </h3>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            Welcome to <strong>Selection Mobile World (SMW)</strong>. With over <span className="text-blue-600 font-bold">15+ years of experience</span>,
                            we have been serving the community with dedication and expertise. We pride ourselves on having
                            <span className="text-blue-600 font-bold"> 10,000+ happy customers</span> who trust us for the best products and
                            services.
                        </p>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            Whether you're looking for the latest smartphones, quality accessories, or expert advice,
                            our team is here to ensure you get exactly what you need.
                        </p>

                        <div className="grid grid-cols-3 gap-6 pt-4">
                            <div className="text-center p-4 bg-gray-50 rounded-xl">
                                <Award className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                                <div className="font-bold text-2xl text-gray-900">15+</div>
                                <div className="text-sm text-gray-500">Years Exp.</div>
                            </div>
                            <div className="text-center p-4 bg-gray-50 rounded-xl">
                                <Smile className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                                <div className="font-bold text-2xl text-gray-900">10k+</div>
                                <div className="text-sm text-gray-500">Happy Clients</div>
                            </div>
                            <div className="text-center p-4 bg-gray-50 rounded-xl">
                                <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                                <div className="font-bold text-2xl text-gray-900">Expert</div>
                                <div className="text-sm text-gray-500">Team</div>
                            </div>
                        </div>
                    </div>

                    <div className="relative w-64 mx-auto lg:mx-0">
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-3xl transform rotate-3 scale-[1.02] opacity-20 blur-lg"></div>
                        <img
                            src="/assets/about/logo.jpg"
                            alt="Selection Mobile World Logo"
                            className="relative w-full h-auto rounded-3xl shadow-2xl border border-gray-100 bg-white"
                        />
                    </div>
                </div>

                <div className="mb-20">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-10 text-center">Meet Our Team</h3>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                        {team.map((member) => (
                            <div key={member.name} className="group relative bg-white dark:bg-slate-800 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-slate-700 p-6 text-center">
                                <div className="w-24 h-24 md:w-32 md:h-32 mx-auto rounded-full overflow-hidden bg-gray-100 dark:bg-slate-700 mb-4 ring-4 ring-gray-50 dark:ring-slate-800 group-hover:ring-blue-50 dark:group-hover:ring-blue-900/30 transition-all">
                                    {member.image ? (
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                            <Users size={32} />
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <h4 className="text-sm md:text-lg font-bold text-gray-900 dark:text-white mb-1">{member.name}</h4>
                                    <p className="text-blue-600 dark:text-blue-400 font-medium text-xs md:text-sm uppercase tracking-wider">{member.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Location Section */}
                {/* Location Section */}
                <a
                    href="https://www.google.com/maps/search/?api=1&query=Selection+Mobile+World+Chattanchal"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group"
                >
                    <div className="bg-gray-900 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden transition-transform duration-300 group-hover:-translate-y-2 hover:shadow-2xl">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2 group-hover:opacity-40 transition-opacity"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2 group-hover:opacity-40 transition-opacity"></div>

                        <div className="relative z-10">
                            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm group-hover:bg-blue-600 transition-colors duration-300">
                                <MapPin className="w-8 h-8 text-blue-400 group-hover:text-white transition-colors" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Visit Us Today</h3>
                            <p className="text-xl text-gray-300 font-medium mb-2">Near Milan Hotel, Chattanchal</p>
                            <p className="text-gray-400">P.O. Thekkil, Kasaragod - 671541</p>
                            <div className="mt-8 text-blue-400 font-bold flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                Open in Google Maps <ArrowRight size={16} className="ml-2" />
                            </div>
                        </div>
                    </div>
                </a>
            </div>
        </section>
    );
};

export default AboutSection;
