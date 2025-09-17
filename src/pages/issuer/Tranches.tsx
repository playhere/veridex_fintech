import React from 'react';
import { Link } from 'react-router-dom';

interface TranchesProps {
  poolId: string;
}

const Tranches: React.FC<TranchesProps> = ({ poolId }) => {
  return (
    <div className="space-y-6">
      {/* Current Structure Overview */}
      <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-white">当前分层结构</h3>
          <Link
            to={`/issuer/pools/${poolId}/structuring`}
            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
          >
            编辑结构
          </Link>
        </div>
        
        <div className="space-y-4">
          {/* Senior Tranche */}
          <div className="p-4 bg-gray-700/20 rounded-lg border border-gray-600/30">
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-white font-medium">优先级 (Senior)</h4>
              <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded border border-green-500/30">
                AAA级
              </span>
            </div>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-400">规模占比:</span>
                <span className="text-white ml-2">75%</span>
              </div>
              <div>
                <span className="text-gray-400">预期收益:</span>
                <span className="text-white ml-2">6.5%</span>
              </div>
              <div>
                <span className="text-gray-400">信用增级:</span>
                <span className="text-white ml-2">25%</span>
              </div>
            </div>
          </div>

          {/* Mezzanine Tranche */}
          <div className="p-4 bg-gray-700/20 rounded-lg border border-gray-600/30">
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-white font-medium">夹层级 (Mezzanine)</h4>
              <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded border border-yellow-500/30">
                BBB级
              </span>
            </div>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-400">规模占比:</span>
                <span className="text-white ml-2">15%</span>
              </div>
              <div>
                <span className="text-gray-400">预期收益:</span>
                <span className="text-white ml-2">9.2%</span>
              </div>
              <div>
                <span className="text-gray-400">信用增级:</span>
                <span className="text-white ml-2">10%</span>
              </div>
            </div>
          </div>

          {/* Subordinate Tranche */}
          <div className="p-4 bg-gray-700/20 rounded-lg border border-gray-600/30">
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-white font-medium">劣后级 (Subordinate)</h4>
              <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded border border-red-500/30">
                无评级
              </span>
            </div>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-400">规模占比:</span>
                <span className="text-white ml-2">10%</span>
              </div>
              <div>
                <span className="text-gray-400">预期收益:</span>
                <span className="text-white ml-2">15.8%</span>
              </div>
              <div>
                <span className="text-gray-400">首损承担:</span>
                <span className="text-white ml-2">100%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cash Flow Waterfall */}
      <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">现金流瀑布机制</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-gray-700/20 rounded-lg">
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">1</div>
            <span className="text-white">服务费用支付</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-700/20 rounded-lg">
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">2</div>
            <span className="text-white">优先级本息支付</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-700/20 rounded-lg">
            <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-white text-xs font-bold">3</div>
            <span className="text-white">夹层级本息支付</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-700/20 rounded-lg">
            <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">4</div>
            <span className="text-white">劣后级剩余分配</span>
          </div>
        </div>
      </div>

      {/* Trigger Events */}
      <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">触发机制</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-700/20 rounded-lg">
            <h4 className="text-white font-medium mb-2">加速清偿触发</h4>
            <ul className="text-gray-400 text-sm space-y-1">
              <li>• 累计违约率 &gt; 5%</li>
              <li>• 90天逾期率 &gt; 3%</li>
              <li>• 服务商评级下调</li>
            </ul>
          </div>
          <div className="p-4 bg-gray-700/20 rounded-lg">
            <h4 className="text-white font-medium mb-2">现金流转移触发</h4>
            <ul className="text-gray-400 text-sm space-y-1">
              <li>• 月度违约率 &gt; 2%</li>
              <li>• 回收率 &lt; 85%</li>
              <li>• 储备账户不足</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tranches;