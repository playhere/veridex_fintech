import React from 'react';
import { Link } from 'react-router-dom';

interface ConfigViewProps {
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

const ConfigView: React.FC<ConfigViewProps> = ({ poolData }) => {
  return (
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
  );
};

export default ConfigView;