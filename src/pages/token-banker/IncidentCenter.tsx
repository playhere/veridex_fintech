import React, { useState } from 'react';
import { 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Plus,
  Search,
  Filter,
  Eye,
  Settings,
  RefreshCw,
  Bell,
  Shield,
  Activity,
  TrendingUp
} from 'lucide-react';

const IncidentCenter: React.FC = () => {
  const [activeTab, setActiveTab] = useState('incidents');

  const incidents = [
    {
      id: 'inc-001',
      title: 'CCP24Q1流动性池价格异常',
      description: '检测到价格偏离基准超过5%，已触发自动暂停',
      severity: 'high',
      status: 'investigating',
      category: 'liquidity',
      reportedAt: '2024-01-15 13:45:22',
      assignedTo: 'Risk Team',
      affectedSystems: ['Liquidity Pools', 'Trading Engine'],
      estimatedImpact: 'Medium',
      updates: [
        {
          timestamp: '2024-01-15 14:30:22',
          user: 'Risk Manager',
          message: '已确认为外部市场波动导致，正在调整价格区间'
        },
        {
          timestamp: '2024-01-15 13:45:22',
          user: 'System',
          message: '自动检测到价格异常，触发保护机制'
        }
      ]
    },
    {
      id: 'inc-002',
      title: 'KYC验证服务响应缓慢',
      description: '第三方KYC服务响应时间超过30秒',
      severity: 'medium',
      status: 'resolved',
      category: 'compliance',
      reportedAt: '2024-01-15 10:15:33',
      assignedTo: 'DevOps Team',
      affectedSystems: ['KYC Service', 'Compliance Engine'],
      estimatedImpact: 'Low',
      resolvedAt: '2024-01-15 11:30:45'
    },
    {
      id: 'inc-003',
      title: '多签钱包交易延迟',
      description: '多签钱包交易确认时间超过预期',
      severity: 'low',
      status: 'monitoring',
      category: 'treasury',
      reportedAt: '2024-01-15 09:30:15',
      assignedTo: 'Treasury Team',
      affectedSystems: ['Multi-sig Wallet', 'Payment System'],
      estimatedImpact: 'Low'
    }
  ];

  const alertRules = [
    {
      id: 'alert-001',
      name: '流动性池价格偏离',
      category: 'liquidity',
      threshold: '价格偏离 > 5%',
      severity: 'high',
      status: 'active',
      triggerCount: 3,
      lastTriggered: '2024-01-15 13:45:22',
      actions: ['暂停交易', '通知风险团队', '记录事件']
    },
    {
      id: 'alert-002',
      name: 'KYC处理时间超限',
      category: 'compliance',
      threshold: '处理时间 > 4小时',
      severity: 'medium',
      status: 'active',
      triggerCount: 1,
      lastTriggered: '2024-01-14 16:20:15',
      actions: ['升级案例', '通知合规团队']
    },
    {
      id: 'alert-003',
      name: '资金限额接近上限',
      category: 'treasury',
      threshold: '日度限额利用率 > 80%',
      severity: 'medium',
      status: 'active',
      triggerCount: 0,
      lastTriggered: null,
      actions: ['通知财务团队', '记录警告']
    }
  ];

  const parameterChanges = [
    {
      id: 'param-001',
      name: '流动性池手续费调整',
      description: '将CCP24Q1池手续费从0.3%调整至0.25%',
      proposedBy: 'Liquidity Manager',
      proposedAt: '2024-01-15 12:00:00',
      timelockPeriod: '24小时',
      executionTime: '2024-01-16 12:00:00',
      status: 'pending',
      approvals: 2,
      requiredApprovals: 3,
      impact: 'Medium'
    },
    {
      id: 'param-002',
      name: 'KYC自动化阈值提升',
      description: '提高自动通过的风险评分阈值',
      proposedBy: 'Compliance Manager',
      proposedAt: '2024-01-14 15:30:00',
      timelockPeriod: '48小时',
      executionTime: '2024-01-16 15:30:00',
      status: 'approved',
      approvals: 3,
      requiredApprovals: 3,
      impact: 'High'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusMap = {
      'investigating': { label: '调查中', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
      'resolved': { label: '已解决', color: 'bg-green-500/20 text-green-400 border-green-500/30' },
      'monitoring': { label: '监控中', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
      'pending': { label: '待执行', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
      'approved': { label: '已批准', color: 'bg-green-500/20 text-green-400 border-green-500/30' },
      'active': { label: '启用', color: 'bg-green-500/20 text-green-400 border-green-500/30' }
    };
    
    const statusInfo = statusMap[status as keyof typeof statusMap];
    return (
      <span className={`px-2 py-1 rounded text-xs border ${statusInfo.color}`}>
        {statusInfo.label}
      </span>
    );
  };

  const getSeverityColor = (severity: string) => {
    const colorMap = {
      'high': 'text-red-400',
      'medium': 'text-yellow-400',
      'low': 'text-green-400'
    };
    return colorMap[severity as keyof typeof colorMap] || 'text-gray-400';
  };

  const tabs = [
    { id: 'incidents', name: '事件管理', count: incidents.filter(i => i.status !== 'resolved').length },
    { id: 'alerts', name: '告警规则', count: alertRules.filter(a => a.status === 'active').length },
    { id: 'parameters', name: '参数变更', count: parameterChanges.filter(p => p.status === 'pending').length },
    { id: 'announcements', name: '公告管理', count: null }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            事件管理中心
          </h1>
          <p className="text-gray-400 mt-2">事件注册、告警管理与参数变更的统一平台</p>
        </div>
        
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            刷新状态
          </button>
          <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center gap-2">
            <Plus className="h-4 w-4" />
            创建事件
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
          <div className="flex items-center mb-3">
            <AlertTriangle className="h-5 w-5 text-red-400 mr-2" />
            <span className="text-sm text-gray-400">活跃事件</span>
          </div>
          <div className="text-2xl font-bold text-red-400">
            {incidents.filter(i => i.status !== 'resolved').length}
          </div>
        </div>
        
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
          <div className="flex items-center mb-3">
            <Bell className="h-5 w-5 text-yellow-400 mr-2" />
            <span className="text-sm text-gray-400">今日告警</span>
          </div>
          <div className="text-2xl font-bold text-yellow-400">7</div>
          <div className="text-sm text-gray-400 mt-1">3个高优先级</div>
        </div>
        
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
          <div className="flex items-center mb-3">
            <Clock className="h-5 w-5 text-blue-400 mr-2" />
            <span className="text-sm text-gray-400">待执行变更</span>
          </div>
          <div className="text-2xl font-bold text-blue-400">
            {parameterChanges.filter(p => p.status === 'pending').length}
          </div>
        </div>
        
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
          <div className="flex items-center mb-3">
            <TrendingUp className="h-5 w-5 text-green-400 mr-2" />
            <span className="text-sm text-gray-400">平均解决时间</span>
          </div>
          <div className="text-2xl font-bold text-green-400">2.3h</div>
          <div className="text-sm text-green-400 mt-1">-15% vs 上月</div>
        </div>
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
              {tab.count !== null && tab.count > 0 && (
                <span className="ml-2 px-2 py-1 text-xs bg-red-500 text-white rounded-full">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'incidents' && (
        <div className="space-y-6">
          {incidents.map((incident) => (
            <div key={incident.id} className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-white">{incident.title}</h3>
                    <span className={`px-2 py-1 rounded text-xs border ${
                      incident.severity === 'high' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                      incident.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                      'bg-green-500/20 text-green-400 border-green-500/30'
                    }`}>
                      {incident.severity === 'high' ? '高' : 
                       incident.severity === 'medium' ? '中' : '低'}优先级
                    </span>
                    {getStatusBadge(incident.status)}
                  </div>
                  <p className="text-gray-400 mb-3">{incident.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">报告时间:</span>
                      <div className="text-white">{incident.reportedAt}</div>
                    </div>
                    <div>
                      <span className="text-gray-400">负责团队:</span>
                      <div className="text-white">{incident.assignedTo}</div>
                    </div>
                    <div>
                      <span className="text-gray-400">影响程度:</span>
                      <div className={`${
                        incident.estimatedImpact === 'High' ? 'text-red-400' :
                        incident.estimatedImpact === 'Medium' ? 'text-yellow-400' : 'text-green-400'
                      }`}>
                        {incident.estimatedImpact === 'High' ? '高' :
                         incident.estimatedImpact === 'Medium' ? '中' : '低'}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button className="px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded text-sm transition-colors">
                    更新状态
                  </button>
                  <button className="px-3 py-1 border border-gray-600 hover:bg-gray-800 rounded text-sm transition-colors flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    详情
                  </button>
                </div>
              </div>

              {/* Affected Systems */}
              <div className="mb-4">
                <div className="text-white font-medium mb-2">受影响系统</div>
                <div className="flex flex-wrap gap-2">
                  {incident.affectedSystems.map((system, index) => (
                    <span key={index} className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded border border-red-500/30">
                      {system}
                    </span>
                  ))}
                </div>
              </div>

              {/* Updates */}
              {incident.updates && (
                <div className="border-t border-gray-600/30 pt-4">
                  <div className="text-white font-medium mb-3">更新记录</div>
                  <div className="space-y-2">
                    {incident.updates.map((update, index) => (
                      <div key={index} className="flex gap-3 p-3 bg-gray-700/20 rounded-lg">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-white text-sm">{update.user}</span>
                            <span className="text-gray-400 text-xs">{update.timestamp}</span>
                          </div>
                          <div className="text-gray-300 text-sm">{update.message}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {activeTab === 'alerts' && (
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden">
          <div className="p-6 border-b border-gray-600/30">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-white">告警规则配置</h3>
              <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors">
                新建规则
              </button>
            </div>
          </div>
          
          <div className="divide-y divide-gray-600/30">
            {alertRules.map((rule) => (
              <div key={rule.id} className="p-6 hover:bg-gray-700/20 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-white font-medium">{rule.name}</h4>
                    <div className="text-gray-400 text-sm mt-1">触发条件: {rule.threshold}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-1 rounded text-xs border ${
                      rule.severity === 'high' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                      rule.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                      'bg-green-500/20 text-green-400 border-green-500/30'
                    }`}>
                      {rule.severity === 'high' ? '高' : 
                       rule.severity === 'medium' ? '中' : '低'}优先级
                    </span>
                    {getStatusBadge(rule.status)}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-4">
                  <div>
                    <span className="text-gray-400">触发次数:</span>
                    <span className="text-white ml-2">{rule.triggerCount}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">最后触发:</span>
                    <span className="text-white ml-2">{rule.lastTriggered || '从未'}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">规则类别:</span>
                    <span className="text-white ml-2">
                      {rule.category === 'liquidity' ? '流动性' :
                       rule.category === 'compliance' ? '合规' : '资金'}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-gray-700/20 rounded-lg">
                  <div className="text-white font-medium mb-2">自动化操作</div>
                  <div className="flex flex-wrap gap-2">
                    {rule.actions.map((action, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded border border-blue-500/30">
                        {action}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'parameters' && (
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden">
          <div className="p-6 border-b border-gray-600/30">
            <h3 className="text-lg font-semibold text-white">参数变更管理</h3>
          </div>
          
          <div className="divide-y divide-gray-600/30">
            {parameterChanges.map((change) => (
              <div key={change.id} className="p-6 hover:bg-gray-700/20 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-white font-medium">{change.name}</h4>
                    <p className="text-gray-400 text-sm mt-1">{change.description}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-1 rounded text-xs border ${
                      change.impact === 'High' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                      change.impact === 'Medium' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                      'bg-green-500/20 text-green-400 border-green-500/30'
                    }`}>
                      {change.impact === 'High' ? '高' : 
                       change.impact === 'Medium' ? '中' : '低'}影响
                    </span>
                    {getStatusBadge(change.status)}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-4">
                  <div>
                    <span className="text-gray-400">提议人:</span>
                    <span className="text-white ml-2">{change.proposedBy}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">时间锁:</span>
                    <span className="text-white ml-2">{change.timelockPeriod}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">执行时间:</span>
                    <span className="text-white ml-2">{change.executionTime}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-700/20 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">审批进度:</span>
                    <span className="text-white">{change.approvals}/{change.requiredApprovals}</span>
                    <div className="w-20 bg-gray-600 rounded-full h-2 ml-2">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                        style={{ width: `${(change.approvals / change.requiredApprovals) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    {change.status === 'pending' && (
                      <button className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded text-sm transition-colors">
                        批准
                      </button>
                    )}
                    <button className="px-3 py-1 border border-gray-600 hover:bg-gray-800 rounded text-sm transition-colors">
                      详情
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'announcements' && (
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-8 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">公告管理</h3>
            <p className="text-gray-400 mb-6">
              公告发布和通知管理功能正在开发中，敬请期待
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

export default IncidentCenter;