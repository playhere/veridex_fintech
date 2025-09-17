import React from 'react';
import { Shield, TrendingUp, AlertTriangle, BarChart3 } from 'lucide-react';

interface TranchesProps {
  offerId: string;
}

const Tranches: React.FC<TranchesProps> = ({ offerId }) => {
  const tranchesData = [
    {
      id: 'senior',
      name: '优先级 (Senior)',
      rating: 'AAA级',
      allocation: 75,
      expectedReturn: '6.5%',
      creditEnhancement: '25%',
      minInvestment: '$100,000',
      available: '$93,750,000',
      subscribed: '42%',
      riskLevel: 'low',
      features: ['优先受偿', '信用增级保护', '稳定收益'],
      description: '享有优先受偿权，承担最低风险，适合风险偏好较低的投资者'
    },
    {
      id: 'mezzanine',
      name: '夹层级 (Mezzanine)',
      rating: 'BBB级',
      allocation: 15,
      expectedReturn: '9.2%',
      creditEnhancement: '10%',
      minInvestment: '$250,000',
      available: '$18,750,000',
      subscribed: '38%',
      riskLevel: 'medium',
      features: ['中等收益', '适度风险', '平衡配置'],
      description: '平衡风险与收益，在优先级之后受偿，适合追求较高收益的投资者'
    },
    {
      id: 'subordinate',
      name: '劣后级 (Subordinate)',
      rating: '无评级',
      allocation: 10,
      expectedReturn: '15.8%',
      creditEnhancement: '0%',
      minInvestment: '$500,000',
      available: '$12,500,000',
      subscribed: '65%',
      riskLevel: 'high',
      features: ['高收益潜力', '首损承担', '剩余分配'],
      description: '承担首损风险，享有剩余收益分配权，适合高风险偏好的专业投资者'
    }
  ];

  const getRiskBadge = (level: string) => {
    const riskMap = {
      'low': { label: '低风险', color: 'bg-green-500/20 text-green-400 border-green-500/30' },
      'medium': { label: '中等风险', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
      'high': { label: '高风险', color: 'bg-red-500/20 text-red-400 border-red-500/30' }
    };
    
    const riskInfo = riskMap[level as keyof typeof riskMap];
    return (
      <span className={`px-2 py-1 rounded text-xs border ${riskInfo.color}`}>
        {riskInfo.label}
      </span>
    );
  };

  const getRatingColor = (rating: string) => {
    if (rating.includes('AAA')) return 'text-green-400';
    if (rating.includes('BBB')) return 'text-yellow-400';
    return 'text-gray-400';
  };

  return (
    <div className="space-y-6">
      {/* Structure Overview */}
      <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
        <h3 className="text-lg font-semibold text-white mb-6">产品分层结构</h3>
        
        <div className="space-y-4">
          {tranchesData.map((tranche) => (
            <div key={tranche.id} className="p-6 bg-gray-700/20 rounded-lg border border-gray-600/30 hover:border-cyan-500/30 transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-white font-medium text-lg">{tranche.name}</h4>
                    <span className={`px-2 py-1 rounded text-xs border ${getRatingColor(tranche.rating)}`}>
                      {tranche.rating}
                    </span>
                    {getRiskBadge(tranche.riskLevel)}
                  </div>
                  <p className="text-gray-400 text-sm mb-4">{tranche.description}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <span className="text-gray-400 text-sm">规模占比:</span>
                      <span className="text-white ml-2 font-medium">{tranche.allocation}%</span>
                    </div>
                    <div>
                      <span className="text-gray-400 text-sm">预期收益:</span>
                      <span className="text-green-400 ml-2 font-medium">{tranche.expectedReturn}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 text-sm">起投金额:</span>
                      <span className="text-white ml-2 font-medium">{tranche.minInvestment}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 text-sm">可投余额:</span>
                      <span className="text-cyan-400 ml-2 font-medium">{tranche.available}</span>
                    </div>
                  </div>

                  {/* Subscription Progress */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-400 mb-2">
                      <span>认购进度</span>
                      <span>{tranche.subscribed}</span>
                    </div>
                    <div className="w-full bg-gray-600 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-cyan-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: tranche.subscribed }}
                      ></div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {tranche.features.map((feature, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-600/30 rounded text-xs text-gray-300 border border-gray-500/30"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex justify-end">
                <button className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg font-medium hover:from-cyan-600 hover:to-purple-600 transition-all duration-300">
                  认购此档次
                </button>
              </div>
            </div>
          ))}
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