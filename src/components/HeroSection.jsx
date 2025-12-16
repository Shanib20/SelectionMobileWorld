import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

const HeroSection = () => {
    return (
        <div className="relative bg-gray-900 overflow-hidden min-h-[600px] flex items-center">
            {/* Background Gradients */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 opacity-90"></div>
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-pulse delay-700"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Content */}
                    <div className="text-center lg:text-left space-y-8 animate-fade-in-up">
                        <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-1.5 border border-white/20">
                            <Sparkles size={16} className="text-yellow-400" />
                            <span className="text-sm font-medium text-white/90 tracking-wide">Premium Mobile Store</span>
                        </div>

                        <h1 className="text-5xl lg:text-7xl font-black text-white leading-tight tracking-tight">
                            Future Tech <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                                In Your Hands
                            </span>
                        </h1>

                        <p className="text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                            Discover the latest smartphones, premium accessories, and expert services tailored for your digital lifestyle.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                            <button
                                onClick={() => document.getElementById('new-mobiles')?.scrollIntoView({ behavior: 'smooth' })}
                                className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all transform hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/30 flex items-center justify-center gap-2"
                            >
                                Shop Now <ArrowRight size={20} />
                            </button>
                            <button
                                onClick={() => document.getElementById('sell-phone')?.scrollIntoView({ behavior: 'smooth' })}
                                className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl font-bold backdrop-blur-sm transition-all flex items-center justify-center"
                            >
                                Sell Old Phone
                            </button>
                        </div>
                    </div>

                    {/* Visual */}
                    <div className="relative lg:h-[600px] flex items-center justify-center">
                        <div className="absolute w-[120%] h-[120%] bg-gradient-to-b from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>

                        {/* 3D Floating Image Effect */}
                        <div className="relative w-full max-w-md animate-float">
                            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-[3rem] transform rotate-6 opacity-30 blur-lg"></div>
                            <img
                                src="https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=1000&auto=format&fit=crop"
                                alt="Premium Smartphone"
                                className="relative rounded-[2.5rem] shadow-2xl border-4 border-white/10 z-10 w-full object-cover aspect-[4/5]"
                            />

                            {/* Floating Cards */}
                            <div className="absolute -right-8 top-20 bg-white/90 backdrop-blur-xl p-4 rounded-2xl shadow-xl z-20 animate-bounce delay-1000 hidden md:block">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold">✓</div>
                                    <div>
                                        <div className="text-sm font-bold text-gray-900">Best Prices</div>
                                        <div className="text-xs text-gray-500">Guaranteed</div>
                                    </div>
                                </div>
                            </div>

                            <div className="absolute -left-8 bottom-32 bg-white/90 backdrop-blur-xl p-4 rounded-2xl shadow-xl z-20 animate-bounce delay-500 hidden md:block">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">★</div>
                                    <div>
                                        <div className="text-sm font-bold text-gray-900">Top Rated</div>
                                        <div className="text-xs text-gray-500">Service</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
