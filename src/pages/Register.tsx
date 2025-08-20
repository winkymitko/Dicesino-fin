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
  User,
  ChevronDown,
  ChevronUp,
  BarChart3
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
  const [expandedUserStats, setExpandedUserStats] = useState<string | null>(null);
  const [userStats, setUserStats] = useState<{[key: string]: any}>({});

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

  const fetchUserStats = async (userId: string) => {
    if (userStats[userId]) {
      // Already fetched, just toggle
      setExpandedUserStats(expandedUserStats === userId ? null : userId);
      return;
    }

    try {
      const response = await fetch(`/api/admin/users/${userId}/stats`, {
        credentials: 'include'
      });
      if (response.ok) {
        const data = await response.json();
        setUserStats(prev => ({ ...prev, [userId]: data }));
        setExpandedUserStats(userId);
      }
    } catch (error) {
      console.error('Failed to fetch user stats:', error);
    }
  };

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
      const response = await fetch('/api/admin/bug-reports', {
        credentials: 'include'
      });
      if (response.ok) {
        const data = await response.json();
        setBugReports(data.bugReports || []);
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 flex items-center justify-center">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 via-blue-500/20 to-purple-500/20 rounded-3xl blur-2xl"></div>
            <div className="relative bg-gradient-to-br from-gray-800/90 via-gray-900/90 to-gray-800/90 backdrop-blur-sm rounded-3xl border border-white/20 p-10">
              <div className="text-center mb-10">
                <div className="relative inline-block mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl blur-lg opacity-75"></div>
                  <div className="relative bg-gradient-to-r from-green-500 to-blue-600 p-4 rounded-2xl">
                    <UserPlus className="h-12 w-12 text-white" />
                  </div>
                </div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-transparent mb-3">
                  Join DiceSino
                </h1>
                <p className="text-gray-300 text-lg">Create your premium casino account</p>
              </div>

              {error && (
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-xl blur-lg"></div>
                  <div className="relative bg-red-500/10 border border-red-500/30 text-red-400 px-6 py-4 rounded-xl">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                      <span>{error}</span>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold mb-3 text-gray-200">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-6 py-4 bg-black/50 border border-white/20 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all text-white placeholder-gray-400"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold mb-3 text-gray-200">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-6 py-4 bg-black/50 border border-white/20 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all text-white placeholder-gray-400"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-semibold mb-3 text-gray-200">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-6 py-4 bg-black/50 border border-white/20 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all text-white placeholder-gray-400"
                    placeholder="Create a strong password"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-semibold mb-3 text-gray-200">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-6 py-4 bg-black/50 border border-white/20 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all text-white placeholder-gray-400"
                    placeholder="Confirm your password"
                    required
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl blur-lg opacity-75"></div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="relative w-full bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 hover:from-green-400 hover:via-blue-400 hover:to-purple-400 disabled:opacity-50 text-white font-bold py-4 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 shadow-2xl"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Creating Account...</span>
                      </div>
                    ) : (
                      <span>🚀 Create Casino Account</span>
                    )}
                  </button>
                </div>
              </form>

              <div className="text-center mt-8">
                <p className="text-gray-300 text-lg">
                  Already have an account?{' '}
                  <Link to="/login" className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent hover:from-blue-300 hover:to-purple-400 font-bold transition-all">
                    Login here
                  </Link>
                </p>
              </div>

              <div className="relative mt-8">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl blur-lg"></div>
                <div className="relative bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-6 text-center">
                  <div className="text-2xl mb-2">🎁</div>
                  <p className="text-green-400 font-bold text-lg">
                    Welcome Bonus: $1000 Virtual Money!
                  </p>
                  <p className="text-gray-300 text-sm mt-2">
                    Start playing immediately with demo funds
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;