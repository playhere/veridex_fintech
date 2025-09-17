import React, { useState } from 'react';
import { 
  Plus, 
  Settings, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Activity,
  BarChart3,
  Layers,
  AlertTriangle,
  RefreshCw,
  Eye,
  Pause,
  Play
} from 'lucide-react';

const LiquidityDesk: React.FC = () => {
  const [activeTab, setActiveTab] = useState('pools');

  const liquidityPools = [
    {
      id: 'pool-001',
      tokenPair: 'CCP24Q1/USDC',
      tokenName: '消费信贷资产池 2024-Q1',
      tvl: '$12.5M',
      volume24h: '$2.4M',
      fees24h: '$3,600',
      apy: '12.5%',
      spread: '0.15%',
      utilization: '67%',
      status: 'active',
      priceRange: '$0.98 - $1.02',
      concentratedLiquidity: true,
      autoRebalance: true
    },
    {
      id: 'pool-002',
      tokenPair: 'GBAP2024/USDC',
      tokenName: '绿色债券资产包',
      tvl: '$8.9M',
      volume24h: '$1.8M',
      fees24h: '$2,700',
      apy: '15.2%',
      spread: '0.12%',
      utilization: '78%',
      status: 'active',
      priceRange: '$0.99 - $1.01',
      concentratedLiquidity: true,
      autoRebalance: false
    },
    {
      id: 'pool-003',
      tokenPair: 'ALCP2024/USDC',
      tokenName: '汽车抵押贷款池',
      tvl: '$15.2M',
      volume24h: '$3.1M',
      fees24h: '$4,650',
      apy: '18.8%',
      spread: '0.18%',
      utilization: '45%',
      status: 'paused',
      priceRange: '$1.00 - $1.05',
      concentratedLiquidity: false,
      autoRebalance: true
    }
  ];

  const marketMakingMetrics = [
    { label: '总TVL', value: '$36.6M', change: '+8.7%', trend: 'up' },
    { label: '24h交易量', value: '$7.3M', change: '+12.5%', trend: 'up' },
    { label: '24h手续费收入', value: '$10,950', change: '+15.2%', trend: 'up' },
    { label: '平均价差', value: '0.15%', change: '-0.02%', trend: 'down' }
  ];

  const concentratedBands = [
    {
      poolId: 'pool-001',
      bandId: 'band-001',
      priceRange: '$0.98 - $1.02',
      liquidity: '$5.2M',
      utilization: '85%',
      fees24h: '$1,560',
      status: 'active'
    },
    {
      poolId: 'pool-001',
      bandId: 'band-002',
      priceRange: '$0.95 - $1.05',
      liquidity: '$3.8M',
      utilization: '45%',
      fees24h: '$680',
      status: 'active'
    },
    {
      poolId: 'pool-002',
      bandId: 'band-003',
      priceRange: '$0.99 - $1.01',
      liquidity: '$4.1M',
      utilization: '92%',
      fees24h: '$1,840',
      status: 'active'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusMap = {
      'active': { label: '活跃', color: 'bg-green-500/20 text-green-400 border-green-500/30' },
      'paused': { label: '暂停', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
      'inactive': { label: '停用', color: 'bg-red-500/20 text-red-400 border-red-500/30' }
    };
    
    const statusInfo = statusMap[status as keyof typeof statusMap];
    return (
      <span className={`px-2 py-1 rounded text-xs border ${statusInfo.color}`}>
        {statusInfo.label}
      </span>
    );
  };

  const tabs = [
    { id: 'pools', name: '流动性池', count: liquidityPools.length },
    { id: 'bands', name: '集中流动性', count: concentratedBands.length },
    { id: 'monitoring', name: '实时监控', count: null },
    { id: 'settings', name: '参数配置', count: null }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            流动性做市台
          </h1>
          <p className="text-gray-400 mt-2">管理AMM/CLMM流动性池、价格区间与库存监控</p>
        </div>
        
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            刷新数据
          </button>
          <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center gap-2">
            <Plus className="h-4 w-4" />
            创建流动性池
          </button>
        </div>
      </div>

      {/* Market Making Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {marketMakingMetrics.map((metric, index) => (
          <div key={index} className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">{metric.label}</span>
              <div className={`flex items-center text-sm ${
                metric.trend === 'up' ? 'text-green-400' : 'text-red-400'
              }`}>
                {metric.trend === 'up' ? (
                  <TrendingUp className="h-4 w-4 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 mr-1" />
                )}
                {metric.change}
              </div>
            </div>
            <div className="text-2xl font-bold text-white">{metric.value}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-700">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-purple-500 text-purple-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
              }`}
            >
              {tab.name}
              {tab.count && (
                <span className="ml-2 px-2 py-1 text-xs bg-gray-700 rounded-full">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'pools' && (
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700/20 border-b border-gray-600">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">交易对</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">TVL</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">24h交易量</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">价差</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">利用率</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">APY</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">状态</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-600/30">
                {liquidityPools.map((pool) => (
                  <tr key={pool.id} className="hover:bg-gray-700/20 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-white">{pool.tokenPair}</div>
                        <div className="text-sm text-gray-400">{pool.tokenName}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-white font-medium">{pool.tvl}</td>
                    <td className="px-6 py-4 text-purple-400 font-medium">{pool.volume24h}</td>
                    <td className="px-6 py-4 text-white">{pool.spread}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                            style={{ width: pool.utilization }}
                          ></div>
                        </div>
                        <span className="text-white text-sm">{pool.utilization}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-green-400 font-medium">{pool.apy}</td>
                    <td className="px-6 py-4">{getStatusBadge(pool.status)}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button className="text-purple-400 hover:text-purple-300 text-sm flex items-center gap-1">
                          <Settings className="h-3 w-3" />
                          配置
                        </button>
                        <button className="text-gray-400 hover:text-gray-300 text-sm flex items-center gap-1">
                          {pool.status === 'active' ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                          {pool.status === 'active' ? '暂停' : '启动'}
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

      {activeTab === 'bands' && (
        <div className="space-y-6">
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-white">集中流动性区间</h3>
              <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors">
                新建区间
              </button>
            </div>
            
            <div className="space-y-4">
              {concentratedBands.map((band) => (
                <div key={band.bandId} className="p-4 bg-gray-700/20 rounded-lg border border-gray-600/30">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="text-white font-medium">
                        {liquidityPools.find(p => p.id === band.poolId)?.tokenPair}
                      </h4>
                      <div className="text-gray-400 text-sm">价格区间: {band.priceRange}</div>
                    </div>
                    {getStatusBadge(band.status)}
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">流动性:</span>
                      <div className="text-white font-medium">{band.liquidity}</div>
                    </div>
                    <div>
                      <span className="text-gray-400">利用率:</span>
                      <div className="text-purple-400 font-medium">{band.utilization}</div>
                    </div>
                    <div>
                      <span className="text-gray-400">24h手续费:</span>
                      <div className="text-green-400 font-medium">{band.fees24h}</div>
                    </div>
                    <div className="flex justify-end">
                      <button className="text-purple-400 hover:text-purple-300 text-sm flex items-center gap-1">
                        <Settings className="h-3 w-3" />
                        调整
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'monitoring' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">实时监控</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-700/20 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-white">价格偏离监控</span>
                </div>
                <span className="text-green-400">正常</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-700/20 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                  <span className="text-white">流动性深度</span>
                </div>
                <span className="text-yellow-400">关注</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-700/20 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-white">滑点控制</span>
                </div>
                <span className="text-green-400">正常</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">风险控制</h3>
            <div className="space-y-4">
              <div className="p-3 bg-gray-700/20 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white">波动性保护</span>
                  <span className="text-green-400">启用</span>
                </div>
                <div className="text-gray-400 text-sm">当价格波动超过5%时自动暂停交易</div>
              </div>
              
              <div className="p-3 bg-gray-700/20 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white">库存限制</span>
                  <span className="text-yellow-400">75%</span>
                </div>
                <div className="text-gray-400 text-sm">当前库存占比，接近80%上限</div>
              </div>
              
              <div className="p-3 bg-gray-700/20 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white">紧急停止</span>
                  <span className="text-green-400">就绪</span>
                </div>
                <div className="text-gray-400 text-sm">黑天鹅事件应急预案已激活</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-8 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Settings className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">参数配置</h3>
            <p className="text-gray-400 mb-6">
              流动性池参数配置功能正在开发中，敬请期待
            </p>
            <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300">
              敬请期待
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiquidityDesk;