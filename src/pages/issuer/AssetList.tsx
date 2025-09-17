import React, { useState } from 'react';
import { Search, Filter, Download, Eye, ChevronLeft, ChevronRight } from 'lucide-react';

interface AssetListProps {
  poolId: string;
}

const AssetList: React.FC<AssetListProps> = ({ poolId }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const itemsPerPage = 20;

  // 模拟消费信贷资产数据
  const generateAssetData = () => {
    const assets = [];
    const statuses = ['正常', '逾期30天', '逾期60天', '逾期90天', '已结清'];
    const loanTypes = ['个人消费贷', '汽车分期', '信用卡分期', '装修贷款', '教育贷款'];
    const regions = ['上海', '北京', '深圳', '广州', '杭州', '南京', '苏州', '成都'];
    
    for (let i = 1; i <= 1000; i++) {
      const principal = Math.floor(Math.random() * 500000) + 50000; // 5万-55万
      const outstanding = Math.floor(principal * (0.3 + Math.random() * 0.7)); // 30%-100%剩余
      const monthlyPayment = Math.floor(principal / 36 * 1.08); // 假设36期，年化8%
      
      assets.push({
        id: `LOAN-${String(i).padStart(6, '0')}`,
        borrowerId: `BR-${String(Math.floor(Math.random() * 100000)).padStart(5, '0')}`,
        loanType: loanTypes[Math.floor(Math.random() * loanTypes.length)],
        originalAmount: principal,
        outstandingBalance: outstanding,
        monthlyPayment: monthlyPayment,
        interestRate: (6 + Math.random() * 6).toFixed(2), // 6%-12%
        term: Math.floor(Math.random() * 24) + 12, // 12-36个月
        remainingTerm: Math.floor(Math.random() * 24) + 6, // 6-30个月
        status: statuses[Math.floor(Math.random() * statuses.length)],
        originationDate: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
        lastPaymentDate: new Date(2024, 0, Math.floor(Math.random() * 15) + 1).toISOString().split('T')[0],
        creditScore: Math.floor(Math.random() * 300) + 500, // 500-800
        region: regions[Math.floor(Math.random() * regions.length)],
        ltv: (Math.random() * 0.5 + 0.3).toFixed(2), // 30%-80%
        dti: (Math.random() * 0.3 + 0.2).toFixed(2) // 20%-50%
      });
    }
    return assets;
  };

  const allAssets = generateAssetData();

  // 筛选逻辑
  const filteredAssets = allAssets.filter(asset => {
    const matchesSearch = asset.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.borrowerId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.loanType.includes(searchTerm);
    const matchesFilter = filterStatus === 'all' || asset.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // 分页逻辑
  const totalPages = Math.ceil(filteredAssets.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedAssets = filteredAssets.slice(startIndex, startIndex + itemsPerPage);

  const getStatusBadge = (status: string) => {
    const statusMap = {
      '正常': 'bg-green-500/20 text-green-400 border-green-500/30',
      '逾期30天': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      '逾期60天': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      '逾期90天': 'bg-red-500/20 text-red-400 border-red-500/30',
      '已结清': 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    };
    
    return (
      <span className={`px-2 py-1 rounded text-xs border ${statusMap[status as keyof typeof statusMap]}`}>
        {status}
      </span>
    );
  };

  const formatCurrency = (amount: number) => {
    return `¥${amount.toLocaleString()}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h3 className="text-xl font-semibold text-white">资产明细列表</h3>
          <p className="text-gray-400 text-sm mt-1">
            资产池 {poolId} 包含 {allAssets.length.toLocaleString()} 笔消费信贷资产
          </p>
        </div>
        
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2">
            <Download className="h-4 w-4" />
            导出Excel
          </button>
          <button className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors">
            批量操作
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="搜索资产ID、借款人ID或贷款类型..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-800/30 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white placeholder-gray-400"
          />
        </div>
        
        <div className="flex gap-3">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 bg-gray-800/30 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          >
            <option value="all">全部状态</option>
            <option value="正常">正常</option>
            <option value="逾期30天">逾期30天</option>
            <option value="逾期60天">逾期60天</option>
            <option value="逾期90天">逾期90天</option>
            <option value="已结清">已结清</option>
          </select>
          
          <button className="px-4 py-2 border border-gray-700 rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2">
            <Filter className="h-4 w-4" />
            高级筛选
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-lg border border-gray-700/50 p-4">
          <div className="text-sm text-gray-400">总资产数</div>
          <div className="text-xl font-bold text-white">{filteredAssets.length.toLocaleString()}</div>
        </div>
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-lg border border-gray-700/50 p-4">
          <div className="text-sm text-gray-400">总余额</div>
          <div className="text-xl font-bold text-white">
            {formatCurrency(filteredAssets.reduce((sum, asset) => sum + asset.outstandingBalance, 0))}
          </div>
        </div>
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-lg border border-gray-700/50 p-4">
          <div className="text-sm text-gray-400">正常资产</div>
          <div className="text-xl font-bold text-green-400">
            {filteredAssets.filter(asset => asset.status === '正常').length.toLocaleString()}
          </div>
        </div>
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-lg border border-gray-700/50 p-4">
          <div className="text-sm text-gray-400">逾期资产</div>
          <div className="text-xl font-bold text-red-400">
            {filteredAssets.filter(asset => asset.status.includes('逾期')).length.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Assets Table */}
      <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700/20 border-b border-gray-600">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">资产ID</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">借款人ID</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">贷款类型</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">原始金额</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">剩余余额</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">利率</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">剩余期数</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">状态</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">信用评分</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-600/30">
              {paginatedAssets.map((asset) => (
                <tr key={asset.id} className="hover:bg-gray-700/20 transition-colors">
                  <td className="px-4 py-3 text-cyan-400 font-mono text-sm">{asset.id}</td>
                  <td className="px-4 py-3 text-gray-300 font-mono text-sm">{asset.borrowerId}</td>
                  <td className="px-4 py-3 text-white">{asset.loanType}</td>
                  <td className="px-4 py-3 text-white">{formatCurrency(asset.originalAmount)}</td>
                  <td className="px-4 py-3 text-white font-medium">{formatCurrency(asset.outstandingBalance)}</td>
                  <td className="px-4 py-3 text-white">{asset.interestRate}%</td>
                  <td className="px-4 py-3 text-white">{asset.remainingTerm}期</td>
                  <td className="px-4 py-3">{getStatusBadge(asset.status)}</td>
                  <td className="px-4 py-3 text-white">{asset.creditScore}</td>
                  <td className="px-4 py-3">
                    <button className="text-cyan-400 hover:text-cyan-300 text-sm flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      详情
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Mobile Cards */}
        <div className="lg:hidden divide-y divide-gray-600/30">
          {paginatedAssets.map((asset) => (
            <div key={asset.id} className="p-4 hover:bg-gray-700/20 transition-colors">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <div className="text-cyan-400 font-mono text-sm">{asset.id}</div>
                  <div className="text-white font-medium">{asset.loanType}</div>
                  <div className="text-sm text-gray-400">借款人: {asset.borrowerId}</div>
                  <div className="mt-2">
                    {getStatusBadge(asset.status)}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white font-medium">{formatCurrency(asset.outstandingBalance)}</div>
                  <div className="text-sm text-gray-400">剩余余额</div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-gray-400">原始金额:</span>
                  <div className="text-white">{formatCurrency(asset.originalAmount)}</div>
                </div>
                <div>
                  <span className="text-gray-400">利率:</span>
                  <div className="text-white">{asset.interestRate}%</div>
                </div>
                <div>
                  <span className="text-gray-400">剩余期数:</span>
                  <div className="text-white">{asset.remainingTerm}期</div>
                </div>
                <div>
                  <span className="text-gray-400">信用评分:</span>
                  <div className="text-white">{asset.creditScore}</div>
                </div>
              </div>
              
              <div className="mt-3 pt-3 border-t border-gray-600/30 flex justify-end">
                <button className="text-cyan-400 hover:text-cyan-300 text-sm flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  详情
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-400">
          显示 {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredAssets.length)} 条，
          共 {filteredAssets.length} 条记录
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-3 py-2 border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
          >
            <ChevronLeft className="h-4 w-4" />
            上一页
          </button>
          
          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-3 py-2 rounded-lg transition-colors ${
                    currentPage === pageNum
                      ? 'bg-cyan-600 text-white'
                      : 'border border-gray-600 hover:bg-gray-800 text-gray-300'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>
          
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-2 border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
          >
            下一页
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssetList;