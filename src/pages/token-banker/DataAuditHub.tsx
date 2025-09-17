import React, { useState } from 'react';
import { 
  Database, 
  FileText, 
  Download, 
  RefreshCw,
  Search,
  Filter,
  Eye,
  Hash,
  CheckCircle,
  AlertTriangle,
  Clock,
  BarChart3,
  Users,
  Shield
} from 'lucide-react';

const DataAuditHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState('entities');

  const entityData = [
    {
      id: 'entity-001',
      name: 'ABC金融集团',
      type: 'issuer',
      status: 'active',
      lastUpdated: '2024-01-15 14:30:22',
      dataQuality: 98.5,
      recordCount: 1247,
      relationships: 5,
      complianceStatus: 'compliant'
    },
    {
      id: 'entity-002',
      name: 'Investment Group LLC',
      type: 'investor',
      status: 'active',
      lastUpdated: '2024-01-15 12:15:33',
      dataQuality: 95.2,
      recordCount: 89,
      relationships: 3,
      complianceStatus: 'compliant'
    },
    {
      id: 'entity-003',
      name: 'Market Maker Alpha',
      type: 'market_maker',
      status: 'active',
      lastUpdated: '2024-01-15 10:45:18',
      dataQuality: 92.8,
      recordCount: 567,
      relationships: 8,
      complianceStatus: 'under_review'
    }
  ];

  const reconciliationJobs = [
    {
      id: 'recon-001',
      name: '月度资产池对账',
      type: 'asset_pool',
      status: 'completed',
      startTime: '2024-01-15 02:00:00',
      endTime: '2024-01-15 02:15:33',
      recordsProcessed: 125000,
      discrepancies: 3,
      accuracy: 99.998
    },
    {
      id: 'recon-002',
      name: '投资者持仓对账',
      type: 'investor_holdings',
      status: 'running',
      startTime: '2024-01-15 14:00:00',
      endTime: null,
      recordsProcessed: 89000,
      discrepancies: 0,
      accuracy: 100.0
    },
    {
      id: 'recon-003',
      name: '现金流对账',
      type: 'cash_flow',
      status: 'scheduled',
      startTime: '2024-01-16 02:00:00',
      endTime: null,
      recordsProcessed: 0,
      discrepancies: null,
      accuracy: null
    }
  ];

  const reportJobs = [
    {
      id: 'report-001',
      name: '监管报告 - SEC Form ABS-15G',
      type: 'regulatory',
      status: 'completed',
      generatedAt: '2024-01-15 08:30:22',
      size: '15.2MB',
      downloads: 5,
      recipient: 'SEC',
      nextDue: '2024-02-15'
    },
    {
      id: 'report-002',
      name: '税务报告 - 1099表格',
      type: 'tax',
      status: 'generating',
      generatedAt: null,
      size: null,
      downloads: 0,
      recipient: 'IRS',
      nextDue: '2024-01-31'
    },
    {
      id: 'report-003',
      name: '审计报告 - 年度审计',
      type: 'audit',
      status: 'scheduled',
      generatedAt: null,
      size: null,
      downloads: 0,
      recipient: 'External Auditor',
      nextDue: '2024-03-15'
    }
  ];

  const auditLogs = [
    {
      id: 'audit-001',
      timestamp: '2024-01-15 14:30:22',
      user: 'alice@platform.com',
      action: 'Entity Data Updated',
      entity: 'ABC金融集团',
      changes: 'Updated compliance status to compliant',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0...'
    },
    {
      id: 'audit-002',
      timestamp: '2024-01-15 13:45:18',
      user: 'bob@platform.com',
      action: 'Report Generated',
      entity: 'SEC Form ABS-15G',
      changes: 'Generated regulatory report for Q4 2023',
      ipAddress: '192.168.1.101',
      userAgent: 'Mozilla/5.0...'
    },
    {
      id: 'audit-003',
      timestamp: '2024-01-15 12:15:33',
      user: 'system',
      action: 'Reconciliation Completed',
      entity: 'Asset Pool CCP24Q1',
      changes: 'Monthly reconciliation completed with 3 discrepancies',
      ipAddress: 'internal',
      userAgent: 'System Process'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusMap = {
      'active': { label: '活跃', color: 'bg-green-500/20 text-green-400 border-green-500/30' },
      'completed': { label: '已完成', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
      'running': { label: '运行中', color: 'bg-purple-500/20 text-purple-400 border-purple-500/30' },
      'scheduled': { label: '已计划', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
      'generating': { label: '生成中', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
      'compliant': { label: '合规', color: 'bg-green-500/20 text-green-400 border-green-500/30' },
      'under_review': { label: '审核中', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' }
    };
    
    const statusInfo = statusMap[status as keyof typeof statusMap];
    return (
      <span className={`px-2 py-1 rounded text-xs border ${statusInfo.color}`}>
        {statusInfo.label}
      </span>
    );
  };

  const tabs = [
    { id: 'entities', name: '主数据管理', count: entityData.length },
    { id: 'reconciliation', name: '对账作业', count: reconciliationJobs.filter(j => j.status === 'running').length },
    { id: 'reports', name: '报告作业', count: reportJobs.filter(r => r.status === 'generating').length },
    { id: 'audit', name: '审计日志', count: null }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            数据与审计中心
          </h1>
          <p className="text-gray-400 mt-2">主数据管理、可追溯台账与监管报告的统一平台</p>
        </div>
        
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            同步数据
          </button>
          <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors flex items-center gap-2">
            <Download className="h-4 w-4" />
            导出审计包
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
          <div className="flex items-center mb-3">
            <Database className="h-5 w-5 text-blue-400 mr-2" />
            <span className="text-sm text-gray-400">实体记录</span>
          </div>
          <div className="text-2xl font-bold text-blue-400">{entityData.length}</div>
          <div className="text-sm text-gray-400 mt-1">主数据实体</div>
        </div>
        
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
          <div className="flex items-center mb-3">
            <BarChart3 className="h-5 w-5 text-green-400 mr-2" />
            <span className="text-sm text-gray-400">数据质量</span>
          </div>
          <div className="text-2xl font-bold text-green-400">96.8%</div>
          <div className="text-sm text-green-400 mt-1">平均质量分</div>
        </div>
        
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
          <div className="flex items-center mb-3">
            <FileText className="h-5 w-5 text-purple-400 mr-2" />
            <span className="text-sm text-gray-400">运行中作业</span>
          </div>
          <div className="text-2xl font-bold text-purple-400">
            {reconciliationJobs.filter(j => j.status === 'running').length + reportJobs.filter(r => r.status === 'generating').length}
          </div>
        </div>
        
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
          <div className="flex items-center mb-3">
            <Shield className="h-5 w-5 text-yellow-400 mr-2" />
            <span className="text-sm text-gray-400">合规覆盖率</span>
          </div>
          <div className="text-2xl font-bold text-yellow-400">100%</div>
          <div className="text-sm text-green-400 mt-1">全部合规</div>
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
      {activeTab === 'entities' && (
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700/20 border-b border-gray-600">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">实体名称</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">类型</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">数据质量</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">记录数</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">关联关系</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">合规状态</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">最后更新</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-600/30">
                {entityData.map((entity) => (
                  <tr key={entity.id} className="hover:bg-gray-700/20 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-white">{entity.name}</div>
                      <div className="text-sm text-gray-400">{entity.id}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs border ${
                        entity.type === 'issuer' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' :
                        entity.type === 'investor' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                        'bg-purple-500/20 text-purple-400 border-purple-500/30'
                      }`}>
                        {entity.type === 'issuer' ? '发行方' : 
                         entity.type === 'investor' ? '投资者' : '做市商'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-700 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              entity.dataQuality > 95 ? 'bg-green-400' :
                              entity.dataQuality > 90 ? 'bg-yellow-400' : 'bg-red-400'
                            }`}
                            style={{ width: `${entity.dataQuality}%` }}
                          ></div>
                        </div>
                        <span className="text-white text-sm">{entity.dataQuality}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-white">{entity.recordCount.toLocaleString()}</td>
                    <td className="px-6 py-4 text-purple-400">{entity.relationships}</td>
                    <td className="px-6 py-4">{getStatusBadge(entity.complianceStatus)}</td>
                    <td className="px-6 py-4 text-gray-300">{entity.lastUpdated}</td>
                    <td className="px-6 py-4">
                      <button className="text-purple-400 hover:text-purple-300 text-sm flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        查看
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'reconciliation' && (
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden">
          <div className="p-6 border-b border-gray-600/30">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-white">对账作业</h3>
              <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors">
                手动触发对账
              </button>
            </div>
          </div>
          
          <div className="divide-y divide-gray-600/30">
            {reconciliationJobs.map((job) => (
              <div key={job.id} className="p-6 hover:bg-gray-700/20 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-white font-medium">{job.name}</h4>
                    <div className="text-gray-400 text-sm mt-1">
                      类型: {job.type === 'asset_pool' ? '资产池' : 
                             job.type === 'investor_holdings' ? '投资者持仓' : '现金流'}
                    </div>
                  </div>
                  {getStatusBadge(job.status)}
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">开始时间:</span>
                    <div className="text-white">{job.startTime}</div>
                  </div>
                  <div>
                    <span className="text-gray-400">处理记录:</span>
                    <div className="text-purple-400">{job.recordsProcessed.toLocaleString()}</div>
                  </div>
                  <div>
                    <span className="text-gray-400">差异数:</span>
                    <div className={job.discrepancies === 0 ? 'text-green-400' : 'text-yellow-400'}>
                      {job.discrepancies !== null ? job.discrepancies : '-'}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-400">准确率:</span>
                    <div className="text-green-400">
                      {job.accuracy !== null ? `${job.accuracy}%` : '-'}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'reports' && (
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700/20 border-b border-gray-600">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">报告名称</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">类型</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">状态</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">生成时间</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">文件大小</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">下载次数</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">下次到期</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-600/30">
                {reportJobs.map((report) => (
                  <tr key={report.id} className="hover:bg-gray-700/20 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-white">{report.name}</div>
                      <div className="text-sm text-gray-400">收件人: {report.recipient}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs border ${
                        report.type === 'regulatory' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                        report.type === 'tax' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                        'bg-blue-500/20 text-blue-400 border-blue-500/30'
                      }`}>
                        {report.type === 'regulatory' ? '监管' : 
                         report.type === 'tax' ? '税务' : '审计'}
                      </span>
                    </td>
                    <td className="px-6 py-4">{getStatusBadge(report.status)}</td>
                    <td className="px-6 py-4 text-gray-300">{report.generatedAt || '-'}</td>
                    <td className="px-6 py-4 text-white">{report.size || '-'}</td>
                    <td className="px-6 py-4 text-purple-400">{report.downloads}</td>
                    <td className="px-6 py-4 text-yellow-400">{report.nextDue}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        {report.status === 'completed' && (
                          <button className="text-green-400 hover:text-green-300 text-sm flex items-center gap-1">
                            <Download className="h-3 w-3" />
                            下载
                          </button>
                        )}
                        <button className="text-purple-400 hover:text-purple-300 text-sm flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          详情
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

      {activeTab === 'audit' && (
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden">
          <div className="p-6 border-b border-gray-600/30">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-white">审计日志</h3>
              <div className="flex gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="搜索操作记录..."
                    className="pl-10 pr-4 py-2 bg-gray-700/30 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400"
                  />
                </div>
                <button className="px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  筛选
                </button>
              </div>
            </div>
          </div>
          
          <div className="divide-y divide-gray-600/30">
            {auditLogs.map((log) => (
              <div key={log.id} className="p-6 hover:bg-gray-700/20 transition-colors">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-white font-medium">{log.action}</h4>
                      <span className="text-gray-400 text-sm">by {log.user}</span>
                    </div>
                    <div className="text-gray-400 text-sm">实体: {log.entity}</div>
                    <div className="text-gray-300 text-sm mt-1">{log.changes}</div>
                  </div>
                  <div className="text-right text-sm text-gray-400">
                    <div>{log.timestamp}</div>
                    <div className="text-xs mt-1">IP: {log.ipAddress}</div>
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

export default DataAuditHub;