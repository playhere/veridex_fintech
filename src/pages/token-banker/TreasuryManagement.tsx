import React, { useState } from 'react';
import { 
  Shield, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  DollarSign,
  Users,
  Key,
  RefreshCw,
  Plus,
  Eye,
  Hash,
  Copy
} from 'lucide-react';

const TreasuryManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('approvals');

  const pendingApprovals = [
    {
      id: 'tx-001',
      type: 'payment',
      description: '向投资者分派月度收益',
      amount: '$3,750,000',
      recipient: 'Distribution Contract',
      requiredSignatures: 3,
      currentSignatures: 1,
      signers: ['Alice (CFO)', 'Bob (CTO)', 'Carol (COO)'],
      signedBy: ['Alice (CFO)'],
      timelock: '24小时',
      expiresAt: '2024-01-16 14:30:22',
      priority: 'high',
      category: 'distribution'
    },
    {
      id: 'tx-002',
      type: 'transfer',
      description: '补充流动性池资金',
      amount: '$500,000',
      recipient: 'Liquidity Pool CCP24Q1',
      requiredSignatures: 2,
      currentSignatures: 0,
      signers: ['Alice (CFO)', 'Bob (CTO)'],
      signedBy: [],
      timelock: '12小时',
      expiresAt: '2024-01-16 10:15:33',
      priority: 'medium',
      category: 'liquidity'
    },
    {
      id: 'tx-003',
      type: 'withdrawal',
      description: '提取手续费收入',
      amount: '$125,000',
      recipient: 'Treasury Wallet',
      requiredSignatures: 2,
      currentSignatures: 2,
      signers: ['Alice (CFO)', 'Carol (COO)'],
      signedBy: ['Alice (CFO)', 'Carol (COO)'],
      timelock: '6小时',
      expiresAt: '2024-01-15 20:45:18',
      priority: 'low',
      category: 'fee_collection',
      readyToExecute: true
    }
  ];

  const treasuryLimits = [
    {
      category: 'daily_payment',
      description: '日度支付限额',
      currentLimit: '$10,000,000',
      usedToday: '$3,750,000',
      utilization: 37.5,
      status: 'normal'
    },
    {
      category: 'single_transaction',
      description: '单笔交易限额',
      currentLimit: '$5,000,000',
      largestToday: '$3,750,000',
      utilization: 75,
      status: 'attention'
    },
    {
      category: 'monthly_var',
      description: '月度风险价值',
      currentLimit: '$50,000,000',
      usedThisMonth: '$28,500,000',
      utilization: 57,
      status: 'normal'
    }
  ];

  const treasuryLedger = [
    {
      id: 'ledger-001',
      timestamp: '2024-01-15 14:30:22',
      type: 'outgoing',
      description: '月度收益分派',
      amount: '$3,750,000',
      counterparty: 'Investors',
      txHash: '0xa1b2c3d4e5f6...',
      status: 'completed',
      approvals: 3
    },
    {
      id: 'ledger-002',
      timestamp: '2024-01-15 12:15:33',
      type: 'incoming',
      description: '手续费收入',
      amount: '$125,000',
      counterparty: 'Trading Fees',
      txHash: '0x9i8j7k6l5m4n...',
      status: 'completed',
      approvals: 2
    },
    {
      id: 'ledger-003',
      timestamp: '2024-01-15 10:45:18',
      type: 'outgoing',
      description: '流动性池补充',
      amount: '$500,000',
      counterparty: 'LP Pool',
      txHash: '0x1q2w3e4r5t6y...',
      status: 'pending',
      approvals: 1
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusMap = {
      'pending': { label: '待审批', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
      'approved': { label: '已批准', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
      'executed': { label: '已执行', color: 'bg-green-500/20 text-green-400 border-green-500/30' },
      'expired': { label: '已过期', color: 'bg-red-500/20 text-red-400 border-red-500/30' },
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
    const colorMap = {
      'high': 'text-red-400',
      'medium': 'text-yellow-400',
      'low': 'text-green-400'
    };
    return colorMap[priority as keyof typeof colorMap] || 'text-gray-400';
  };

  const getLimitStatusColor = (status: string) => {
    const colorMap = {
      'normal': 'text-green-400',
      'attention': 'text-yellow-400',
      'critical': 'text-red-400'
    };
    return colorMap[status as keyof typeof colorMap] || 'text-gray-400';
  };

  const tabs = [
    { id: 'approvals', name: '待审批队列', count: pendingApprovals.filter(a => a.currentSignatures < a.requiredSignatures).length },
    { id: 'limits', name: '限额监控', count: treasuryLimits.filter(l => l.status !== 'normal').length },
    { id: 'ledger', name: '资金台账', count: null },
    { id: 'settings', name: '多签配置', count: null }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            资金托管管理
          </h1>
          <p className="text-gray-400 mt-2">多签钱包、审批流程与支付指令的统一管理</p>
        </div>
        
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            同步状态
          </button>
          <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center gap-2">
            <Plus className="h-4 w-4" />
            新建支付指令
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
          <div className="flex items-center mb-3">
            <Clock className="h-5 w-5 text-yellow-400 mr-2" />
            <span className="text-sm text-gray-400">待审批交易</span>
          </div>
          <div className="text-2xl font-bold text-yellow-400">
            {pendingApprovals.filter(a => a.currentSignatures < a.requiredSignatures).length}
          </div>
        </div>
        
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
          <div className="flex items-center mb-3">
            <DollarSign className="h-5 w-5 text-green-400 mr-2" />
            <span className="text-sm text-gray-400">今日支付总额</span>
          </div>
          <div className="text-2xl font-bold text-green-400">$4.375M</div>
        </div>
        
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
          <div className="flex items-center mb-3">
            <Shield className="h-5 w-5 text-purple-400 mr-2" />
            <span className="text-sm text-gray-400">多签安全等级</span>
          </div>
          <div className="text-2xl font-bold text-purple-400">3/5</div>
          <div className="text-sm text-gray-400 mt-1">高安全级别</div>
        </div>
        
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
          <div className="flex items-center mb-3">
            <Users className="h-5 w-5 text-blue-400 mr-2" />
            <span className="text-sm text-gray-400">授权签名人</span>
          </div>
          <div className="text-2xl font-bold text-blue-400">5</div>
          <div className="text-sm text-gray-400 mt-1">活跃签名人</div>
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
      {activeTab === 'approvals' && (
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden">
          <div className="p-6 border-b border-gray-600/30">
            <h3 className="text-lg font-semibold text-white">审批队列</h3>
          </div>
          
          <div className="divide-y divide-gray-600/30">
            {pendingApprovals.map((approval) => (
              <div key={approval.id} className="p-6 hover:bg-gray-700/20 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-white font-medium">{approval.description}</h4>
                      <span className={`px-2 py-1 rounded text-xs border ${
                        approval.category === 'distribution' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' :
                        approval.category === 'liquidity' ? 'bg-purple-500/20 text-purple-400 border-purple-500/30' :
                        'bg-green-500/20 text-green-400 border-green-500/30'
                      }`}>
                        {approval.category === 'distribution' ? '收益分派' : 
                         approval.category === 'liquidity' ? '流动性' : '手续费'}
                      </span>
                      <span className={`text-xs font-medium ${getPriorityColor(approval.priority)}`}>
                        {approval.priority === 'high' ? '高优先级' : 
                         approval.priority === 'medium' ? '中优先级' : '低优先级'}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-3">
                      <div>
                        <span className="text-gray-400">金额:</span>
                        <span className="text-white ml-2 font-medium">{approval.amount}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">收款方:</span>
                        <span className="text-white ml-2">{approval.recipient}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">时间锁:</span>
                        <span className="text-white ml-2">{approval.timelock}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-400">
                          签名进度: {approval.currentSignatures}/{approval.requiredSignatures}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-400">过期时间: {approval.expiresAt}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    {approval.readyToExecute ? (
                      <button className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors">
                        执行交易
                      </button>
                    ) : (
                      <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors">
                        签名批准
                      </button>
                    )}
                    <button className="px-4 py-2 border border-gray-600 hover:bg-gray-800 rounded-lg transition-colors flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      详情
                    </button>
                  </div>
                </div>

                {/* Signature Status */}
                <div className="p-3 bg-gray-700/20 rounded-lg">
                  <div className="text-white font-medium mb-2">签名状态</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {approval.signers.map((signer, index) => (
                      <div key={index} className="flex items-center gap-2">
                        {approval.signedBy.includes(signer) ? (
                          <CheckCircle className="h-4 w-4 text-green-400" />
                        ) : (
                          <Clock className="h-4 w-4 text-gray-400" />
                        )}
                        <span className={`text-sm ${
                          approval.signedBy.includes(signer) ? 'text-green-400' : 'text-gray-400'
                        }`}>
                          {signer}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'limits' && (
        <div className="space-y-6">
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
            <h3 className="text-lg font-semibold text-white mb-6">风险限额监控</h3>
            
            <div className="space-y-4">
              {treasuryLimits.map((limit, index) => (
                <div key={index} className="p-4 bg-gray-700/20 rounded-lg border border-gray-600/30">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="text-white font-medium">{limit.description}</h4>
                      <div className="text-gray-400 text-sm mt-1">
                        {limit.category === 'daily_payment' ? `今日已用: ${limit.usedToday}` :
                         limit.category === 'single_transaction' ? `今日最大: ${limit.largestToday}` :
                         `本月已用: ${limit.usedThisMonth}`}
                      </div>
                    </div>
                    <span className={`text-sm font-medium ${getLimitStatusColor(limit.status)}`}>
                      {limit.status === 'normal' ? '正常' : 
                       limit.status === 'attention' ? '关注' : '警告'}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">限额:</span>
                      <span className="text-white">{limit.currentLimit}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">利用率:</span>
                      <span className={`font-medium ${
                        limit.utilization > 80 ? 'text-red-400' :
                        limit.utilization > 60 ? 'text-yellow-400' : 'text-green-400'
                      }`}>
                        {limit.utilization}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-600 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          limit.utilization > 80 ? 'bg-red-400' :
                          limit.utilization > 60 ? 'bg-yellow-400' : 'bg-green-400'
                        }`}
                        style={{ width: `${limit.utilization}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'ledger' && (
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden">
          <div className="p-6 border-b border-gray-600/30">
            <h3 className="text-lg font-semibold text-white">资金台账</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700/20 border-b border-gray-600">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">时间</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">类型</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">描述</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">金额</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">对手方</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">状态</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">交易哈希</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-600/30">
                {treasuryLedger.map((entry) => (
                  <tr key={entry.id} className="hover:bg-gray-700/20 transition-colors">
                    <td className="px-6 py-4 text-gray-300">{entry.timestamp}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs border ${
                        entry.type === 'incoming' 
                          ? 'bg-green-500/20 text-green-400 border-green-500/30'
                          : 'bg-red-500/20 text-red-400 border-red-500/30'
                      }`}>
                        {entry.type === 'incoming' ? '收入' : '支出'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-white">{entry.description}</td>
                    <td className="px-6 py-4 text-white font-medium">{entry.amount}</td>
                    <td className="px-6 py-4 text-gray-300">{entry.counterparty}</td>
                    <td className="px-6 py-4">{getStatusBadge(entry.status)}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-purple-400 font-mono text-sm">{entry.txHash}</span>
                        <button className="p-1 hover:bg-gray-700 rounded">
                          <Copy className="h-3 w-3 text-gray-400" />
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

      {activeTab === 'settings' && (
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-8 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Key className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">多签配置</h3>
            <p className="text-gray-400 mb-6">
              多签钱包配置和签名人管理功能正在开发中，敬请期待
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

export default TreasuryManagement;