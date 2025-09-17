import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Save, Eye, Settings, Shield, DollarSign, Clock, FileText, Users, Globe } from 'lucide-react';

const OfferConfiguration: React.FC = () => {
  const [activeTab, setActiveTab] = useState('basic');
  const [formData, setFormData] = useState({
    offerName: '',
    batchNumber: '',
    totalSize: '',
    currency: 'USD',
    minInvestment: '',
    stepAmount: '',
    maxPerInvestor: '',
    subscriptionStart: '',
    subscriptionEnd: '',
    timezone: 'UTC+8'
  });

  const tabs = [
    { id: 'basic', name: '基础要素', icon: Settings },
    { id: 'compliance', name: '合规规则', icon: Shield },
    { id: 'documents', name: '文档签署', icon: FileText },
    { id: 'pricing', name: '定价配售', icon: DollarSign },
    { id: 'settlement', name: '支付结算', icon: Clock },
    { id: 'tokenization', name: '代币化参数', icon: Globe },
    { id: 'frontend', name: '前台编排', icon: Eye },
    { id: 'notifications', name: '通知回调', icon: Users }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

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
            <h1 className="text-2xl font-bold text-white">要约与认购配置</h1>
            <p className="text-gray-400 mt-2">配置投资者前台展示与认购流程</p>
          </div>
        </div>

        <div className="flex gap-3">
          <button className="px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2">
            <Save className="h-4 w-4" />
            保存草稿
          </button>
          <button className="px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2">
            <Eye className="h-4 w-4" />
            预览
          </button>
          <button className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg font-medium hover:from-cyan-600 hover:to-purple-600 transition-all duration-300">
            发布要约
          </button>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">配置进度</span>
          <span className="text-cyan-400">3/8 已完成</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
          <div className="bg-gradient-to-r from-cyan-500 to-purple-500 h-2 rounded-full" style={{ width: '37.5%' }}></div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-700">
        <nav className="flex space-x-8 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors whitespace-nowrap flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'border-cyan-500 text-cyan-400'
                    : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.name}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {activeTab === 'basic' && (
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
              <h3 className="text-lg font-semibold text-white mb-6">基础要素配置</h3>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">要约名称</label>
                    <input
                      type="text"
                      value={formData.offerName}
                      onChange={(e) => handleInputChange('offerName', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700/30 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white placeholder-gray-400"
                      placeholder="输入要约名称"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">批次编号</label>
                    <input
                      type="text"
                      value={formData.batchNumber}
                      onChange={(e) => handleInputChange('batchNumber', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700/30 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white placeholder-gray-400"
                      placeholder="自动生成或手动输入"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">发行规模</label>
                    <input
                      type="text"
                      value={formData.totalSize}
                      onChange={(e) => handleInputChange('totalSize', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700/30 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white placeholder-gray-400"
                      placeholder="125,000,000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">币种</label>
                    <select
                      value={formData.currency}
                      onChange={(e) => handleInputChange('currency', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700/30 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white"
                    >
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="SGD">SGD</option>
                      <option value="HKD">HKD</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">起投金额</label>
                    <input
                      type="text"
                      value={formData.minInvestment}
                      onChange={(e) => handleInputChange('minInvestment', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700/30 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white placeholder-gray-400"
                      placeholder="100,000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">递增步长</label>
                    <input
                      type="text"
                      value={formData.stepAmount}
                      onChange={(e) => handleInputChange('stepAmount', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700/30 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white placeholder-gray-400"
                      placeholder="50,000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">单户上限</label>
                    <input
                      type="text"
                      value={formData.maxPerInvestor}
                      onChange={(e) => handleInputChange('maxPerInvestor', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700/30 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white placeholder-gray-400"
                      placeholder="5,000,000"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">申购开始时间</label>
                    <input
                      type="datetime-local"
                      value={formData.subscriptionStart}
                      onChange={(e) => handleInputChange('subscriptionStart', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700/30 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">申购结束时间</label>
                    <input
                      type="datetime-local"
                      value={formData.subscriptionEnd}
                      onChange={(e) => handleInputChange('subscriptionEnd', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700/30 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">时区</label>
                    <select
                      value={formData.timezone}
                      onChange={(e) => handleInputChange('timezone', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700/30 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white"
                    >
                      <option value="UTC+8">UTC+8 (北京时间)</option>
                      <option value="UTC+0">UTC+0 (格林威治时间)</option>
                      <option value="UTC-5">UTC-5 (纽约时间)</option>
                      <option value="UTC+1">UTC+1 (伦敦时间)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'compliance' && (
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
              <h3 className="text-lg font-semibold text-white mb-6">合规规则配置</h3>
              
              <div className="space-y-6">
                <div className="p-4 bg-gray-700/20 rounded-lg">
                  <h4 className="text-white font-medium mb-4">投资者资质要求</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">合格投资者认证</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">专业投资者认证</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gray-700/20 rounded-lg">
                  <h4 className="text-white font-medium mb-4">司法辖区白名单</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {['美国', '欧盟', '新加坡', '香港', '日本', '韩国', '澳大利亚', '加拿大'].map((jurisdiction) => (
                      <label key={jurisdiction} className="flex items-center space-x-2">
                        <input type="checkbox" className="w-4 h-4 text-cyan-600 bg-gray-700 border-gray-600 rounded focus:ring-cyan-500" defaultChecked={['美国', '欧盟', '新加坡', '香港'].includes(jurisdiction)} />
                        <span className="text-gray-300 text-sm">{jurisdiction}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-700/20 rounded-lg">
                    <h4 className="text-white font-medium mb-3">投资额度限制</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">单标的额度上限</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 bg-gray-600/30 border border-gray-500 rounded text-white text-sm"
                          placeholder="5,000,000"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">年度投资额度</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 bg-gray-600/30 border border-gray-500 rounded text-white text-sm"
                          placeholder="10,000,000"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-700/20 rounded-lg">
                    <h4 className="text-white font-medium mb-3">转让限制</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">冷静期</label>
                        <select className="w-full px-3 py-2 bg-gray-600/30 border border-gray-500 rounded text-white text-sm">
                          <option value="72">72小时</option>
                          <option value="48">48小时</option>
                          <option value="24">24小时</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">锁定期</label>
                        <select className="w-full px-3 py-2 bg-gray-600/30 border border-gray-500 rounded text-white text-sm">
                          <option value="6">6个月</option>
                          <option value="12">12个月</option>
                          <option value="24">24个月</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Other tabs would be implemented similarly */}
          {activeTab !== 'basic' && activeTab !== 'compliance' && (
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-8 text-center">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Settings className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {tabs.find(tab => tab.id === activeTab)?.name} 配置
                </h3>
                <p className="text-gray-400 mb-6">
                  此模块正在开发中，敬请期待
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Configuration Summary */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">配置摘要</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">要约名称:</span>
                <span className="text-white">{formData.offerName || '未设置'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">发行规模:</span>
                <span className="text-white">{formData.totalSize || '未设置'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">起投金额:</span>
                <span className="text-white">{formData.minInvestment || '未设置'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">币种:</span>
                <span className="text-white">{formData.currency}</span>
              </div>
            </div>
          </div>

          {/* Validation Status */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">验证状态</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm text-gray-300">基础要素完整</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm text-gray-300">合规规则配置</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span className="text-sm text-gray-300">文档待上传</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                <span className="text-sm text-gray-300">定价待配置</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">快捷操作</h3>
            <div className="space-y-3">
              <button className="w-full p-3 text-left bg-gray-700/20 hover:bg-gray-700/40 rounded-lg border border-gray-600/30 hover:border-cyan-500/30 transition-all duration-300">
                <div className="font-medium text-white">导入模板</div>
                <div className="text-gray-400 text-sm">使用预设配置模板</div>
              </button>
              <button className="w-full p-3 text-left bg-gray-700/20 hover:bg-gray-700/40 rounded-lg border border-gray-600/30 hover:border-cyan-500/30 transition-all duration-300">
                <div className="font-medium text-white">复制配置</div>
                <div className="text-gray-400 text-sm">从其他要约复制</div>
              </button>
              <button className="w-full p-3 text-left bg-gray-700/20 hover:bg-gray-700/40 rounded-lg border border-gray-600/30 hover:border-cyan-500/30 transition-all duration-300">
                <div className="font-medium text-white">合规检查</div>
                <div className="text-gray-400 text-sm">验证配置合规性</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferConfiguration;