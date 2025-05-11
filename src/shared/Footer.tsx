import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-10">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {/* Logo / Title Section */}
                <div>
                    <h1 className="text-2xl font-bold mb-4">DermaXpert</h1>
                    <p className="text-gray-400">Your trusted source for information and services.</p>
                </div>

                {/* Navigation Links */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-blue-400 transition">About</a></li>
                        <li><a href="#" className="hover:text-blue-400 transition">Contact</a></li>
                        <li><a href="#" className="hover:text-blue-400 transition">Privacy Policy</a></li>
                        <li><a href="#" className="hover:text-blue-400 transition">Terms of Service</a></li>
                        <li><a href="#" className="hover:text-blue-400 transition">Help</a></li>
                        <li><a href="#" className="hover:text-blue-400 transition">FAQ</a></li>
                    </ul>
                </div>

                {/* Social Media Links */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">Follow Us</h2>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-blue-400 transition">Facebook</a></li>
                        <li><a href="#" className="hover:text-blue-400 transition">Twitter</a></li>
                        <li><a href="#" className="hover:text-blue-400 transition">Instagram</a></li>
                        <li><a href="#" className="hover:text-blue-400 transition">LinkedIn</a></li>
                    </ul>
                </div>
            </div>

            {/* Bottom Footer */}
            <div className="mt-10 text-center text-gray-500 text-sm">
                © {new Date().getFullYear()} Website. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
