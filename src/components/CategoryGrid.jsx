import React from 'react';
import { Smartphone, RotateCw, Wrench, Zap, Headphones, Tv, Shirt } from 'lucide-react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ title, icon, link, color }) => (
    <Link to={link} className="group relative rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 p-6 flex flex-col items-center justify-center text-center gap-4">
        <div className={`p-4 rounded-full ${color} text-white group-hover:scale-110 transition-transform duration-300`}>
            {icon}
        </div>
        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-primary transition-colors">{title}</h3>
    </Link>
);

const CategoryGrid = () => {
    const categories = [
        { title: 'New Phones', icon: <Smartphone size={32} />, link: '/category/new-mobiles', color: 'bg-blue-500' },
        { title: 'Second Hand', icon: <RotateCw size={32} />, link: '/category/second-hand', color: 'bg-green-500' },
        { title: 'Services', icon: <Wrench size={32} />, link: '/category/repair', color: 'bg-orange-500' },
        { title: 'Accessories', icon: <Headphones size={32} />, link: '/category/audio', color: 'bg-purple-500' },
        { title: 'Recharge', icon: <Zap size={32} />, link: '/category/recharge-&-sim', color: 'bg-yellow-500' },
        { title: 'Lifestyle', icon: <Shirt size={32} />, link: '/category/lifestyle', color: 'bg-pink-500' },
    ];

    return (
        <div className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Explore Categories</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {categories.map((cat, idx) => (
                        <CategoryCard key={idx} {...cat} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CategoryGrid;
