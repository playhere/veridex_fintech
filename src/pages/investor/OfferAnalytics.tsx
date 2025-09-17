import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  ArrowLeft, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Calendar,
  BarChart3,
  PieChart,
  Activity,
  Target,
  Clock,
  AlertCircle
} from 'lucide-react';

const OfferAnalytics: React.FC = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('performance');

  const tabs = [
    { id: 'performance', label: 'Performance', icon: TrendingUp },
    { id: 'subscription', label: 'Subscription', icon: Users },
    { id: 'cashflow', label: 'Cash Flow', icon: DollarSign },
    { id: 'risk', label: 'Risk Analysis', icon: AlertCircle }
  ];

  const performanceMetrics = [
    { label: 'Current Yield', value: '8.2%', change: '+0.3%', trend: 'up' },
    { label: 'Total Return', value: '12.4%', change: '+1.2%', trend: 'up' },
    { label: 'Volatility', value: '4.1%', change: '-0.2%', trend: 'down' },
    { label: 'Sharpe Ratio', value: '1.85', change: '+0.15', trend: 'up' }
  ];

  const subscriptionData = [
    { label: 'Total Subscriptions', value: '$2.4M', percentage: '96%' },
    { label: 'Number of Investors', value: '127', percentage: '85%' },
    { label: 'Average Investment', value: '$18,900', percentage: '+12%' },
    { label: 'Subscription Rate', value: '96.2%', percentage: '+4.2%' }
  ];

  const cashFlowData = [
    { month: 'Jan', inflow: 245000, outflow: 12000 },
    { month: 'Feb', inflow: 280000, outflow: 15000 },
    { month: 'Mar', inflow: 320000, outflow: 18000 },
    { month: 'Apr', inflow: 295000, outflow: 16000 },
    { month: 'May', inflow: 340000, outflow: 20000 },
    { month: 'Jun', inflow: 385000, outflow: 22000 }
  ];

  const riskMetrics = [
    { category: 'Credit Risk', score: 'A-', status: 'Low', color: 'green' },
    { category: 'Market Risk', score: 'B+', status: 'Medium', color: 'yellow' },
    { category: 'Liquidity Risk', score: 'A', status: 'Low', color: 'green' },
    { category: 'Operational Risk', score: 'B', status: 'Medium', color: 'yellow' }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-3xl font-bold">Offer Analytics</h1>
              <p className="text-gray-400">Commercial Real Estate Fund - Series A</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <select className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white">
              <option>Last 6 Months</option>
              <option>Last Year</option>
              <option>All Time</option>
            </select>
            <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors">
              Export Report
            </button>
          </div>
        </div>

        {/* Key Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="w-8 h-8 text-green-400" />
              <span className="text-green-400 text-sm">+12.4%</span>
            </div>
            <h3 className="text-2xl font-bold">$2.4M</h3>
            <p className="text-gray-400">Total Raised</p>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-8 h-8 text-blue-400" />
              <span className="text-blue-400 text-sm">+8</span>
            </div>
            <h3 className="text-2xl font-bold">127</h3>
            <p className="text-gray-400">Active Investors</p>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-8 h-8 text-purple-400" />
              <span className="text-purple-400 text-sm">+0.3%</span>
            </div>
            <h3 className="text-2xl font-bold">8.2%</h3>
            <p className="text-gray-400">Current Yield</p>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <Target className="w-8 h-8 text-orange-400" />
              <span className="text-orange-400 text-sm">96%</span>
            </div>
            <h3 className="text-2xl font-bold">$2.5M</h3>
            <p className="text-gray-400">Target Size</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-8 bg-gray-800/30 p-1 rounded-xl">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        {activeTab === 'performance' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {performanceMetrics.map((metric, index) => (
                <div key={index} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-gray-400">{metric.label}</h4>
                    <div className={`flex items-center space-x-1 ${
                      metric.trend === 'up' ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {metric.trend === 'up' ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      <span className="text-sm">{metric.change}</span>
                    </div>
                  </div>
                  <p className="text-2xl font-bold">{metric.value}</p>
                </div>
              ))}
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                Performance Chart
              </h3>
              <div className="h-64 bg-gray-900/50 rounded-lg flex items-center justify-center">
                <p className="text-gray-400">Performance chart visualization would go here</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'subscription' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {subscriptionData.map((item, index) => (
                <div key={index} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                  <h4 className="text-gray-400 mb-2">{item.label}</h4>
                  <p className="text-2xl font-bold mb-1">{item.value}</p>
                  <p className="text-sm text-blue-400">{item.percentage}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <PieChart className="w-5 h-5 mr-2" />
                  Investor Distribution
                </h3>
                <div className="h-48 bg-gray-900/50 rounded-lg flex items-center justify-center">
                  <p className="text-gray-400">Investor distribution chart would go here</p>
                </div>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Activity className="w-5 h-5 mr-2" />
                  Subscription Timeline
                </h3>
                <div className="h-48 bg-gray-900/50 rounded-lg flex items-center justify-center">
                  <p className="text-gray-400">Subscription timeline would go here</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'cashflow' && (
          <div className="space-y-6">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <DollarSign className="w-5 h-5 mr-2" />
                Cash Flow Analysis
              </h3>
              <div className="h-64 bg-gray-900/50 rounded-lg flex items-center justify-center">
                <p className="text-gray-400">Cash flow chart visualization would go here</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                <h4 className="text-lg font-semibold mb-4">Monthly Inflows</h4>
                <div className="space-y-3">
                  {cashFlowData.slice(-3).map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-gray-400">{item.month}</span>
                      <span className="font-semibold">${(item.inflow / 1000).toFixed(0)}K</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                <h4 className="text-lg font-semibold mb-4">Monthly Outflows</h4>
                <div className="space-y-3">
                  {cashFlowData.slice(-3).map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-gray-400">{item.month}</span>
                      <span className="font-semibold">${(item.outflow / 1000).toFixed(0)}K</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'risk' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {riskMetrics.map((risk, index) => (
                <div key={index} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold">{risk.category}</h4>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      risk.color === 'green' 
                        ? 'bg-green-900/50 text-green-400 border border-green-700' 
                        : 'bg-yellow-900/50 text-yellow-400 border border-yellow-700'
                    }`}>
                      {risk.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">{risk.score}</span>
                    <AlertCircle className={`w-6 h-6 ${
                      risk.color === 'green' ? 'text-green-400' : 'text-yellow-400'
                    }`} />
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <AlertCircle className="w-5 h-5 mr-2" />
                Risk Assessment Summary
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-green-900/20 border border-green-700 rounded-lg">
                  <h4 className="font-semibold text-green-400 mb-2">Low Risk Factors</h4>
                  <p className="text-gray-300">Strong credit profile, diversified asset base, experienced management team</p>
                </div>
                <div className="p-4 bg-yellow-900/20 border border-yellow-700 rounded-lg">
                  <h4 className="font-semibold text-yellow-400 mb-2">Medium Risk Factors</h4>
                  <p className="text-gray-300">Market volatility exposure, concentration in specific geographic regions</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OfferAnalytics;