import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Target, DollarSign, X, Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import DiceAnimation from '../components/DiceAnimation';

const DiceRoulette: React.FC = () => {
  const { user, refreshUser, gameMode } = useAuth();
  const navigate = useNavigate();
  
  const [bets, setBets] = useState<{[key: string]: number}>({});
  const [totalBet, setTotalBet] = useState(0);
  const [rolling, setRolling] = useState(false);
  const [lastRoll, setLastRoll] = useState<any>(null);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState('');
  const [showBetModal, setShowBetModal] = useState<string | null>(null);
  const [betAmount, setBetAmount] = useState(1);

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  useEffect(() => {
    const total = Object.values(bets).reduce((sum, bet) => sum + bet, 0);
    setTotalBet(total);
  }, [bets]);

  if (!user) return null;

  const placeBet = (betType: string, amount: number) => {
    setBets(prev => ({
      ...prev,
      [betType]: (prev[betType] || 0) + amount
    }));
    setShowBetModal(null);
  };

  const clearBets = () => {
    setBets({});
  };

  const rollDice = async () => {
    if (totalBet === 0) {
      setError('Place at least one bet');
      return;
    }

    try {
      setRolling(true);
      setError('');
      
      const response = await fetch('/api/games/diceroulette/roll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ bets, useVirtual: gameMode === 'virtual' })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error);
      }

      const data = await response.json();
      
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      setLastRoll(data.roll);
      setResults(data.results);
      setBets({});
      await refreshUser();
      
    } catch (err: any) {
      setError(err.message);
    } finally {
      setRolling(false);
    }
  };

  const BetModal: React.FC<{ betType: string; label: string; payout: string }> = ({ betType, label, payout }) => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white">{label}</h3>
          <button onClick={() => setShowBetModal(null)}>
            <X className="h-6 w-6 text-gray-400" />
          </button>
        </div>
        <p className="text-gray-400 text-sm mb-4">Payout: {payout}</p>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-gray-300">Bet Amount</label>
          <input
            type="number"
            min="0.1"
            step="0.1"
            value={betAmount}
            onChange={(e) => setBetAmount(parseFloat(e.target.value) || 1)}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition-colors text-white"
          />
        </div>
        
        <div className="grid grid-cols-4 gap-2 mb-4">
          {[0.5, 1, 5, 10].map(amount => (
            <button
              key={amount}
              onClick={() => setBetAmount(amount)}
              className="p-2 bg-blue-900/50 hover:bg-blue-800/50 border border-blue-600 rounded text-sm text-blue-300"
            >
              ${amount}
            </button>
          ))}
        </div>
        
        <button
          onClick={() => placeBet(betType, betAmount)}
          className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white font-bold py-3 rounded-lg transition-all"
        >
          Place Bet: ${betAmount.toFixed(2)}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-10">
        <img 
          src="https://images.pexels.com/photos/1111597/pexels-photo-1111597.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop" 
          alt="Dice roulette background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Target className="h-8 w-8 text-purple-500" />
            <h1 className="text-4xl font-bold text-white">Dice Roulette</h1>
            <Target className="h-8 w-8 text-purple-500" />
          </div>
          <div className="text-center mb-6">
            <div className={`font-bold text-2xl ${gameMode === 'virtual' ? 'text-purple-400' : 'text-yellow-400'}`}>
              ${gameMode === 'virtual' ? (user.virtualBalance || 0).toFixed(2) : ((user.cashBalance || 0) + (user.bonusBalance || 0) + (user.lockedBalance || 0)).toFixed(2)}
            </div>
            <div className="text-gray-400">{gameMode === 'virtual' ? 'Virtual' : 'Real'} Balance</div>
          </div>
        </div>

        {error && (
          <div className="bg-red-900/50 border border-red-500 text-red-300 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Dice Display */}
        <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 mb-6">
          <div className="flex justify-center mb-6">
            <DiceAnimation 
              isRolling={rolling}
              diceValues={lastRoll ? [lastRoll.dice1, lastRoll.dice2, lastRoll.dice3] : [1, 1, 1]}
              size={80}
            />
          </div>
          
          {lastRoll && (
            <div className="text-center">
              <div className="text-2xl font-bold mb-2 text-white">Sum: {lastRoll.sum}</div>
              {results && (
                <div className="text-lg">
                  {results.totalWin > 0 ? (
                    <span className="text-green-400">Won: ${results.totalWin.toFixed(2)}</span>
                  ) : (
                    <span className="text-red-400">Lost: ${results.totalLost.toFixed(2)}</span>
                  )}
                </div>
              )}
            </div>
          )}
          
          {/* Roll Button */}
          <div className="text-center mt-6">
            <button
              onClick={rollDice}
              disabled={rolling || totalBet === 0}
              className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-500 hover:to-orange-600 disabled:opacity-50 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100"
            >
              {rolling ? 'Rolling Dice...' : `Roll Dice - $${totalBet.toFixed(2)}`}
            </button>
            {totalBet > 0 && (
              <button
                onClick={clearBets}
                className="ml-4 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition-all"
              >
                Clear Bets
              </button>
            )}
          </div>
        </div>

        {/* Betting Table */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Number Bets */}
          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-4 text-white">Number Bets</h3>
            <div className="grid grid-cols-2 gap-3">
              {[1, 2, 3, 4, 5, 6].map(num => (
                <button
                  key={num}
                  onClick={() => setShowBetModal(`number_${num}`)}
                  className="bg-blue-900/30 hover:bg-blue-800/50 border border-blue-600 rounded-lg p-4 transition-all"
                >
                  <div className="flex justify-center mb-2">
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-lg">
                      <svg width="80%" height="80%" viewBox="0 0 100 100">
                        {num === 1 && <circle cx="50" cy="50" r="8" fill="black" />}
                        {num === 2 && (
                          <>
                            <circle cx="30" cy="30" r="8" fill="black" />
                            <circle cx="70" cy="70" r="8" fill="black" />
                          </>
                        )}
                        {num === 3 && (
                          <>
                            <circle cx="30" cy="30" r="8" fill="black" />
                            <circle cx="50" cy="50" r="8" fill="black" />
                            <circle cx="70" cy="70" r="8" fill="black" />
                          </>
                        )}
                        {num === 4 && (
                          <>
                            <circle cx="30" cy="30" r="8" fill="black" />
                            <circle cx="70" cy="30" r="8" fill="black" />
                            <circle cx="30" cy="70" r="8" fill="black" />
                            <circle cx="70" cy="70" r="8" fill="black" />
                          </>
                        )}
                        {num === 5 && (
                          <>
                            <circle cx="30" cy="30" r="8" fill="black" />
                            <circle cx="70" cy="30" r="8" fill="black" />
                            <circle cx="50" cy="50" r="8" fill="black" />
                            <circle cx="30" cy="70" r="8" fill="black" />
                            <circle cx="70" cy="70" r="8" fill="black" />
                          </>
                        )}
                        {num === 6 && (
                          <>
                            <circle cx="30" cy="30" r="8" fill="black" />
                            <circle cx="70" cy="30" r="8" fill="black" />
                            <circle cx="30" cy="50" r="8" fill="black" />
                            <circle cx="70" cy="50" r="8" fill="black" />
                            <circle cx="30" cy="70" r="8" fill="black" />
                            <circle cx="70" cy="70" r="8" fill="black" />
                          </>
                        )}
                      </svg>
                    </div>
                  </div>
                  <div className="text-xs text-gray-400">Any die shows {num}</div>
                  <div className="text-sm text-green-400">2.2x payout</div>
                  {bets[`number_${num}`] && (
                    <div className="text-sm font-bold mt-2 text-white">${bets[`number_${num}`].toFixed(2)}</div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Sum Bets */}
          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-4 text-white">Sum Bets</h3>
            <div className="space-y-3">
              {[
                { type: 'odd', label: 'Odd Sum', payout: '1.9x', icon: '🔢', color: 'text-purple-400' },
                { type: 'even', label: 'Even Sum', payout: '1.9x', icon: '⚖️', color: 'text-blue-400' },
                { type: 'low', label: 'Low (3-9)', payout: '1.9x', icon: '⬇️', color: 'text-green-400' },
                { type: 'high', label: 'High (10-18)', payout: '1.9x', icon: '⬆️', color: 'text-red-400' }
              ].map(bet => (
                <button
                  key={bet.type}
                  onClick={() => setShowBetModal(bet.type)}
                  className="w-full bg-green-900/30 hover:bg-green-800/50 border border-green-600 rounded-lg p-4 transition-all text-left"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="flex items-center space-x-3 mb-1">
                        <span className="text-2xl">{bet.icon}</span>
                        <div className="font-bold text-white">{bet.label}</div>
                      </div>
                      <div className="text-xs text-gray-400">{bet.payout}</div>
                      <div className={`text-xs ${bet.color} mt-1`}>
                        {bet.type === 'odd' && 'Sum: 5, 7, 9, 11, 13, 15, 17'}
                        {bet.type === 'even' && 'Sum: 4, 6, 8, 10, 12, 14, 16, 18'}
                        {bet.type === 'low' && 'Sum: 3, 4, 5, 6, 7, 8, 9'}
                        {bet.type === 'high' && 'Sum: 10, 11, 12, 13, 14, 15, 16, 17, 18'}
                      </div>
                    </div>
                    {bets[bet.type] && (
                      <div className="text-sm font-bold text-white">${bets[bet.type].toFixed(2)}</div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Game Rules */}
        <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6">
          <h3 className="text-xl font-bold mb-4 text-center text-white">How to Play Dice Roulette</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold mb-3 text-purple-400">Number Bets</h4>
              <div className="space-y-2 text-sm text-gray-300">
                <div>• Bet on any number 1-6 appearing on any die</div>
                <div>• Pays 2.2x your bet if the number appears</div>
                <div>• Higher risk, higher reward</div>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-3 text-green-400">Sum Bets</h4>
              <div className="space-y-2 text-sm text-gray-300">
                <div>• Bet on the total sum of all three dice</div>
                <div>• Odd/Even: Sum is odd or even number</div>
                <div>• Low/High: Sum is 3-9 or 10-18</div>
                <div>• All sum bets pay 1.9x your stake</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bet Modal */}
        {showBetModal && (
          <BetModal
            betType={showBetModal}
            label={
              showBetModal.startsWith('number_') 
                ? `Any die shows ${showBetModal.split('_')[1]}`
                : showBetModal === 'odd' ? 'Odd Sum'
                : showBetModal === 'even' ? 'Even Sum'
                : showBetModal === 'low' ? 'Low (3-9)'
                : 'High (10-18)'
            }
            payout={showBetModal.startsWith('number_') ? '2.2x' : '1.9x'}
          />
        )}
      </div>
    </div>
  );
};

export default DiceRoulette;