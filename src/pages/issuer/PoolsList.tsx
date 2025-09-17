import React, { useState } from 'react';
import { Search, Filter, Plus, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

const PoolsList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const pools = [
    {
      id: 'pool-001',
      name: '消费信贷资产池 2024-Q1',
      size: '$125,000,000',
      duration: '36个月',
      defaultRate: '1.20%',
      recoveryRate: '89.5%',
      status: 'issuing',
      industry: '消费金融',
      region: '华东',
      currency: 'USD',
      yield: '8.5%',
      riskLevel: 'medium'
    },
    {
      id: 'pool-002',
      name: '中小企业贷款组合',
      size: '$89,500,000',
      duration: '24个月',
      defaultRate: '2.10%',
      recoveryRate: '76.3%',
      status: 'structuring',
      industry: '制造业',
      region: '华南',
      currency: 'USD',
      yield: '9.2%',
      riskLevel: 'high'
    },
    {
      id: 'pool-003',
      name: '汽车抵押贷款池',
      size: '$156,200,000',
      duration: '48个月',
      defaultRate: '0.80%',
      recoveryRate: '94.2%',
      status: 'live',
      industry: '汽车金融',
      region: '华北',
      currency: 'USD',
      yield: '7.8%',
      riskLevel: 'low'
    },
    {
      id: 'pool-004',
      name: '供应链应收账款池',
      size: '$67,800,000',
      duration: '18个月',
      defaultRate: '1.85%',
      recoveryRate: '85.7%',
      status: 'modeling',
      industry: '供应链金融',
      region: '华中',
      currency: 'USD',
      yield: '8.8%',
      riskLevel: 'medium'
    },
    {
      id: 'pool-005',
      name: '绿色债券资产包',
      size: '$210,000,000',
      duration: '60个月',
      defaultRate: '0.65%',
      recoveryRate: '96.1%',
      status: 'live',
      industry: '绿色能源',
      region: '华西',
      currency: 'USD',
      yield: '7.2%',
      riskLevel: 'low'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusMap = {
      'modeling': { label: '建模中', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
      'structuring': { label: '结构化', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
      'issuing': { label: '发行中', color: 'bg-purple-500/20 text-purple-400 border-purple-500/30' },
      'live': { label: '已上链', color: 'bg-green-500/20 text-green-400 border-green-500/30' }
    };
    
    const statusInfo = statusMap[status as keyof typeof statusMap];
    return (
      <span className={`px-2 py-1 rounded text-xs border ${statusInfo.color}`}>
        {statusInfo.label}
      </span>
    );
  };

  const getRiskBadge = (level: string) => {
    const riskMap = {
      'low': { label: '低风险', color: 'text-green-400' },
      'medium': { label: '中等风险', color: 'text-yellow-400' },
      'high': { label: '高风险', color: 'text-red-400' }
    };
    
    const riskInfo = riskMap[level as keyof typeof riskMap];
    return <span className={`text-xs ${riskInfo.color}`}>{riskInfo.label}</span>;
  };

  const filteredPools = pools.filter(pool => {
    const matchesSearch = pool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pool.industry.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || pool.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            资产池管理
          </h1>
          <p className="text-gray-400 mt-2">管理和监控所有资产池的表现</p>
        </div>
        
        <Link
          to="/issuer/pools/new"
          className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg font-medium hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 flex items-center gap-2"
        >
          <Plus className="h-5 w-5" />
          新建资产池
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="搜索资产池..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-800/30 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white placeholder-gray-400"
          />
        </div>
        
        <div className="flex gap-3">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-3 bg-gray-800/30 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          >
            <option value="all">全部状态</option>
            <option value="modeling">建模中</option>
            <option value="structuring">结构化</option>
            <option value="issuing">发行中</option>
            <option value="live">已上链</option>
          </select>
          
          <button className="px-4 py-3 border border-gray-700 rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2">
            <Filter className="h-5 w-5" />
            更多筛选
          </button>
        </div>
      </div>

      {/* Pools Table */}
      <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700/20 border-b border-gray-600">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">资产池名称</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">规模</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">期限</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">违约率</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">回收率</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">预期收益</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">状态</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-600/30">
              {filteredPools.map((pool) => (
                <tr key={pool.id} className="hover:bg-gray-700/20 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <Link
                        to={`/issuer/pools/${pool.id}`}
                        className="font-medium text-white hover:text-cyan-400 transition-colors"
                      >
                        {pool.name}
                      </Link>
                      <div className="text-sm text-gray-400 mt-1">
                        {pool.industry} • {pool.region} • {getRiskBadge(pool.riskLevel)}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-white font-medium">{pool.size}</td>
                  <td className="px-6 py-4 text-gray-300">{pool.duration}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <span className="text-white">{pool.defaultRate}</span>
                      {parseFloat(pool.defaultRate) > 2.0 && (
                        <AlertTriangle className="h-4 w-4 text-red-400 ml-2" />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <span className="text-white">{pool.recoveryRate}</span>
                      {parseFloat(pool.recoveryRate) > 90 ? (
                        <TrendingUp className="h-4 w-4 text-green-400 ml-2" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-400 ml-2" />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-green-400 font-medium">{pool.yield}</td>
                  <td className="px-6 py-4">
                    {getStatusBadge(pool.status)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <Link
                        to={`/issuer/pools/${pool.id}`}
                        className="text-cyan-400 hover:text-cyan-300 text-sm font-medium"
                      >
                        查看详情
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Mobile Cards */}
        <div className="lg:hidden divide-y divide-gray-600/30">
          {filteredPools.map((pool) => (
            <div key={pool.id} className="p-4 hover:bg-gray-700/20 transition-colors">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <Link
                    to={`/issuer/pools/${pool.id}`}
                    className="font-medium text-white hover:text-cyan-400 transition-colors block"
                  >
                    {pool.name}
                  </Link>
                  <div className="text-sm text-gray-400 mt-1">
                    {pool.industry} • {pool.region}
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`px-2 py-1 rounded text-xs ${
                      pool.riskLevel === 'low' ? 'text-green-400 bg-green-500/20' :
                      pool.riskLevel === 'medium' ? 'text-yellow-400 bg-yellow-500/20' :
                      'text-red-400 bg-red-500/20'
                    }`}>
                      {pool.riskLevel === 'low' ? '低风险' : pool.riskLevel === 'medium' ? '中等风险' : '高风险'}
                    </span>
                    {getStatusBadge(pool.status)}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-white">{pool.size}</div>
                  <div className="text-sm text-green-400">{pool.yield}</div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">期限:</span>
                  <span className="text-white ml-2">{pool.duration}</span>
                </div>
                <div>
                  <span className="text-gray-400">违约率:</span>
                  <span className="text-white ml-2">{pool.defaultRate}</span>
                  {parseFloat(pool.defaultRate) > 2.0 && (
                    <AlertTriangle className="h-3 w-3 text-red-400 ml-1 inline" />
                  )}
                </div>
                <div>
                  <span className="text-gray-400">回收率:</span>
                  <span className="text-white ml-2">{pool.recoveryRate}</span>
                  {parseFloat(pool.recoveryRate) > 90 ? (
                    <TrendingUp className="h-3 w-3 text-green-400 ml-1 inline" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-400 ml-1 inline" />
                  )}
                </div>
                <div className="flex justify-end">
                  <Link
                    to={`/issuer/pools/${pool.id}`}
                    className="text-cyan-400 hover:text-cyan-300 text-sm font-medium"
                  >
                    查看详情
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6 text-center">
          <div className="text-2xl font-bold text-white mb-2">{filteredPools.length}</div>
          <div className="text-gray-400 text-sm">总资产池数</div>
        </div>
        
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6 text-center">
          <div className="text-2xl font-bold text-green-400 mb-2">
            ${(filteredPools.reduce((sum, pool) => sum + parseFloat(pool.size.replace(/[$,]/g, '')), 0) / 1000000).toFixed(0)}M
          </div>
          <div className="text-gray-400 text-sm">总管理规模</div>
        </div>
        
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6 text-center">
          <div className="text-2xl font-bold text-yellow-400 mb-2">
            {(filteredPools.reduce((sum, pool) => sum + parseFloat(pool.defaultRate), 0) / filteredPools.length).toFixed(2)}%
          </div>
          <div className="text-gray-400 text-sm">平均违约率</div>
        </div>
        
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6 text-center">
          <div className="text-2xl font-bold text-cyan-400 mb-2">
            {(filteredPools.reduce((sum, pool) => sum + parseFloat(pool.yield), 0) / filteredPools.length).toFixed(1)}%
          </div>
          <div className="text-gray-400 text-sm">平均预期收益</div>
        </div>
      </div>
    </div>
  );
};

export default PoolsList;