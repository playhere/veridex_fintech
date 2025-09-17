import React, { useState } from 'react';
import { Search, Filter, Shield, TrendingUp, Clock, DollarSign, Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';

const InvestmentMarket: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const investments = [
    {
      id: 'offer-001',
      name: '消费信贷资产池 2024-Q1',
      issuer: 'ABC金融集团',
      size: '$125M',
      minInvestment: '$100,000',
      duration: '36个月',
      expectedReturn: '8.5%',
      riskLevel: 'medium',
      industry: '消费金融',
      region: '华东',
      status: 'active',
      remainingTime: '15天',
      subscribed: '45%',
      isGreen: false,
      complianceStatus: 'qualified',
      features: ['DID验证', '受限证券', '合规代币']
    },
    {
      id: 'offer-002',
      name: '绿色债券资产包',
      issuer: 'Green Finance Corp',
      size: '$210M',
      minInvestment: '$250,000',
      duration: '60个月',
      expectedReturn: '7.2%',
      riskLevel: 'low',
      industry: '绿色能源',
      region: '华西',
      status: 'active',
      remainingTime: '8天',
      subscribed: '78%',
      isGreen: true,
      complianceStatus: 'qualified',
      features: ['ESG认证', '碳中和', 'DID验证']
    },
    {
      id: 'offer-003',
      name: '汽车抵押贷款池',
      issuer: 'AutoLoan Securities',
      size: '$156M',
      minInvestment: '$150,000',
      duration: '48个月',
      expectedReturn: '7.8%',
      riskLevel: 'low',
      industry: '汽车金融',
      region: '华北',
      status: 'active',
      remainingTime: '22天',
      subscribed: '62%',
      isGreen: false,
      complianceStatus: 'qualified',
      features: ['抵押担保', '保险覆盖', '流动性支持']
    },
    {
      id: 'offer-004',
      name: '供应链应收账款池',
      issuer: 'Supply Chain Finance',
      size: '$89M',
      minInvestment: '$200,000',
      duration: '18个月',
      expectedReturn: '9.2%',
      riskLevel: 'medium',
      industry: '供应链金融',
      region: '华南',
      status: 'coming_soon',
      remainingTime: '即将开放',
      subscribed: '0%',
      isGreen: false,
      complianceStatus: 'pending',
      features: ['应收账款', '信用增级', '短期流动']
    }
  ];

  const getRiskBadge = (level: string) => {
    const riskMap = {
      'low': { label: '低风险', color: 'bg-green-500/20 text-green-400 border-green-500/30' },
      'medium': { label: '中等风险', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
      'high': { label: '高风险', color: 'bg-red-500/20 text-red-400 border-red-500/30' }
    };
    
    const riskInfo = riskMap[level as keyof typeof riskMap];
    return (
      <span className={`px-2 py-1 rounded text-xs border ${riskInfo.color}`}>
        {riskInfo.label}
      </span>
    );
  };

  const getStatusBadge = (status: string) => {
    if (status === 'active') {
      return <span className="px-2 py-1 rounded text-xs bg-blue-500/20 text-blue-400 border border-blue-500/30">募集中</span>;
    } else if (status === 'coming_soon') {
      return <span className="px-2 py-1 rounded text-xs bg-purple-500/20 text-purple-400 border border-purple-500/30">即将开放</span>;
    }
    return null;
  };

  const filteredInvestments = investments.filter(investment => {
    const matchesSearch = investment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         investment.industry.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterCategory === 'all' || 
                         (filterCategory === 'green' && investment.isGreen) ||
                         (filterCategory === 'traditional' && !investment.isGreen);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            投资市场
          </h1>
          <p className="text-gray-400 mt-2">发现优质的资产证券化投资机会</p>
        </div>
        
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors">
            风险偏好设置
          </button>
          <Link
            to="/invest/portfolio"
            className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors"
          >
            我的投资
          </Link>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="搜索投资标的..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-800/30 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white placeholder-gray-400"
          />
        </div>
        
        <div className="flex gap-3">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-3 bg-gray-800/30 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          >
            <option value="all">全部类型</option>
            <option value="green">绿色债券</option>
            <option value="traditional">传统资产</option>
          </select>
          
          <button className="px-4 py-3 border border-gray-700 rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2">
            <Filter className="h-5 w-5" />
            高级筛选
          </button>
        </div>
      </div>

      {/* Investment Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredInvestments.map((investment) => (
          <div
            key={investment.id}
            className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6 hover:border-cyan-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10"
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold text-white">{investment.name}</h3>
                  {investment.isGreen && (
                    <Leaf className="h-4 w-4 text-green-400" />
                  )}
                </div>
                <p className="text-gray-400 text-sm">{investment.issuer}</p>
                <div className="flex items-center gap-2 mt-2">
                  {getRiskBadge(investment.riskLevel)}
                  {getStatusBadge(investment.status)}
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-2xl font-bold text-green-400">{investment.expectedReturn}</div>
                <div className="text-gray-400 text-sm">预期年化收益</div>
              </div>
            </div>

            {/* Key Details */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="flex items-center text-gray-400 text-sm mb-1">
                  <DollarSign className="h-4 w-4 mr-1" />
                  发行规模
                </div>
                <div className="text-white font-medium">{investment.size}</div>
              </div>
              
              <div>
                <div className="flex items-center text-gray-400 text-sm mb-1">
                  <Shield className="h-4 w-4 mr-1" />
                  起投金额
                </div>
                <div className="text-white font-medium">{investment.minInvestment}</div>
              </div>
              
              <div>
                <div className="flex items-center text-gray-400 text-sm mb-1">
                  <Clock className="h-4 w-4 mr-1" />
                  投资期限
                </div>
                <div className="text-white font-medium">{investment.duration}</div>
              </div>
              
              <div>
                <div className="flex items-center text-gray-400 text-sm mb-1">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  认购进度
                </div>
                <div className="text-white font-medium">{investment.subscribed}</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span>认购进度</span>
                <span>剩余时间: {investment.remainingTime}</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-cyan-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: investment.subscribed }}
                ></div>
              </div>
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-2 mb-4">
              {investment.features.map((feature, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-700/30 rounded text-xs text-gray-300 border border-gray-600/30"
                >
                  {feature}
                </span>
              ))}
            </div>

            {/* Compliance Status */}
            <div className="flex items-center justify-between mb-4 p-3 bg-gray-700/20 rounded-lg">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-400" />
                <span className="text-sm text-gray-400">合规状态</span>
              </div>
              <span className={`text-sm ${
                investment.complianceStatus === 'qualified' 
                  ? 'text-green-400' 
                  : 'text-yellow-400'
              }`}>
                {investment.complianceStatus === 'qualified' ? '资质已验证' : '待验证'}
              </span>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Link
                to={`/invest/offers/${investment.id}`}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg font-medium hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 text-center"
              >
                查看详情
              </Link>
              <button 
                className="px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors"
                disabled={investment.status === 'coming_soon'}
              >
                {investment.status === 'coming_soon' ? '即将开放' : '立即认购'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Market Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6 text-center">
          <div className="text-2xl font-bold text-white mb-2">{filteredInvestments.length}</div>
          <div className="text-gray-400 text-sm">可投资产品</div>
        </div>
        
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6 text-center">
          <div className="text-2xl font-bold text-cyan-400 mb-2">
            ${(filteredInvestments.reduce((sum, inv) => sum + parseFloat(inv.size.replace(/[$M]/g, '')), 0)).toFixed(0)}M
          </div>
          <div className="text-gray-400 text-sm">总发行规模</div>
        </div>
        
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6 text-center">
          <div className="text-2xl font-bold text-green-400 mb-2">
            {(filteredInvestments.reduce((sum, inv) => sum + parseFloat(inv.expectedReturn), 0) / filteredInvestments.length).toFixed(1)}%
          </div>
          <div className="text-gray-400 text-sm">平均预期收益</div>
        </div>
        
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6 text-center">
          <div className="text-2xl font-bold text-purple-400 mb-2">
            {filteredInvestments.filter(inv => inv.isGreen).length}
          </div>
          <div className="text-gray-400 text-sm">绿色债券产品</div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentMarket;