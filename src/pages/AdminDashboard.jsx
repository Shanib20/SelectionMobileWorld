import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import { Plus, Edit, Trash2, LogOut, Check, X, Search, Filter } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import ProductForm from '../components/ProductForm';

const AdminDashboard = () => {
    const [products, setProducts] = useState([]);
    const [requests, setRequests] = useState([]);
    const [orders, setOrders] = useState([]);
    const [activeTab, setActiveTab] = useState('products');
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const { signOut } = useAuth();

    useEffect(() => {
        fetchProducts();
        fetchRequests();
        fetchOrders();
    }, []);

    const fetchProducts = async () => {
        try {
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setProducts(data || []);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchRequests = async () => {
        try {
            const { data, error } = await supabase
                .from('sell_requests')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setRequests(data || []);
        } catch (error) {
            console.error('Error fetching requests:', error);
        }
    };

    const fetchOrders = async () => {
        try {
            const { data, error } = await supabase
                .from('item_requests')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setOrders(data || []);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return;

        try {
            const { error } = await supabase.from('products').delete().eq('id', id);
            if (error) throw error;
            fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
            alert('Error deleting product');
        }
    };

    const handleDeleteRequest = async (id) => {
        if (!window.confirm('Delete this request?')) return;
        try {
            const { error } = await supabase.from('sell_requests').delete().eq('id', id);
            if (error) throw error;
            fetchRequests();
        } catch (error) {
            console.error('Error deleting request:', error);
        }
    };

    const handleDeleteOrder = async (id) => {
        if (!window.confirm('Delete this order request?')) return;
        try {
            await supabase.from('item_requests').delete().eq('id', id);
            fetchOrders();
        } catch (error) {
            console.error('Error deleting order:', error);
        }
    };

    const handleUpdateStatus = async (id, newStatus) => {
        try {
            const { error } = await supabase
                .from('sell_requests')
                .update({ status: newStatus })
                .eq('id', id);

            if (error) throw error;
            fetchRequests();
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Failed to update status');
        }
    };

    const handleUpdateOrderStatus = async (id, newStatus) => {
        try {
            const { error } = await supabase
                .from('item_requests')
                .update({ status: newStatus })
                .eq('id', id);

            if (error) throw error;
            fetchOrders();
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setShowForm(true);
    };

    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('all');
    const [filterSubcategory, setFilterSubcategory] = useState('all');

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
        const matchesSubcategory = filterSubcategory === 'all' || product.subcategory === filterSubcategory;

        return matchesSearch && matchesCategory && matchesSubcategory;
    });

    const uniqueSubcategories = [...new Set(products
        .filter(p => filterCategory === 'all' || p.category === filterCategory)
        .map(p => p.subcategory)
        .filter(Boolean)
    )];

    const handleFormClose = () => {
        setShowForm(false);
        setEditingProduct(null);
        fetchProducts();
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>

                    <div className="flex flex-wrap gap-4 items-center">
                        <div className="flex bg-gray-200 rounded-lg p-1">
                            <button
                                onClick={() => setActiveTab('products')}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'products' ? 'bg-white shadow text-gray-900' : 'text-gray-600 hover:text-gray-800'}`}
                            >
                                Inventory
                            </button>
                            <button
                                onClick={() => setActiveTab('requests')}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'requests' ? 'bg-white shadow text-gray-900' : 'text-gray-600 hover:text-gray-800'}`}
                            >
                                Sell Requests
                            </button>
                            <button
                                onClick={() => setActiveTab('orders')}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'orders' ? 'bg-white shadow text-gray-900' : 'text-gray-600 hover:text-gray-800'}`}
                            >
                                Special Orders
                            </button>
                        </div>

                        <button
                            onClick={() => { setEditingProduct(null); setShowForm(true); }}
                            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                        >
                            <Plus size={20} className="mr-2" />
                            Add Product
                        </button>
                        <button
                            onClick={() => signOut()}
                            className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                        >
                            <LogOut size={20} className="mr-2" />
                            Sign Out
                        </button>
                    </div>
                </div>

                {/* Product Form Modal */}
                {showForm && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                        <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            <ProductForm
                                product={editingProduct}
                                onClose={handleFormClose}
                            />
                        </div>
                    </div>
                )}

                {/* Content Area */}
                {activeTab === 'products' ? (
                    <div className="space-y-4">
                        {/* Search and Filters */}
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4">
                            <div className="relative flex-grow">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder="Search products by name..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="flex gap-2">
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Filter className="h-4 w-4 text-gray-400" />
                                    </div>
                                    <select
                                        className="pl-9 pr-8 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm capitalize"
                                        value={filterCategory}
                                        onChange={(e) => { setFilterCategory(e.target.value); setFilterSubcategory('all'); }}
                                    >
                                        <option value="all">All Categories</option>
                                        <option value="mobile">Mobiles</option>
                                        <option value="accessory">Accessories</option>
                                        <option value="lifestyle">Lifestyle</option>
                                        <option value="service">Services</option>
                                    </select>
                                </div>
                                <select
                                    className="pl-3 pr-8 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm max-w-[150px]"
                                    value={filterSubcategory}
                                    onChange={(e) => setFilterSubcategory(e.target.value)}
                                >
                                    <option value="all">All Sub-types</option>
                                    {uniqueSubcategories.map(sub => (
                                        <option key={sub} value={sub}>{sub}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="bg-white shadow overflow-hidden sm:rounded-md">
                            {loading ? (
                                <div className="p-8 text-center text-gray-500">Loading products...</div>
                            ) : filteredProducts.length === 0 ? (
                                <div className="p-8 text-center text-gray-500">
                                    {products.length === 0 ? "No products found. Add some!" : "No items match your search."}
                                </div>
                            ) : (
                                <ul className="divide-y divide-gray-200">
                                    {filteredProducts.map((product) => (
                                        <li key={product.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50">
                                            <div className="flex items-center">
                                                {product.image_url && (
                                                    <img className="h-12 w-12 rounded-full object-cover mr-4" src={product.image_url} alt={product.name} />
                                                )}
                                                <div>
                                                    <h4 className="text-lg font-medium text-gray-900">{product.name}</h4>
                                                    <p className="text-sm text-gray-500">
                                                        <span className="capitalize">{product.category}</span> - {product.subcategory} |
                                                        <span className="ml-1 font-semibold text-green-600">${product.price}</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => handleEdit(product)}
                                                    className="p-2 text-blue-600 hover:text-blue-800"
                                                >
                                                    <Edit size={20} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(product.id)}
                                                    className="p-2 text-red-600 hover:text-red-800"
                                                >
                                                    <Trash2 size={20} />
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                ) : activeTab === 'requests' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {requests.length === 0 ? (
                            <div className="col-span-full text-center py-12 text-gray-500 bg-white rounded-xl shadow-sm">
                                <p>No sell requests received yet.</p>
                            </div>
                        ) : requests.map(req => (
                            <div key={req.id} className="bg-white rounded-xl p-6 shadow-md border border-gray-100 relative hover:shadow-lg transition-shadow">
                                <button
                                    onClick={() => handleDeleteRequest(req.id)}
                                    className="absolute top-4 right-4 text-red-300 hover:text-red-600 transition-colors p-1"
                                    title="Delete Request"
                                >
                                    <Trash2 size={18} />
                                </button>

                                <h3 className="font-bold text-xl text-gray-900 mb-1">{req.phone_name}</h3>
                                <p className="text-gray-500 text-sm mb-4">Manufacture Year: <span className="font-semibold text-gray-700">{req.year}</span></p>

                                <div className="bg-blue-50 p-4 rounded-lg mb-4 text-sm border border-blue-100">
                                    <p className="font-semibold text-blue-900 mb-1">Contact Details</p>
                                    <p className="text-blue-800 text-lg">{req.contact_number}</p>
                                </div>

                                <div className="mb-4 space-y-3">
                                    <div>
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Condition / Faults</p>
                                        <p className="text-gray-700 text-sm bg-gray-50 p-2 rounded">{req.details}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Specs</p>
                                        <p className="text-gray-700 text-sm bg-gray-50 p-2 rounded">{req.specifications}</p>
                                    </div>
                                </div>

                                {req.images && req.images.length > 0 && (
                                    <div>
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Attached Images</p>
                                        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                                            {req.images.map((img, i) => (
                                                <a key={i} href={img} target="_blank" rel="noreferrer" className="flex-shrink-0">
                                                    <img src={img} className="w-16 h-16 rounded-lg border border-gray-200 object-cover hover:opacity-80 transition-opacity" />
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center text-xs">
                                    <span>{new Date(req.created_at).toLocaleDateString()}</span>
                                    {req.status === 'pending' ? (
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleUpdateStatus(req.id, 'accepted')}
                                                className="p-1 bg-green-100 text-green-700 rounded hover:bg-green-200"
                                                title="Accept"
                                            >
                                                <Check size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleUpdateStatus(req.id, 'rejected')}
                                                className="p-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
                                                title="Reject"
                                            >
                                                <X size={16} />
                                            </button>
                                        </div>
                                    ) : (
                                        <span className={`capitalize px-2 py-1 rounded-full text-xs font-medium ${req.status === 'accepted' ? 'bg-green-100 text-green-800' :
                                            req.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {req.status}
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {orders.length === 0 ? (
                            <div className="col-span-full text-center py-12 text-gray-500 bg-white rounded-xl shadow-sm">
                                <p>No special orders received yet.</p>
                            </div>
                        ) : orders.map(order => (
                            <div key={order.id} className="bg-white rounded-xl p-6 shadow-md border border-gray-100 relative hover:shadow-lg transition-shadow">
                                <button
                                    onClick={() => handleDeleteOrder(order.id)}
                                    className="absolute top-4 right-4 text-red-300 hover:text-red-600 transition-colors p-1"
                                    title="Delete Order"
                                >
                                    <Trash2 size={18} />
                                </button>

                                <h3 className="font-bold text-xl text-gray-900 mb-1">{order.item_name}</h3>

                                {order.image_url && (
                                    <div className="my-3">
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Reference Image</p>
                                        <a href={order.image_url} target="_blank" rel="noreferrer">
                                            <img src={order.image_url} alt="Order Reference" className="w-full h-32 object-contain bg-gray-50 rounded-lg border border-gray-200" />
                                        </a>
                                    </div>
                                )}

                                <div className="bg-indigo-50 p-4 rounded-lg mb-4 text-sm border border-indigo-100 mt-3">
                                    <p className="font-semibold text-indigo-900 mb-1">Customer Contact</p>
                                    <p className="text-indigo-800 text-lg">{order.contact_number}</p>
                                </div>

                                <div className="mb-4">
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Preferences / Details</p>
                                    <p className="text-gray-700 text-sm bg-gray-50 p-3 rounded-lg border border-gray-100">{order.details}</p>
                                </div>

                                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center text-xs">
                                    <span>{new Date(order.created_at).toLocaleDateString()}</span>
                                    {order.status === 'pending' ? (
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleUpdateOrderStatus(order.id, 'accepted')}
                                                className="px-3 py-1 bg-green-100 text-green-700 rounded-full font-medium hover:bg-green-200"
                                            >
                                                Accept Order
                                            </button>
                                            <button
                                                onClick={() => handleUpdateOrderStatus(order.id, 'rejected')}
                                                className="px-3 py-1 bg-red-100 text-red-700 rounded-full font-medium hover:bg-red-200"
                                            >
                                                Reject
                                            </button>
                                        </div>
                                    ) : (
                                        <span className={`capitalize px-3 py-1 rounded-full text-xs font-bold ${order.status === 'accepted' ? 'bg-green-100 text-green-800' :
                                            order.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {order.status}
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
