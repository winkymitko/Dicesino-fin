import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Dice1, 
  LogOut, 
  User, 
  Wallet, 
  Settings, 
  Menu, 
  X, 
  Crown,
  Gamepad2,
  ChevronDown,
  DollarSign,
  Gift,
  Lock,
  Zap
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const { user, logout, gameMode, setGameMode } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showBalanceModal, setShowBalanceModal] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const toggleGameMode = () => {
    setGameMode(gameMode === 'virtual' ? 'real' : 'virtual');
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-purple-900/95 to-gray-900/95 backdrop-blur-lg"></div>
          <div className="relative border-b border-gradient-to-r from-yellow-500/20 via-red-500/20 to-purple-500/20">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between h-16">
                {/* Logo */}
                <Link to="/" className="flex items-center space-x-3 group">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-red-500 rounded-xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative bg-gradient-to-r from-yellow-500 to-red-600 p-2 rounded-xl">
                      <Dice1 className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 via-red-500 to-purple-600 bg-clip-text text-transparent">
                    DiceSino
                  </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-6">
                  {user && (
                    <>
                      <Link
                        to="/dice"
                        className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 hover:from-yellow-500/30 hover:to-orange-500/30 border border-yellow-500/30 rounded-xl transition-all duration-300 text-yellow-400 hover:text-yellow-300"
                      >
                        <Dice1 className="h-4 w-4" />
                        <span>BarboDice</span>
                      </Link>
                      <Link
                        to="/dicebattle"
                        className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-500/20 to-pink-500/20 hover:from-red-500/30 hover:to-pink-500/30 border border-red-500/30 rounded-xl transition-all duration-300 text-red-400 hover:text-red-300"
                      >
                        <Gamepad2 className="h-4 w-4" />
                        <span>DiceBattle</span>
                      </Link>
                      <Link
                        to="/diceroulette"
                        className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 hover:from-purple-500/30 hover:to-blue-500/30 border border-purple-500/30 rounded-xl transition-all duration-300 text-purple-400 hover:text-purple-300"
                      >
                        <Zap className="h-4 w-4" />
                        <span>DiceRoulette</span>
                      </Link>
                    </>
                  )}
                </nav>

                {/* User Section */}
                <div className="flex items-center space-x-4">
                  {user ? (
                    <>
                      {/* Game Mode Toggle */}
                      <button
                        onClick={toggleGameMode}
                        className={`relative px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                          gameMode === 'virtual'
                            ? 'bg-gradient-to-r from-purple-500 to-violet-500 text-white shadow-lg shadow-purple-500/25'
                            : 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg shadow-yellow-500/25'
                        }`}
                      >
                        {gameMode === 'virtual' ? '🎮 Virtual' : '💰 Real'}
                      </button>

                      {/* Balance Display */}
                      <button
                        onClick={() => setShowBalanceModal(true)}
                        className="relative group"
                      >
                        <div className={`absolute inset-0 ${
                          gameMode === 'virtual' 
                            ? 'bg-gradient-to-r from-purple-500/30 to-violet-500/30' 
                            : 'bg-gradient-to-r from-yellow-500/30 to-orange-500/30'
                        } rounded-xl blur-lg group-hover:blur-xl transition-all duration-300`}></div>
                        <div className={`relative bg-gradient-to-r ${
                          gameMode === 'virtual'
                            ? 'from-purple-500/20 to-violet-500/20 border-purple-500/30'
                            : 'from-yellow-500/20 to-orange-500/20 border-yellow-500/30'
                        } border backdrop-blur-sm px-4 py-2 rounded-xl transition-all duration-300 group-hover:scale-105`}>
                          <div className="flex items-center space-x-2">
                            <Wallet className="h-4 w-4 text-gray-300" />
                            <div className="text-right">
                              <div className={`font-bold ${
                                gameMode === 'virtual' ? 'text-purple-400' : 'text-yellow-400'
                              }`}>
                                ${gameMode === 'virtual' 
                                  ? (user.virtualBalance || 0).toFixed(2)
                                  : ((user.cashBalance || 0) + (user.bonusBalance || 0) + (user.lockedBalance || 0)).toFixed(2)
                                }
                              </div>
                              <div className="text-xs text-gray-400">
                                {gameMode === 'virtual' ? 'Virtual' : 'Real'}
                              </div>
                            </div>
                            <ChevronDown className="h-4 w-4 text-gray-400" />
                          </div>
                        </div>
                      </button>

                      {/* User Menu */}
                      <div className="relative group">
                        <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 border border-blue-500/30 rounded-xl transition-all duration-300">
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                            <User className="h-4 w-4 text-white" />
                          </div>
                          <span className="text-white font-medium hidden sm:block">
                            {user.name || user.email.split('@')[0]}
                          </span>
                          {user.isAdmin && <Crown className="h-4 w-4 text-yellow-400" />}
                        </button>
                        
                        {/* Dropdown Menu */}
                        <div className="absolute right-0 mt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                          <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-gray-800/90 to-gray-900/90 rounded-xl blur-lg"></div>
                            <div className="relative bg-gradient-to-br from-gray-800/95 to-gray-900/95 backdrop-blur-sm border border-white/20 rounded-xl py-2 shadow-2xl">
                              <Link
                                to="/profile"
                                className="flex items-center space-x-3 px-4 py-3 hover:bg-white/10 transition-colors text-gray-300 hover:text-white"
                              >
                                <User className="h-4 w-4" />
                                <span>Profile</span>
                              </Link>
                              <Link
                                to="/topup"
                                className="flex items-center space-x-3 px-4 py-3 hover:bg-white/10 transition-colors text-gray-300 hover:text-white"
                              >
                                <Wallet className="h-4 w-4" />
                                <span>Top Up</span>
                              </Link>
                              {user.isAdmin && (
                                <Link
                                  to="/admin"
                                  className="flex items-center space-x-3 px-4 py-3 hover:bg-white/10 transition-colors text-yellow-400 hover:text-yellow-300"
                                >
                                  <Crown className="h-4 w-4" />
                                  <span>Admin Panel</span>
                                </Link>
                              )}
                              <hr className="my-2 border-white/10" />
                              <button
                                onClick={handleLogout}
                                className="flex items-center space-x-3 px-4 py-3 hover:bg-red-500/20 transition-colors text-gray-300 hover:text-red-400 w-full text-left"
                              >
                                <LogOut className="h-4 w-4" />
                                <span>Logout</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center space-x-3">
                      <Link
                        to="/login"
                        className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 border border-blue-500/30 text-blue-400 hover:text-blue-300 rounded-xl transition-all duration-300"
                      >
                        Login
                      </Link>
                      <Link
                        to="/register"
                        className="relative group"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white font-bold px-4 py-2 rounded-xl transition-all duration-300 transform group-hover:scale-105">
                          Register
                        </div>
                      </Link>
                    </div>
                  )}

                  {/* Mobile Menu Button */}
                  <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="md:hidden p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-purple-900/95 to-gray-900/95 backdrop-blur-lg"></div>
              <div className="relative border-b border-white/10 px-4 py-4 space-y-3">
                {user && (
                  <>
                    <Link
                      to="/dice"
                      className="flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-xl text-yellow-400"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Dice1 className="h-5 w-5" />
                      <span>BarboDice</span>
                    </Link>
                    <Link
                      to="/dicebattle"
                      className="flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-500/30 rounded-xl text-red-400"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Gamepad2 className="h-5 w-5" />
                      <span>DiceBattle</span>
                    </Link>
                    <Link
                      to="/diceroulette"
                      className="flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-xl text-purple-400"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Zap className="h-5 w-5" />
                      <span>DiceRoulette</span>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Balance Modal */}
      {showBalanceModal && user && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="relative max-w-md w-full">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-xl"></div>
            <div className="relative bg-gradient-to-br from-gray-800/95 via-gray-900/95 to-gray-800/95 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  Wallet Overview
                </h3>
                <button
                  onClick={() => setShowBalanceModal(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5 text-gray-400" />
                </button>
              </div>

              {/* Game Mode Toggle */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-300">Game Mode</span>
                  <button
                    onClick={toggleGameMode}
                    className={`relative px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                      gameMode === 'virtual'
                        ? 'bg-gradient-to-r from-purple-500 to-violet-500 text-white shadow-lg shadow-purple-500/25'
                        : 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg shadow-yellow-500/25'
                    }`}
                  >
                    {gameMode === 'virtual' ? '🎮 Virtual Mode' : '💰 Real Money Mode'}
                  </button>
                </div>
              </div>

              {/* Balance Breakdown */}
              <div className="space-y-4">
                {gameMode === 'virtual' ? (
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-violet-500/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
                    <div className="relative bg-gradient-to-r from-purple-500/10 to-violet-500/10 border border-purple-500/30 rounded-xl p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-gradient-to-r from-purple-500 to-violet-500 rounded-lg">
                            <Gamepad2 className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <div className="font-semibold text-purple-400">Virtual Balance</div>
                            <div className="text-xs text-gray-400">Demo Money</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-purple-400">
                            ${(user.virtualBalance || 0).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
                      <div className="relative bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                              <DollarSign className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <div className="font-semibold text-green-400">Cash Balance</div>
                              <div className="text-xs text-gray-400">Withdrawable</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold text-green-400">
                              ${(user.cashBalance || 0).toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
                      <div className="relative bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg">
                              <Gift className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <div className="font-semibold text-blue-400">Bonus Balance</div>
                              <div className="text-xs text-gray-400">Play Only</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold text-blue-400">
                              ${(user.bonusBalance || 0).toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
                      <div className="relative bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-xl p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg">
                              <Lock className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <div className="font-semibold text-orange-400">Locked Balance</div>
                              <div className="text-xs text-gray-400">Pending Wagering</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold text-orange-400">
                              ${(user.lockedBalance || 0).toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Wagering Progress */}
                    {(user.activeWageringRequirement || 0) > 0 && (
                      <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
                        <div className="relative bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-xl p-4">
                          <div className="mb-2">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm font-medium text-yellow-400">Wagering Progress</span>
                              <span className="text-xs text-gray-400">
                                ${(user.currentWageringProgress || 0).toFixed(0)} / ${(user.activeWageringRequirement || 0).toFixed(0)}
                              </span>
                            </div>
                            <div className="w-full bg-gray-700/50 rounded-full h-2 overflow-hidden">
                              <div 
                                className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full transition-all duration-500"
                                style={{ 
                                  width: `${Math.min(100, ((user.currentWageringProgress || 0) / (user.activeWageringRequirement || 1)) * 100)}%` 
                                }}
                              ></div>
                            </div>
                          </div>
                          <div className="text-xs text-gray-400">
                            Complete to unlock ${(user.lockedBalance || 0).toFixed(2)} to cash
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Quick Actions */}
              <div className="mt-6 grid grid-cols-2 gap-3">
                <Link
                  to="/topup"
                  onClick={() => setShowBalanceModal(false)}
                  className="flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 hover:from-green-500/30 hover:to-emerald-500/30 border border-green-500/30 rounded-xl transition-all duration-300 text-green-400 hover:text-green-300"
                >
                  <Wallet className="h-4 w-4" />
                  <span>Top Up</span>
                </Link>
                <Link
                  to="/profile"
                  onClick={() => setShowBalanceModal(false)}
                  className="flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 border border-blue-500/30 rounded-xl transition-all duration-300 text-blue-400 hover:text-blue-300"
                >
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;