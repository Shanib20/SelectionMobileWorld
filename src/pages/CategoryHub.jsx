import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CategoryHub = ({ type }) => {
    const config = {
        accessories: {
            title: 'Premium Accessories',
            subtitle: 'Enhance Your Device',
            description: 'Discover our curated collection of high-quality accessories designed to elevate your mobile experience.',
            gradient: 'from-blue-600 to-purple-600',
            collections: [
                { id: 'audio', name: 'Audio', img: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=800', color: 'from-pink-600 to-rose-600', desc: 'Immersive sound experience' },
                { id: 'charging-cables', name: 'Power & Cables', img: 'https://images.unsplash.com/photo-1616423640778-2cfd1e67b2d5?auto=format&fit=crop&q=80&w=800', color: 'from-blue-600 to-cyan-600', desc: 'Stay charged anywhere' },
                { id: 'storage', name: 'Storage Solutions', img: 'https://images.unsplash.com/photo-1625968115682-1dd7b26d8332?auto=format&fit=crop&q=80&w=800', color: 'from-violet-600 to-purple-600', desc: 'Expand your space' }
            ]
        },
        lifestyle: {
            title: 'Lifestyle & Gadgets',
            subtitle: 'Upgrade Your Life',
            description: 'Smart technology meets modern lifestyle. Explore gadgets that integrate seamlessly into your daily routine.',
            gradient: 'from-red-600 to-orange-600',
            collections: [
                { id: 'fashion', name: 'Tech Fashion', img: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=800', desc: 'Smart wearables' },
                { id: 'sports-fitness', name: 'Sports & Fitness', img: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=800', desc: 'Performance tracking' },
                { id: 'car-accessories', name: 'Car Accessories', img: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=800', desc: 'Drive smarter' }
            ]
        }
    };

    const data = config[type] || config.accessories;

    return (
        <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300 pt-20">
            {/* Hero Section of Category */}
            <div className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
                <div className={`absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br ${data.gradient} rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-[150px] opacity-20 transform translate-x-1/2 -translate-y-1/2`}></div>

                <div className="max-w-7xl mx-auto relative z-10 text-center">
                    <span className={`font-bold tracking-wider uppercase text-sm mb-4 inline-block px-4 py-1.5 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white`}>
                        {data.subtitle}
                    </span>
                    <h1 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">
                        {data.title}
                    </h1>
                    <p className="max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                        {data.description}
                    </p>
                </div>
            </div>

            {/* Collections Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {data.collections.map((col, idx) => (
                        <Link
                            to={`/collection/${col.id}`}
                            key={col.id}
                            className="group relative h-96 rounded-[2.5rem] overflow-hidden hover:shadow-2xl hover:shadow-gray-200 dark:hover:shadow-slate-900/50 transition-all duration-500 block border border-gray-100 dark:border-slate-800"
                        >
                            <img
                                src={col.img}
                                alt={col.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-8 flex flex-col justify-end">
                                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <div className="text-white/80 font-medium text-sm mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        {col.desc}
                                    </div>
                                    <h3 className="text-3xl font-black text-white mb-4 leading-none">{col.name}</h3>
                                    <span className="inline-flex items-center text-white font-bold group-hover:translate-x-2 transition-transform">
                                        View Collection <ArrowRight size={18} className="ml-2" />
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CategoryHub;
