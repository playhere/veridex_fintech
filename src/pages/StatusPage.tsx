import React from 'react';
import { CheckCircle, AlertTriangle, Clock, RefreshCw, ExternalLink, Mail } from 'lucide-react';

const StatusPage: React.FC = () => {
  const systemStatus = {
    overall: 'operational', // operational, degraded, outage
    lastUpdated: '2024-01-15 14:30:22 UTC'
  };

  const services = [
    {
      name: '用户认证系统',
      status: 'operational',
      uptime: '99.98%',
      responseTime: '145ms'
    },
    {
      name: '资产池管理',
      status: 'operational',
      uptime: '99.95%',
      responseTime: '230ms'
    },
    {
      name: '区块链网络连接',
      status: 'degraded',
      uptime: '98.12%',
      responseTime: '1.2s',
      issue: 'Ethereum 网络拥堵导致交易确认延迟'
    },
    {
      name: '风险建模引擎',
      status: 'operational',
      uptime: '99.99%',
      responseTime: '89ms'
    },
    {
      name: '文档存储服务',
      status: 'operational',
      uptime: '99.97%',
      responseTime: '67ms'
    },
    {
      name: '合规验证服务',
      status: 'maintenance',
      uptime: '99.94%',
      responseTime: '-',
      issue: '定期维护中，预计16:00完成'
    }
  ];

  const recentIncidents = [
    {
      id: 'inc-001',
      title: 'Ethereum 网络交易延迟',
      status: 'investigating',
      severity: 'medium',
      startTime: '2024-01-15 13:45 UTC',
      description: '由于网络拥堵，部分代币化交易确认时间延长至15-30分钟',
      updates: [
        {
          time: '14:30 UTC',
          message: '我们正在监控网络状况，建议用户适当提高Gas费用以加快确认'
        },
        {
          time: '13:45 UTC',
          message: '检测到Ethereum网络拥堵，正在评估影响范围'
        }
      ]
    },
    {
      id: 'inc-002',
      title: '合规验证服务定期维护',
      status: 'scheduled',
      severity: 'low',
      startTime: '2024-01-15 14:00 UTC',
      endTime: '2024-01-15 16:00 UTC',
      description: '合规验证服务进行定期维护升级，期间新用户KYC验证可能延迟'
    }
  ];

  const pendingTransactions = [
    {
      id: 'tx-001',
      type: 'tokenization',
      asset: '消费信贷资产池 2024-Q1',
      status: 'pending',
      hash: '0xa1b2c3d4e5f6...',
      estimatedTime: '15-20分钟',
      gasPrice: '45 Gwei'
    },
    {
      id: 'tx-002',
      type: 'subscription',
      asset: '绿色债券资产包',
      status: 'confirming',
      hash: '0x9i8j7k6l5m4n...',
      confirmations: '8/12',
      estimatedTime: '5-10分钟'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational':
        return <CheckCircle className="h-5 w-5 text-green-400" />;
      case 'degraded':
        return <AlertTriangle className="h-5 w-5 text-yellow-400" />;
      case 'outage':
        return <AlertTriangle className="h-5 w-5 text-red-400" />;
      case 'maintenance':
        return <Clock className="h-5 w-5 text-blue-400" />;
      default:
        return <RefreshCw className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational':
        return 'text-green-400';
      case 'degraded':
        return 'text-yellow-400';
      case 'outage':
        return 'text-red-400';
      case 'maintenance':
        return 'text-blue-400';
      default:
        return 'text-gray-400';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'low':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4">
          系统状态监控
        </h1>
        <div className="flex items-center justify-center gap-2 mb-2">
          {getStatusIcon(systemStatus.overall)}
          <span className={`text-lg font-medium ${getStatusColor(systemStatus.overall)}`}>
            {systemStatus.overall === 'operational' ? '所有系统正常运行' : 
             systemStatus.overall === 'degraded' ? '部分服务受影响' : '系统故障'}
          </span>
        </div>
        <p className="text-gray-400">
          最后更新: {systemStatus.lastUpdated}
        </p>
      </div>

      {/* Services Status */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6">服务状态</h2>
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden">
          <div className="divide-y divide-gray-600/30">
            {services.map((service, index) => (
              <div key={index} className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(service.status)}
                    <h3 className="text-lg font-medium text-white">{service.name}</h3>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-gray-400">可用性: <span className="text-white">{service.uptime}</span></span>
                    <span className="text-gray-400">响应时间: <span className="text-white">{service.responseTime}</span></span>
                  </div>
                </div>
                {service.issue && (
                  <div className="ml-8 text-sm text-yellow-400">
                    {service.issue}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pending Transactions */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6">链上确认队列</h2>
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
          {pendingTransactions.length > 0 ? (
            <div className="space-y-4">
              {pendingTransactions.map((tx) => (
                <div key={tx.id} className="p-4 bg-gray-700/20 rounded-lg border border-gray-600/30">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="text-white font-medium">{tx.asset}</h4>
                      <p className="text-gray-400 text-sm">
                        {tx.type === 'tokenization' ? '代币化发行' : '认购交易'}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-1 rounded text-xs border ${
                        tx.status === 'pending' 
                          ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                          : 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                      }`}>
                        {tx.status === 'pending' ? '等待确认' : '确认中'}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400">交易哈希:</span>
                      <span className="text-cyan-400 font-mono">{tx.hash}</span>
                      <button className="text-gray-400 hover:text-white">
                        <ExternalLink className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="text-gray-400">
                      预计时间: <span className="text-white">{tx.estimatedTime}</span>
                    </div>
                  </div>
                  {tx.confirmations && (
                    <div className="mt-2">
                      <div className="flex justify-between text-sm text-gray-400 mb-1">
                        <span>确认进度</span>
                        <span>{tx.confirmations}</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-cyan-500 to-purple-500 h-2 rounded-full"
                          style={{ width: '67%' }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-4" />
              <p className="text-gray-400">当前没有待确认的交易</p>
            </div>
          )}
        </div>
      </section>

      {/* Recent Incidents */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6">近期事件</h2>
        <div className="space-y-4">
          {recentIncidents.map((incident) => (
            <div key={incident.id} className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-medium text-white">{incident.title}</h3>
                    <span className={`px-2 py-1 rounded text-xs border ${getSeverityColor(incident.severity)}`}>
                      {incident.severity === 'high' ? '高' : incident.severity === 'medium' ? '中' : '低'}优先级
                    </span>
                  </div>
                  <p className="text-gray-400 mb-2">{incident.description}</p>
                  <div className="text-sm text-gray-400">
                    开始时间: {incident.startTime}
                    {incident.endTime && ` - 结束时间: ${incident.endTime}`}
                  </div>
                </div>
                <span className={`px-3 py-1 rounded text-sm ${
                  incident.status === 'investigating' 
                    ? 'bg-yellow-500/20 text-yellow-400'
                    : incident.status === 'scheduled'
                    ? 'bg-blue-500/20 text-blue-400'
                    : 'bg-green-500/20 text-green-400'
                }`}>
                  {incident.status === 'investigating' ? '调查中' : 
                   incident.status === 'scheduled' ? '计划维护' : '已解决'}
                </span>
              </div>
              
              {incident.updates && (
                <div className="border-t border-gray-600/30 pt-4">
                  <h4 className="text-white font-medium mb-3">更新记录</h4>
                  <div className="space-y-2">
                    {incident.updates.map((update, index) => (
                      <div key={index} className="flex gap-3">
                        <span className="text-gray-400 text-sm flex-shrink-0">{update.time}</span>
                        <span className="text-gray-300 text-sm">{update.message}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Support Contact */}
      <section className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
        <h2 className="text-xl font-bold text-white mb-4">需要帮助？</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-white font-medium mb-2">技术支持</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-gray-400">邮箱: </span>
                <a href="mailto:support@platform.com" className="text-cyan-400 hover:text-cyan-300">
                  support@platform.com
                </a>
              </div>
              <div className="text-gray-400">
                工作时间: 周一至周五 9:00-18:00 (UTC+8)
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-2">紧急联系</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-gray-400">紧急邮箱: </span>
                <a href="mailto:emergency@platform.com" className="text-red-400 hover:text-red-300">
                  emergency@platform.com
                </a>
              </div>
              <div className="text-gray-400">
                7x24小时响应重大系统故障
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StatusPage;