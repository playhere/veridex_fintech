import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, TrendingUp, AlertTriangle, Download, Play, Settings, Hash } from 'lucide-react';
import AssetList from './AssetList';
import PoolOverview from './PoolOverview';
import RiskAnalysis from './RiskAnalysis';
import Tranches from './Tranches';
import TokenizationView from './TokenizationView';
import ConfigView from './ConfigView';

const PoolDetail: React.FC = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');

  const poolData = {
    id: 'pool-001',
    name: '消费信贷资产池 2024-Q1',
    size: '$125,000,000',
    duration: '36个月',
    status: '发行中',
    industry: '消费金融',
    region: '华东',
    defaultRate: '1.20%',
    recoveryRate: '89.5%',
    yield: '8.5%',
    riskLevel: 'medium',
    contractAddress: '0x742...d4e9',
    lastUpdated: '2024-01-15 14:30:22',
    dataVersion: 'v2.1.3',
    dataHash: 'sha256:a1b2c3...'
  };

  const assetBreakdown = {
    byIndustry: [
      { category: '个人消费贷', amount: '$45M', percentage: 36 },
      { category: '汽车分期', amount: '$35M', percentage: 28 },
      { category: '信用卡分期', amount: '$25M', percentage: 20 },
      { category: '其他', amount: '$20M', percentage: 16 }
    ],
    byRegion: [
      { category: '上海', amount: '$40M', percentage: 32 },
      { category: '江苏', amount: '$30M', percentage: 24 },
      { category: '浙江', amount: '$35M', percentage: 28 },
      { category: '安徽', amount: '$20M', percentage: 16 }
    ],
    byRating: [
      { category: 'AAA', amount: '$50M', percentage: 40 },
      { category: 'AA', amount: '$40M', percentage: 32 },
      { category: 'A', amount: '$25M', percentage: 20 },
      { category: 'BBB', amount: '$10M', percentage: 8 }
    ]
  };

  const performanceData = [
    { metric: '当前逾期率', value: '1.20%', trend: 'stable', benchmark: '1.35%' },
    { metric: '30天逾期率', value: '2.15%', trend: 'up', benchmark: '2.05%' },
    { metric: '90天逾期率', value: '0.85%', trend: 'down', benchmark: '0.95%' },
    { metric: '累计违约率', value: '1.18%', trend: 'stable', benchmark: '1.25%' },
    { metric: '回收率', value: '89.5%', trend: 'up', benchmark: '87.2%' },
    { metric: '提前还款率', value: '12.3%', trend: 'stable', benchmark: '11.8%' }
  ];

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? (
      <TrendingUp className="h-4 w-4 text-red-400" />
    ) : trend === 'down' ? (
      <TrendingUp className="h-4 w-4 text-green-400 transform rotate-180" />
    ) : (
      <div className="h-4 w-4 bg-gray-400 rounded-full"></div>
    );
  };

  const tabs = [
    { id: 'overview', name: '资产概览', count: null },
    { id: 'asset-details', name: '资产明细', count: null },
    { id: 'analytics', name: '分析建模', count: null },
    { id: 'structuring', name: '结构化', count: null },
    { id: 'tokenization', name: '代币化', count: null },
    { id: 'offer-config', name: '要约与认购配置', count: null }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <Link
            to="/issuer/pools"
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white">{poolData.name}</h1>
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
              <span>ID: {poolData.id}</span>
              <span>•</span>
              <span>更新时间: {poolData.lastUpdated}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Hash className="h-4 w-4" />
                数据版本: {poolData.dataVersion}
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors flex items-center gap-2">
            <Play className="h-4 w-4" />
            运行分析
          </button>
          <button className="px-4 py-2 border border-gray-600 hover:bg-gray-800 rounded-lg transition-colors flex items-center gap-2">
            <Download className="h-4 w-4" />
            导出
          </button>
          <button className="px-4 py-2 border border-gray-600 hover:bg-gray-800 rounded-lg transition-colors">
            <Settings className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
          <div className="text-sm text-gray-400 mb-2">资产规模</div>
          <div className="text-2xl font-bold text-white">{poolData.size}</div>
          <div className="text-sm text-green-400 mt-1">+2.5% vs 上月</div>
        </div>
        
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
          <div className="text-sm text-gray-400 mb-2">当前违约率</div>
          <div className="text-2xl font-bold text-white">{poolData.defaultRate}</div>
          <div className="text-sm text-yellow-400 mt-1">与基准持平</div>
        </div>
        
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
          <div className="text-sm text-gray-400 mb-2">回收率</div>
          <div className="text-2xl font-bold text-white">{poolData.recoveryRate}</div>
          <div className="text-sm text-green-400 mt-1">+1.2% vs 基准</div>
        </div>
        
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
          <div className="text-sm text-gray-400 mb-2">预期收益</div>
          <div className="text-2xl font-bold text-white">{poolData.yield}</div>
          <div className="text-sm text-cyan-400 mt-1">目标范围内</div>
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
        <PoolOverview poolData={poolData} />
      )}

      {activeTab === 'asset-details' && (
        <AssetList poolId={poolData.id} />
      )}

      {activeTab === 'analytics' && (
        <RiskAnalysis poolId={poolData.id} />
      )}

      {activeTab === 'structuring' && (
        <Tranches poolId={poolData.id} />
      )}

      {activeTab === 'offer-config' && (
        <>
        <div className="space-y-6">
          {/* Offer Configuration Status */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-white">要约配置状态</h3>
              <Link
                to="/issuer/offers/new"
                className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg font-medium hover:from-cyan-600 hover:to-purple-600 transition-all duration-300"
              >
                开始配置要约
              </Link>
            </div>
            
            <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span className="text-blue-400 font-medium">配置状态: 未开始</span>
              </div>
              <p className="text-blue-400 text-sm">
                资产池已完成代币化，可以开始配置投资者要约和认购流程
              </p>
            </div>
          </div>

          {/* Current Pool Information */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">资产池信息</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">资产池名称:</span>
                  <span className="text-white">{poolData.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">规模:</span>
                  <span className="text-white">{poolData.size}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">期限:</span>
                  <span className="text-white">{poolData.duration}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">预期收益:</span>
                  <span className="text-green-400">{poolData.yield}</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">行业:</span>
                  <span className="text-white">{poolData.industry}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">地区:</span>
                  <span className="text-white">{poolData.region}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">风险等级:</span>
                  <span className="text-yellow-400">中等风险</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">合约地址:</span>
                  <span className="text-cyan-400 font-mono text-xs">{poolData.contractAddress}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Configuration Steps */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">配置流程</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-gray-700/20 rounded-lg">
                <div className="w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center text-white text-xs font-bold">1</div>
                <div className="flex-1">
                  <span className="text-white font-medium">基础要素配置</span>
                  <div className="text-gray-400 text-sm">设置要约名称、发行规模、投资门槛等</div>
                </div>
                <span className="text-gray-400 text-sm">待配置</span>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-gray-700/20 rounded-lg">
                <div className="w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center text-white text-xs font-bold">2</div>
                <div className="flex-1">
                  <span className="text-white font-medium">合规规则设置</span>
                  <div className="text-gray-400 text-sm">配置投资者资质要求、司法辖区限制等</div>
                </div>
                <span className="text-gray-400 text-sm">待配置</span>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-gray-700/20 rounded-lg">
                <div className="w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center text-white text-xs font-bold">3</div>
                <div className="flex-1">
                  <span className="text-white font-medium">文档与定价</span>
                  <div className="text-gray-400 text-sm">上传法律文档、设置定价策略</div>
                </div>
                <span className="text-gray-400 text-sm">待配置</span>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-gray-700/20 rounded-lg">
                <div className="w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center text-white text-xs font-bold">4</div>
                <div className="flex-1">
                  <span className="text-white font-medium">前台展示配置</span>
                  <div className="text-gray-400 text-sm">设置投资者前台展示内容和认购流程</div>
                </div>
                <span className="text-gray-400 text-sm">待配置</span>
              </div>
            </div>
          </div>

          {/* Prerequisites Check */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">前置条件检查</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                <div className="w-5 h-5 bg-green-400 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <span className="text-green-400">资产池数据完整</span>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                <div className="w-5 h-5 bg-green-400 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <span className="text-green-400">风险建模已完成</span>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                <div className="w-5 h-5 bg-green-400 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <span className="text-green-400">智能合约已部署</span>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <span className="text-yellow-400">法律文档待准备</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">快捷操作</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                to="/issuer/offers/new"
                className="p-4 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 rounded-lg hover:border-cyan-500/50 transition-all duration-300"
              >
                <div className="font-medium text-white mb-2">新建要约配置</div>
                <div className="text-gray-400 text-sm">从头开始配置新的投资要约</div>
              </Link>
              
              <button className="p-4 bg-gray-700/20 border border-gray-600/30 rounded-lg hover:border-gray-500/50 transition-all duration-300 text-left">
                <div className="font-medium text-white mb-2">使用模板</div>
                <div className="text-gray-400 text-sm">基于现有模板快速配置</div>
              </button>
              
              <button className="p-4 bg-gray-700/20 border border-gray-600/30 rounded-lg hover:border-gray-500/50 transition-all duration-300 text-left">
                <div className="font-medium text-white mb-2">预览要约</div>
                <div className="text-gray-400 text-sm">查看投资者前台展示效果</div>
              </button>
              
              <button className="p-4 bg-gray-700/20 border border-gray-600/30 rounded-lg hover:border-gray-500/50 transition-all duration-300 text-left">
                <div className="font-medium text-white mb-2">合规检查</div>
                <div className="text-gray-400 text-sm">验证配置的合规性</div>
              </button>
            </div>
          </div>
        </div>
        </>
      )}

      {activeTab === 'tokenization' && (
        <TokenizationView poolId={poolData.id} poolData={poolData} />
      )}
    </div>
  );
};

export default PoolDetail;