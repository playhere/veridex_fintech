import React from 'react';
import { TrendingUp, TrendingDown, AlertTriangle, DollarSign, Layers, Users, BarChart3, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const IssuerDashboard: React.FC = () => {
  const kpiData = [
    {
      title: '资产管理规模',
      value: '$2,847,392,180',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign
    },
    {
      title: '活跃资产池',
      value: '156',
      change: '+8',
      trend: 'up',
      icon: Layers
    },
    {
      title: '30天逾期率',
      value: '2.34%',
      change: '-0.12%',
      trend: 'down',
      icon: AlertTriangle
    },
    {
      title: '平均违约率',
      value: '1.18%',
      change: '+0.05%',
      trend: 'up',
      icon: BarChart3
    }
  ];

  const recentPools = [
    {
      id: 'pool-001',
      name: '消费信贷资产池 2024-Q1',
      size: '$125M',
      status: '发行中',
      defaultRate: '1.2%',
      yield: '8.5%'
    },
    {
      id: 'pool-002',
      name: '中小企业贷款组合',
      size: '$89M',
      status: '结构化中',
      defaultRate: '2.1%',
      yield: '9.2%'
    },
    {
      id: 'pool-003',
      name: '汽车抵押贷款池',
      size: '$156M',
      status: '已上链',
      defaultRate: '0.8%',
      yield: '7.8%'
    }
  ];

  const alerts = [
    {
      type: 'warning',
      message: '资产池 #pool-045 的60天逾期率超过预警阈值'
    },
    {
      type: 'info',
      message: '新的合规规则更新，影响欧盟投资者准入'
    },
    {
      type: 'success',
      message: '资产池 #pool-038 代币化发行已完成'
    }
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            资产管理概览
          </h1>
          <p className="text-gray-400 mt-2">管理您的资产池组合和发行状态</p>
        </div>
        
        <div className="flex gap-3">
          <Link
            to="/issuer/pools/new"
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg font-medium hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 flex items-center gap-2"
          >
            <Plus className="h-5 w-5" />
            新建资产池
          </Link>
          <button className="px-6 py-3 border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors">
            导出报告
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <div
              key={index}
              className="p-6 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <div className={`flex items-center text-sm ${
                  kpi.trend === 'up' ? 'text-green-400' : 'text-red-400'
                }`}>
                  {kpi.trend === 'up' ? (
                    <TrendingUp className="h-4 w-4 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 mr-1" />
                  )}
                  {kpi.change}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">{kpi.value}</h3>
              <p className="text-gray-400 text-sm">{kpi.title}</p>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Pools */}
        <div className="lg:col-span-2">
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white">最新资产池</h2>
              <Link
                to="/issuer/pools"
                className="text-cyan-400 hover:text-cyan-300 text-sm font-medium"
              >
                查看全部 →
              </Link>
            </div>
            
            <div className="space-y-4">
              {recentPools.map((pool) => (
                <div
                  key={pool.id}
                  className="p-4 bg-gray-700/20 rounded-lg border border-gray-600/30 hover:border-cyan-500/30 transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-medium text-white">{pool.name}</h3>
                      <p className="text-gray-400 text-sm">规模: {pool.size}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs ${
                      pool.status === '已上链' 
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                        : pool.status === '发行中'
                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                        : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                    }`}>
                      {pool.status}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">违约率: <span className="text-white">{pool.defaultRate}</span></span>
                    <span className="text-gray-400">预期收益: <span className="text-green-400">{pool.yield}</span></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Alerts & Actions */}
        <div className="space-y-6">
          {/* Alerts */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
            <h2 className="text-xl font-semibold text-white mb-4">系统告警</h2>
            <div className="space-y-3">
              {alerts.map((alert, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg border text-sm ${
                    alert.type === 'warning'
                      ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400'
                      : alert.type === 'success'
                      ? 'bg-green-500/10 border-green-500/30 text-green-400'
                      : 'bg-blue-500/10 border-blue-500/30 text-blue-400'
                  }`}
                >
                  {alert.message}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
            <h2 className="text-xl font-semibold text-white mb-4">快捷操作</h2>
            <div className="space-y-3">
              <button className="w-full p-3 text-left bg-gray-700/20 hover:bg-gray-700/40 rounded-lg border border-gray-600/30 hover:border-cyan-500/30 transition-all duration-300">
                <div className="font-medium text-white">运行蒙特卡洛模拟</div>
                <div className="text-gray-400 text-sm">风险压力测试</div>
              </button>
              <button className="w-full p-3 text-left bg-gray-700/20 hover:bg-gray-700/40 rounded-lg border border-gray-600/30 hover:border-cyan-500/30 transition-all duration-300">
                <div className="font-medium text-white">生成合规报告</div>
                <div className="text-gray-400 text-sm">监管报送</div>
              </button>
              <button className="w-full p-3 text-left bg-gray-700/20 hover:bg-gray-700/40 rounded-lg border border-gray-600/30 hover:border-cyan-500/30 transition-all duration-300">
                <div className="font-medium text-white">更新白名单</div>
                <div className="text-gray-400 text-sm">合规管理</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssuerDashboard;