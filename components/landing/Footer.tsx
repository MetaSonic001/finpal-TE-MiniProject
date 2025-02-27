'use client';

import { motion } from 'framer-motion';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0d1117] text-white py-20 border-t border-[#1c1c1c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="flex items-center mb-6">
              <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
              <span className="ml-2 text-2xl font-bold">Finsepa</span>
            </div>
            <p className="text-gray-400">
              The all-in-one investment management platform for modern investors.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Product</h4>
            <ul className="space-y-3">
              <li><button className="text-gray-400 hover:text-white transition-colors">Features</button></li>
              <li><button className="text-gray-400 hover:text-white transition-colors">Markets</button></li>
              <li><button className="text-gray-400 hover:text-white transition-colors">Pricing</button></li>
              <li><button className="text-gray-400 hover:text-white transition-colors">Security</button></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-3">
              <li><button className="text-gray-400 hover:text-white transition-colors">Blog</button></li>
              <li><button className="text-gray-400 hover:text-white transition-colors">Help Center</button></li>
              <li><button className="text-gray-400 hover:text-white transition-colors">API</button></li>
              <li><button className="text-gray-400 hover:text-white transition-colors">Status</button></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              <li><button className="text-gray-400 hover:text-white transition-colors">About</button></li>
              <li><button className="text-gray-400 hover:text-white transition-colors">Careers</button></li>
              <li><button className="text-gray-400 hover:text-white transition-colors">Contact</button></li>
              <li><button className="text-gray-400 hover:text-white transition-colors">Press</button></li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[#1c1c1c]">
          <div className="flex space-x-6 mb-4 md:mb-0">
            <button className="text-gray-400 hover:text-white transition-colors">
              <Facebook className="w-5 h-5" />
            </button>
            <button className="text-gray-400 hover:text-white transition-colors">
              <Twitter className="w-5 h-5" />
            </button>
            <button className="text-gray-400 hover:text-white transition-colors">
              <Linkedin className="w-5 h-5" />
            </button>
            <button className="text-gray-400 hover:text-white transition-colors">
              <Instagram className="w-5 h-5" />
            </button>
          </div>
          
          <div className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Finsepa. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}