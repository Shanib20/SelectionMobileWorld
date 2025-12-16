import React, { useState } from 'react';
import { Menu, X, Smartphone, Headphones, Wrench, MoreHorizontal, ShoppingCart, Users } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showOrderModal, setShowOrderModal] = useState(false);
    const navigate = useNavigate();

    const navItems = [
        {
            name: 'Accessories',
            icon: <Headphones size={18} />,
            subItems: [],
            isDirectLink: true,
            path: '/accessories',
            type: 'link'
        },
        {
            name: 'Lifestyle',
            icon: <Smartphone size={18} />,
            subItems: [],
            isDirectLink: true,
            path: '/lifestyle',
            type: 'link'
        },
        {
            name: 'About Us',
            icon: <Users size={18} />,
            subItems: [],
            isDirectLink: true,
            path: '/#about-us',
            id: 'about-us',
            type: 'scroll'
        }
    ];

    const handleNavigation = (item) => {
        setIsOpen(false);
        if (item.type === 'link') {
            navigate(item.path);
        } else if (item.type === 'scroll') {
            const scrollToTarget = () => {
                if (item.id === 'root') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                    const element = document.getElementById(item.id);
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                }
            };

            if (window.location.pathname !== '/') {
                navigate('/');
                setTimeout(scrollToTarget, 100);
            } else {
                scrollToTarget();
            }
        }
    };

    return (
        <>
            <nav className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl sticky top-0 z-40 border-b border-gray-100 dark:border-slate-800 shadow-sm transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        {/* Logo */}
                        <div className="flex-shrink-0 flex items-center">
                            <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-xl md:text-2xl font-black bg-gradient-to-r from-blue-700 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent tracking-tight uppercase">
                                Selection Mobile World
                            </Link>
                        </div>

                        {/* Desktop Nav */}
                        <div className="hidden md:flex items-center space-x-6">
                            <button onClick={() => handleNavigation({ type: 'scroll', id: 'root' })} className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-semibold transition-colors">Home</button>
                            {navItems.map((item) => (
                                item.isDirectLink ? (
                                    <button
                                        key={item.name}
                                        onClick={() => handleNavigation(item)}
                                        className="flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-semibold transition-colors py-2"
                                    >
                                        {item.icon}
                                        <span className="ml-2">{item.name}</span>
                                    </button>
                                ) : (
                                    <div key={item.name} className="relative group">
                                        <button className="flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-semibold transition-colors py-2">
                                            {item.icon}
                                            <span className="ml-2">{item.name}</span>
                                        </button>
                                        <div className="absolute top-full left-0 w-56 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-700 py-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50">
                                            {item.subItems.map((sub) => (
                                                <button
                                                    key={sub.label}
                                                    onClick={() => handleNavigation(sub)}
                                                    className="block w-full text-left px-5 py-2.5 text-sm text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400 font-medium"
                                                >
                                                    {sub.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )
                            ))}

                            <div className="h-6 w-px bg-gray-200 dark:bg-slate-700 mx-2"></div>

                            <ThemeToggle />

                            <button
                                onClick={() => setShowOrderModal(true)}
                                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2.5 rounded-full font-bold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all text-sm flex items-center gap-2"
                            >
                                <ShoppingCart size={16} />
                                Request Item
                            </button>
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden flex items-center gap-4">
                            <ThemeToggle />
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="text-gray-700 dark:text-gray-200 hover:text-blue-600 p-2"
                            >
                                {isOpen ? <X size={28} /> : <Menu size={28} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu Overlay & Drawer */}
                <div className={`md:hidden fixed inset-0 z-50 transition-all duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)}></div>

                    {/* Drawer */}
                    <div className={`absolute top-0 right-0 w-[75%] max-w-sm h-full bg-white dark:bg-slate-900 shadow-2xl transform transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                        <div className="flex flex-col h-full">
                            {/* Drawer Header */}
                            <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-slate-800">
                                <span className="text-lg font-black text-gray-900 dark:text-white uppercase tracking-tight">Menu</span>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 text-gray-500 hover:text-red-500 transition-colors bg-gray-50 dark:bg-slate-800 rounded-full"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Scrollable Content */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-2">
                                <button
                                    onClick={() => handleNavigation({ type: 'scroll', id: 'root' })}
                                    className="block w-full text-left px-4 py-3 rounded-xl text-base font-bold text-gray-800 dark:text-white hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-600 transition-colors"
                                >
                                    Home
                                </button>

                                {navItems.map((item) => (
                                    <div key={item.name} className="border-b border-gray-50 dark:border-slate-800/50 last:border-0 pb-2">
                                        {item.isDirectLink ? (
                                            <button
                                                onClick={() => handleNavigation(item)}
                                                className="w-full text-left px-4 py-3 text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-600 rounded-lg transition-colors"
                                            >
                                                {item.icon}
                                                <span className="ml-3">{item.name}</span>
                                            </button>
                                        ) : (
                                            <>
                                                <div className="px-4 py-2 text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider flex items-center mt-2">
                                                    {item.icon}
                                                    <span className="ml-3">{item.name}</span>
                                                </div>
                                                <div className="space-y-1 pl-4 mt-1">
                                                    {item.subItems.map((sub) => (
                                                        <button
                                                            key={sub.label}
                                                            onClick={() => handleNavigation(sub)}
                                                            className="block w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-600 transition-colors border-l-2 border-transparent hover:border-blue-600"
                                                        >
                                                            {sub.label}
                                                        </button>
                                                    ))}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Footer / CTA */}
                            <div className="p-5 border-t border-gray-100 dark:border-slate-800 bg-gray-50 dark:bg-slate-900/50">
                                <button
                                    onClick={() => { setIsOpen(false); setShowOrderModal(true); }}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-blue-500/20 active:scale-95 transition-all flex items-center justify-center gap-2"
                                >
                                    <ShoppingCart size={18} />
                                    Request Item
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Order Modal */}
            {showOrderModal && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <OrderRequestForm onClose={() => setShowOrderModal(false)} />
                </div>
            )}
        </>
    );
};

export default Navbar;
