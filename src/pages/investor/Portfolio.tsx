import React, { useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Clock, Shield, Hash, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const Portfolio: React.FC = () => {
  const [activeTab, setActiveTab] = useState('holdings');

  const portfolioSummary = {
    totalValue: '$2,450,000',
    totalCost: '$2,300,000',
    totalReturn: '$150,000',
    totalReturnPercent: '+6.52%',
    monthlyIncome: '$18,750',
    positions: 8
  };

  const holdings = [
    {
      id: 'hold-001',
      name: '消费信贷资产池 2024-Q1',
      tranche: '优先级',
      symbol: 'CCP24Q1',
      shares: 50000,
      costBasis: '$1.00',
      currentPrice: '$1.08',
      totalCost: '$500,000',
      currentValue: '$540,000',
      unrealizedPnL: '$40,000',
      unrealizedPnLPercent: '+8.00%',
      monthlyDistribution: '$3,750',
      maturityDate: '2027-03-15',
      contractAddress: '0x742...d4e9',
      status: 'active',
      lockupEnd: '2024-08-15'
    },
    {
      id: 'hold-002',
      name: '汽车抵押贷款池',
      tranche: '夹层级',
      symbol: 'ALCP2024',
      shares: 25000,
      costBasis: '$1.00',
      currentPrice: '$1.05',
      totalCost: '$250,000',
      currentValue: '$262,500',
      unrealizedPnL: '$12,500',
      unrealizedPnLPercent: '+5.00%',
      monthlyDistribution: '$2,100',
      maturityDate: '2028-01-20',
      contractAddress: '0x8a3...b7c2',
      status: 'active',
      lockupEnd: '2024-07-20'
    },
    {
      id: 'hold-003',
      name: '绿色债券资产包',
      tranche: '劣后级',
      symbol: 'GBAP2024',
      shares: 75000,
      costBasis: '$1.00',
      currentPrice: '$1.03',
      totalCost: '$750,000',
      currentValue: '$772,500',
      unrealizedPnL: '$22,500',
      unrealizedPnLPercent: '+3.00%',
      monthlyDistribution: '$4,500',
      maturityDate: '2029-06-30',
      contractAddress: '0x1f5...9d8e',
      status: 'active',
      lockupEnd: '2025-01-15'
    }
  ];

  const transactions = [
    {
      id: 'tx-001',
      type: 'purchase',
      asset: '消费信贷资产池 2024-Q1',
      tranche: '优先级',
      amount: 50000,
      price: '$1.00',
      totalValue: '$500,000',
      date: '2024-02-15',
      txHash: '0xa1b2c3d4...e5f6g7h8',
      status: 'completed'
    },
    {
      id: 'tx-002',
      type: 'distribution',
      asset: '汽车抵押贷款池',
      tranche: '夹层级',
      amount: 2100,
      price: '-',
      totalValue: '$2,100',
      date: '2024-01-31',
      txHash: '0x9i8j7k6l...m5n4o3p2',
      status: 'completed'
    },
    {
      id: 'tx-003',
      type: 'purchase',
      asset: '绿色债券资产包',
      tranche: '劣后级',
      amount: 25000,
      price: '$1.00',
      totalValue: '$250,000',
      date: '2024-01-20',
      txHash: '0x1q2w3e4r...5t6y7u8i',
      status: 'completed'
    }
  ];

  const distributions = [
    {
      id: 'dist-001',
      asset: '消费信贷资产池 2024-Q1',
      tranche: '优先级',
      amount: '$3,750',
      date: '2024-01-31',
      type: 'monthly',
      status: 'received'
    },
    {
      id: 'dist-002',
      asset: '汽车抵押贷款池',
      tranche: '夹层级',
      amount: '$2,100',
      date: '2024-01-31',
      type: 'monthly',
      status: 'received'
    },
    {
      id: 'dist-003',
      asset: '绿色债券资产包',
      tranche: '劣后级',
      amount: '$4,500',
      date: '2024-01-31',
      type: 'monthly',
      status: 'pending'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusMap = {
      'active': { label: '持有中', color: 'bg-green-500/20 text-green-400 border-green-500/30' },
      'locked': { label: '锁定中', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
      'matured': { label: '已到期', color: 'bg-gray-500/20 text-gray-400 border-gray-500/30' }
    };
    
    const statusInfo = statusMap[status as keyof typeof statusMap];
    return (
      <span className={`px-2 py-1 rounded text-xs border ${statusInfo.color}`}>
        {statusInfo.label}
      </span>
    );
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'purchase':
        return <ArrowDownRight className="h-4 w-4 text-red-400" />;
      case 'distribution':
        return <ArrowUpRight className="h-4 w-4 text-green-400" />;
      case 'transfer':
        return <ArrowUpRight className="h-4 w-4 text-blue-400" />;
      default:
        return <Hash className="h-4 w-4 text-gray-400" />;
    }
  };

  const tabs = [
    { id: 'holdings', name: '持仓概览', count: holdings.length },
    { id: 'transactions', name: '交易记录', count: transactions.length },
    { id: 'distributions', name: '分派记录', count: distributions.length }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            我的投资组合
          </h1>
          <p className="text-gray-400 mt-2">管理您的数字资产投资</p>
        </div>
        
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors">
            导出报告
          </button>
          <button className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors">
            税务文件
          </button>
        </div>
      </div>

      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
          <div className="flex items-center mb-3">
            <DollarSign className="h-5 w-5 text-cyan-400 mr-2" />
            <span className="text-sm text-gray-400">总资产价值</span>
          </div>
          <div className="text-2xl font-bold text-white">{portfolioSummary.totalValue}</div>
        </div>
        
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
          <div className="flex items-center mb-3">
            <TrendingUp className="h-5 w-5 text-green-400 mr-2" />
            <span className="text-sm text-gray-400">总收益</span>
          </div>
          <div className="text-2xl font-bold text-green-400">{portfolioSummary.totalReturn}</div>
          <div className="text-sm text-green-400">{portfolioSummary.totalReturnPercent}</div>
        </div>
        
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
          <div className="flex items-center mb-3">
            <Clock className="h-5 w-5 text-purple-400 mr-2" />
            <span className="text-sm text-gray-400">月度收入</span>
          </div>
          <div className="text-2xl font-bold text-white">{portfolioSummary.monthlyIncome}</div>
        </div>
        
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
          <div className="flex items-center mb-3">
            <Shield className="h-5 w-5 text-yellow-400 mr-2" />
            <span className="text-sm text-gray-400">持仓数量</span>
          </div>
          <div className="text-2xl font-bold text-white">{portfolioSummary.positions}</div>
        </div>

        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
          <div className="flex items-center mb-3">
            <DollarSign className="h-5 w-5 text-gray-400 mr-2" />
            <span className="text-sm text-gray-400">总成本</span>
          </div>
          <div className="text-2xl font-bold text-gray-300">{portfolioSummary.totalCost}</div>
        </div>

        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
          <div className="flex items-center mb-3">
            <TrendingUp className="h-5 w-5 text-cyan-400 mr-2" />
            <span className="text-sm text-gray-400">平均收益率</span>
          </div>
          <div className="text-2xl font-bold text-cyan-400">6.52%</div>
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
      {activeTab === 'holdings' && (
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700/20 border-b border-gray-600">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">资产名称</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">持有份额</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">成本/当前价格</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">总价值</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">未实现损益</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">月度分派</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">状态</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-600/30">
                {holdings.map((holding) => (
                  <tr key={holding.id} className="hover:bg-gray-700/20 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-white">{holding.name}</div>
                        <div className="text-sm text-gray-400">
                          {holding.symbol} • {holding.tranche}
                        </div>
                        <div className="text-xs text-purple-400 font-mono mt-1">{holding.contractAddress}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-white font-medium">
                      {holding.shares.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-gray-400 text-sm">成本: {holding.costBasis}</div>
                        <div className="text-white font-medium">当前: {holding.currentPrice}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-white font-medium">{holding.currentValue}</div>
                        <div className="text-gray-400 text-sm">{holding.totalCost}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`flex items-center ${
                        holding.unrealizedPnL.startsWith('+') ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {holding.unrealizedPnL.startsWith('+') ? (
                          <TrendingUp className="h-4 w-4 mr-1" />
                        ) : (
                          <TrendingDown className="h-4 w-4 mr-1" />
                        )}
                        <div>
                          <div className="font-medium">{holding.unrealizedPnL}</div>
                          <div className="text-sm">{holding.unrealizedPnLPercent}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-green-400 font-medium">
                      {holding.monthlyDistribution}
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(holding.status)}
                      <div className="text-xs text-gray-400 mt-1">
                        锁定至: {holding.lockupEnd}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <button className="text-cyan-400 hover:text-cyan-300 text-sm font-medium">
                          查看详情
                        </button>
                        <button 
                          className="text-gray-400 hover:text-gray-300 text-sm"
                          disabled={new Date(holding.lockupEnd) > new Date()}
                        >
                          {new Date(holding.lockupEnd) > new Date() ? '锁定中' : '转让'}
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

      {activeTab === 'transactions' && (
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700/20 border-b border-gray-600">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">交易类型</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">资产</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">档次</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">数量</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">价格</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">总价值</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">日期</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">交易哈希</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-600/30">
                {transactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-gray-700/20 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {getTransactionIcon(tx.type)}
                        <span className="text-white capitalize">
                          {tx.type === 'purchase' ? '认购' : tx.type === 'distribution' ? '分派' : tx.type}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-white">{tx.asset}</td>
                    <td className="px-6 py-4 text-cyan-400">{tx.tranche}</td>
                    <td className="px-6 py-4 text-white">{tx.amount.toLocaleString()}</td>
                    <td className="px-6 py-4 text-white">{tx.price}</td>
                    <td className="px-6 py-4 text-white font-medium">{tx.totalValue}</td>
                    <td className="px-6 py-4 text-gray-300">{tx.date}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-cyan-400 font-mono text-sm">{tx.txHash}</span>
                        <button className="p-1 hover:bg-gray-700 rounded">
                          <Hash className="h-4 w-4 text-gray-400" />
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

      {activeTab === 'distributions' && (
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden">
          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700/20 border-b border-gray-600">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">资产</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">档次</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">分派金额</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">分派日期</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">分派类型</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">状态</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-600/30">
                {distributions.map((dist) => (
                  <tr key={dist.id} className="hover:bg-gray-700/20 transition-colors">
                    <td className="px-6 py-4 text-white">{dist.asset}</td>
                    <td className="px-6 py-4 text-cyan-400">{dist.tranche}</td>
                    <td className="px-6 py-4 text-green-400 font-medium">{dist.amount}</td>
                    <td className="px-6 py-4 text-white">{dist.date}</td>
                    <td className="px-6 py-4 text-gray-300">{dist.type === 'monthly' ? '月度分派' : '其他'}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs border ${
                        dist.status === 'received' 
                          ? 'bg-green-500/20 text-green-400 border-green-500/30'
                          : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                      }`}>
                        {dist.status === 'received' ? '已到账' : '处理中'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Mobile Cards */}
          <div className="lg:hidden divide-y divide-gray-600/30">
            {distributions.map((dist) => (
              <div key={dist.id} className="p-4 hover:bg-gray-700/20 transition-colors">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <div className="text-white font-medium">{dist.asset}</div>
                    <div className="text-sm text-cyan-400">{dist.tranche}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-green-400 font-medium">{dist.amount}</div>
                    <span className={`px-2 py-1 rounded text-xs border ${
                      dist.status === 'received' 
                        ? 'bg-green-500/20 text-green-400 border-green-500/30'
                        : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                    }`}>
                      {dist.status === 'received' ? '已到账' : '处理中'}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-400">分派日期:</span>
                    <div className="text-white">{dist.date}</div>
                  </div>
                  <div>
                    <span className="text-gray-400">分派类型:</span>
                    <div className="text-white">{dist.type === 'monthly' ? '月度分派' : '其他'}</div>
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

export default Portfolio;