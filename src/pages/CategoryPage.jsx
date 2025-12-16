import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../supabase';
import { MessageCircle, ShoppingBag } from 'lucide-react';
import SellRequestForm from '../components/SellRequestForm';

const CategoryPage = () => {
    const { categoryId } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Convert slug back to title case
    const title = categoryId
        ? categoryId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
        : 'Category';

    const isService = ['repair', 'recharge-&-sim', 'porting', 'technician'].includes(categoryId);
    const isSellPage = categoryId === 'sell-your-phone';

    useEffect(() => {
        if (!isSellPage) {
            fetchProducts();
        } else {
            setLoading(false);
        }
    }, [categoryId]);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            let query = supabase.from('products').select('*');

            // 1. Defined Top-Level mappings
            if (categoryId === 'new-mobiles') {
                query = query.eq('category', 'mobile').eq('subcategory', 'New');
            } else if (categoryId === 'second-hand') {
                query = query.eq('category', 'mobile').eq('subcategory', 'Used');
            } else if (categoryId === 'sell-your-phone') {
                query = query.eq('category', 'mobile').eq('subcategory', 'Sell Your Phone');
            }
            // 2. Services
            else if (isService) {
                query = query.eq('category', 'service'); // Services might be just category-based or have specific subcats if expanded
            }
            // 3. Broad Category Fallbacks (if user navigates to /category/lifestyle)
            else if (categoryId === 'lifestyle') {
                query = query.eq('category', 'lifestyle');
            } else if (categoryId === 'accessories') {
                query = query.eq('category', 'accessory');
            }
            // 4. Dynamic Subcategory Matching (The Logic Fix)
            // For cases like 'football-shoes', 'watches', 'airpods' etc.
            // valid subcategories will match the 'title' we derived (Title Case).
            else {
                // We try to match 'subcategory' column.
                // Note: This relies on title conversion 'football-shoes' -> 'Football Shoes' matching DB exactly.
                query = query.eq('subcategory', title);
            }

            const { data, error } = await query;

            if (error) throw error;

            // Double check: If we fell through to case 4 but it wasn't a real subcategory, data might be empty (correct)
            // But if logic was loose, it might return all. 
            // The logic above ensures we always attach an .eq() clause, so it won't fetch *everything* unless specifically asked.

            setProducts(data || []);
        } catch (error) {
            console.error('Error fetching products:', error);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    const handleWhatsAppClick = (productName) => {
        // Replace with actual shop number
        const phoneNumber = "919876543210";
        const message = `Hello, I'm interested in ${productName || title}`;
        window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
    };

    if (isSellPage) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <SellRequestForm />
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex justify-between items-end mb-8">
                <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
            </div>

            {loading ? (
                <div className="text-center py-12 text-gray-500">Loading items...</div>
            ) : products.length === 0 && !isService ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-16 text-center">
                    <p className="text-xl text-gray-500 mb-4">
                        No items currently listed in this category.
                    </p>
                    <p className="text-sm text-gray-400">Check back soon or contact us!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <Link to={`/product/${product.id}`} key={product.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col group cursor-pointer block">
                            <div className="h-48 bg-white relative overflow-hidden p-4 flex items-center justify-center">
                                {product.image_url ? (
                                    <img src={product.image_url} alt={product.name} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-300">No Image</div>
                                )}
                            </div>
                            <div className="p-4 flex-grow flex flex-col">
                                <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
                                <p className="text-sm text-gray-500 mb-2 line-clamp-2">{product.description}</p>
                                <div className="mt-auto flex items-center justify-between">
                                    <span className="text-lg font-bold text-primary">${product.price}</span>
                                    {isService ? (
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault(); // Stop link navigation
                                                handleWhatsAppClick(product.name);
                                            }}
                                            className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors z-10 relative"
                                            title="Chat on WhatsApp"
                                        >
                                            <MessageCircle size={20} />
                                        </button>
                                    ) : (
                                        <button className="p-2 bg-gray-100 text-gray-600 rounded-full hover:bg-primary hover:text-white transition-colors">
                                            <ShoppingBag size={20} />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </Link>
                    ))}

                    {/* Fallback for Services regarding the prompt if no products exist specifically */}
                    {isService && products.length === 0 && (
                        <div className="col-span-full bg-blue-50 rounded-xl p-8 text-center">
                            <h3 className="text-xl font-bold text-blue-900 mb-4">Need {title}?</h3>
                            <p className="text-blue-700 mb-6">Contact our technicians directly for instant support.</p>
                            <button
                                onClick={() => handleWhatsAppClick(null)}
                                className="inline-flex items-center px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors"
                            >
                                <MessageCircle className="mr-2" />
                                Chat on WhatsApp
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CategoryPage;
