import React, { useState } from 'react';
import { Upload, CheckCircle, AlertTriangle, Clock, RefreshCw, Database, Link, Activity, FileText } from 'lucide-react';

const ServicerWorkbench: React.FC = () => {
  const [activeTab, setActiveTab] = useState('tasks');

  const tasks = [
    {
      id: 'task-001',
      type: 'data_upload',
      title: '月度资产表现数据上报',
      description: '上传2024年1月资产池表现数据',
      priority: 'high',
      status: 'pending',
      dueDate: '2024-01-15',
      assignee: 'Data Team'
    },
    {
      id: 'task-002',
      type: 'reconciliation',
      title: '现金流对账确认',
      description: '确认资产池CCP24Q1的现金流分配',
      priority: 'medium',
      status: 'in_progress',
      dueDate: '2024-01-12',
      assignee: 'Finance Team'
    },
    {
      id: 'task-003',
      type: 'exception',
      title: '异常交易处理',
      description: '处理投资者转让限制异常',
      priority: 'high',
      status: 'completed',
      dueDate: '2024-01-10',
      assignee: 'Compliance Team'
    }
  ];

  const apiHealth = [
    {
      endpoint: '/api/v1/asset-data',
      status: 'healthy',
      responseTime: '145ms',
      lastCheck: '2024-01-15 14:30:22',
      uptime: '99.98%'
    },
    {
      endpoint: '/api/v1/cash-flows',
      status: 'healthy',
      responseTime: '89ms',
      lastCheck: '2024-01-15 14:30:18',
      uptime: '99.95%'
    },
    {
      endpoint: '/api/v1/compliance-check',
      status: 'warning',
      responseTime: '2.3s',
      lastCheck: '2024-01-15 14:29:45',
      uptime: '98.12%'
    },
    {
      endpoint: '/api/v1/blockchain-sync',
      status: 'healthy',
      responseTime: '234ms',
      lastCheck: '2024-01-15 14:30:15',
      uptime: '99.87%'
    }
  ];

  const complianceAlerts = [
    {
      id: 'alert-001',
      type: 'transfer_blocked',
      message: '检测到受限投资者尝试转让，已自动拦截',
      timestamp: '2024-01-15 13:45:22',
      severity: 'high',
      resolved: false
    },
    {
      id: 'alert-002',
      type: 'whitelist_hit',
      message: '新投资者已通过白名单验证',
      timestamp: '2024-01-15 12:30:15',
      severity: 'info',
      resolved: true
    },
    {
      id: 'alert-003',
      type: 'jurisdiction_violation',
      message: '检测到非授权司法辖区访问尝试',
      timestamp: '2024-01-15 11:15:33',
      severity: 'medium',
      resolved: false
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-400" />;
      case 'error':
        return <AlertTriangle className="h-4 w-4 text-red-400" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getTaskStatusBadge = (status: string) => {
    const statusMap = {
      'pending': { label: '待处理', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
      'in_progress': { label: '进行中', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
      'completed': { label: '已完成', color: 'bg-green-500/20 text-green-400 border-green-500/30' }
    };
    
    const statusInfo = statusMap[status as keyof typeof statusMap];
    return (
      <span className={`px-2 py-1 rounded text-xs border ${statusInfo.color}`}>
        {statusInfo.label}
      </span>
    );
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-400';
      case 'medium':
        return 'text-yellow-400';
      case 'low':
        return 'text-green-400';
      default:
        return 'text-gray-400';
    }
  };

  const tabs = [
    { id: 'tasks', name: '任务管理', count: tasks.filter(t => t.status !== 'completed').length },
    { id: 'api', name: 'API健康度', count: apiHealth.filter(a => a.status !== 'healthy').length },
    { id: 'compliance', name: '合规告警', count: complianceAlerts.filter(a => !a.resolved).length }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            服务商工作台
          </h1>
          <p className="text-gray-400 mt-2">数据上报、对账处理与合规监控</p>
        </div>
        
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            刷新状态
          </button>
          <button className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors flex items-center gap-2">
            <Upload className="h-4 w-4" />
            批量上传
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
          <div className="flex items-center mb-3">
            <FileText className="h-5 w-5 text-blue-400 mr-2" />
            <span className="text-sm text-gray-400">待处理任务</span>
          </div>
          <div className="text-2xl font-bold text-white">{tasks.filter(t => t.status === 'pending').length}</div>
        </div>
        
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
          <div className="flex items-center mb-3">
            <Activity className="h-5 w-5 text-green-400 mr-2" />
            <span className="text-sm text-gray-400">API健康度</span>
          </div>
          <div className="text-2xl font-bold text-green-400">
            {((apiHealth.filter(a => a.status === 'healthy').length / apiHealth.length) * 100).toFixed(0)}%
          </div>
        </div>
        
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
          <div className="flex items-center mb-3">
            <AlertTriangle className="h-5 w-5 text-yellow-400 mr-2" />
            <span className="text-sm text-gray-400">未解决告警</span>
          </div>
          <div className="text-2xl font-bold text-yellow-400">
            {complianceAlerts.filter(a => !a.resolved).length}
          </div>
        </div>
        
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
          <div className="flex items-center mb-3">
            <Database className="h-5 w-5 text-purple-400 mr-2" />
            <span className="text-sm text-gray-400">数据同步率</span>
          </div>
          <div className="text-2xl font-bold text-purple-400">99.2%</div>
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
                  ? 'border-cyan-500 text-cyan-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
              }`}
            >
              {tab.name}
              {tab.count > 0 && (
                <span className="ml-2 px-2 py-1 text-xs bg-red-500 text-white rounded-full">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'tasks' && (
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden">
          <div className="p-6 border-b border-gray-600/30">
            <h3 className="text-lg font-semibold text-white">任务列表</h3>
          </div>
          <div className="divide-y divide-gray-600/30">
            {tasks.map((task) => (
              <div key={task.id} className="p-6 hover:bg-gray-700/20 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-white font-medium">{task.title}</h4>
                      {getTaskStatusBadge(task.status)}
                      <span className={`text-xs font-medium ${getPriorityColor(task.priority)}`}>
                        {task.priority === 'high' ? '高优先级' : task.priority === 'medium' ? '中优先级' : '低优先级'}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mb-2">{task.description}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>截止日期: {task.dueDate}</span>
                      <span>负责人: {task.assignee}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {task.status === 'pending' && (
                      <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm transition-colors">
                        开始处理
                      </button>
                    )}
                    {task.status === 'in_progress' && (
                      <button className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded text-sm transition-colors">
                        标记完成
                      </button>
                    )}
                    <button className="px-3 py-1 border border-gray-600 hover:bg-gray-800 rounded text-sm transition-colors">
                      查看详情
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'api' && (
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden">
          <div className="p-6 border-b border-gray-600/30">
            <h3 className="text-lg font-semibold text-white">API接口健康度</h3>
          </div>
          <div className="divide-y divide-gray-600/30">
            {apiHealth.map((api, index) => (
              <div key={index} className="p-6 hover:bg-gray-700/20 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(api.status)}
                    <div>
                      <h4 className="text-white font-medium">{api.endpoint}</h4>
                      <p className="text-gray-400 text-sm">最后检查: {api.lastCheck}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 text-sm">
                    <div className="text-center">
                      <div className="text-white font-medium">{api.responseTime}</div>
                      <div className="text-gray-400">响应时间</div>
                    </div>
                    <div className="text-center">
                      <div className="text-green-400 font-medium">{api.uptime}</div>
                      <div className="text-gray-400">可用性</div>
                    </div>
                    <button className="px-3 py-1 border border-gray-600 hover:bg-gray-800 rounded transition-colors">
                      测试
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'compliance' && (
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden">
          <div className="p-6 border-b border-gray-600/30">
            <h3 className="text-lg font-semibold text-white">合规告警</h3>
          </div>
          <div className="divide-y divide-gray-600/30">
            {complianceAlerts.map((alert) => (
              <div key={alert.id} className="p-6 hover:bg-gray-700/20 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <AlertTriangle className={`h-4 w-4 ${
                        alert.severity === 'high' ? 'text-red-400' : 
                        alert.severity === 'medium' ? 'text-yellow-400' : 'text-blue-400'
                      }`} />
                      <span className={`px-2 py-1 rounded text-xs border ${
                        alert.severity === 'high' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                        alert.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                        'bg-blue-500/20 text-blue-400 border-blue-500/30'
                      }`}>
                        {alert.severity === 'high' ? '高风险' : alert.severity === 'medium' ? '中风险' : '信息'}
                      </span>
                      {alert.resolved && (
                        <span className="px-2 py-1 rounded text-xs bg-green-500/20 text-green-400 border border-green-500/30">
                          已解决
                        </span>
                      )}
                    </div>
                    <p className="text-white mb-1">{alert.message}</p>
                    <p className="text-gray-400 text-sm">{alert.timestamp}</p>
                  </div>
                  <div className="flex gap-2">
                    {!alert.resolved && (
                      <button className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded text-sm transition-colors">
                        标记解决
                      </button>
                    )}
                    <button className="px-3 py-1 border border-gray-600 hover:bg-gray-800 rounded text-sm transition-colors">
                      查看详情
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicerWorkbench;