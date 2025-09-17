import React from 'react';
import { TrendingUp, TrendingDown, AlertTriangle, BarChart3, Activity, RefreshCw } from 'lucide-react';

interface PoolOverviewProps {
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

const PoolOverview: React.FC<PoolOverviewProps> = ({ poolData }) => {
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

  return (
    <div className="space-y-8">
      {/* Performance Metrics */}
      <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-white">关键表现指标</h3>
          <button className="px-4 py-2 border border-gray-600 hover:bg-gray-800 rounded-lg transition-colors flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            刷新数据
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {performanceData.map((metric, index) => (
            <div key={index} className="p-4 bg-gray-700/20 rounded-lg border border-gray-600/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-medium text-sm">{metric.metric}</span>
                {getTrendIcon(metric.trend)}
              </div>
              <div className="text-xl font-bold text-white mb-1">{metric.value}</div>
              <div className="text-xs text-gray-400">基准: {metric.benchmark}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Asset Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Asset Breakdown */}
        <div>
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">行业分布</h3>
            <div className="space-y-3">
              {assetBreakdown.byIndustry.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <span className="text-white">{item.category}</span>
                    <div className="text-sm text-gray-400">{item.amount}</div>
                  </div>
                  <div className="text-right">
                    <span className="text-white">{item.percentage}%</span>
                    <div className="w-20 bg-gray-700 rounded-full h-2 mt-1">
                      <div 
                        className="bg-gradient-to-r from-cyan-500 to-purple-500 h-2 rounded-full"
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">地区分布</h3>
          <div className="space-y-3">
            {assetBreakdown.byRegion.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <span className="text-white">{item.category}</span>
                  <div className="text-sm text-gray-400">{item.amount}</div>
                </div>
                <div className="text-right">
                  <span className="text-white">{item.percentage}%</span>
                  <div className="w-20 bg-gray-700 rounded-full h-2 mt-1">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">评级分布</h3>
          <div className="space-y-3">
            {assetBreakdown.byRating.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <span className="text-white">{item.category}</span>
                  <div className="text-sm text-gray-400">{item.amount}</div>
                </div>
                <div className="text-right">
                  <span className="text-white">{item.percentage}%</span>
                  <div className="w-20 bg-gray-700 rounded-full h-2 mt-1">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Real-time Monitoring */}
      <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-white">实时监控</h3>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400 text-sm">实时更新</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-gray-700/20 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Activity className="h-5 w-5 text-blue-400" />
              <span className="text-white font-medium">今日新增</span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">新放款:</span>
                <span className="text-green-400">+$2.3M</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">还款:</span>
                <span className="text-blue-400">$1.8M</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">逾期:</span>
                <span className="text-red-400">$0.15M</span>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-gray-700/20 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <BarChart3 className="h-5 w-5 text-purple-400" />
              <span className="text-white font-medium">月度趋势</span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">违约率变化:</span>
                <span className="text-yellow-400">+0.05%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">回收率变化:</span>
                <span className="text-green-400">+1.2%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">提前还款:</span>
                <span className="text-blue-400">-0.3%</span>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-gray-700/20 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="h-5 w-5 text-yellow-400" />
              <span className="text-white font-medium">风险预警</span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-gray-400">整体风险: 正常</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span className="text-gray-400">区域集中度: 关注</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-gray-400">流动性: 充足</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoolOverview;