import React from 'react';
import { Link } from 'react-router-dom';
import { Hash } from 'lucide-react';

interface TokenizationViewProps {
  poolId: string;
  poolData: {
    id: string;
    name: string;
    size: string;
    duration: string;
    status: string;
    industry: string;
    region: string;
    defaultRate: string;
    recoveryRate: string;
    yield: string;
    riskLevel: string;
    contractAddress: string;
    lastUpdated: string;
    dataVersion: string;
    dataHash: string;
  };
}

const TokenizationView: React.FC<TokenizationViewProps> = ({ poolId, poolData }) => {
  return (
    <div className="space-y-6">
      {/* Tokenization Status */}
      <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-white">代币化状态</h3>
          <Link
            to={`/issuer/pools/${poolId}/tokenization`}
            className="px-4 py-2 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg font-medium hover:from-green-600 hover:to-teal-600 transition-all duration-300"
          >
            启动代币化
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Status Overview */}
          <div className="space-y-4">
            <div className="p-4 bg-gray-700/20 rounded-lg">
              <h4 className="text-white font-medium mb-3">当前状态</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-sm text-gray-300">资产池数据已验证</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-sm text-gray-300">合规检查已通过</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span className="text-sm text-gray-300">代币化参数待配置</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-gray-700/20 rounded-lg">
              <h4 className="text-white font-medium mb-3">预设参数</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">代币标准:</span>
                  <span className="text-white">ERC-3643</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">网络:</span>
                  <span className="text-white">Ethereum</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">总供应量:</span>
                  <span className="text-white">125,000,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">面值:</span>
                  <span className="text-white">$1.00</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Process Steps */}
          <div className="space-y-4">
            <div className="p-4 bg-gray-700/20 rounded-lg">
              <h4 className="text-white font-medium mb-3">代币化流程</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center text-white text-xs">1</div>
                  <span className="text-sm text-gray-300">发行参数配置</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center text-white text-xs">2</div>
                  <span className="text-sm text-gray-300">合规规则设置</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center text-white text-xs">3</div>
                  <span className="text-sm text-gray-300">智能合约部署</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center text-white text-xs">4</div>
                  <span className="text-sm text-gray-300">上链确认</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <h4 className="text-blue-400 font-medium mb-2">预估费用</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-blue-400">合约部署:</span>
                  <span className="text-blue-400">~0.05 ETH</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-400">初始化:</span>
                  <span className="text-blue-400">~0.02 ETH</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Contract Information */}
      <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">合约信息</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">合约地址:</span>
              <span className="text-cyan-400 font-mono">{poolData.contractAddress}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">数据哈希:</span>
              <span className="text-purple-400 font-mono">{poolData.dataHash}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">版本:</span>
              <span className="text-white">{poolData.dataVersion}</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">代币名称:</span>
              <span className="text-white">Consumer Credit Pool 2024-Q1</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">代币符号:</span>
              <span className="text-white">CCP24Q1</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">面值:</span>
              <span className="text-white">$1.00 USD</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Compliance Features */}
      <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">合规特性</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-white font-medium mb-3">身份验证</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm text-gray-300">DID去中心化身份</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm text-gray-300">KYC/AML验证</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm text-gray-300">合格投资者认证</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-white font-medium mb-3">转让限制</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-sm text-gray-300">受限证券标准</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-sm text-gray-300">司法辖区限制</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-sm text-gray-300">6个月锁定期</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Risk Notice */}
      <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6">
        <h3 className="text-red-400 font-semibold mb-3">重要提示</h3>
        <ul className="text-red-400 text-sm space-y-1">
          <li>• 代币化后合约地址不可更改，请确认所有参数正确</li>
          <li>• 合规规则将写入智能合约，后续修改需要治理流程</li>
          <li>• 请确保钱包中有足够的ETH支付Gas费用</li>
          <li>• 建议在测试网络先行验证所有功能</li>
        </ul>
      </div>
    </div>
  );
};

export default TokenizationView;