import React, { useState } from 'react';
import { Download, Calendar, Filter, Eye, Share2, BarChart3, FileText, TrendingUp, DollarSign } from 'lucide-react';

const ServicerReports: React.FC = () => {
  const [activeTab, setActiveTab] = useState('pool');
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');

  const reportTypes = [
    { id: 'pool', name: '资产池报告', icon: BarChart3 },
    { id: 'cashflow', name: '现金流分配', icon: DollarSign },
    { id: 'performance', name: '表现分析', icon: TrendingUp },
    { id: 'compliance', name: '合规审计', icon: FileText }
  ];

  const poolReports = [
    {
      id: 'rpt-001',
      name: '消费信贷资产池 2024-Q1 月报',
      period: '2024年1月',
      type: 'monthly',
      status: 'published',
      size: '2.5MB',
      downloads: 45,
      lastUpdated: '2024-01-15 14:30:22'
    },
    {
      id: 'rpt-002',
      name: '汽车抵押贷款池 季度报告',
      period: '2024年Q1',
      type: 'quarterly',
      status: 'draft',
      size: '4.2MB',
      downloads: 0,
      lastUpdated: '2024-01-14 16:45:18'
    },
    {
      id: 'rpt-003',
      name: '绿色债券资产包 年度报告',
      period: '2023年',
      type: 'annual',
      status: 'published',
      size: '8.7MB',
      downloads: 128,
      lastUpdated: '2024-01-10 09:15:33'
    }
  ];

  const cashflowReports = [
    {
      id: 'cf-001',
      name: 'CCP24Q1 现金流分配明细',
      period: '2024年1月',
      amount: '$3,750,000',
      status: 'completed',
      recipients: 156
    },
    {
      id: 'cf-002',
      name: 'ALCP2024 分派计算表',
      period: '2024年1月',
      amount: '$2,100,000',
      status: 'processing',
      recipients: 89
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusMap = {
      'published': { label: '已发布', color: 'bg-green-500/20 text-green-400 border-green-500/30' },
      'draft': { label: '草稿', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
      'completed': { label: '已完成', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
      'processing': { label: '处理中', color: 'bg-purple-500/20 text-purple-400 border-purple-500/30' }
    };
    
    const statusInfo = statusMap[status as keyof typeof statusMap];
    return (
      <span className={`px-2 py-1 rounded text-xs border ${statusInfo.color}`}>
        {statusInfo.label}
      </span>
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            资产服务报告
          </h1>
          <p className="text-gray-400 mt-2">生成和管理资产池表现报告、现金流分配和合规文档</p>
        </div>
        
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2">
            <Filter className="h-4 w-4" />
            筛选
          </button>
          <button className="px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            时间范围
          </button>
          <button className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors flex items-center gap-2">
            <Download className="h-4 w-4" />
            批量导出
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
          <div className="flex items-center mb-3">
            <FileText className="h-5 w-5 text-blue-400 mr-2" />
            <span className="text-sm text-gray-400">本月报告</span>
          </div>
          <div className="text-2xl font-bold text-white">12</div>
          <div className="text-sm text-green-400 mt-1">+3 vs 上月</div>
        </div>
        
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
          <div className="flex items-center mb-3">
            <Download className="h-5 w-5 text-green-400 mr-2" />
            <span className="text-sm text-gray-400">总下载量</span>
          </div>
          <div className="text-2xl font-bold text-white">1,247</div>
          <div className="text-sm text-green-400 mt-1">+15% vs 上月</div>
        </div>
        
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
          <div className="flex items-center mb-3">
            <DollarSign className="h-5 w-5 text-purple-400 mr-2" />
            <span className="text-sm text-gray-400">分派金额</span>
          </div>
          <div className="text-2xl font-bold text-white">$5.85M</div>
          <div className="text-sm text-gray-400 mt-1">本月累计</div>
        </div>
        
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
          <div className="flex items-center mb-3">
            <Share2 className="h-5 w-5 text-yellow-400 mr-2" />
            <span className="text-sm text-gray-400">共享权限</span>
          </div>
          <div className="text-2xl font-bold text-white">89</div>
          <div className="text-sm text-gray-400 mt-1">活跃用户</div>
        </div>
      </div>

      {/* Report Type Tabs */}
      <div className="border-b border-gray-700">
        <nav className="flex space-x-8">
          {reportTypes.map((type) => {
            const Icon = type.icon;
            return (
              <button
                key={type.id}
                onClick={() => setActiveTab(type.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors flex items-center gap-2 ${
                  activeTab === type.id
                    ? 'border-cyan-500 text-cyan-400'
                    : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                }`}
              >
                <Icon className="h-4 w-4" />
                {type.name}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'pool' && (
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden">
          <div className="p-6 border-b border-gray-600/30">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-white">资产池报告</h3>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-3 py-2 bg-gray-700/30 border border-gray-600 rounded-lg text-white text-sm"
              >
                <option value="monthly">月度报告</option>
                <option value="quarterly">季度报告</option>
                <option value="annual">年度报告</option>
              </select>
            </div>
          </div>
          
          <div className="divide-y divide-gray-600/30">
            {poolReports.map((report) => (
              <div key={report.id} className="p-6 hover:bg-gray-700/20 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-white font-medium">{report.name}</h4>
                      {getStatusBadge(report.status)}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-2">
                      <span>报告期间: {report.period}</span>
                      <span>文件大小: {report.size}</span>
                      <span>下载次数: {report.downloads}</span>
                    </div>
                    <p className="text-gray-500 text-sm">最后更新: {report.lastUpdated}</p>
                  </div>
                  
                  <div className="flex gap-2">
                    <button className="px-3 py-1 border border-gray-600 hover:bg-gray-800 rounded text-sm transition-colors flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      预览
                    </button>
                    <button className="px-3 py-1 bg-cyan-600 hover:bg-cyan-700 rounded text-sm transition-colors flex items-center gap-1">
                      <Download className="h-3 w-3" />
                      下载
                    </button>
                    <button className="px-3 py-1 border border-gray-600 hover:bg-gray-800 rounded text-sm transition-colors flex items-center gap-1">
                      <Share2 className="h-3 w-3" />
                      共享
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'cashflow' && (
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden">
          <div className="p-6 border-b border-gray-600/30">
            <h3 className="text-lg font-semibold text-white">现金流分配报告</h3>
          </div>
          
          <div className="divide-y divide-gray-600/30">
            {cashflowReports.map((report) => (
              <div key={report.id} className="p-4 lg:p-6 hover:bg-gray-700/20 transition-colors">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div>
                    <h4 className="text-white font-medium mb-1">{report.name}</h4>
                    <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-4 text-sm text-gray-400">
                      <span>分派期间: {report.period}</span>
                      <span>分派金额: {report.amount}</span>
                      <span>受益人数: {report.recipients}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    {getStatusBadge(report.status)}
                    <div className="flex flex-wrap gap-2">
                      <button className="px-3 py-1 border border-gray-600 hover:bg-gray-800 rounded text-sm transition-colors">
                        查看明细
                      </button>
                      <button className="px-3 py-1 bg-cyan-600 hover:bg-cyan-700 rounded text-sm transition-colors">
                        导出
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {(activeTab === 'performance' || activeTab === 'compliance') && (
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-8 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
              {activeTab === 'performance' ? (
                <TrendingUp className="h-8 w-8 text-white" />
              ) : (
                <FileText className="h-8 w-8 text-white" />
              )}
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              {activeTab === 'performance' ? '表现分析报告' : '合规审计报告'}
            </h3>
            <p className="text-gray-400 mb-6">
              {activeTab === 'performance' 
                ? '资产池表现分析和风险评估报告功能正在开发中'
                : '合规审计和监管报送文档功能正在开发中'
              }
            </p>
            <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg font-medium hover:from-cyan-600 hover:to-purple-600 transition-all duration-300">
              敬请期待
            </button>
          </div>
        </div>
      )}

      {/* Report Generation */}
      <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">生成新报告</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">报告类型</label>
            <select className="w-full px-3 py-2 bg-gray-700/30 border border-gray-600 rounded-lg text-white">
              <option>资产池月报</option>
              <option>现金流分配</option>
              <option>表现分析</option>
              <option>合规审计</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">资产池</label>
            <select className="w-full px-3 py-2 bg-gray-700/30 border border-gray-600 rounded-lg text-white">
              <option>消费信贷资产池 2024-Q1</option>
              <option>汽车抵押贷款池</option>
              <option>绿色债券资产包</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">报告期间</label>
            <input
              type="month"
              className="w-full px-3 py-2 bg-gray-700/30 border border-gray-600 rounded-lg text-white"
              defaultValue="2024-01"
            />
          </div>
        </div>
        
        <div className="mt-4 flex justify-end">
          <button className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg font-medium hover:from-cyan-600 hover:to-purple-600 transition-all duration-300">
            生成报告
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServicerReports;