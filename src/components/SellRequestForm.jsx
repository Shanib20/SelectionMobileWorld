import React, { useState } from 'react';
import { supabase } from '../supabase';
import { Upload, X, CheckCircle } from 'lucide-react';

const SellRequestForm = () => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(''); // New error state
    const [images, setImages] = useState([]); // Array of strings (urls)
    const [formData, setFormData] = useState({
        phone_name: '',
        year: '',
        details: '',
        specifications: '',
        contact_number: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrorMessage(''); // Clear error on change
    };

    const handleImageUpload = async (e) => {
        setErrorMessage('');
        if (images.length >= 4) {
            alert("Maximum 4 images allowed");
            return;
        }

        try {
            setUploading(true);
            const file = e.target.files[0];
            if (!file) return;

            const fileExt = file.name.split('.').pop();
            const fileName = `sell_${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            console.log('Uploading image...', filePath);
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

            setImages(prev => [...prev, data.publicUrl]);

        } catch (error) {
            console.error('Image Upload Catch:', error);
            setErrorMessage('Error uploading image: ' + (error.message || JSON.stringify(error)));
        } finally {
            setUploading(false);
        }
    };

    const handleRemoveImage = (index) => {
        setImages(images.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage('');
        console.log('Submitting form...', formData);

        try {
            const { error, data } = await supabase
                .from('sell_requests')
                .insert([{
                    ...formData,
                    images: images,
                    status: 'pending'
                }])
                .select();

            if (error) {
                console.error('Insert Error:', error);
                throw error;
            }

            console.log('Success:', data);
            setSuccess(true);
        } catch (error) {
            console.error('Submission Catch:', error);
            setErrorMessage('Failed to submit: ' + (error.message || JSON.stringify(error)));
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="bg-green-50 rounded-xl p-8 text-center max-w-2xl mx-auto border border-green-100">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-green-900 mb-2">Request Submitted!</h3>
                <p className="text-green-700">
                    Thank you for submitting your details. Our shop staff will review your phone and contact you at {formData.contact_number} shortly.
                </p>
                <button
                    onClick={() => { setSuccess(false); setImages([]); setFormData({ phone_name: '', year: '', details: '', specifications: '', contact_number: '' }); }}
                    className="mt-6 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                    Submit Another
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-primary px-8 py-6 text-white">
                <h2 className="text-2xl font-bold">Sell Your Phone</h2>
                <p className="text-blue-100 mt-1">Fill in the details below and we'll offer you the best price.</p>
            </div>

            {errorMessage && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 m-8 mb-0">
                    <p className="text-red-700 font-medium">Something went wrong:</p>
                    <p className="text-red-600 text-sm">{errorMessage}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Model Name</label>
                        <input
                            type="text"
                            name="phone_name"
                            required
                            placeholder="e.g. iPhone 13 Pro"
                            className="w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary border p-2.5"
                            value={formData.phone_name}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Year of Manufacture</label>
                        <input
                            type="text"
                            name="year"
                            placeholder="e.g. 2021"
                            className="w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary border p-2.5"
                            value={formData.year}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Known Complaints / Condition</label>
                    <textarea
                        name="details"
                        required
                        rows="3"
                        placeholder="Any scratches, screen damage, battery health, etc."
                        className="w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary border p-2.5"
                        value={formData.details}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Specifications (RAM/Storage/Color)</label>
                    <textarea
                        name="specifications"
                        rows="2"
                        placeholder="e.g. 128GB, Blue Color, 8GB RAM"
                        className="w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary border p-2.5"
                        value={formData.specifications}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Contact Number</label>
                    <input
                        type="tel"
                        name="contact_number"
                        required
                        placeholder="Mobile Number"
                        className="w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary border p-2.5"
                        value={formData.contact_number}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Upload Images (Max 4)</label>
                    <div className="flex flex-wrap gap-4">
                        {images.map((img, index) => (
                            <div key={index} className="relative w-24 h-24 rounded-lg overflow-hidden border border-gray-200 group">
                                <img src={img} alt="Uploaded" className="w-full h-full object-cover" />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveImage(index)}
                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <X size={12} />
                                </button>
                            </div>
                        ))}

                        {images.length < 4 && (
                            <label className="w-24 h-24 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary hover:bg-blue-50 transition-colors">
                                <Upload className="text-gray-400 mb-1" size={20} />
                                <span className="text-xs text-gray-500">{uploading ? '...' : 'Add'}</span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImageUpload}
                                    disabled={uploading}
                                />
                            </label>
                        )}
                    </div>
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={loading || uploading}
                        className="w-full bg-primary text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50"
                    >
                        {loading ? 'Submitting Request...' : 'Submit Sell Request'}
                    </button>
                    <p className="text-xs text-gray-500 text-center mt-3">We typically respond within 24 hours.</p>
                </div>
            </form>
        </div>
    );
};

export default SellRequestForm;
