import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Eye, 
  RefreshCw,
  Shield,
  Users,
  FileText,
  Settings,
  TrendingUp,
  TrendingDown
} from 'lucide-react';

const ComplianceEngine: React.FC = () => {
  const [activeTab, setActiveTab] = useState('cases');
  const [filterStatus, setFilterStatus] = useState('all');

  const kycCases = [
    {
      id: 'kyc-001',
      applicantName: 'John Smith',
      applicantType: 'individual',
      submissionDate: '2024-01-15',
      status: 'pending_review',
      riskScore: 'medium',
      jurisdiction: 'US',
      investorType: 'qualified',
      documentsCount: 5,
      flaggedItems: 2,
      assignedTo: 'Compliance Officer A',
      priority: 'high'
    },
    {
      id: 'kyc-002',
      applicantName: 'Investment Group LLC',
      applicantType: 'institutional',
      submissionDate: '2024-01-14',
      status: 'approved',
      riskScore: 'low',
      jurisdiction: 'EU',
      investorType: 'professional',
      documentsCount: 8,
      flaggedItems: 0,
      assignedTo: 'Compliance Officer B',
      priority: 'medium'
    },
    {
      id: 'kyc-003',
      applicantName: 'Sarah Johnson',
      applicantType: 'individual',
      submissionDate: '2024-01-13',
      status: 'rejected',
      riskScore: 'high',
      jurisdiction: 'SG',
      investorType: 'retail',
      documentsCount: 3,
      flaggedItems: 5,
      assignedTo: 'Compliance Officer C',
      priority: 'high'
    }
  ];

  const complianceRules = [
    {
      id: 'rule-001',
      name: 'US合格投资者验证',
      category: 'investor_qualification',
      status: 'active',
      version: 'v2.1',
      lastUpdated: '2024-01-10',
      applicableJurisdictions: ['US'],
      automationLevel: 85
    },
    {
      id: 'rule-002',
      name: 'EU MiFID II专业投资者',
      category: 'investor_qualification',
      status: 'active',
      version: 'v1.8',
      lastUpdated: '2024-01-08',
      applicableJurisdictions: ['EU'],
      automationLevel: 92
    },
    {
      id: 'rule-003',
      name: 'PEP制裁名单检查',
      category: 'sanctions_screening',
      status: 'active',
      version: 'v3.2',
      lastUpdated: '2024-01-15',
      applicableJurisdictions: ['Global'],
      automationLevel: 98
    }
  ];

  const transferPolicies = [
    {
      id: 'policy-001',
      name: '受限证券转让规则',
      description: '基于ERC-3643标准的转让限制',
      status: 'active',
      lockupPeriod: '6个月',
      cooldownPeriod: '72小时',
      whitelistRequired: true,
      jurisdictionRestrictions: ['US', 'EU', 'SG']
    },
    {
      id: 'policy-002',
      name: '机构投资者快速通道',
      description: '符合条件的机构投资者可享受快速转让',
      status: 'active',
      lockupPeriod: '3个月',
      cooldownPeriod: '24小时',
      whitelistRequired: false,
      jurisdictionRestrictions: ['US', 'EU']
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusMap = {
      'pending_review': { label: '待审核', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
      'approved': { label: '已通过', color: 'bg-green-500/20 text-green-400 border-green-500/30' },
      'rejected': { label: '已拒绝', color: 'bg-red-500/20 text-red-400 border-red-500/30' },
      'under_review': { label: '审核中', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' }
    };
    
    const statusInfo = statusMap[status as keyof typeof statusMap];
    return (
      <span className={`px-2 py-1 rounded text-xs border ${statusInfo.color}`}>
        {statusInfo.label}
      </span>
    );
  };

  const getRiskScoreColor = (score: string) => {
    const colorMap = {
      'low': 'text-green-400',
      'medium': 'text-yellow-400',
      'high': 'text-red-400'
    };
    return colorMap[score as keyof typeof colorMap] || 'text-gray-400';
  };

  const getPriorityColor = (priority: string) => {
    const colorMap = {
      'high': 'text-red-400',
      'medium': 'text-yellow-400',
      'low': 'text-green-400'
    };
    return colorMap[priority as keyof typeof colorMap] || 'text-gray-400';
  };

  const tabs = [
    { id: 'cases', name: 'KYC/KYB案例', count: kycCases.filter(c => c.status === 'pending_review').length },
    { id: 'rules', name: '合规规则', count: complianceRules.length },
    { id: 'policies', name: '转让政策', count: transferPolicies.length },
    { id: 'monitoring', name: '实时监控', count: null }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            合规引擎
          </h1>
          <p className="text-gray-400 mt-2">身份验证、适当性管理与转让限制的统一平台</p>
        </div>
        
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            同步规则
          </button>
          <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors flex items-center gap-2">
            <Settings className="h-4 w-4" />
            规则配置
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
          <div className="flex items-center mb-3">
            <Clock className="h-5 w-5 text-yellow-400 mr-2" />
            <span className="text-sm text-gray-400">待审核案例</span>
          </div>
          <div className="text-2xl font-bold text-yellow-400">
            {kycCases.filter(c => c.status === 'pending_review').length}
          </div>
        </div>
        
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
          <div className="flex items-center mb-3">
            <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
            <span className="text-sm text-gray-400">通过率</span>
          </div>
          <div className="text-2xl font-bold text-green-400">94.2%</div>
          <div className="text-sm text-green-400 mt-1">+1.8% vs 上月</div>
        </div>
        
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
          <div className="flex items-center mb-3">
            <AlertTriangle className="h-5 w-5 text-red-400 mr-2" />
            <span className="text-sm text-gray-400">高风险案例</span>
          </div>
          <div className="text-2xl font-bold text-red-400">
            {kycCases.filter(c => c.riskScore === 'high').length}
          </div>
        </div>
        
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
          <div className="flex items-center mb-3">
            <Users className="h-5 w-5 text-purple-400 mr-2" />
            <span className="text-sm text-gray-400">活跃投资者</span>
          </div>
          <div className="text-2xl font-bold text-purple-400">2,456</div>
          <div className="text-sm text-purple-400 mt-1">+12 今日新增</div>
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
      {activeTab === 'cases' && (
        <div className="space-y-6">
          {/* Filters */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="搜索申请人姓名或ID..."
                className="w-full pl-10 pr-4 py-2 bg-gray-800/30 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400"
              />
            </div>
            
            <div className="flex gap-3">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 bg-gray-800/30 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">全部状态</option>
                <option value="pending_review">待审核</option>
                <option value="under_review">审核中</option>
                <option value="approved">已通过</option>
                <option value="rejected">已拒绝</option>
              </select>
              
              <button className="px-4 py-2 border border-gray-700 rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2">
                <Filter className="h-4 w-4" />
                高级筛选
              </button>
            </div>
          </div>

          {/* Cases Table */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700/20 border-b border-gray-600">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">申请人</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">类型</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">风险评分</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">司法辖区</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">状态</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">标记项</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">负责人</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-600/30">
                  {kycCases.map((kycCase) => (
                    <tr key={kycCase.id} className="hover:bg-gray-700/20 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-medium text-white">{kycCase.applicantName}</div>
                          <div className="text-sm text-gray-400">{kycCase.submissionDate}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded text-xs border ${
                          kycCase.applicantType === 'individual' 
                            ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                            : 'bg-purple-500/20 text-purple-400 border-purple-500/30'
                        }`}>
                          {kycCase.applicantType === 'individual' ? '个人' : '机构'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`font-medium ${getRiskScoreColor(kycCase.riskScore)}`}>
                          {kycCase.riskScore === 'low' ? '低风险' : 
                           kycCase.riskScore === 'medium' ? '中风险' : '高风险'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-300">{kycCase.jurisdiction}</td>
                      <td className="px-6 py-4">{getStatusBadge(kycCase.status)}</td>
                      <td className="px-6 py-4">
                        {kycCase.flaggedItems > 0 ? (
                          <span className="text-red-400 font-medium">{kycCase.flaggedItems}</span>
                        ) : (
                          <span className="text-green-400">无</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-gray-300">{kycCase.assignedTo}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <Link
                            to={`/token-banker/compliance/cases/${kycCase.id}`}
                            className="text-purple-400 hover:text-purple-300 text-sm flex items-center gap-1"
                          >
                            <Eye className="h-3 w-3" />
                            审核
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'rules' && (
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-white">合规规则库</h3>
            <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors">
              新建规则
            </button>
          </div>
          
          <div className="space-y-4">
            {complianceRules.map((rule) => (
              <div key={rule.id} className="p-4 bg-gray-700/20 rounded-lg border border-gray-600/30">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="text-white font-medium">{rule.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-gray-400 text-sm">版本: {rule.version}</span>
                      <span className="text-gray-400 text-sm">•</span>
                      <span className="text-gray-400 text-sm">更新: {rule.lastUpdated}</span>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs border ${
                    rule.status === 'active' 
                      ? 'bg-green-500/20 text-green-400 border-green-500/30'
                      : 'bg-gray-500/20 text-gray-400 border-gray-500/30'
                  }`}>
                    {rule.status === 'active' ? '启用' : '禁用'}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">适用地区:</span>
                    <div className="text-white">{rule.applicableJurisdictions.join(', ')}</div>
                  </div>
                  <div>
                    <span className="text-gray-400">自动化程度:</span>
                    <div className="text-purple-400">{rule.automationLevel}%</div>
                  </div>
                  <div>
                    <span className="text-gray-400">规则类别:</span>
                    <div className="text-white">
                      {rule.category === 'investor_qualification' ? '投资者资质' : '制裁筛查'}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'policies' && (
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-white">转让政策管理</h3>
            <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors">
              新建政策
            </button>
          </div>
          
          <div className="space-y-4">
            {transferPolicies.map((policy) => (
              <div key={policy.id} className="p-4 bg-gray-700/20 rounded-lg border border-gray-600/30">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="text-white font-medium">{policy.name}</h4>
                    <p className="text-gray-400 text-sm mt-1">{policy.description}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs border ${
                    policy.status === 'active' 
                      ? 'bg-green-500/20 text-green-400 border-green-500/30'
                      : 'bg-gray-500/20 text-gray-400 border-gray-500/30'
                  }`}>
                    {policy.status === 'active' ? '启用' : '禁用'}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">锁定期:</span>
                    <div className="text-white">{policy.lockupPeriod}</div>
                  </div>
                  <div>
                    <span className="text-gray-400">冷静期:</span>
                    <div className="text-white">{policy.cooldownPeriod}</div>
                  </div>
                  <div>
                    <span className="text-gray-400">白名单:</span>
                    <div className={policy.whitelistRequired ? 'text-yellow-400' : 'text-green-400'}>
                      {policy.whitelistRequired ? '必需' : '可选'}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-400">适用地区:</span>
                    <div className="text-white">{policy.jurisdictionRestrictions.join(', ')}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'monitoring' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">实时监控指标</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-700/20 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-white">KYC处理速度</span>
                </div>
                <span className="text-green-400">2.3小时平均</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-700/20 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  <span className="text-white">制裁筛查响应</span>
                </div>
                <span className="text-blue-400">45ms平均</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-700/20 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                  <span className="text-white">人工审核队列</span>
                </div>
                <span className="text-yellow-400">3个案例</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">合规趋势</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">本周通过率</span>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-400" />
                  <span className="text-green-400">94.2%</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-400">平均处理时间</span>
                <div className="flex items-center gap-2">
                  <TrendingDown className="h-4 w-4 text-green-400" />
                  <span className="text-green-400">2.3小时</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-400">高风险案例比例</span>
                <div className="flex items-center gap-2">
                  <TrendingDown className="h-4 w-4 text-green-400" />
                  <span className="text-yellow-400">5.8%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComplianceEngine;