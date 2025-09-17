import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Hash, Shield, Settings, Play, CheckCircle, AlertTriangle, Copy } from 'lucide-react';

const PoolTokenization: React.FC = () => {
  const { id } = useParams();
  const [activeStep, setActiveStep] = useState(1);
  const [deploymentStatus, setDeploymentStatus] = useState<'idle' | 'deploying' | 'deployed'>('idle');

  const poolInfo = {
    id: 'pool-001',
    name: '消费信贷资产池 2024-Q1',
    size: '$125,000,000',
    status: '结构化完成'
  };

  const tokenizationSteps = [
    { id: 1, name: '发行参数', description: '配置代币化基本参数' },
    { id: 2, name: '合规规则', description: '设置DID/VC与受限证券规则' },
    { id: 3, name: '智能合约', description: '部署ERC-3643合约' },
    { id: 4, name: '上链确认', description: '验证链上部署结果' }
  ];

  const tokenParameters = {
    tokenName: 'Consumer Credit Pool 2024-Q1',
    tokenSymbol: 'CCP24Q1',
    totalSupply: '125000000',
    decimals: 18,
    faceValue: '1.00',
    currency: 'USD',
    network: 'Ethereum Mainnet',
    standard: 'ERC-3643'
  };

  const complianceRules = {
    didRequired: true,
    kycRequired: true,
    jurisdictions: ['US', 'EU', 'SG', 'HK'],
    investorTypes: ['Qualified', 'Professional'],
    minInvestment: 100000,
    maxInvestment: 5000000,
    lockupPeriod: '6 months',
    cooldownPeriod: '72 hours'
  };

  const contractInfo = {
    address: '0x742d35Cc6634C0532925a3b8D4e9C4e9d4e9C4e9',
    deployer: '0x1234567890123456789012345678901234567890',
    gasUsed: '2,847,392',
    blockNumber: '19,234,567',
    txHash: '0xa1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456'
  };

  const deployContract = () => {
    setDeploymentStatus('deploying');
    setTimeout(() => {
      setDeploymentStatus('deployed');
      setActiveStep(4);
    }, 3000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <Link
            to={`/issuer/pools/${id}`}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white">发行与代币化</h1>
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
              <span>{poolInfo.name}</span>
              <span>•</span>
              <span>规模: {poolInfo.size}</span>
              <span>•</span>
              <span>状态: {poolInfo.status}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button className="px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors">
            保存草稿
          </button>
          <button className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors">
            导出配置
          </button>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
        <div className="flex items-center justify-between mb-6">
          {tokenizationSteps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                activeStep >= step.id 
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-500 border-cyan-500 text-white'
                  : 'border-gray-600 text-gray-400'
              }`}>
                {activeStep > step.id ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <span>{step.id}</span>
                )}
              </div>
              {index < tokenizationSteps.length - 1 && (
                <div className={`w-24 h-0.5 mx-4 ${
                  activeStep > step.id ? 'bg-gradient-to-r from-cyan-500 to-purple-500' : 'bg-gray-600'
                }`}></div>
              )}
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <h3 className="text-lg font-semibold text-white mb-2">
            {tokenizationSteps[activeStep - 1].name}
          </h3>
          <p className="text-gray-400">
            {tokenizationSteps[activeStep - 1].description}
          </p>
        </div>
      </div>

      {/* Step Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Configuration */}
        <div className="space-y-6">
          {activeStep === 1 && (
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Settings className="h-5 w-5" />
                代币发行参数
              </h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">代币名称</label>
                    <input
                      type="text"
                      value={tokenParameters.tokenName}
                      className="w-full px-3 py-2 bg-gray-700/30 border border-gray-600 rounded-lg text-white"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">代币符号</label>
                    <input
                      type="text"
                      value={tokenParameters.tokenSymbol}
                      className="w-full px-3 py-2 bg-gray-700/30 border border-gray-600 rounded-lg text-white"
                      readOnly
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">总发行量</label>
                    <input
                      type="text"
                      value={tokenParameters.totalSupply}
                      className="w-full px-3 py-2 bg-gray-700/30 border border-gray-600 rounded-lg text-white"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">面值</label>
                    <input
                      type="text"
                      value={`${tokenParameters.faceValue} ${tokenParameters.currency}`}
                      className="w-full px-3 py-2 bg-gray-700/30 border border-gray-600 rounded-lg text-white"
                      readOnly
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">网络</label>
                    <input
                      type="text"
                      value={tokenParameters.network}
                      className="w-full px-3 py-2 bg-gray-700/30 border border-gray-600 rounded-lg text-white"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">代币标准</label>
                    <input
                      type="text"
                      value={tokenParameters.standard}
                      className="w-full px-3 py-2 bg-gray-700/30 border border-gray-600 rounded-lg text-white"
                      readOnly
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setActiveStep(2)}
                  className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg font-medium hover:from-cyan-600 hover:to-purple-600 transition-all duration-300"
                >
                  下一步：合规规则
                </button>
              </div>
            </div>
          )}

          {activeStep === 2 && (
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5" />
                合规规则配置
              </h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-gray-700/20 rounded-lg">
                  <h4 className="text-white font-medium mb-3">身份验证要求</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">DID身份验证</span>
                      <span className={`px-2 py-1 rounded text-xs ${
                        complianceRules.didRequired 
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                          : 'bg-red-500/20 text-red-400 border border-red-500/30'
                      }`}>
                        {complianceRules.didRequired ? '必需' : '可选'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">KYC验证</span>
                      <span className={`px-2 py-1 rounded text-xs ${
                        complianceRules.kycRequired 
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                          : 'bg-red-500/20 text-red-400 border border-red-500/30'
                      }`}>
                        {complianceRules.kycRequired ? '必需' : '可选'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gray-700/20 rounded-lg">
                  <h4 className="text-white font-medium mb-3">投资者限制</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">司法辖区:</span>
                      <span className="text-white">{complianceRules.jurisdictions.join(', ')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">投资者类型:</span>
                      <span className="text-white">{complianceRules.investorTypes.join(', ')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">最小投资额:</span>
                      <span className="text-white">${complianceRules.minInvestment.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">最大投资额:</span>
                      <span className="text-white">${complianceRules.maxInvestment.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gray-700/20 rounded-lg">
                  <h4 className="text-white font-medium mb-3">转让限制</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">锁定期:</span>
                      <span className="text-white">{complianceRules.lockupPeriod}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">冷静期:</span>
                      <span className="text-white">{complianceRules.cooldownPeriod}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-between">
                <button
                  onClick={() => setActiveStep(1)}
                  className="px-6 py-2 border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  上一步
                </button>
                <button
                  onClick={() => setActiveStep(3)}
                  className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg font-medium hover:from-cyan-600 hover:to-purple-600 transition-all duration-300"
                >
                  下一步：部署合约
                </button>
              </div>
            </div>
          )}

          {activeStep === 3 && (
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Hash className="h-5 w-5" />
                智能合约部署
              </h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-blue-400 font-medium mb-2">部署前确认</h4>
                      <ul className="text-blue-400 text-sm space-y-1">
                        <li>• 确认所有参数配置正确</li>
                        <li>• 合规规则已通过法务审核</li>
                        <li>• 钱包中有足够的ETH支付Gas费用</li>
                        <li>• 部署后合约地址不可更改</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gray-700/20 rounded-lg">
                  <h4 className="text-white font-medium mb-3">预估Gas费用</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">合约部署:</span>
                      <span className="text-white">~2,800,000 Gas</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">当前Gas价格:</span>
                      <span className="text-white">25 Gwei</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">预估费用:</span>
                      <span className="text-green-400">~0.07 ETH</span>
                    </div>
                  </div>
                </div>

                {deploymentStatus === 'idle' && (
                  <button
                    onClick={deployContract}
                    className="w-full py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg font-medium hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Play className="h-5 w-5" />
                    部署智能合约
                  </button>
                )}

                {deploymentStatus === 'deploying' && (
                  <div className="text-center py-6">
                    <div className="animate-spin rounded-full h-8 w-8 border-2 border-cyan-500 border-t-transparent mx-auto mb-4"></div>
                    <p className="text-white font-medium">正在部署合约...</p>
                    <p className="text-gray-400 text-sm mt-2">请勿关闭页面，部署通常需要1-3分钟</p>
                  </div>
                )}

                {deploymentStatus === 'deployed' && (
                  <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <span className="text-green-400 font-medium">合约部署成功</span>
                    </div>
                    <p className="text-green-400 text-sm">
                      智能合约已成功部署到Ethereum主网，请进入下一步验证部署结果
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-6 flex justify-between">
                <button
                  onClick={() => setActiveStep(2)}
                  className="px-6 py-2 border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors"
                  disabled={deploymentStatus === 'deploying'}
                >
                  上一步
                </button>
                {deploymentStatus === 'deployed' && (
                  <button
                    onClick={() => setActiveStep(4)}
                    className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg font-medium hover:from-cyan-600 hover:to-purple-600 transition-all duration-300"
                  >
                    下一步：验证结果
                  </button>
                )}
              </div>
            </div>
          )}

          {activeStep === 4 && (
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                部署完成
              </h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <h4 className="text-green-400 font-medium mb-3">合约信息</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">合约地址:</span>
                      <div className="flex items-center gap-2">
                        <span className="text-green-400 font-mono">{contractInfo.address}</span>
                        <button
                          onClick={() => copyToClipboard(contractInfo.address)}
                          className="p-1 hover:bg-gray-700 rounded"
                        >
                          <Copy className="h-3 w-3 text-gray-400" />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">交易哈希:</span>
                      <div className="flex items-center gap-2">
                        <span className="text-green-400 font-mono">{contractInfo.txHash.slice(0, 20)}...</span>
                        <button
                          onClick={() => copyToClipboard(contractInfo.txHash)}
                          className="p-1 hover:bg-gray-700 rounded"
                        >
                          <Copy className="h-3 w-3 text-gray-400" />
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">区块高度:</span>
                      <span className="text-white">{contractInfo.blockNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Gas消耗:</span>
                      <span className="text-white">{contractInfo.gasUsed}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                    在Etherscan查看
                  </button>
                  <button className="flex-1 px-4 py-2 border border-gray-600 hover:bg-gray-800 rounded-lg transition-colors">
                    下载ABI
                  </button>
                </div>

                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <h4 className="text-blue-400 font-medium mb-2">后续步骤</h4>
                  <ul className="text-blue-400 text-sm space-y-1">
                    <li>• 配置要约认购参数</li>
                    <li>• 设置投资者白名单</li>
                    <li>• 启动认购流程</li>
                    <li>• 监控认购进度</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <Link
                  to={`/issuer/offers/new`}
                  className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg font-medium hover:from-cyan-600 hover:to-purple-600 transition-all duration-300"
                >
                  配置认购要约
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Preview */}
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">代币化预览</h3>
          
          <div className="space-y-4">
            <div className="p-4 bg-gray-700/20 rounded-lg">
              <h4 className="text-white font-medium mb-3">代币基本信息</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">名称:</span>
                  <span className="text-white">{tokenParameters.tokenName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">符号:</span>
                  <span className="text-white">{tokenParameters.tokenSymbol}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">标准:</span>
                  <span className="text-cyan-400">{tokenParameters.standard}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">总供应量:</span>
                  <span className="text-white">{parseInt(tokenParameters.totalSupply).toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-700/20 rounded-lg">
              <h4 className="text-white font-medium mb-3">合规特性</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span className="text-sm text-gray-300">受限证券标准</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span className="text-sm text-gray-300">DID/VC身份验证</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span className="text-sm text-gray-300">司法辖区限制</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span className="text-sm text-gray-300">转让冷静期</span>
                </div>
              </div>
            </div>

            {deploymentStatus === 'deployed' && (
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <h4 className="text-green-400 font-medium mb-3">部署状态</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span className="text-green-400">合约已部署</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span className="text-green-400">合规规则已配置</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span className="text-green-400">准备接受认购</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoolTokenization;