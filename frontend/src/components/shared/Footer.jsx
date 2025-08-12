import React from "react";
import {  MapPin,  CheckCircle, Star,  Facebook, Twitter, Linkedin, Instagram, Mail, Phone } from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    'Find Jobs',
    'Post a Job',
    'Companies',
    'Candidates',
    'Pricing'
  ];

  const supportLinks = [
    'Help Center',
    'Privacy Policy',
    'Terms of Service',
    'Contact Us',
    'FAQ'
  ];

  const socialIcons = [
    { icon: <Facebook className="h-5 w-5" />, color: 'hover:bg-blue-600' },
    { icon: <Twitter className="h-5 w-5" />, color: 'hover:bg-blue-400' },
    { icon: <Linkedin className="h-5 w-5" />, color: 'hover:bg-blue-700' },
    { icon: <Instagram className="h-5 w-5" />, color: 'hover:bg-teal-500' }
  ];

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-600 rounded-full"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-teal-400 rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-blue-600 rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        {/* Top Section - Newsletter */}
        <div className="bg-gray-800 rounded-3xl p-8 mb-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Stay Updated</h3>
              <p className="text-gray-300">Get the latest job opportunities delivered to your inbox</p>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-80 px-6 py-4 rounded-xl bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <button className="bg-teal-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-teal-700 transition-all shadow-lg hover:shadow-xl whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Company Info - Enhanced */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative">
                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-black text-2xl">J</span>
                </div>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-teal-400 rounded-full"></div>
              </div>
              <div>
                <span className="text-3xl font-black text-white">JobBox</span>
                <div className="text-teal-400 font-bold text-sm uppercase tracking-wide">Career Platform</div>
              </div>
            </div>
            
            <p className="text-gray-300 mb-8 text-lg leading-relaxed max-w-md">
              Connecting talented professionals with amazing opportunities. 
              Your next career breakthrough starts here.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 text-gray-300">
                <Mail className="h-5 w-5 text-teal-400" />
                <span>hello@jobbox.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Phone className="h-5 w-5 text-teal-400" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <MapPin className="h-5 w-5 text-teal-400" />
                <span>San Francisco, CA</span>
              </div>
            </div>

            {/* Social Icons - Unique Design */}
            <div className="flex space-x-4">
              {socialIcons.map((social, index) => (
                <div
                  key={index}
                  className={`w-12 h-12 bg-gray-800 rounded-2xl flex items-center justify-center cursor-pointer ${social.color} text-white transition-all hover:scale-110 hover:shadow-lg`}
                >
                  {social.icon}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links - Card Style */}
          <div className="bg-gray-800 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <div className="w-2 h-6 bg-blue-600 rounded-full"></div>
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-teal-400 transition-all hover:translate-x-2 flex items-center gap-2 py-2 group"
                  >
                    <div className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-teal-400 transition-colors"></div>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support - Card Style */}
          <div className="bg-gray-800 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <div className="w-2 h-6 bg-teal-600 rounded-full"></div>
              Support
            </h3>
            <ul className="space-y-3">
              {supportLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-teal-400 transition-all hover:translate-x-2 flex items-center gap-2 py-2 group"
                  >
                    <div className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-teal-400 transition-colors"></div>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section - Enhanced */}
        <div className="border-t border-gray-700 pt-8 mt-12">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="text-center lg:text-left">
              <p className="text-gray-400 text-sm mb-2">
                © 2025 JobBox. All rights reserved.
              </p>
              <p className="text-gray-500 text-xs">
                Building careers, connecting futures.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6">
              {['Privacy', 'Terms', 'Cookies', 'Accessibility'].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-gray-400 hover:text-teal-400 text-sm transition-colors font-medium"
                >
                  {item}
                </a>
              ))}
            </div>

            {/* Awards/Certifications Badge */}
            <div className="flex items-center gap-4">
              <div className="bg-gray-800 rounded-2xl px-4 py-2 flex items-center gap-2">
                <Star className="h-4 w-4 text-teal-400" />
                <span className="text-xs text-gray-300 font-medium">Top Rated 2025</span>
              </div>
              <div className="bg-gray-800 rounded-2xl px-4 py-2 flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-blue-400" />
                <span className="text-xs text-gray-300 font-medium">Verified Platform</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
