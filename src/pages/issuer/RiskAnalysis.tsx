import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Target, AlertTriangle, TrendingUp, BarChart3 } from 'lucide-react';

interface RiskAnalysisProps {
  poolId: string;
}

const RiskAnalysis: React.FC<RiskAnalysisProps> = ({ poolId }) => {
  return (
    <div className="space-y-6">
      {/* Analysis Summary */}
      <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-white">蒙特卡洛风险分析结果</h3>
          <div className="flex gap-3">
            <Link
              to={`/issuer/pools/${poolId}/analytics`}
              className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg font-medium hover:from-cyan-600 hover:to-purple-600 transition-all duration-300"
            >
              查看详细分析
            </Link>
            <button className="px-4 py-2 border border-gray-600 hover:bg-gray-800 rounded-lg transition-colors flex items-center gap-2">
              <Play className="h-4 w-4" />
              重新运行
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="p-4 bg-gray-700/20 rounded-lg text-center">
            <div className="flex items-center justify-center mb-2">
              <Target className="h-4 w-4 text-red-400 mr-2" />
            </div>
            <div className="text-2xl font-bold text-red-400 mb-1">1.18%</div>
            <div className="text-sm text-gray-400">预期损失</div>
          </div>
          <div className="p-4 bg-gray-700/20 rounded-lg text-center">
            <div className="flex items-center justify-center mb-2">
              <AlertTriangle className="h-4 w-4 text-yellow-400 mr-2" />
            </div>
            <div className="text-2xl font-bold text-yellow-400 mb-1">2.45%</div>
            <div className="text-sm text-gray-400">VaR (95%)</div>
          </div>
          <div className="p-4 bg-gray-700/20 rounded-lg text-center">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="h-4 w-4 text-green-400 mr-2" />
            </div>
            <div className="text-2xl font-bold text-green-400 mb-1">8.32%</div>
            <div className="text-sm text-gray-400">预期收益</div>
          </div>
          <div className="p-4 bg-gray-700/20 rounded-lg text-center">
            <div className="flex items-center justify-center mb-2">
              <BarChart3 className="h-4 w-4 text-purple-400 mr-2" />
            </div>
            <div className="text-2xl font-bold text-purple-400 mb-1">0.23%</div>
            <div className="text-sm text-gray-400">尾部风险</div>
          </div>
        </div>
        
        <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span className="text-blue-400 font-medium">分析状态: 已完成</span>
          </div>
          <div className="text-blue-400 text-sm">
            最后运行: 2024-01-15 10:30:22 | 模拟次数: 10,000 | 置信水平: 95%
          </div>
        </div>
      </div>
      
      {/* Risk Scenarios */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
          <h4 className="text-white font-medium mb-4">基准情景</h4>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">违约率:</span>
              <span className="text-white">1.2%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">回收率:</span>
              <span className="text-white">89.5%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">预期收益:</span>
              <span className="text-green-400">8.32%</span>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
          <h4 className="text-white font-medium mb-4">压力情景</h4>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">违约率:</span>
              <span className="text-white">3.8%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">回收率:</span>
              <span className="text-white">72.1%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">预期收益:</span>
              <span className="text-red-400">4.67%</span>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
          <h4 className="text-white font-medium mb-4">乐观情景</h4>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">违约率:</span>
              <span className="text-white">0.6%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">回收率:</span>
              <span className="text-white">94.2%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">预期收益:</span>
              <span className="text-green-400">9.15%</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Shadow Rating */}
      <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
        <h4 className="text-white font-medium mb-4">影子评级</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg border border-green-500/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white font-medium">Moody's 等效</span>
              <span className="text-green-400 font-bold text-lg">Baa2</span>
            </div>
            <div className="text-sm text-gray-400">
              基于违约概率和损失分布计算
            </div>
          </div>
          
          <div className="p-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg border border-blue-500/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white font-medium">S&P 等效</span>
              <span className="text-blue-400 font-bold text-lg">BBB</span>
            </div>
            <div className="text-sm text-gray-400">
              考虑回收率和相关性调整
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskAnalysis;