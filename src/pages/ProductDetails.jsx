import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../supabase';
import { ArrowLeft, MessageCircle, ShoppingCart, Check, Shield } from 'lucide-react';

const ProductDetails = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProduct();
        window.scrollTo(0, 0);
    }, [productId]);

    const fetchProduct = async () => {
        try {
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .eq('id', productId)
                .single();

            if (error) throw error;
            setProduct(data);
        } catch (error) {
            console.error('Error fetching product:', error);
            // If ID starts with 'm', 'u', 'a' etc it might be mock data
            // Since we can't easily fetch mock data here without importing it
            // We will just handle the DB error for now.
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    if (!product) return <div className="min-h-screen flex items-center justify-center">Product not found.</div>;

    const specs = [
        { label: 'Model Year', value: product.model_year },
        { label: 'Size', value: product.size },
        { label: 'Storage', value: product.storage },
        { label: 'Color', value: product.color },
        { label: 'RAM', value: product.ram },
        { label: 'Processor', value: product.processor },
        { label: 'Rear Camera', value: product.camera_rear },
        { label: 'Front Camera', value: product.camera_front },
        { label: 'Display Size', value: product.display_size },
        { label: 'Display Type', value: product.display_type },
        { label: 'Warranty', value: product.warranty },
        { label: 'In The Box', value: product.box_contents },
    ].filter(spec => spec.value && spec.value.toString().trim() !== '');

    const whatsappMessage = `Hi, I am interested in buying ${product.name} (Price: $${product.price}). Is it available?`;
    const whatsappLink = `https://wa.me/919999999999?text=${encodeURIComponent(whatsappMessage)}`; // Replace with actual number

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Button */}
                <Link to="/" className="inline-flex items-center text-gray-600 hover:text-blue-600 mb-6 transition-colors font-medium">
                    <ArrowLeft size={20} className="mr-2" />
                    Back to Shop
                </Link>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        {/* Image Section */}
                        <div className="p-8 lg:p-12 bg-gray-100 flex items-center justify-center">
                            <div className="relative w-full max-w-md aspect-[3/4] flex items-center justify-center">
                                {product.image_url ? (
                                    <img
                                        src={product.image_url}
                                        alt={product.name}
                                        className="w-full h-full object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="text-gray-400">No Image Available</div>
                                )}
                            </div>
                        </div>

                        {/* Details Section */}
                        <div className="p-8 lg:p-12">
                            <div className="mb-2">
                                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-blue-50 text-blue-700">
                                    {product.subcategory}
                                </span>
                            </div>

                            <h1 className="text-3xl lg:text-4xl font-black text-gray-900 mb-4">{product.name}</h1>

                            <div className="text-3xl font-bold text-primary mb-6">
                                ${product.price}
                            </div>

                            <p className="text-gray-600 text-lg leading-relaxed mb-8">
                                {product.description}
                            </p>

                            {/* Specifications Table */}
                            {specs.length > 0 && (
                                <div className="mb-8">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <Check size={20} className="text-green-500" />
                                        Key Specifications
                                    </h3>
                                    <div className="bg-gray-50 rounded-xl border border-gray-100 overflow-hidden">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <tbody className="divide-y divide-gray-200">
                                                {specs.map((spec, index) => (
                                                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                                                        <td className="px-6 py-4 text-sm font-semibold text-gray-900 w-1/3">
                                                            {spec.label}
                                                        </td>
                                                        <td className="px-6 py-4 text-sm text-gray-600">
                                                            {spec.value}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}

                            {/* Actions */}
                            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-100">
                                <a
                                    href={whatsappLink}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex-1 inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-bold rounded-xl text-white bg-green-600 hover:bg-green-700 transition-all shadow-lg hover:shadow-green-500/30"
                                >
                                    <MessageCircle className="mr-2" size={24} />
                                    Contact Seller
                                </a>
                                <a
                                    href={whatsappLink} // Assuming 'Buy' also leads to manual contact for now
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex-1 inline-flex items-center justify-center px-8 py-4 border-2 border-primary text-lg font-bold rounded-xl text-primary bg-white hover:bg-blue-50 transition-all"
                                >
                                    Buy This Device
                                </a>
                            </div>

                            <div className="mt-6 flex items-center gap-2 text-sm text-gray-500 justify-center sm:justify-start">
                                <Shield size={16} />
                                <span>Verified listing • Safe payment via shop</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
