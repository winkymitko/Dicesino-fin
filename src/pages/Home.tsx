import React from 'react';
import { Link } from 'react-router-dom';
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6, Swords, Target, Play, Trophy, Star, Zap, Users, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Home: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.pexels.com/photos/1111597/pexels-photo-1111597.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop" 
            alt="Casino dice background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-gray-900/60 to-slate-900/80"></div>
        </div>
        
        <div className="relative container mx-auto px-4 py-20 text-center">
          <div className="mb-8">
            <div className="flex justify-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-white rounded-lg shadow-xl flex items-center justify-center transform rotate-12 hover:rotate-0 transition-transform duration-300">
                <Dice1 className="h-10 w-10 text-red-600" />
              </div>
              <div className="w-16 h-16 bg-white rounded-lg shadow-xl flex items-center justify-center transform -rotate-12 hover:rotate-0 transition-transform duration-300">
                <Dice2 className="h-10 w-10 text-red-600" />
              </div>
              <div className="w-16 h-16 bg-white rounded-lg shadow-xl flex items-center justify-center transform rotate-6 hover:rotate-0 transition-transform duration-300">
                <Dice3 className="h-10 w-10 text-red-600" />
              </div>
            </div>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-6 text-white drop-shadow-2xl">
            DiceSino
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Experience the thrill of premium dice gaming with 
            <span className="text-yellow-400 font-bold"> real money rewards</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {!user ? (
              <>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-xl"
                >
                  🚀 Start Playing Now
                </Link>
                <Link
                  to="/login"
                  className="bg-gray-800 hover:bg-gray-700 border border-gray-600 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105"
                >
                  🔑 Login
                </Link>
              </>
            ) : (
              <div className="text-center">
                <p className="text-xl text-gray-300 mb-4">Welcome back, {user.name || user.email}!</p>
                <Link
                  to="/dice"
                  className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-xl"
                >
                  🎲 Play BarboDice
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Games Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Premium Casino Games
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Choose from our collection of provably fair dice games with real money prizes
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* BarboDice */}
          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 hover:transform hover:scale-105 transition-all duration-300 shadow-xl">
            <div className="text-center mb-6">
              <div className="relative mb-4">
                <img 
                  src="https://images.pexels.com/photos/37534/cube-six-gambling-play-37534.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop" 
                  alt="Dice game"
                  className="w-full h-32 object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg"></div>
                <div className="absolute bottom-2 left-2 flex space-x-1">
                  <Dice1 className="h-6 w-6 text-white drop-shadow-lg" />
                  <Dice2 className="h-6 w-6 text-white drop-shadow-lg" />
                  <Dice3 className="h-6 w-6 text-white drop-shadow-lg" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-yellow-400 mb-2">BarboDice</h3>
              <p className="text-gray-300 mb-4">Roll for singles, straights, and triples. Cash out anytime or risk it all!</p>
              <div className="flex justify-center space-x-4 text-sm mb-6">
                <div className="text-center">
                  <div className="text-green-400 font-bold">Up to 2.2×</div>
                  <div className="text-gray-500">Multiplier</div>
                </div>
                <div className="text-center">
                  <div className="text-blue-400 font-bold">Provably</div>
                  <div className="text-gray-500">Fair</div>
                </div>
              </div>
            </div>
            <Link
              to="/dice"
              className="block w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white font-bold py-3 rounded-xl transition-all duration-300 text-center shadow-lg"
            >
              🎲 Play Now
            </Link>
          </div>

          {/* DiceBattle */}
          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 hover:transform hover:scale-105 transition-all duration-300 shadow-xl">
            <div className="text-center mb-6">
              <div className="relative mb-4">
                <img 
                  src="https://images.pexels.com/photos/1111597/pexels-photo-1111597.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop" 
                  alt="Dice battle"
                  className="w-full h-32 object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg"></div>
                <div className="absolute bottom-2 left-2">
                  <Swords className="h-8 w-8 text-white drop-shadow-lg" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-red-400 mb-2">DiceBattle</h3>
              <p className="text-gray-300 mb-4">Challenge opponents in prediction battles. Closest guess wins the pot!</p>
              <div className="flex justify-center space-x-4 text-sm mb-6">
                <div className="text-center">
                  <div className="text-green-400 font-bold">1.9× Payout</div>
                  <div className="text-gray-500">Winner Takes All</div>
                </div>
                <div className="text-center">
                  <div className="text-purple-400 font-bold">PvP</div>
                  <div className="text-gray-500">Battles</div>
                </div>
              </div>
            </div>
            <Link
              to="/dicebattle"
              className="block w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white font-bold py-3 rounded-xl transition-all duration-300 text-center shadow-lg"
            >
              ⚔️ Battle Now
            </Link>
          </div>

          {/* DiceRoulette */}
          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 hover:transform hover:scale-105 transition-all duration-300 shadow-xl">
            <div className="text-center mb-6">
              <div className="relative mb-4">
                <img 
                  src="https://images.pexels.com/photos/1111597/pexels-photo-1111597.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop" 
                  alt="Dice roulette"
                  className="w-full h-32 object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg"></div>
                <div className="absolute bottom-2 left-2">
                  <Target className="h-8 w-8 text-white drop-shadow-lg" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-purple-400 mb-2">DiceRoulette</h3>
              <p className="text-gray-300 mb-4">Bet on numbers, odds/evens, and ranges. Multiple ways to win!</p>
              <div className="flex justify-center space-x-4 text-sm mb-6">
                <div className="text-center">
                  <div className="text-green-400 font-bold">Multiple</div>
                  <div className="text-gray-500">Bet Types</div>
                </div>
                <div className="text-center">
                  <div className="text-yellow-400 font-bold">High</div>
                  <div className="text-gray-500">Payouts</div>
                </div>
              </div>
            </div>
            <Link
              to="/diceroulette"
              className="block w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-3 rounded-xl transition-all duration-300 text-center shadow-lg"
            >
              🎯 Play Roulette
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-800 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-white">
              Why Choose DiceSino?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Trophy,
                title: 'Provably Fair',
                description: 'Transparent and verifiable game outcomes',
                color: 'text-yellow-400'
              },
              {
                icon: Zap,
                title: 'Instant Payouts',
                description: 'Fast crypto withdrawals and deposits',
                color: 'text-green-400'
              },
              {
                icon: Star,
                title: 'Premium Experience',
                description: 'High-quality graphics and smooth gameplay',
                color: 'text-purple-400'
              },
              {
                icon: Shield,
                title: 'Secure Gaming',
                description: 'Advanced security and fair play protection',
                color: 'text-blue-400'
              }
            ].map((feature, index) => (
              <div key={index} className="bg-gray-900 border border-gray-700 rounded-xl p-6 text-center hover:transform hover:scale-105 transition-all duration-300">
                <div className={`inline-flex p-3 bg-gray-800 rounded-xl mb-4 ${feature.color}`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      {!user && (
        <div className="container mx-auto px-4 py-16">
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 rounded-3xl p-12 text-center">
            <h2 className="text-4xl font-bold mb-4 text-white">
              Ready to Win Big?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of players and start your winning journey today!
            </p>
            <Link
              to="/register"
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              🎁 Get $1000 Free + $50 Bonus
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;