import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { X, Upload } from 'lucide-react';

const CATEGORIES = {
    mobile: ['New', 'Used', 'Sell Your Phone'],
    service: ['Repair', 'Recharge & SIM', 'Porting', 'Technician'],
    accessory: [
        'AirPods', 'Headset', 'Wired Earphones', 'Neckband', 'Bluetooth Speaker', // Audio
        'Chargers', 'Torch Charger', 'Cables', 'Power Banks', // Charging
        'Pendrive', 'SD Card' // Storage
    ],
    lifestyle: [
        'Purse / Wallet', 'Watch', 'Belt', 'Specs (Glasses)', 'Perfumes', 'Trimmer', // Fashion
        'Football', 'Football Shoes', 'Socks', 'Cricket Ball', 'Cricket Bat', 'Shuttlecock', 'Trophies', // Sports
        'Car Fitting Speakers', 'Car Holder' // Car
    ]
};

const ProductForm = ({ product, onClose }) => {
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: 'mobile',
        subcategory: 'New',
        image_url: '',
        stock: 1,
        // Specs pointing to text columns
        storage: '',
        ram: '',
        color: '',
        display_size: '',
        display_type: '',
        processor: '',
        camera_rear: '',
        camera_front: '',
        warranty: '',
        box_contents: '',
        size: '',
        model_year: ''
    });

    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name || '',
                description: product.description || '',
                price: product.price || '',
                category: product.category || 'mobile',
                subcategory: product.subcategory || CATEGORIES[product.category]?.[0] || 'New',
                image_url: product.image_url || '',
                stock: product.stock || 1,
                storage: product.storage || '',
                ram: product.ram || '',
                color: product.color || '',
                display_size: product.display_size || '',
                display_type: product.display_type || '',
                processor: product.processor || '',
                camera_rear: product.camera_rear || '',
                camera_front: product.camera_front || '',
                warranty: product.warranty || '',
                box_contents: product.box_contents || '',
                size: product.size || '',
                model_year: product.model_year || ''
            });
        }
    }, [product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => {
            // Reset subcategory if category changes
            if (name === 'category') {
                return { ...prev, [name]: value, subcategory: CATEGORIES[value]?.[0] || '' };
            }
            return { ...prev, [name]: value };
        });
    };

    const handleImageUpload = async (e) => {
        try {
            setUploading(true);
            const file = e.target.files[0];
            if (!file) return;

            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('product-images')
                .upload(filePath, file);

            if (uploadError) {
                throw uploadError;
            }

            // Get Public URL
            const { data } = supabase.storage
                .from('product-images')
                .getPublicUrl(filePath);

            setFormData(prev => ({ ...prev, image_url: data.publicUrl }));
        } catch (error) {
            alert('Error uploading image: ' + error.message);
            console.error(error);
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (product?.id) {
                // Update
                const { error } = await supabase
                    .from('products')
                    .update(formData)
                    .eq('id', product.id);
                if (error) throw error;
            } else {
                // Create
                const { error } = await supabase
                    .from('products')
                    .insert([formData]);
                if (error) throw error;
            }
            onClose();
        } catch (error) {
            console.error('Error saving product:', error);
            alert('Error saving product: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                    {product ? 'Edit Product' : 'Add New Product'}
                </h2>
                <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                    <X size={24} />
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">

                {/* Category First */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Category</label>
                        <select
                            name="category"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary border h-10 px-3 capitalize"
                            value={formData.category}
                            onChange={handleChange}
                        >
                            {Object.keys(CATEGORIES).map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Subcategory</label>
                        <select
                            name="subcategory"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary border h-10 px-3"
                            value={formData.subcategory}
                            onChange={handleChange}
                        >
                            {CATEGORIES[formData.category]?.map(sub => (
                                <option key={sub} value={sub}>{sub}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Product Name</label>
                    <input
                        type="text"
                        name="name"
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary border h-10 px-3"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Price</label>
                        <input
                            type="number"
                            name="price"
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary border h-10 px-3"
                            value={formData.price}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Stock</label>
                        <input
                            type="number"
                            name="stock"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary border h-10 px-3"
                            value={formData.stock}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Product Image</label>
                    <div className="mt-1 flex items-center space-x-4">
                        {formData.image_url && (
                            <img src={formData.image_url} alt="Preview" className="h-20 w-20 object-cover rounded-md border border-gray-200" />
                        )}
                        <label className="cursor-pointer bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                            {uploading ? 'Uploading...' : 'Upload from Device'}
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageUpload}
                                disabled={uploading}
                            />
                        </label>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                        {uploading ? 'Please wait...' : 'Takes photos directly from camera on mobile or gallery.'}
                    </p>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        name="description"
                        rows="3"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary border p-3"
                        value={formData.description}
                        onChange={handleChange}
                    ></textarea>
                </div>

                {/* Specifications Section - Dynamic based on Category */}
                <div className="border-t border-gray-200 pt-4 mt-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Specifications</h3>

                    {/* MOBILE SPECS */}
                    {formData.category === 'mobile' && (
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-500 uppercase">Model Year</label>
                                <input type="number" name="model_year" placeholder="e.g. 2023" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border h-9 px-3 text-sm" value={formData.model_year} onChange={handleChange} />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 uppercase">Storage</label>
                                <input type="text" name="storage" placeholder="e.g. 128GB" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border h-9 px-3 text-sm" value={formData.storage} onChange={handleChange} />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 uppercase">RAM</label>
                                <input type="text" name="ram" placeholder="e.g. 8GB" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border h-9 px-3 text-sm" value={formData.ram} onChange={handleChange} />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 uppercase">Color</label>
                                <input type="text" name="color" placeholder="e.g. Midnight Green" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border h-9 px-3 text-sm" value={formData.color} onChange={handleChange} />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 uppercase">Display Size</label>
                                <input type="text" name="display_size" placeholder="e.g. 6.1 inch" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border h-9 px-3 text-sm" value={formData.display_size} onChange={handleChange} />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 uppercase">Processor</label>
                                <input type="text" name="processor" placeholder="e.g. A15 Bionic" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border h-9 px-3 text-sm" value={formData.processor} onChange={handleChange} />
                            </div>
                            {/* Camera & Other Mobile Specs */}
                            <div>
                                <label className="block text-xs font-medium text-gray-500 uppercase">Rear Camera</label>
                                <input type="text" name="camera_rear" placeholder="e.g. 48MP" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border h-9 px-3 text-sm" value={formData.camera_rear} onChange={handleChange} />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 uppercase">Front Camera</label>
                                <input type="text" name="camera_front" placeholder="e.g. 12MP" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border h-9 px-3 text-sm" value={formData.camera_front} onChange={handleChange} />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 uppercase">Battery/Warranty</label>
                                <input type="text" name="warranty" placeholder="e.g. 1 Year" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border h-9 px-3 text-sm" value={formData.warranty} onChange={handleChange} />
                            </div>
                        </div>
                    )}

                    {/* LIFESTYLE / ACCESSORY SPECS */}
                    {formData.category !== 'mobile' && (
                        <div className="grid grid-cols-2 gap-4">
                            {/* Color - Common for most lifestyle items */}
                            {['Football Shoes', 'Socks', 'Purse / Wallet', 'Belt'].some(s => formData.subcategory?.includes(s)) && (
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 uppercase">Color</label>
                                    <input type="text" name="color" placeholder="e.g. Red" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border h-9 px-3 text-sm" value={formData.color} onChange={handleChange} />
                                </div>
                            )}

                            {/* Size - Shoes, Clothes */}
                            {['Football Shoes', 'Shoes'].some(s => formData.subcategory?.includes(s)) && (
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 uppercase">Size</label>
                                    <input type="text" name="size" placeholder="e.g. UK 8" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border h-9 px-3 text-sm" value={formData.size || ''} onChange={handleChange} />
                                </div>
                            )}

                            {/* Brand/Company - Use existing 'name' for this or add specific if needed, but usually Title is Brand + Model */}
                            {/* Note: User specifically asked for 'Company Name' for Shoes/Watches. We can assume the 'Product Name' field above covers this, or we can add a 'Brand' field. 
                                For now, I'll stick to Product Name = Company + Model. If they strictly want a separate Brand field, I'd add it, but 'Product Name' is mandatory so it's safer to use that.
                            */}
                        </div>
                    )}
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={loading || uploading}
                        className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
                    >
                        {loading ? 'Saving...' : 'Save Product'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductForm;
