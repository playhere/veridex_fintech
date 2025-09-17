import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Shield, DollarSign, Clock, TrendingUp, Download, AlertTriangle, CheckCircle, Hash } from 'lucide-react';
import OfferRiskAnalysis from './OfferRiskAnalysis';
import Tranches from './Tranches';

const OfferDetail: React.FC = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');

  const offerData = {
    id: 'offer-001',
    name: '消费信贷资产池 2024-Q1',
    issuer: 'ABC金融集团',
    size: '$125,000,000',
    minInvestment: '$100,000',
    stepAmount: '$50,000',
    maxInvestment: '$5,000,000',
    duration: '36个月',
    expectedReturn: '8.5%',
    riskLevel: 'medium',
    industry: '消费金融',
    region: '华东',
    status: 'active',
    remainingTime: '15天',
    subscribed: '45%',
    contractAddress: '0x742...d4e9',
    documentHash: 'sha256:f4a1b2c3...',
    complianceStatus: 'qualified',
    features: ['DID验证', '受限证券', '合规代币'],
    cooldownPeriod: '72小时',
    lockupPeriod: '6个月'
  };

  const complianceInfo = {
    didStatus: 'verified',
    kycStatus: 'completed',
    jurisdiction: 'qualified',
    investorType: 'professional',
    annualLimit: '$10,000,000',
    remainingLimit: '$7,500,000',
    restrictions: [
      '仅限合格投资者参与',
      '需完成DID身份验证',
      '受72小时冷静期约束',
      '锁定期内不可转让'
    ]
  };

  const riskFactors = [
    { type: 'credit', name: '信用风险', level: 'medium', description: '底层资产存在违约可能' },
    { type: 'liquidity', name: '流动性风险', level: 'high', description: '锁定期内无法转让' },
    { type: 'market', name: '市场风险', level: 'low', description: '利率变动影响相对较小' },
    { type: 'operational', name: '操作风险', level: 'low', description: '服务商运营风险较低' }
  ];

  const documents = [
    { name: 'Private Placement Memorandum', type: 'PPM', hash: 'sha256:a1b2c3...', size: '2.5MB' },
    { name: '认购协议', type: 'Agreement', hash: 'sha256:d4e5f6...', size: '1.8MB' },
    { name: '风险披露书', type: 'Risk Disclosure', hash: 'sha256:g7h8i9...', size: '0.9MB' },
    { name: '审计报告', type: 'Audit Report', hash: 'sha256:j0k1l2...', size: '3.2MB' }
  ];

  const tabs = [
    { id: 'overview', name: '基本信息', count: null },
    { id: 'tranches', name: '结构化', count: null },
    { id: 'compliance', name: '合规状态', count: null },
    { id: 'risk', name: '风险分析', count: null },
    { id: 'documents', name: '相关文档', count: documents.length }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <Link
            to="/invest"
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white">{offerData.name}</h1>
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
              <span>发行方: {offerData.issuer}</span>
              <span>•</span>
              <span>剩余时间: {offerData.remainingTime}</span>
              <span>•</span>
              <span>ID: {offerData.id}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Link
            to={`/invest/offers/${offerData.id}/subscribe`}
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg font-medium hover:from-cyan-600 hover:to-purple-600 transition-all duration-300"
          >
            立即认购
          </Link>
          <button className="px-4 py-3 border border-gray-600 hover:bg-gray-800 rounded-lg transition-colors">
            添加关注
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
          <div className="flex items-center mb-3">
            <TrendingUp className="h-5 w-5 text-green-400 mr-2" />
            <span className="text-sm text-gray-400">预期年化收益</span>
          </div>
          <div className="text-2xl font-bold text-green-400">{offerData.expectedReturn}</div>
        </div>
        
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
          <div className="flex items-center mb-3">
            <DollarSign className="h-5 w-5 text-cyan-400 mr-2" />
            <span className="text-sm text-gray-400">起投金额</span>
          </div>
          <div className="text-2xl font-bold text-white">{offerData.minInvestment}</div>
          <div className="text-xs text-gray-400 mt-1">步长: {offerData.stepAmount}</div>
        </div>
        
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
          <div className="flex items-center mb-3">
            <Clock className="h-5 w-5 text-purple-400 mr-2" />
            <span className="text-sm text-gray-400">投资期限</span>
          </div>
          <div className="text-2xl font-bold text-white">{offerData.duration}</div>
          <div className="text-xs text-gray-400 mt-1">锁定期: {offerData.lockupPeriod}</div>
        </div>
        
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
          <div className="flex items-center mb-3">
            <Shield className="h-5 w-5 text-yellow-400 mr-2" />
            <span className="text-sm text-gray-400">认购进度</span>
          </div>
          <div className="text-2xl font-bold text-white">{offerData.subscribed}</div>
          <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
            <div 
              className="bg-gradient-to-r from-cyan-500 to-purple-500 h-2 rounded-full"
              style={{ width: offerData.subscribed }}
            ></div>
          </div>
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
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Basic Info */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">基本信息</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">发行规模:</span>
                <span className="text-white font-medium">{offerData.size}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">行业分类:</span>
                <span className="text-white">{offerData.industry}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">地理区域:</span>
                <span className="text-white">{offerData.region}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">风险等级:</span>
                <span className="text-yellow-400">中等风险</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">单户上限:</span>
                <span className="text-white">{offerData.maxInvestment}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">冷静期:</span>
                <span className="text-white">{offerData.cooldownPeriod}</span>
              </div>
            </div>
          </div>

          {/* Blockchain Info */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">链上信息</h3>
            <div className="space-y-3">
              <div>
                <div className="text-gray-400 text-sm mb-1">智能合约地址</div>
                <div className="flex items-center gap-2">
                  <span className="text-cyan-400 font-mono text-sm">{offerData.contractAddress}</span>
                  <button className="p-1 hover:bg-gray-700 rounded">
                    <Hash className="h-4 w-4 text-gray-400" />
                  </button>
                </div>
              </div>
              
              <div>
                <div className="text-gray-400 text-sm mb-1">文档哈希</div>
                <div className="flex items-center gap-2">
                  <span className="text-purple-400 font-mono text-sm">{offerData.documentHash}</span>
                  <button className="p-1 hover:bg-gray-700 rounded">
                    <Hash className="h-4 w-4 text-gray-400" />
                  </button>
                </div>
              </div>
              
              <div>
                <div className="text-gray-400 text-sm mb-1">代币标准</div>
                <div className="text-white">ERC-3643 (受限证券)</div>
              </div>
              
              <div>
                <div className="text-gray-400 text-sm mb-1">支持网络</div>
                <div className="text-white">Ethereum Mainnet</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'tranches' && (
        <Tranches offerId={offerData.id} />
      )}

      {activeTab === 'compliance' && (
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
          <h3 className="text-lg font-semibold text-white mb-6">合规验证状态</h3>
          
          {/* Compliance Status Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-700/20 rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="text-white">DID身份验证</span>
                </div>
                <span className="text-green-400 text-sm">已验证</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-700/20 rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="text-white">KYC/KYB</span>
                </div>
                <span className="text-green-400 text-sm">已完成</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-700/20 rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="text-white">司法辖区</span>
                </div>
                <span className="text-green-400 text-sm">符合要求</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-700/20 rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="text-white">投资者类型</span>
                </div>
                <span className="text-green-400 text-sm">专业投资者</span>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-3">投资额度信息</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">年度投资额度:</span>
                  <span className="text-white">{complianceInfo.annualLimit}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">剩余可用额度:</span>
                  <span className="text-green-400">{complianceInfo.remainingLimit}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-green-400 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Compliance Restrictions */}
          <div>
            <h4 className="text-white font-medium mb-3">合规限制条件</h4>
            <div className="space-y-2">
              {complianceInfo.restrictions.map((restriction, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <AlertTriangle className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span className="text-yellow-400 text-sm">{restriction}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'risk' && (
        <OfferRiskAnalysis offerId={offerData.id} />
      )}

      {activeTab === 'documents' && (
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
          <h3 className="text-lg font-semibold text-white mb-6">相关文档</h3>
          
          <div className="space-y-4">
            {documents.map((doc, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-700/20 rounded-lg border border-gray-600/30 hover:border-cyan-500/30 transition-all duration-300">
                <div className="flex-1">
                  <h4 className="text-white font-medium">{doc.name}</h4>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-gray-400 text-sm">{doc.type}</span>
                    <span className="text-gray-400 text-sm">•</span>
                    <span className="text-gray-400 text-sm">{doc.size}</span>
                    <span className="text-gray-400 text-sm">•</span>
                    <span className="text-purple-400 text-xs font-mono">{doc.hash}</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button className="px-3 py-1 text-cyan-400 hover:bg-cyan-500/10 rounded text-sm transition-colors">
                    预览
                  </button>
                  <button className="px-3 py-1 border border-gray-600 hover:bg-gray-700 rounded text-sm transition-colors flex items-center gap-1">
                    <Download className="h-3 w-3" />
                    下载
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-green-400 font-medium mb-2">文档完整性验证</h4>
                <p className="text-green-400 text-sm">
                  所有文档均已通过SHA-256哈希验证，确保内容完整性和真实性。
                  文档版本与链上记录一致，具有法律效力。
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OfferDetail;