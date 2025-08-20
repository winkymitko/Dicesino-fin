import React from 'react';
import { Link } from 'react-router-dom';
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6, Swords, Target, Play, Trophy, Star, Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Home: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 via-red-500/20 to-purple-600/20 blur-3xl"></div>
        <div className="relative container mx-auto px-4 py-16 text-center">
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-red-500 rounded-3xl blur-2xl opacity-60 animate-pulse"></div>
            <div className="relative bg-gradient-to-r from-yellow-500 to-red-600 p-6 rounded-3xl">
              <div className="flex space-x-2">
                <Dice1 className="h-12 w-12 text-white animate-bounce" style={{ animationDelay: '0ms' }} />
                <Dice2 className="h-12 w-12 text-white animate-bounce" style={{ animationDelay: '200ms' }} />
                <Dice3 className="h-12 w-12 text-white animate-bounce" style={{ animationDelay: '400ms' }} />
              </div>
            </div>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-6">
            <span className="bg-gradient-to-r from-yellow-400 via-red-500 to-purple-600 bg-clip-text text-transparent animate-pulse">
              DiceSino
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Experience the thrill of premium dice gaming with 
            <span className="bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent font-bold"> real money rewards</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {!user ? (
              <>
                <Link
                  to="/register"
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform group-hover:scale-105 shadow-2xl">
                    🚀 Start Playing Now
                  </div>
                </Link>
                <Link
                  to="/login"
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                  <div className="relative bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 hover:border-blue-400/50 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform group-hover:scale-105 backdrop-blur-sm">
                    🔑 Login
                  </div>
                </Link>
              </>
            ) : (
              <div className="text-center">
                <p className="text-xl text-gray-300 mb-4">Welcome back, {user.name || user.email}!</p>
                <div className="flex space-x-4">
                  <Link
                    to="/dice"
                    className="relative group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform group-hover:scale-105 shadow-2xl">
                      🎲 Play BarboDice
                    </div>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Games Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Premium Casino Games
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Choose from our collection of provably fair dice games with real money prizes
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* BarboDice */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/30 to-orange-500/30 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <div className="relative bg-gradient-to-br from-yellow-500/10 to-orange-500/10 backdrop-blur-sm border border-yellow-500/30 rounded-3xl p-8 hover:transform hover:scale-105 transition-all duration-300">
              <div className="text-center mb-6">
                <div className="relative inline-block mb-4">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl blur-lg opacity-75"></div>
                  <div className="relative bg-gradient-to-r from-yellow-500 to-orange-600 p-4 rounded-2xl">
                    <div className="flex space-x-1">
                      <Dice1 className="h-8 w-8 text-white" />
                      <Dice2 className="h-8 w-8 text-white" />
                      <Dice3 className="h-8 w-8 text-white" />
                    </div>
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
                className="block w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-white font-bold py-3 rounded-xl transition-all duration-300 text-center shadow-lg hover:shadow-yellow-500/25"
              >
                🎲 Play Now
              </Link>
            </div>
          </div>

          {/* DiceBattle */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/30 to-pink-500/30 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <div className="relative bg-gradient-to-br from-red-500/10 to-pink-500/10 backdrop-blur-sm border border-red-500/30 rounded-3xl p-8 hover:transform hover:scale-105 transition-all duration-300">
              <div className="text-center mb-6">
                <div className="relative inline-block mb-4">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-pink-500 rounded-2xl blur-lg opacity-75"></div>
                  <div className="relative bg-gradient-to-r from-red-500 to-pink-600 p-4 rounded-2xl">
                    <Swords className="h-12 w-12 text-white" />
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
                className="block w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-400 hover:to-pink-400 text-white font-bold py-3 rounded-xl transition-all duration-300 text-center shadow-lg hover:shadow-red-500/25"
              >
                ⚔️ Battle Now
              </Link>
            </div>
          </div>

          {/* DiceRoulette */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <div className="relative bg-gradient-to-br from-purple-500/10 to-blue-500/10 backdrop-blur-sm border border-purple-500/30 rounded-3xl p-8 hover:transform hover:scale-105 transition-all duration-300">
              <div className="text-center mb-6">
                <div className="relative inline-block mb-4">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-500 rounded-2xl blur-lg opacity-75"></div>
                  <div className="relative bg-gradient-to-r from-purple-500 to-blue-600 p-4 rounded-2xl">
                    <Target className="h-12 w-12 text-white" />
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
                className="block w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-400 hover:to-blue-400 text-white font-bold py-3 rounded-xl transition-all duration-300 text-center shadow-lg hover:shadow-purple-500/25"
              >
                🎯 Play Roulette
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Why Choose DiceSino?
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Trophy,
              title: 'Provably Fair',
              description: 'Transparent and verifiable game outcomes',
              gradient: 'from-yellow-500 to-orange-500',
              bgGradient: 'from-yellow-500/10 to-orange-500/10'
            },
            {
              icon: Zap,
              title: 'Instant Payouts',
              description: 'Fast crypto withdrawals and deposits',
              gradient: 'from-green-500 to-emerald-500',
              bgGradient: 'from-green-500/10 to-emerald-500/10'
            },
            {
              icon: Star,
              title: 'Premium Experience',
              description: 'High-quality graphics and smooth gameplay',
              gradient: 'from-purple-500 to-pink-500',
              bgGradient: 'from-purple-500/10 to-pink-500/10'
            },
            {
              icon: Play,
              title: 'Multiple Games',
              description: 'Various dice games for every player',
              gradient: 'from-blue-500 to-cyan-500',
              bgGradient: 'from-blue-500/10 to-cyan-500/10'
            }
          ].map((feature, index) => (
            <div key={index} className="relative group">
              <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} rounded-2xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
              <div className={`relative bg-gradient-to-br ${feature.bgGradient} backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:transform hover:scale-105 transition-all duration-300`}>
                <div className={`inline-flex p-3 bg-gradient-to-r ${feature.gradient} rounded-xl mb-4`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      {!user && (
        <div className="container mx-auto px-4 py-16">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-red-500/20 to-purple-600/20 rounded-3xl blur-2xl"></div>
            <div className="relative bg-gradient-to-br from-gray-800/90 via-gray-900/90 to-gray-800/90 backdrop-blur-sm border border-yellow-500/30 rounded-3xl p-12 text-center">
              <h2 className="text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">
                  Ready to Win Big?
                </span>
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Join thousands of players and start your winning journey today!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/register"
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform group-hover:scale-105 shadow-2xl">
                    🎁 Get $1000 Free + $50 Bonus
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;