import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="w-full shadow-lg fixed top-0 left-0 z-10 bg-white ">
            <div className="flex justify-between items-center px-3 h-12">
                <h1 className="text-2xl font-bold">PhotoVault</h1>
                <div className="flex space-x-4">
                    <Link to="/about-us" className="text-gray-700 hover:text-gray-900">About Us</Link>
                    <Link to="/login" className="text-gray-700 hover:text-gray-900">Log In</Link>
                    <Link to="/signup" className="text-gray-700 hover:text-gray-900">Sign Up</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
