import React from 'react';
import HeroSection from '../components/HeroSection';
import { supabase } from '../supabase';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SellRequestForm from '../components/SellRequestForm';
import { useProducts } from '../contexts/ProductContext';
import ServicesSection from '../components/ServicesSection';
import AboutSection from '../components/AboutSection';

const ProductSection = ({ id, title, products, link }) => (
    <div id={id} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-b border-gray-100 scroll-mt-24">
        <div className="flex justify-between items-end mb-10">
            <div>
                <h2 className="text-3xl font-black text-gray-900 tracking-tight mb-2">{title}</h2>
                <div className="h-1 w-20 bg-blue-600 rounded-full"></div>
            </div>
            {link && (
                <Link to={link} className="group flex items-center gap-2 text-blue-600 font-bold hover:text-blue-700 transition-colors bg-blue-50 px-4 py-2 rounded-full">
                    View All <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
            )}
        </div>

        {products.length === 0 ? (
            <div className="text-gray-400 italic text-center py-10 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                No items available in this category yet.
            </div>
        ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                {products.slice(0, 4).map((product) => (
                    <Link to={`/product/${product.id}`} key={product.id} className="group bg-white dark:bg-slate-800 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-slate-700 flex flex-col hover:-translate-y-1">
                        <div className="h-32 md:h-64 bg-gray-50 dark:bg-slate-900 relative overflow-hidden p-4 md:p-6 flex items-center justify-center">
                            {product.image_url ? (
                                <img
                                    src={product.image_url}
                                    alt={product.name}
                                    className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-300 font-medium">No Image</div>
                            )}

                            {/* Quick Action Overlay - Hidden on mobile for cleaner look */}
                            <div className="hidden md:flex absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/50 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 justify-center pb-6">
                                <span className="text-white text-sm font-bold bg-black/30 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                                    View Details
                                </span>
                            </div>
                        </div>

                        <div className="p-3 md:p-6 flex-grow flex flex-col">
                            <div className="text-[10px] md:text-xs font-bold text-blue-600 uppercase tracking-wide mb-1 md:mb-2">{product.category}</div>
                            <h3 className="text-sm md:text-lg font-bold text-gray-900 dark:text-white mb-1 md:mb-2 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
                                {product.name}
                            </h3>
                            <div className="mt-auto flex items-center justify-between pt-2 md:pt-4 border-t border-gray-50 dark:border-slate-700">
                                <div>
                                    <span className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400 block">Price</span>
                                    <span className="text-sm md:text-xl font-black text-gray-900 dark:text-white">₹{product.price}</span>
                                </div>
                                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                    <ArrowRight size={14} className="md:w-[18px] md:h-[18px]" />
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        )}
    </div>
);

const Home = () => {
    const { products, loading } = useProducts();

    const newMobiles = products.filter(p => p.category === 'mobile' && p.subcategory === 'New');
    const usedMobiles = products.filter(p => p.category === 'mobile' && p.subcategory === 'Used');
    // We don't display individual products for Accessories/Lifestyle anymore here, just the collection cards.

    if (loading && products.length === 0) return <div className="text-center py-20">Loading...</div>;

    return (
        <>
            <HeroSection />

            <ProductSection id="new-mobiles" title="New Mobiles" products={newMobiles} link="/category/new-mobiles" />
            <ProductSection id="second-hand" title="Second Hand Deals" products={usedMobiles} link="/category/second-hand" />



            {/* Services Section */}
            <div id="services" className="scroll-mt-24">
                <ServicesSection />
            </div>

            {/* About Section */}
            <AboutSection />

            {/* Sell Phone Section */}
            <div id="sell-request" className="bg-gray-50 dark:bg-slate-900 py-16 scroll-mt-24 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900">Sell Your Old Phone</h2>
                        <p className="text-gray-600 mt-2">Get the best price for your used device instantly.</p>
                    </div>
                    <SellRequestForm />
                </div>
            </div>
        </>
    );
};

export default Home;
