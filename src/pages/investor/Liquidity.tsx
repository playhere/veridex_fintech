import React, { useState } from 'react';
import { ArrowLeft, TrendingUp, DollarSign, Clock, Users, ArrowUpRight, ArrowDownRight, Filter, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Liquidity: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('secondary-market');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  // Mock data for secondary market listings
  const secondaryListings = [
    {
      id: 1,
      offerName: '商业地产基金 III',
      tranche: '优先级',
      seller: 'John D.',
      tokensOffered: 1000,
      pricePerToken: 105.50,
      totalValue: 105500,
      discount: 5.2,
      timeRemaining: '6 days',
      verified: true
    },
    {
      id: 2,
      offerName: '科技创业投资组合',
      tranche: '夹层级',
      seller: 'Sarah M.',
      tokensOffered: 500,
      pricePerToken: 98.75,
      totalValue: 49375,
      discount: 1.3,
      timeRemaining: '2 days',
      verified: true
    },
    {
      id: 3,
      offerName: '绿色能源基础设施',
      tranche: '劣后级',
      seller: 'Mike R.',
      tokensOffered: 750,
      pricePerToken: 112.25,
      totalValue: 84187.50,
      discount: -2.1,
      timeRemaining: '4 days',
      verified: false
    }
  ];

  // Mock data for buy orders
  const buyOrders = [
    {
      id: 1,
      offerName: '商业地产基金 III',
      tranche: '优先级',
      buyer: 'Anonymous',
      tokensWanted: 500,
      maxPrice: 102.00,
      totalBudget: 51000,
      timeRemaining: '3 days',
      status: 'active'
    },
    {
      id: 2,
      offerName: '医疗地产投资组合',
      tranche: '夹层级',
      buyer: 'Investment Group A',
      tokensWanted: 1200,
      maxPrice: 95.50,
      totalBudget: 114600,
      timeRemaining: '1 day',
      status: 'active'
    }
  ];

  // Mock data for transaction history
  const transactionHistory = [
    {
      id: 1,
      date: '2024-01-15',
      type: 'buy',
      offerName: '科技创业投资组合',
      tranche: '夹层级',
      tokens: 250,
      price: 99.50,
      total: 24875,
      counterparty: 'Alice K.'
    },
    {
      id: 2,
      date: '2024-01-12',
      type: 'sell',
      offerName: '商业地产基金 II',
      tranche: '优先级',
      tokens: 300,
      price: 108.25,
      total: 32475,
      counterparty: 'Bob L.'
    },
    {
      id: 3,
      date: '2024-01-08',
      type: 'buy',
      offerName: '绿色能源基础设施',
      tranche: '劣后级',
      tokens: 150,
      price: 110.75,
      total: 16612.50,
      counterparty: 'Carol M.'
    }
  ];

  const tabs = [
    { id: 'secondary-market', label: '二级市场', count: secondaryListings.length },
    { id: 'buy-orders', label: '求购订单', count: buyOrders.length },
    { id: 'my-listings', label: '我的挂单', count: 2 },
    { id: 'transaction-history', label: '交易历史', count: transactionHistory.length }
  ];

  const renderSecondaryMarket = () => (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="搜索挂单..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">全部挂单</option>
          <option value="discount">仅折价</option>
          <option value="verified">已验证卖家</option>
          <option value="ending-soon">即将结束</option>
        </select>
      </div>

      {/* Listings */}
      <div className="grid gap-6">
        {secondaryListings.map((listing) => (
          <div key={listing.id} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-white">{listing.offerName}</h3>
                  <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 text-xs rounded border border-cyan-500/30">
                    {listing.tranche}
                  </span>
                  {listing.verified && (
                    <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
                      已验证
                    </span>
                  )}
                </div>
                <p className="text-gray-400 mb-3">卖家: {listing.seller}</p>
                
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <p className="text-gray-400 text-sm">出售代币数</p>
                    <p className="text-white font-semibold">{listing.tokensOffered.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">单价</p>
                    <p className="text-white font-semibold">${listing.pricePerToken}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">总价值</p>
                    <p className="text-white font-semibold">${listing.totalValue.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">折价/溢价</p>
                    <p className={`font-semibold ${listing.discount > 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {listing.discount > 0 ? '+' : ''}{listing.discount}%
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="text-center sm:text-right">
                  <p className="text-gray-400 text-sm">剩余时间</p>
                  <p className="text-white font-semibold">{listing.timeRemaining}</p>
                </div>
                <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                  出价
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderBuyOrders = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-white">活跃求购订单</h3>
        <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
          创建求购订单
        </button>
      </div>

      <div className="grid gap-6">
        {buyOrders.map((order) => (
          <div key={order.id} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-white">{order.offerName}</h3>
                  <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded border border-purple-500/30">
                    {order.tranche}
                  </span>
                </div>
                <p className="text-gray-400 mb-3">买家: {order.buyer}</p>
                
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <p className="text-gray-400 text-sm">求购代币数</p>
                    <p className="text-white font-semibold">{order.tokensWanted.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">最高单价</p>
                    <p className="text-white font-semibold">${order.maxPrice}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">总预算</p>
                    <p className="text-white font-semibold">${order.totalBudget.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">状态</p>
                    <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full capitalize">
                      {order.status === 'active' ? '活跃' : order.status}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="text-center sm:text-right">
                  <p className="text-gray-400 text-sm">剩余时间</p>
                  <p className="text-white font-semibold">{order.timeRemaining}</p>
                </div>
                <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                  满足订单
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMyListings = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-white">我的活跃挂单</h3>
        <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
          创建挂单
        </button>
      </div>

      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 text-center">
        <DollarSign className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-white mb-2">暂无活跃挂单</h3>
        <p className="text-gray-400 mb-4">您目前没有在二级市场挂单出售的代币。</p>
        <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
          挂单出售代币
        </button>
      </div>
    </div>
  );

  const renderTransactionHistory = () => (
    <div className="space-y-6">
      <div className="grid gap-4">
        {transactionHistory.map((transaction) => (
          <div key={transaction.id} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4 lg:p-6">
            <div className="flex flex-col gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`p-2 rounded-lg ${transaction.type === 'buy' ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                    {transaction.type === 'buy' ? (
                      <ArrowDownRight className="w-4 h-4 text-green-400" />
                    ) : (
                      <ArrowUpRight className="w-4 h-4 text-red-400" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-white font-semibold">{transaction.offerName}</h3>
                      <span className="px-2 py-1 bg-gray-600/50 text-gray-300 text-xs rounded">
                        {transaction.tranche}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm">{transaction.date}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4 mt-4">
                  <div>
                    <p className="text-gray-400 text-sm">类型</p>
                    <p className={`font-semibold capitalize ${transaction.type === 'buy' ? 'text-green-400' : 'text-red-400'}`}>
                      {transaction.type === 'buy' ? '买入' : transaction.type === 'sell' ? '卖出' : transaction.type}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">代币数量</p>
                    <p className="text-white font-semibold">{transaction.tokens.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">单价</p>
                    <p className="text-white font-semibold">${transaction.price}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">总额</p>
                    <p className="text-white font-semibold">${transaction.total.toLocaleString()}</p>
                  </div>
                </div>
              </div>
              
              <div className="text-center lg:text-right mt-3 lg:mt-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-gray-600/30">
                <p className="text-gray-400 text-sm">交易对手</p>
                <p className="text-white font-semibold">{transaction.counterparty}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'secondary-market':
        return renderSecondaryMarket();
      case 'buy-orders':
        return renderBuyOrders();
      case 'my-listings':
        return renderMyListings();
      case 'transaction-history':
        return renderTransactionHistory();
      default:
        return renderSecondaryMarket();
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-white">流动性中心</h1>
            <p className="text-gray-400">在二级市场交易代币</p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">市场成交量 (24h)</p>
                <p className="text-2xl font-bold text-white">$2.4M</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-400" />
            </div>
            <p className="text-green-400 text-sm mt-2">较昨日 +12.5%</p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">活跃挂单</p>
                <p className="text-2xl font-bold text-white">47</p>
              </div>
              <DollarSign className="w-8 h-8 text-blue-400" />
            </div>
            <p className="text-blue-400 text-sm mt-2">今日新增 3 个</p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">平均折价</p>
                <p className="text-2xl font-bold text-white">3.2%</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-400" />
            </div>
            <p className="text-yellow-400 text-sm mt-2">低于市场价</p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">活跃交易者</p>
                <p className="text-2xl font-bold text-white">156</p>
              </div>
              <Users className="w-8 h-8 text-purple-400" />
            </div>
            <p className="text-purple-400 text-sm mt-2">本周 +8</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-700 mb-8">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-400'
                    : 'border-transparent text-gray-400 hover:text-gray-300'
                }`}
              >
                {tab.label}
                {tab.count > 0 && (
                  <span className="ml-2 px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-full">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {renderTabContent()}
      </div>
    </div>
  );
};

export default Liquidity;