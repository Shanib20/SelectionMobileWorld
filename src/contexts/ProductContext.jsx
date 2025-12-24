import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabase';

// Mock Data for fallback
const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setError(null);
            const { data, error: supabaseError } = await supabase
                .from('products')
                .select('*')
                .order('created_at', { ascending: false });

            if (supabaseError) throw supabaseError;

            setProducts(data || []);
        } catch (err) {
            console.error('Error fetching products:', err);
            setError(err.message || 'Failed to fetch products');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ProductContext.Provider value={{ products, loading, error, fetchProducts }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProducts = () => {
    return useContext(ProductContext);
};
