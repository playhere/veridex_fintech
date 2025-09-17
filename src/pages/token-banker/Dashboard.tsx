import React from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Shield, 
  AlertTriangle,
  Activity,
  Clock,
  BarChart3,
  Layers,
  CheckCircle,
  RefreshCw
} from 'lucide-react';

const TokenBankerDashboard: React.FC = () => {
  const kpiData = [
    {
      title: '承销管道价值',
      value: '$847M',
      change: '+23.5%',
      trend: 'up',
      icon: DollarSign,
      description: '当前承销管道总价值'
    },
    {
      title: '活跃交易',
      value: '12',
      change: '+3',
      trend: 'up',
      icon: Activity,
      description: '正在进行的承销交易'
    },
    {
      title: '合规通过率',
      value: '94.2%',
      change: '+1.8%',
      trend: 'up',
      icon: Shield,
      description: 'KYC/KYB验证通过率'
    },
    {
      title: '流动性TVL',
      value: '$156M',
      change: '+8.7%',
      trend: 'up',
      icon: Layers,
      description: '做市池总锁定价值'
    }
  ];

  const recentDeals = [
    {
      id: 'deal-001',
      name: '消费信贷ABS 2024-Q1',
      issuer: 'ABC金融集团',
      size: '$125M',
      status: 'roadshow',
      stage: '路演阶段',
      bookBuild: '45%',
      pricing: 'TBD',
      timeline: '15天'
    },
    {
      id: 'deal-002',
      name: '绿色债券资产包',
      issuer: 'Green Finance Corp',
      size: '$210M',
      status: 'bookbuild',
      stage: '簿记建档',
      bookBuild: '78%',
      pricing: '7.2%',
      timeline: '8天'
    },
    {
      id: 'deal-003',
      name: '汽车抵押贷款池',
      issuer: 'AutoLoan Securities',
      size: '$156M',
      status: 'allocation',
      stage: '配售分配',
      bookBuild: '156%',
      pricing: '7.8%',
      timeline: '3天'
    }
  ];

  const alerts = [
    {
      type: 'compliance',
      severity: 'high',
      message: '检测到3个高风险KYC案例需要人工审核',
      timestamp: '2024-01-15 14:30:22'
    },
    {
      type: 'liquidity',
      severity: 'medium',
      message: 'CCP24Q1做市池流动性不足，建议增加资金',
      timestamp: '2024-01-15 13:45:18'
    },
    {
      type: 'treasury',
      severity: 'low',
      message: '多签钱包有2笔交易等待审批',
      timestamp: '2024-01-15 12:15:33'
    }
  ];

  const marketMetrics = [
    { label: '24h交易量', value: '$2.4M', change: '+12.5%', trend: 'up' },
    { label: '活跃做市商', value: '8', change: '+2', trend: 'up' },
    { label: '平均价差', value: '0.15%', change: '-0.02%', trend: 'down' },
    { label: '流动性利用率', value: '67%', change: '+5%', trend: 'up' }
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            数字投行控制台
          </h1>
          <p className="text-gray-400 mt-2">承销管理、合规引擎与流动性做市的统一平台</p>
        </div>
        
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            刷新数据
          </button>
          <Link
            to="/token-banker/underwriting"
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
          >
            新建承销项目
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <div
              key={index}
              className="p-6 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
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
              <p className="text-gray-500 text-xs mt-1">{kpi.description}</p>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Deals */}
        <div className="lg:col-span-2">
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white">活跃承销项目</h2>
              <Link
                to="/token-banker/underwriting"
                className="text-purple-400 hover:text-purple-300 text-sm font-medium"
              >
                查看全部 →
              </Link>
            </div>
            
            <div className="space-y-4">
              {recentDeals.map((deal) => (
                <div
                  key={deal.id}
                  className="p-4 bg-gray-700/20 rounded-lg border border-gray-600/30 hover:border-purple-500/30 transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-medium text-white">{deal.name}</h3>
                      <p className="text-gray-400 text-sm">{deal.issuer} • {deal.size}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs border ${
                      deal.status === 'allocation' 
                        ? 'bg-green-500/20 text-green-400 border-green-500/30'
                        : deal.status === 'bookbuild'
                        ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                        : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                    }`}>
                      {deal.stage}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">簿记进度:</span>
                      <div className="text-white font-medium">{deal.bookBuild}</div>
                    </div>
                    <div>
                      <span className="text-gray-400">定价:</span>
                      <div className="text-green-400 font-medium">{deal.pricing}</div>
                    </div>
                    <div>
                      <span className="text-gray-400">剩余时间:</span>
                      <div className="text-white">{deal.timeline}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Alerts & Quick Actions */}
        <div className="space-y-6">
          {/* System Alerts */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
            <h2 className="text-xl font-semibold text-white mb-4">系统告警</h2>
            <div className="space-y-3">
              {alerts.map((alert, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg border text-sm ${
                    alert.severity === 'high'
                      ? 'bg-red-500/10 border-red-500/30 text-red-400'
                      : alert.severity === 'medium'
                      ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400'
                      : 'bg-blue-500/10 border-blue-500/30 text-blue-400'
                  }`}
                >
                  <div className="font-medium mb-1">{alert.message}</div>
                  <div className="text-xs opacity-75">{alert.timestamp}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Market Metrics */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
            <h2 className="text-xl font-semibold text-white mb-4">市场指标</h2>
            <div className="space-y-3">
              {marketMetrics.map((metric, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">{metric.label}</span>
                  <div className="text-right">
                    <div className="text-white font-medium">{metric.value}</div>
                    <div className={`text-xs ${
                      metric.trend === 'up' ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {metric.change}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
            <h2 className="text-xl font-semibold text-white mb-4">快捷操作</h2>
            <div className="space-y-3">
              <Link
                to="/token-banker/compliance"
                className="w-full p-3 text-left bg-gray-700/20 hover:bg-gray-700/40 rounded-lg border border-gray-600/30 hover:border-purple-500/30 transition-all duration-300 block"
              >
                <div className="font-medium text-white">处理合规案例</div>
                <div className="text-gray-400 text-sm">3个高风险案例待审核</div>
              </Link>
              <Link
                to="/token-banker/liquidity"
                className="w-full p-3 text-left bg-gray-700/20 hover:bg-gray-700/40 rounded-lg border border-gray-600/30 hover:border-purple-500/30 transition-all duration-300 block"
              >
                <div className="font-medium text-white">调整做市参数</div>
                <div className="text-gray-400 text-sm">优化流动性配置</div>
              </Link>
              <Link
                to="/token-banker/treasury"
                className="w-full p-3 text-left bg-gray-700/20 hover:bg-gray-700/40 rounded-lg border border-gray-600/30 hover:border-purple-500/30 transition-all duration-300 block"
              >
                <div className="font-medium text-white">审批资金操作</div>
                <div className="text-gray-400 text-sm">2笔交易等待多签</div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
        <h2 className="text-xl font-semibold text-white mb-6">最近活动</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-3 bg-gray-700/20 rounded-lg">
            <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
              <CheckCircle className="h-4 w-4 text-green-400" />
            </div>
            <div className="flex-1">
              <div className="text-white font-medium">绿色债券资产包簿记建档完成</div>
              <div className="text-gray-400 text-sm">超额认购56%，准备进入配售阶段</div>
            </div>
            <div className="text-gray-400 text-sm">2小时前</div>
          </div>
          
          <div className="flex items-center gap-4 p-3 bg-gray-700/20 rounded-lg">
            <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
              <Users className="h-4 w-4 text-blue-400" />
            </div>
            <div className="flex-1">
              <div className="text-white font-medium">新增12个合格投资者通过KYC验证</div>
              <div className="text-gray-400 text-sm">累计验证投资者达到2,456人</div>
            </div>
            <div className="text-gray-400 text-sm">4小时前</div>
          </div>
          
          <div className="flex items-center gap-4 p-3 bg-gray-700/20 rounded-lg">
            <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
              <BarChart3 className="h-4 w-4 text-purple-400" />
            </div>
            <div className="flex-1">
              <div className="text-white font-medium">ALCP2024做市池参数调整完成</div>
              <div className="text-gray-400 text-sm">价差收窄至0.12%，流动性提升23%</div>
            </div>
            <div className="text-gray-400 text-sm">6小时前</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenBankerDashboard;