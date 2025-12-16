import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Filter, Grid, ArrowUpDown } from 'lucide-react';

const COLLECTIONS = {
    // Accessories
    'audio': {
        title: 'Audio Experience',
        subtitle: 'Immersive sound for every moment',
        items: [
            { name: 'AirPods', img: 'https://images.unsplash.com/photo-1603351154351-5cf99bf63119?auto=format&fit=crop&q=80&w=400', price: 19999 },
            { name: 'Headset', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400', price: 15999 },
            { name: 'Wired Earphones', img: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=400', price: 2499 },
            { name: 'Neckband', img: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=400', price: 3999 },
            { name: 'Bluetooth Speaker', img: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&q=80&w=400', price: 9999 }
        ],
        theme: 'from-pink-500 to-rose-500'
    },
    'charging-cables': {
        title: 'Power & Cables',
        subtitle: 'Stay charged and connected',
        items: [
            { name: 'Fast Chargers', img: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&q=80&w=400', price: 2999 },
            { name: 'Torch Charger', img: 'https://images.unsplash.com/photo-1544654924-f584fbb35d28?auto=format&fit=crop&q=80&w=400', price: 1299 },
            { name: 'Data Cables', img: 'https://images.unsplash.com/photo-1616423640778-2cfd1e67b2d5?auto=format&fit=crop&q=80&w=400', price: 999 },
            { name: 'Power Banks', img: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&q=80&w=400', price: 3599 }
        ],
        theme: 'from-blue-500 to-cyan-500'
    },
    'storage': {
        title: 'Storage Solutions',
        subtitle: 'Secure your data with speed',
        items: [
            { name: 'Pendrive', img: 'https://images.unsplash.com/photo-1617347454431-f49d7ff5c3b1?auto=format&fit=crop&q=80&w=400', price: 1899 },
            { name: 'SD Card', img: 'https://images.unsplash.com/photo-1594636797501-8438b91e9e31?auto=format&fit=crop&q=80&w=400', price: 1499 }
        ],
        theme: 'from-violet-500 to-purple-500'
    },
    // Lifestyle
    'fashion': {
        title: 'Fashion & Style',
        subtitle: 'Trending accessories for you',
        items: [
            { name: 'Purse / Wallet', img: 'https://images.unsplash.com/photo-1627123424574-181ce5171c98?auto=format&fit=crop&q=80&w=400', price: 3200 },
            { name: 'Smart Watch', img: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=400', price: 12000 },
            { name: 'Leather Belt', img: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&q=80&w=400', price: 2800 },
            { name: 'Sunglasses', img: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=400', price: 6800 },
            { name: 'Perfumes', img: 'https://images.unsplash.com/photo-1523293188086-b512669486c7?auto=format&fit=crop&q=80&w=400', price: 5200 },
            { name: 'Grooming Kit', img: 'https://images.unsplash.com/photo-1621607512214-68297480165e?auto=format&fit=crop&q=80&w=400', price: 4400 }
        ],
        theme: 'from-orange-500 to-red-500'
    },
    'sports-fitness': {
        title: 'Sports & Fitness',
        subtitle: 'Gear up for performance',
        items: [
            { name: 'Football', img: 'https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab?auto=format&fit=crop&q=80&w=400', price: 2400 },
            { name: 'Football Shoes', img: 'https://images.unsplash.com/photo-1511886929837-354d827aae26?auto=format&fit=crop&q=80&w=400', price: 7200 },
            { name: 'Jersey Socks', img: 'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?auto=format&fit=crop&q=80&w=400', price: 999 },
            { name: 'Cricket Ball', img: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=400', price: 1999 },
            { name: 'Cricket Bat', img: 'https://images.unsplash.com/photo-1593341646262-2417420e6dd6?auto=format&fit=crop&q=80&w=400', price: 9600 },
            { name: 'Shuttlecock', img: 'https://images.unsplash.com/photo-1626248356461-1823eb41a134?auto=format&fit=crop&q=80&w=400', price: 1200 },
            { name: 'Trophies', img: 'https://images.unsplash.com/photo-1563272993-eb1e04db7106?auto=format&fit=crop&q=80&w=400', price: 0 } // 'Custom' handling
        ],
        theme: 'from-green-500 to-emerald-600'
    },
    'car-accessories': {
        title: 'Car Accessories',
        subtitle: 'Drive in style and comfort',
        items: [
            { name: 'Car Speakers', img: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&q=80&w=400', price: 6400 },
            { name: 'Phone Mount', img: 'https://images.unsplash.com/photo-1605218427306-ddbc90dcb223?auto=format&fit=crop&q=80&w=400', price: 1600 }
        ],
        theme: 'from-slate-700 to-slate-900'
    }
};

const CollectionPage = () => {
    const { collectionId } = useParams();
    const collection = COLLECTIONS[collectionId];
    const [sortBy, setSortBy] = useState('default'); // default, price-asc, price-desc

    const sortedItems = useMemo(() => {
        if (!collection) return [];
        let items = [...collection.items];
        if (sortBy === 'price-asc') {
            items.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price-desc') {
            items.sort((a, b) => b.price - a.price);
        }
        return items;
    }, [collection, sortBy]);

    if (!collection) return (
        <div className="min-h-[50vh] flex flex-col items-center justify-center p-10 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Collection Not Found</h2>
            <Link to="/" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Go Home</Link>
        </div>
    );

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            {/* Hero Header */}
            <div className={`relative bg-gradient-to-r ${collection.theme} py-24 overflow-hidden`}>
                <div className="absolute inset-0 bg-black/20 mix-blend-multiply"></div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-2xl translate-y-1/3 -translate-x-1/4"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-medium mb-6 border border-white/20">
                        <Sparkles size={14} />
                        <span>Premium Collection</span>
                    </div>
                    <h1 className="text-5xl font-black tracking-tight mb-4 animate-fade-in-up">{collection.title}</h1>
                    <p className="text-xl text-white/90 max-w-2xl mx-auto font-light animate-fade-in-up delay-100">{collection.subtitle}</p>
                </div>
            </div>

            {/* Filter Bar */}
            <div className="sticky top-20 z-30 bg-white/80 backdrop-blur-md border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <div className="text-gray-500 text-sm font-medium">Showing {sortedItems.length} premium items</div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center space-x-2 text-gray-700 bg-white border border-gray-200 px-3 py-1.5 rounded-lg shadow-sm">
                            <ArrowUpDown size={16} className="text-gray-500" />
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="bg-transparent border-none text-sm font-semibold focus:ring-0 cursor-pointer outline-none"
                            >
                                <option value="default">Sort by: Featured</option>
                                <option value="price-asc">Price: Low to High</option>
                                <option value="price-desc">Price: High to Low</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                    {sortedItems.map((item, idx) => (
                        <Link
                            key={item.name}
                            to={`/category/${item.name.toLowerCase().replace(/[\s/()]+/g, '-')}`}
                            className="group bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full animate-fade-in-up"
                            style={{ animationDelay: `${idx * 50}ms` }}
                        >
                            <div className="h-56 bg-gray-50 overflow-hidden relative p-8 flex items-center justify-center">
                                <img
                                    src={item.img}
                                    alt={item.name}
                                    className="max-h-full max-w-full object-contain drop-shadow-lg group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-blue-600">
                                        <ArrowRight size={16} />
                                    </div>
                                </div>
                            </div>

                            <div className="p-5 flex flex-col flex-grow">
                                <div className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">New Arrival</div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight group-hover:text-blue-600 transition-colors">{item.name}</h3>

                                <div className="mt-auto pt-4 border-t border-gray-50 flex justify-between items-center">
                                    <span className="text-xl font-black text-gray-900">
                                        {item.price === 0 ? 'Custom' : `₹${item.price.toLocaleString()}`}
                                    </span>
                                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md group-hover:bg-blue-600 group-hover:text-white transition-colors">View</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CollectionPage;
