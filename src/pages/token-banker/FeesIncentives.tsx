import React, { useState } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  Settings,
  Plus,
  Eye,
  RefreshCw,
  BarChart3,
  Target,
  Award,
  Percent
} from 'lucide-react';

const FeesIncentives: React.FC = () => {
  const [activeTab, setActiveTab] = useState('fees');

  const feeSchedules = [
    {
      id: 'fee-001',
      name: '认购费率表',
      type: 'subscription',
      version: 'v2.1',
      status: 'active',
      lastUpdated: '2024-01-10',
      rules: [
        { range: '$100K - $500K', rate: '1.5%', description: '标准认购费' },
        { range: '$500K - $2M', rate: '1.2%', description: '大额优惠' },
        { range: '$2M+', rate: '1.0%', description: '超大额优惠' }
      ]
    },
    {
      id: 'fee-002',
      name: '管理费率表',
      type: 'management',
      version: 'v1.8',
      status: 'active',
      lastUpdated: '2024-01-05',
      rules: [
        { range: '年化管理费', rate: '2.0%', description: '基础管理费' },
        { range: '托管费', rate: '0.5%', description: '资产托管费' },
        { range: '服务费', rate: '0.3%', description: '运营服务费' }
      ]
    },
    {
      id: 'fee-003',
      name: '赎回费率表',
      type: 'redemption',
      version: 'v1.5',
      status: 'active',
      lastUpdated: '2024-01-08',
      rules: [
        { range: '6个月内', rate: '2.0%', description: '早期赎回费' },
        { range: '6-12个月', rate: '1.0%', description: '标准赎回费' },
        { range: '12个月后', rate: '0.5%', description: '长期持有优惠' }
      ]
    }
  ];

  const incentivePrograms = [
    {
      id: 'incentive-001',
      name: '做市商激励计划',
      type: 'market_making',
      status: 'active',
      totalBudget: '$500,000',
      allocated: '$320,000',
      participants: 8,
      performance: '125%',
      startDate: '2024-01-01',
      endDate: '2024-03-31',
      kpis: [
        { metric: '流动性提供', target: '$10M', current: '$12.5M', achievement: '125%' },
        { metric: '价差维持', target: '<0.2%', current: '0.15%', achievement: '133%' },
        { metric: '在线时间', target: '>95%', current: '98.2%', achievement: '103%' }
      ]
    },
    {
      id: 'incentive-002',
      name: '渠道合作伙伴返佣',
      type: 'channel_revenue',
      status: 'active',
      totalBudget: '$200,000',
      allocated: '$145,000',
      participants: 12,
      performance: '87%',
      startDate: '2024-01-01',
      endDate: '2024-06-30',
      kpis: [
        { metric: '客户引荐', target: '100人', current: '87人', achievement: '87%' },
        { metric: '成交转化', target: '60%', current: '72%', achievement: '120%' },
        { metric: '客户留存', target: '85%', current: '91%', achievement: '107%' }
      ]
    }
  ];

  const channelConfig = [
    {
      id: 'channel-001',
      name: 'Premium Partners',
      type: 'institutional',
      revShareRate: '25%',
      minVolume: '$1M',
      currentVolume: '$8.5M',
      partners: 5,
      status: 'active'
    },
    {
      id: 'channel-002',
      name: 'Retail Distributors',
      type: 'retail',
      revShareRate: '15%',
      minVolume: '$100K',
      currentVolume: '$2.3M',
      partners: 12,
      status: 'active'
    },
    {
      id: 'channel-003',
      name: 'Digital Platforms',
      type: 'digital',
      revShareRate: '20%',
      minVolume: '$500K',
      currentVolume: '$4.7M',
      partners: 8,
      status: 'active'
    }
  ];

  const payoutHistory = [
    {
      id: 'payout-001',
      recipient: 'Market Maker A',
      program: '做市商激励计划',
      amount: '$45,000',
      period: '2024年1月',
      status: 'completed',
      paymentDate: '2024-02-01'
    },
    {
      id: 'payout-002',
      recipient: 'Channel Partner B',
      program: '渠道合作伙伴返佣',
      amount: '$12,500',
      period: '2024年1月',
      status: 'pending',
      paymentDate: '2024-02-05'
    },
    {
      id: 'payout-003',
      recipient: 'Digital Platform C',
      program: '渠道合作伙伴返佣',
      amount: '$8,750',
      period: '2024年1月',
      status: 'completed',
      paymentDate: '2024-02-01'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusMap = {
      'active': { label: '启用', color: 'bg-green-500/20 text-green-400 border-green-500/30' },
      'inactive': { label: '停用', color: 'bg-red-500/20 text-red-400 border-red-500/30' },
      'pending': { label: '待处理', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
      'completed': { label: '已完成', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' }
    };
    
    const statusInfo = statusMap[status as keyof typeof statusMap];
    return (
      <span className={`px-2 py-1 rounded text-xs border ${statusInfo.color}`}>
        {statusInfo.label}
      </span>
    );
  };

  const tabs = [
    { id: 'fees', name: '费率管理', count: feeSchedules.length },
    { id: 'incentives', name: '激励计划', count: incentivePrograms.length },
    { id: 'channels', name: '渠道配置', count: channelConfig.length },
    { id: 'payouts', name: '支付记录', count: payoutHistory.filter(p => p.status === 'pending').length }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            费用与激励管理
          </h1>
          <p className="text-gray-400 mt-2">管理认购/赎回费用、管理费、做市激励与渠道返佣</p>
        </div>
        
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            刷新数据
          </button>
          <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center gap-2">
            <Plus className="h-4 w-4" />
            新建费率规则
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
          <div className="flex items-center mb-3">
            <DollarSign className="h-5 w-5 text-green-400 mr-2" />
            <span className="text-sm text-gray-400">本月费用收入</span>
          </div>
          <div className="text-2xl font-bold text-green-400">$285K</div>
          <div className="text-sm text-green-400 mt-1">+18.5% vs 上月</div>
        </div>
        
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
          <div className="flex items-center mb-3">
            <Award className="h-5 w-5 text-purple-400 mr-2" />
            <span className="text-sm text-gray-400">激励支出</span>
          </div>
          <div className="text-2xl font-bold text-purple-400">$66K</div>
          <div className="text-sm text-gray-400 mt-1">本月累计</div>
        </div>
        
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
          <div className="flex items-center mb-3">
            <Users className="h-5 w-5 text-blue-400 mr-2" />
            <span className="text-sm text-gray-400">活跃参与者</span>
          </div>
          <div className="text-2xl font-bold text-blue-400">28</div>
          <div className="text-sm text-blue-400 mt-1">+3 新增</div>
        </div>
        
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
          <div className="flex items-center mb-3">
            <Percent className="h-5 w-5 text-yellow-400 mr-2" />
            <span className="text-sm text-gray-400">平均费率</span>
          </div>
          <div className="text-2xl font-bold text-yellow-400">1.35%</div>
          <div className="text-sm text-gray-400 mt-1">加权平均</div>
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
                <span className="ml-2 px-2 py-1 text-xs bg-purple-500 text-white rounded-full">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'fees' && (
        <div className="space-y-6">
          {feeSchedules.map((schedule) => (
            <div key={schedule.id} className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">{schedule.name}</h3>
                  <div className="flex items-center gap-4 mt-1 text-sm text-gray-400">
                    <span>版本: {schedule.version}</span>
                    <span>更新: {schedule.lastUpdated}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {getStatusBadge(schedule.status)}
                  <button className="px-3 py-1 border border-gray-600 hover:bg-gray-800 rounded text-sm transition-colors">
                    编辑
                  </button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-700/20 border-b border-gray-600">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">范围/类型</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">费率</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">说明</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-600/30">
                    {schedule.rules.map((rule, index) => (
                      <tr key={index} className="hover:bg-gray-700/20 transition-colors">
                        <td className="px-4 py-3 text-white">{rule.range}</td>
                        <td className="px-4 py-3 text-green-400 font-medium">{rule.rate}</td>
                        <td className="px-4 py-3 text-gray-300">{rule.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'incentives' && (
        <div className="space-y-6">
          {incentivePrograms.map((program) => (
            <div key={program.id} className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-white">{program.name}</h3>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                    <span>预算: {program.totalBudget}</span>
                    <span>已分配: {program.allocated}</span>
                    <span>参与者: {program.participants}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {getStatusBadge(program.status)}
                  <span className={`text-lg font-bold ${
                    parseFloat(program.performance) > 100 ? 'text-green-400' : 'text-yellow-400'
                  }`}>
                    {program.performance}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                {program.kpis.map((kpi, index) => (
                  <div key={index} className="p-4 bg-gray-700/20 rounded-lg">
                    <div className="text-white font-medium mb-2">{kpi.metric}</div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">目标: {kpi.target}</span>
                      <span className="text-white">当前: {kpi.current}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-600 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            parseFloat(kpi.achievement) > 100 ? 'bg-green-400' : 'bg-yellow-400'
                          }`}
                          style={{ width: `${Math.min(parseFloat(kpi.achievement), 100)}%` }}
                        ></div>
                      </div>
                      <span className={`text-sm font-medium ${
                        parseFloat(kpi.achievement) > 100 ? 'text-green-400' : 'text-yellow-400'
                      }`}>
                        {kpi.achievement}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center p-3 bg-gray-700/20 rounded-lg">
                <div className="text-sm text-gray-400">
                  计划期间: {program.startDate} 至 {program.endDate}
                </div>
                <div className="flex gap-2">
                  <button className="text-purple-400 hover:text-purple-300 text-sm">查看详情</button>
                  <button className="text-gray-400 hover:text-gray-300 text-sm">编辑规则</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'channels' && (
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden">
          <div className="p-6 border-b border-gray-600/30">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-white">渠道配置</h3>
              <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors">
                新增渠道
              </button>
            </div>
          </div>
          
          <div className="divide-y divide-gray-600/30">
            {channelConfig.map((channel) => (
              <div key={channel.id} className="p-6 hover:bg-gray-700/20 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-white font-medium">{channel.name}</h4>
                    <div className="text-gray-400 text-sm mt-1">
                      {channel.type === 'institutional' ? '机构渠道' : 
                       channel.type === 'retail' ? '零售渠道' : '数字平台'}
                    </div>
                  </div>
                  {getStatusBadge(channel.status)}
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">返佣比例:</span>
                    <div className="text-green-400 font-medium">{channel.revShareRate}</div>
                  </div>
                  <div>
                    <span className="text-gray-400">最低成交:</span>
                    <div className="text-white">{channel.minVolume}</div>
                  </div>
                  <div>
                    <span className="text-gray-400">当前成交:</span>
                    <div className="text-purple-400 font-medium">{channel.currentVolume}</div>
                  </div>
                  <div>
                    <span className="text-gray-400">合作伙伴:</span>
                    <div className="text-white">{channel.partners}家</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'payouts' && (
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700/20 border-b border-gray-600">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">收款方</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">激励计划</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">金额</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">期间</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">支付日期</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">状态</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-600/30">
                {payoutHistory.map((payout) => (
                  <tr key={payout.id} className="hover:bg-gray-700/20 transition-colors">
                    <td className="px-6 py-4 text-white">{payout.recipient}</td>
                    <td className="px-6 py-4 text-gray-300">{payout.program}</td>
                    <td className="px-6 py-4 text-green-400 font-medium">{payout.amount}</td>
                    <td className="px-6 py-4 text-gray-300">{payout.period}</td>
                    <td className="px-6 py-4 text-gray-300">{payout.paymentDate}</td>
                    <td className="px-6 py-4">{getStatusBadge(payout.status)}</td>
                    <td className="px-6 py-4">
                      <button className="text-purple-400 hover:text-purple-300 text-sm flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        详情
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeesIncentives;