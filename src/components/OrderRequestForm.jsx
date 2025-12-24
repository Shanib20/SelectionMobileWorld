import React, { useState } from 'react';
import { supabase } from '../supabase';
import { ShoppingBag, X, Send, Image as ImageIcon, Loader } from 'lucide-react';

const OrderRequestForm = ({ onClose }) => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState(''); // New error state
    const [imageFile, setImageFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [formData, setFormData] = useState({
        item_name: '',
        details: '',
        contact_number: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrorMessage('');
    };

    const handleImageChange = (e) => {
        setErrorMessage('');
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const uploadImage = async (file) => {
        console.log('Uploading order image...');
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `order-requests/${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('product-images')
            .upload(filePath, file);

        if (uploadError) {
            console.error('Upload Error:', uploadError);
            throw uploadError;
        }

        const { data } = supabase.storage
            .from('product-images')
            .getPublicUrl(filePath);

        return data.publicUrl;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage('');
        console.log('Submitting Order Request...', formData);

        try {
            let imageUrl = null;
            if (imageFile) {
                imageUrl = await uploadImage(imageFile);
            }

            const { error, data } = await supabase
                .from('item_requests')
                .insert([{
                    ...formData,
                    image_url: imageUrl,
                    status: 'pending'
                }])
                .select();

            if (error) {
                console.error('Insert Error:', error);
                throw error;
            }

            console.log('Order Success:', data);
            setSuccess(true);
        } catch (error) {
            console.error('Order Submit Catch:', error);
            setErrorMessage('Failed to submit: ' + (error.message || JSON.stringify(error)));
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full text-center relative mx-4">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><X /></button>
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send size={32} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Request Sent!</h3>
                <p className="text-gray-600 mb-6">
                    We've received your request for <strong>{formData.item_name}</strong>. We'll check availability and contact you at {formData.contact_number}.
                </p>
                <button
                    onClick={onClose}
                    className="w-full py-3 bg-gray-100 text-gray-800 font-semibold rounded-xl hover:bg-gray-200 transition"
                >
                    Close
                </button>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden relative">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
                <button onClick={onClose} className="absolute top-6 right-6 text-white/80 hover:text-white"><X /></button>
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    <ShoppingBag className="text-yellow-300" />
                    Request Item
                </h2>
                <p className="text-blue-100 mt-2 text-sm">Upload a pic of what you need & we'll convert it to an order!</p>
            </div>

            {errorMessage && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 m-6 mb-0">
                    <p className="text-red-700 font-medium">Error:</p>
                    <p className="text-red-600 text-xs break-words">{errorMessage}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Item Name</label>
                    <input
                        type="text"
                        name="item_name"
                        required
                        placeholder="e.g. Samsung S24 Ultra Black"
                        className="w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-blue-500 transition-all p-3"
                        value={formData.item_name}
                        onChange={handleChange}
                    />
                </div>

                {/* Image Upload */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Upload Image (Optional)</label>
                    <div className="flex items-center justify-center w-full">
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                            {previewUrl ? (
                                <img src={previewUrl} alt="Preview" className="h-full object-contain" />
                            ) : (
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <ImageIcon className="w-8 h-8 text-gray-400 mb-2" />
                                    <p className="text-sm text-gray-500">Click to upload image</p>
                                </div>
                            )}
                            <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                        </label>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Details / Preference</label>
                    <textarea
                        name="details"
                        rows="2"
                        placeholder="Specific color, storage, or brand..."
                        className="w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-blue-500 transition-all p-3"
                        value={formData.details}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Your Mobile Number</label>
                    <input
                        type="tel"
                        name="contact_number"
                        required
                        placeholder="So we can update you"
                        className="w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-blue-500 transition-all p-3"
                        value={formData.contact_number}
                        onChange={handleChange}
                    />
                </div>

                <div className="pt-2">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white font-bold py-3.5 rounded-xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/30 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {loading ? 'Uploading Request...' : 'Send Request'}
                        {loading ? <Loader className="animate-spin" size={18} /> : <Send size={18} />}
                    </button>
                    <p className="text-xs text-center text-gray-400 mt-3">We usually arrange items within 2-3 days.</p>
                </div>
            </form>
        </div>
    );
};

export default OrderRequestForm;
