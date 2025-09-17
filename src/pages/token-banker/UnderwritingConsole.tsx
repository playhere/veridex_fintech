import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  BarChart3, 
  Users, 
  DollarSign, 
  Clock,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Eye,
  Settings
} from 'lucide-react';

const UnderwritingConsole: React.FC = () => {
  const [activeView, setActiveView] = useState('kanban');
  const [selectedDeal, setSelectedDeal] = useState<string | null>(null);

  const deals = [
    {
      id: 'deal-001',
      name: '消费信贷ABS 2024-Q1',
      issuer: 'ABC金融集团',
      size: '$125M',
      status: 'roadshow',
      stage: '路演阶段',
      bookBuild: '45%',
      pricing: 'TBD',
      timeline: '15天',
      priority: 'high',
      leadManager: 'John Smith',
      coManagers: ['Bank A', 'Bank B'],
      targetInvestors: 150,
      currentInvestors: 68,
      roadshowMeetings: 12,
      completedMeetings: 8
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
      timeline: '8天',
      priority: 'high',
      leadManager: 'Sarah Johnson',
      coManagers: ['Bank C', 'Bank D'],
      targetInvestors: 200,
      currentInvestors: 156,
      orderBook: '$163.8M',
      allocationPending: true
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
      timeline: '3天',
      priority: 'medium',
      leadManager: 'Mike Chen',
      coManagers: ['Bank E'],
      targetInvestors: 120,
      currentInvestors: 187,
      orderBook: '$243.4M',
      allocationCompleted: false
    }
  ];

  const kanbanColumns = [
    { id: 'intake', title: '项目接洽', deals: deals.filter(d => d.status === 'intake') },
    { id: 'roadshow', title: '路演阶段', deals: deals.filter(d => d.status === 'roadshow') },
    { id: 'bookbuild', title: '簿记建档', deals: deals.filter(d => d.status === 'bookbuild') },
    { id: 'allocation', title: '配售分配', deals: deals.filter(d => d.status === 'allocation') },
    { id: 'settlement', title: '清算交割', deals: deals.filter(d => d.status === 'settlement') }
  ];

  const getStatusColor = (status: string) => {
    const colorMap = {
      'intake': 'bg-gray-500/20 text-gray-400 border-gray-500/30',
      'roadshow': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'bookbuild': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'allocation': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      'settlement': 'bg-green-500/20 text-green-400 border-green-500/30'
    };
    return colorMap[status as keyof typeof colorMap] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  const getPriorityColor = (priority: string) => {
    const colorMap = {
      'high': 'text-red-400',
      'medium': 'text-yellow-400',
      'low': 'text-green-400'
    };
    return colorMap[priority as keyof typeof colorMap] || 'text-gray-400';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            承销管理
          </h1>
          <p className="text-gray-400 mt-2">从项目接洽到簿记建档与配售分配的全流程管理</p>
        </div>
        
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2">
            <Filter className="h-4 w-4" />
            筛选
          </button>
          <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center gap-2">
            <Plus className="h-4 w-4" />
            新建项目
          </button>
        </div>
      </div>

      {/* View Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex bg-gray-800/30 rounded-lg p-1">
          <button
            onClick={() => setActiveView('kanban')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              activeView === 'kanban'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            看板视图
          </button>
          <button
            onClick={() => setActiveView('table')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              activeView === 'table'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            表格视图
          </button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="搜索承销项目..."
            className="pl-10 pr-4 py-2 bg-gray-800/30 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400"
          />
        </div>
      </div>

      {/* Kanban View */}
      {activeView === 'kanban' && (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 overflow-x-auto">
          {kanbanColumns.map((column) => (
            <div key={column.id} className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-4 min-w-80">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-medium">{column.title}</h3>
                <span className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-full">
                  {column.deals.length}
                </span>
              </div>
              
              <div className="space-y-3">
                {column.deals.map((deal) => (
                  <div
                    key={deal.id}
                    className="p-4 bg-gray-700/20 rounded-lg border border-gray-600/30 hover:border-purple-500/30 transition-all duration-300 cursor-pointer"
                    onClick={() => setSelectedDeal(deal.id)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-white font-medium text-sm">{deal.name}</h4>
                      <span className={`text-xs font-medium ${getPriorityColor(deal.priority)}`}>
                        {deal.priority === 'high' ? '高' : deal.priority === 'medium' ? '中' : '低'}
                      </span>
                    </div>
                    
                    <div className="text-gray-400 text-xs mb-3">{deal.issuer}</div>
                    
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-400">规模:</span>
                        <span className="text-white">{deal.size}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">进度:</span>
                        <span className="text-purple-400">{deal.bookBuild}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">剩余:</span>
                        <span className="text-white">{deal.timeline}</span>
                      </div>
                    </div>
                    
                    <div className="mt-3 pt-3 border-t border-gray-600/30">
                      <div className="text-gray-400 text-xs">负责人: {deal.leadManager}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Table View */}
      {activeView === 'table' && (
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700/20 border-b border-gray-600">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">项目名称</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">发行方</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">规模</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">阶段</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">簿记进度</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">定价</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">负责人</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-600/30">
                {deals.map((deal) => (
                  <tr key={deal.id} className="hover:bg-gray-700/20 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-white">{deal.name}</div>
                        <div className="text-sm text-gray-400 flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${getPriorityColor(deal.priority).replace('text-', 'bg-')}`}></span>
                          {deal.priority === 'high' ? '高优先级' : deal.priority === 'medium' ? '中优先级' : '低优先级'}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-300">{deal.issuer}</td>
                    <td className="px-6 py-4 text-white font-medium">{deal.size}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs border ${getStatusColor(deal.status)}`}>
                        {deal.stage}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                            style={{ width: deal.bookBuild }}
                          ></div>
                        </div>
                        <span className="text-white text-sm">{deal.bookBuild}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-green-400 font-medium">{deal.pricing}</td>
                    <td className="px-6 py-4 text-gray-300">{deal.leadManager}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button className="text-purple-400 hover:text-purple-300 text-sm flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          详情
                        </button>
                        <button className="text-gray-400 hover:text-gray-300 text-sm flex items-center gap-1">
                          <Settings className="h-3 w-3" />
                          配置
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

      {/* Deal Detail Panel */}
      {selectedDeal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedDeal(null)}
          ></div>
          
          <div className="relative max-w-4xl w-full bg-gray-800 rounded-xl border border-gray-700 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">承销项目详情</h2>
                <button
                  onClick={() => setSelectedDeal(null)}
                  className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  ×
                </button>
              </div>
              
              {(() => {
                const deal = deals.find(d => d.id === selectedDeal);
                if (!deal) return null;
                
                return (
                  <div className="space-y-6">
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-400">项目名称:</span>
                          <span className="text-white">{deal.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">发行方:</span>
                          <span className="text-white">{deal.issuer}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">发行规模:</span>
                          <span className="text-white">{deal.size}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">主承销商:</span>
                          <span className="text-white">{deal.leadManager}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-400">当前阶段:</span>
                          <span className={`px-2 py-1 rounded text-xs border ${getStatusColor(deal.status)}`}>
                            {deal.stage}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">簿记进度:</span>
                          <span className="text-purple-400">{deal.bookBuild}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">定价:</span>
                          <span className="text-green-400">{deal.pricing}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">剩余时间:</span>
                          <span className="text-white">{deal.timeline}</span>
                        </div>
                      </div>
                    </div>

                    {/* Progress Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-gray-700/20 rounded-lg text-center">
                        <div className="text-lg font-bold text-white">{deal.currentInvestors}</div>
                        <div className="text-sm text-gray-400">当前投资者</div>
                        <div className="text-xs text-purple-400">目标: {deal.targetInvestors}</div>
                      </div>
                      
                      {deal.orderBook && (
                        <div className="p-4 bg-gray-700/20 rounded-lg text-center">
                          <div className="text-lg font-bold text-green-400">{deal.orderBook}</div>
                          <div className="text-sm text-gray-400">订单簿金额</div>
                          <div className="text-xs text-gray-400">vs {deal.size} 目标</div>
                        </div>
                      )}
                      
                      {deal.roadshowMeetings && (
                        <div className="p-4 bg-gray-700/20 rounded-lg text-center">
                          <div className="text-lg font-bold text-blue-400">{deal.completedMeetings}/{deal.roadshowMeetings}</div>
                          <div className="text-sm text-gray-400">路演会议</div>
                          <div className="text-xs text-blue-400">进度: {Math.round((deal.completedMeetings / deal.roadshowMeetings) * 100)}%</div>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4 border-t border-gray-600/30">
                      <button className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors">
                        管理簿记
                      </button>
                      <button className="flex-1 px-4 py-2 border border-gray-600 hover:bg-gray-700 rounded-lg transition-colors">
                        查看路演
                      </button>
                      <button className="flex-1 px-4 py-2 border border-gray-600 hover:bg-gray-700 rounded-lg transition-colors">
                        配售分配
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6 text-center">
          <div className="text-2xl font-bold text-white mb-2">{deals.length}</div>
          <div className="text-gray-400 text-sm">活跃项目</div>
        </div>
        
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6 text-center">
          <div className="text-2xl font-bold text-purple-400 mb-2">
            ${deals.reduce((sum, deal) => sum + parseFloat(deal.size.replace(/[$M]/g, '')), 0)}M
          </div>
          <div className="text-gray-400 text-sm">管道总价值</div>
        </div>
        
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6 text-center">
          <div className="text-2xl font-bold text-green-400 mb-2">
            {Math.round(deals.reduce((sum, deal) => sum + parseFloat(deal.bookBuild), 0) / deals.length)}%
          </div>
          <div className="text-gray-400 text-sm">平均簿记进度</div>
        </div>
        
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6 text-center">
          <div className="text-2xl font-bold text-blue-400 mb-2">
            {deals.reduce((sum, deal) => sum + (deal.currentInvestors || 0), 0)}
          </div>
          <div className="text-gray-400 text-sm">总投资者数</div>
        </div>
      </div>
    </div>
  );
};

export default UnderwritingConsole;