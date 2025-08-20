import React from 'react';
import { Link } from 'react-router-dom';
import { Dice1, Shield, Mail, Phone, MapPin, Clock } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="relative mt-20">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-purple-900/95 to-gray-900/95 backdrop-blur-lg"></div>
      <div className="relative border-t border-gradient-to-r from-yellow-500/20 via-red-500/20 to-purple-500/20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center space-x-3 mb-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-red-500 rounded-xl blur-lg opacity-75"></div>
                  <div className="relative bg-gradient-to-r from-yellow-500 to-red-600 p-2 rounded-xl">
                    <Dice1 className="h-6 w-6 text-white" />
                  </div>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-yellow-400 via-red-500 to-purple-600 bg-clip-text text-transparent">
                  DiceSino
                </span>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Premium dice gaming platform with provably fair games and instant crypto payouts.
              </p>
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 font-semibold">Live & Secure</span>
              </div>
            </div>

            {/* Games */}
            <div>
              <h3 className="font-bold text-white mb-4 flex items-center space-x-2">
                <div className="w-1 h-6 bg-gradient-to-b from-yellow-400 to-red-500 rounded-full"></div>
                <span>Games</span>
              </h3>
              <div className="space-y-3">
                <Link
                  to="/dice"
                  className="block text-gray-400 hover:text-yellow-400 transition-colors text-sm flex items-center space-x-2"
                >
                  <div className="w-1 h-1 bg-yellow-400 rounded-full"></div>
                  <span>BarboDice</span>
                </Link>
                <Link
                  to="/dicebattle"
                  className="block text-gray-400 hover:text-red-400 transition-colors text-sm flex items-center space-x-2"
                >
                  <div className="w-1 h-1 bg-red-400 rounded-full"></div>
                  <span>DiceBattle</span>
                </Link>
                <Link
                  to="/diceroulette"
                  className="block text-gray-400 hover:text-purple-400 transition-colors text-sm flex items-center space-x-2"
                >
                  <div className="w-1 h-1 bg-purple-400 rounded-full"></div>
                  <span>DiceRoulette</span>
                </Link>
              </div>
            </div>

            {/* Account */}
            <div>
              <h3 className="font-bold text-white mb-4 flex items-center space-x-2">
                <div className="w-1 h-6 bg-gradient-to-b from-blue-400 to-purple-500 rounded-full"></div>
                <span>Account</span>
              </h3>
              <div className="space-y-3">
                <Link
                  to="/profile"
                  className="block text-gray-400 hover:text-blue-400 transition-colors text-sm flex items-center space-x-2"
                >
                  <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                  <span>Profile</span>
                </Link>
                <Link
                  to="/topup"
                  className="block text-gray-400 hover:text-green-400 transition-colors text-sm flex items-center space-x-2"
                >
                  <div className="w-1 h-1 bg-green-400 rounded-full"></div>
                  <span>Top Up</span>
                </Link>
              </div>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-bold text-white mb-4 flex items-center space-x-2">
                <div className="w-1 h-6 bg-gradient-to-b from-green-400 to-emerald-500 rounded-full"></div>
                <span>Support</span>
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-gray-400 text-sm">
                  <Mail className="h-4 w-4" />
                  <span>support@dicesino.com</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-400 text-sm">
                  <Clock className="h-4 w-4" />
                  <span>24/7 Live Support</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-400 text-sm">
                  <Shield className="h-4 w-4" />
                  <span>Provably Fair Gaming</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 mt-8 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-gray-400 text-sm">
                © 2025 DiceSino. All rights reserved.
              </div>
              <div className="flex items-center space-x-6 text-sm">
                <span className="text-gray-400">Terms of Service</span>
                <span className="text-gray-400">Privacy Policy</span>
                <span className="text-gray-400">Responsible Gaming</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 text-sm font-semibold">All Systems Operational</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;