import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Settings, 
  TrendingUp, 
  DollarSign, 
  Shield,
  Edit,
  Save,
  X,
  Plus,
  Trash2,
  Bug,
  AlertCircle,
  CheckCircle,
  Clock,
  User
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AdminPanel: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [users, setUsers] = useState<any[]>([]);
  const [stats, setStats] = useState<any>({});
  const [editingUser, setEditingUser] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<any>({});
  const [botNames, setBotNames] = useState<string[]>([]);
  const [newBotName, setNewBotName] = useState('');
  const [bugReports, setBugReports] = useState<any[]>([]);
  const [bugFilters, setBugFilters] = useState({ status: '', priority: '' });

  useEffect(() => {
    if (!user?.isAdmin) {
      navigate('/');
      return;
    }
    
    fetchUsers();
    fetchStats();
    fetchBotNames();
    fetchBugReports();
  }, [user, navigate]);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/admin/users', {
        credentials: 'include'
      });
      if (response.ok) {
        const data = await response.json();
        setUsers(data.users);
      }
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats', {
        credentials: 'include'
      });
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  const fetchBotNames = async () => {
    try {
      const response = await fetch('/api/admin/bot-names', {
        credentials: 'include'
      });
      if (response.ok) {
        const data = await response.json();
        setBotNames(data.botNames);
      }
    } catch (error) {
      console.error('Failed to fetch bot names:', error);
    }
  };

  const fetchBugReports = async () => {
    try {
      const params = new URLSearchParams();
      if (bugFilters.status) params.append('status', bugFilters.status);
      if (bugFilters.priority) params.append('priority', bugFilters.priority);
      
      const response = await fetch(`/api/admin/bug-reports?${params}`, {
        credentials: 'include'
      });
      if (response.ok) {
        const data = await response.json();
        setBugReports(data.bugReports);
      }
    } catch (error) {
      console.error('Failed to fetch bug reports:', error);
    }
  };

  const updateUserSettings = async (userId: string, settings: any) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}/settings`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(settings)
      });
      
      if (response.ok) {
        fetchUsers();
        setEditingUser(null);
      }
    } catch (error) {
      console.error('Failed to update user settings:', error);
    }
  };

  const updateCommissionRate = async (userId: string, commission: number) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}/commission`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ commission })
      });
      
      if (response.ok) {
        fetchUsers();
      }
    } catch (error) {
      console.error('Failed to update commission rate:', error);
    }
  };

  const addBonus = async (userId: string, amount: number) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}/bonus`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ amount })
      });
      
      if (response.ok) {
        fetchUsers();
        alert('Bonus added successfully!');
      }
    } catch (error) {
      console.error('Failed to add bonus:', error);
    }
  };

  const addBotName = async () => {
    if (!newBotName.trim()) return;
    
    try {
      const response = await fetch('/api/admin/bot-names', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ name: newBotName.trim() })
      });
      
      if (response.ok) {
        fetchBotNames();
        setNewBotName('');
      } else {
        const error = await response.json();
        alert(error.error);
      }
    } catch (error) {
      console.error('Failed to add bot name:', error);
    }
  };

  const removeBotName = async (name: string) => {
    try {
      const response = await fetch('/api/admin/bot-names', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ name })
      });
      
      if (response.ok) {
        fetchBotNames();
      } else {
        const error = await response.json();
        alert(error.error);
      }
    } catch (error) {
      console.error('Failed to remove bot name:', error);
    }
  };

  const updateBugReportStatus = async (reportId: string, status: string, priority?: string) => {
    try {
      const body: any = { status };
      if (priority) body.priority = priority;
      
      const response = await fetch(`/api/admin/bug-reports/${reportId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(body)
      });
      
      if (response.ok) {
        fetchBugReports();
      }
    } catch (error) {
      console.error('Failed to update bug report:', error);
    }
  };

  const startEdit = (userId: string, currentValues: any) => {
    setEditingUser(userId);
    setEditValues(currentValues);
  };

  const saveEdit = () => {
    if (editingUser) {
      updateUserSettings(editingUser, editValues);
    }
  };

  const cancelEdit = () => {
    setEditingUser(null);
    setEditValues({});
  };

  if (!user?.isAdmin) {
    return <div>Access denied</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex items-center space-x-3 mb-8">
        <Shield className="h-8 w-8 text-red-500" />
        <h1 className="text-3xl font-bold">Admin Panel</h1>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-8 bg-white/10 p-1 rounded-lg">
        {[
          { id: 'overview', label: 'Overview', icon: TrendingUp },
          { id: 'users', label: 'Users', icon: Users },
          { id: 'bots', label: 'Bot Names', icon: Settings },
          { id: 'bugs', label: 'Bug Reports', icon: Bug }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all ${
              activeTab === tab.id
                ? 'bg-white/20 text-white'
                : 'text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <tab.icon className="h-4 w-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6">
            <div className="flex items-center space-x-3 mb-2">
              <Users className="h-6 w-6 text-blue-400" />
              <h3 className="font-bold">Total Users</h3>
            </div>
            <div className="text-2xl font-bold">{stats.totalUsers || 0}</div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6">
            <div className="flex items-center space-x-3 mb-2">
              <TrendingUp className="h-6 w-6 text-green-400" />
              <h3 className="font-bold">Total Games</h3>
            </div>
            <div className="text-2xl font-bold">{stats.totalGames || 0}</div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6">
            <div className="flex items-center space-x-3 mb-2">
              <DollarSign className="h-6 w-6 text-yellow-400" />
              <h3 className="font-bold">Total Deposited</h3>
            </div>
            <div className="text-2xl font-bold">${(stats.totalRealMoneyDeposited || 0).toFixed(2)}</div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6">
            <div className="flex items-center space-x-3 mb-2">
              <TrendingUp className="h-6 w-6 text-purple-400" />
              <h3 className="font-bold">Casino Profit</h3>
            </div>
            <div className="text-2xl font-bold">${(stats.totalCasinoProfit || 0).toFixed(2)}</div>
          </div>
        </div>
      )}

      {/* Users Tab */}
      {activeTab === 'users' && (
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6">
          <h2 className="text-2xl font-bold mb-6">User Management</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left p-3">User</th>
                  <th className="text-left p-3">Balances</th>
                  <th className="text-left p-3">House Edge</th>
                  <th className="text-left p-3">Limits</th>
                  <th className="text-left p-3">Affiliate</th>
                  <th className="text-left p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id} className="border-b border-white/10">
                    <td className="p-3">
                      <div>
                        <div className="font-medium">{user.email}</div>
                        <div className="text-gray-400 text-xs">@{user.username}</div>
                        <div className="text-gray-500 text-xs">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="text-xs space-y-1">
                        <div>💰 ${(user.cashBalance || 0).toFixed(2)}</div>
                        <div>🎁 ${(user.bonusBalance || 0).toFixed(2)}</div>
                        <div>🔒 ${(user.lockedBalance || 0).toFixed(2)}</div>
                        <div>🎮 ${(user.virtualBalance || 0).toFixed(2)}</div>
                      </div>
                    </td>
                    <td className="p-3">
                      {editingUser === user.id ? (
                        <div className="space-y-2">
                          <input
                            type="number"
                            min="0"
                            max="50"
                            step="0.1"
                            value={editValues.diceGameEdge || 0}
                            onChange={(e) => setEditValues({...editValues, diceGameEdge: parseFloat(e.target.value)})}
                            className="w-16 px-2 py-1 bg-black/30 border border-white/20 rounded text-xs"
                          />
                          <input
                            type="number"
                            min="0"
                            max="50"
                            step="0.1"
                            value={editValues.diceBattleEdge || 0}
                            onChange={(e) => setEditValues({...editValues, diceBattleEdge: parseFloat(e.target.value)})}
                            className="w-16 px-2 py-1 bg-black/30 border border-white/20 rounded text-xs"
                          />
                        </div>
                      ) : (
                        <div className="text-xs space-y-1">
                          <div>Dice: {user.diceGameEdge}%</div>
                          <div>Battle: {user.diceBattleEdge}%</div>
                        </div>
                      )}
                    </td>
                    <td className="p-3">
                      {editingUser === user.id ? (
                        <div className="space-y-2">
                          <input
                            type="number"
                            min="1"
                            max="1000"
                            value={editValues.maxBetWhileBonus || 0}
                            onChange={(e) => setEditValues({...editValues, maxBetWhileBonus: parseFloat(e.target.value)})}
                            className="w-16 px-2 py-1 bg-black/30 border border-white/20 rounded text-xs"
                          />
                          <input
                            type="number"
                            min="100"
                            max="10000"
                            value={editValues.maxBonusCashout || 0}
                            onChange={(e) => setEditValues({...editValues, maxBonusCashout: parseFloat(e.target.value)})}
                            className="w-16 px-2 py-1 bg-black/30 border border-white/20 rounded text-xs"
                          />
                        </div>
                      ) : (
                        <div className="text-xs space-y-1">
                          <div>Max Bet: ${user.maxBetWhileBonus}</div>
                          <div>Max Cashout: ${user.maxBonusCashout}</div>
                        </div>
                      )}
                    </td>
                    <td className="p-3">
                      <div className="text-xs space-y-1">
                        <div className={user.isAffiliate ? 'text-green-400' : 'text-gray-500'}>
                          {user.isAffiliate ? 'Active' : 'Inactive'}
                        </div>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          step="0.1"
                          value={user.affiliateCommission || 0}
                          onChange={(e) => updateCommissionRate(user.id, parseFloat(e.target.value))}
                          className="w-16 px-2 py-1 bg-black/30 border border-white/20 rounded text-xs"
                        />
                        <div className="text-gray-400">%</div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex space-x-1">
                        {editingUser === user.id ? (
                          <>
                            <button
                              onClick={saveEdit}
                              className="p-1 bg-green-500/20 text-green-400 hover:bg-green-500/30 rounded"
                            >
                              <Save className="h-3 w-3" />
                            </button>
                            <button
                              onClick={cancelEdit}
                              className="p-1 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => startEdit(user.id, {
                              diceGameEdge: user.diceGameEdge,
                              diceBattleEdge: user.diceBattleEdge,
                              maxBetWhileBonus: user.maxBetWhileBonus,
                              maxBonusCashout: user.maxBonusCashout
                            })}
                            className="p-1 bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 rounded"
                          >
                            <Edit className="h-3 w-3" />
                          </button>
                        )}
                        <button
                          onClick={() => {
                            const amount = prompt('Enter bonus amount:');
                            if (amount && parseFloat(amount) > 0) {
                              addBonus(user.id, parseFloat(amount));
                            }
                          }}
                          className="p-1 bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 rounded"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Bot Names Tab */}
      {activeTab === 'bots' && (
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6">
          <h2 className="text-2xl font-bold mb-6">DiceBattle Bot Names</h2>
          
          <div className="mb-6">
            <div className="flex space-x-2">
              <input
                type="text"
                value={newBotName}
                onChange={(e) => setNewBotName(e.target.value)}
                placeholder="Enter new bot name"
                className="flex-1 px-4 py-2 bg-black/30 border border-white/20 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
                maxLength={20}
              />
              <button
                onClick={addBotName}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold px-4 py-2 rounded-lg transition-all"
              >
                Add Bot
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Bot names are used for DiceBattle opponents. Maximum 20 characters.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {botNames.map((name, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
                <span className="font-medium">{name}</span>
                <button
                  onClick={() => {
                    if (confirm(`Remove bot name "${name}"?`)) {
                      removeBotName(name);
                    }
                  }}
                  className="p-1 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded transition-colors"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
          
          <div className="mt-4 text-sm text-gray-400">
            Total bot names: {botNames.length} (Minimum 5 required)
          </div>
        </div>
      )}

      {/* Bug Reports Tab */}
      {activeTab === 'bugs' && (
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Bug Reports</h2>
            <div className="flex space-x-3">
              <select
                value={bugFilters.status}
                onChange={(e) => {
                  setBugFilters({...bugFilters, status: e.target.value});
                  fetchBugReports();
                }}
                className="px-3 py-2 bg-black/30 border border-white/20 rounded-lg text-sm"
              >
                <option value="">All Status</option>
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
              <select
                value={bugFilters.priority}
                onChange={(e) => {
                  setBugFilters({...bugFilters, priority: e.target.value});
                  fetchBugReports();
                }}
                className="px-3 py-2 bg-black/30 border border-white/20 rounded-lg text-sm"
              >
                <option value="">All Priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            {bugReports.length > 0 ? (
              bugReports.map((report) => (
                <div key={report.id} className="bg-black/30 rounded-lg p-4 border border-white/10">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-bold text-lg">{report.subject}</h3>
                        <div className={`px-2 py-1 rounded-full text-xs font-bold ${
                          report.priority === 'critical' ? 'bg-red-500/20 text-red-400' :
                          report.priority === 'high' ? 'bg-orange-500/20 text-orange-400' :
                          report.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-gray-500/20 text-gray-400'
                        }`}>
                          {report.priority}
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-bold ${
                          report.status === 'open' ? 'bg-blue-500/20 text-blue-400' :
                          report.status === 'in_progress' ? 'bg-yellow-500/20 text-yellow-400' :
                          report.status === 'resolved' ? 'bg-green-500/20 text-green-400' :
                          'bg-gray-500/20 text-gray-400'
                        }`}>
                          {report.status.replace('_', ' ')}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
                        <div className="flex items-center space-x-1">
                          <User className="h-4 w-4" />
                          <span>
                            {report.user?.email || 'Anonymous User'}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{new Date(report.createdAt).toLocaleString()}</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-300 mb-4">{report.message}</p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <select
                      value={report.status}
                      onChange={(e) => updateBugReportStatus(report.id, e.target.value)}
                      className="px-3 py-1 bg-black/30 border border-white/20 rounded text-sm"
                    >
                      <option value="open">Open</option>
                      <option value="in_progress">In Progress</option>
                      <option value="resolved">Resolved</option>
                      <option value="closed">Closed</option>
                    </select>
                    
                    <select
                      value={report.priority}
                      onChange={(e) => updateBugReportStatus(report.id, report.status, e.target.value)}
                      className="px-3 py-1 bg-black/30 border border-white/20 rounded text-sm"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="critical">Critical</option>
                    </select>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-400 py-8">
                <Bug className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>No bug reports found</p>
                <p className="text-sm">Reports will appear here when users submit them</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;