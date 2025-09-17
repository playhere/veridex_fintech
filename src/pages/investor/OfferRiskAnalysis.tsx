import React from 'react';
import { Shield, AlertTriangle, Target, TrendingUp, BarChart3, CheckCircle } from 'lucide-react';

interface OfferRiskAnalysisProps {
  offerId: string;
}

const OfferRiskAnalysis: React.FC<OfferRiskAnalysisProps> = ({ offerId }) => {
  // 整合发行方分析建模结果
  const riskModelingResults = {
    monteCarloSimulation: {
      expectedLoss: 1.18,
      var95: 2.45,
      var99: 3.87,
      expectedReturn: 8.32,
      tailRisk: 0.23,
      simulations: 10000,
      confidenceLevel: 95,
      lastRun: '2024-01-15 10:30:22'
    },
    shadowRating: {
      moodys: 'Baa2',
      sp: 'BBB',
      confidence: 85
    },
    scenarios: {
      base: {
        defaultRate: 1.2,
        recoveryRate: 89.5,
        expectedReturn: 8.32
      },
      stress: {
        defaultRate: 3.8,
        recoveryRate: 72.1,
        expectedReturn: 4.67
      },
      optimistic: {
        defaultRate: 0.6,
        recoveryRate: 94.2,
        expectedReturn: 9.15
      }
    }
  };

  const riskFactors = [
    { 
      type: 'credit', 
      name: '信用风险', 
      level: 'medium', 
      description: '底层资产存在违约可能，当前违约率1.2%处于合理范围',
      impact: 'medium',
      mitigation: '分散化资产组合，第三方担保覆盖'
    },
    { 
      type: 'liquidity', 
      name: '流动性风险', 
      level: 'high', 
      description: '锁定期内无法转让，二级市场流动性有限',
      impact: 'high',
      mitigation: '提供二级市场交易平台，做市商支持'
    },
    { 
      type: 'market', 
      name: '市场风险', 
      level: 'low', 
      description: '利率变动影响相对较小，久期风险可控',
      impact: 'low',
      mitigation: '浮动利率设计，利率对冲策略'
    },
    { 
      type: 'operational', 
      name: '操作风险', 
      level: 'low', 
      description: '服务商运营风险较低，系统稳定性良好',
      impact: 'low',
      mitigation: '多重备份系统，专业服务商管理'
    },
    {
      type: 'concentration',
      name: '集中度风险',
      level: 'medium',
      description: '地理区域集中度较高，华东地区占比32%',
      impact: 'medium',
      mitigation: '逐步扩大地理覆盖范围，分散区域风险'
    },
    {
      type: 'regulatory',
      name: '监管风险',
      level: 'low',
      description: '合规框架完善，符合现行监管要求',
      impact: 'low',
      mitigation: '持续跟踪监管变化，及时调整合规策略'
    }
  ];

  const getRiskLevelColor = (level: string) => {
    const colorMap = {
      'low': 'text-green-400',
      'medium': 'text-yellow-400',
      'high': 'text-red-400'
    };
    return colorMap[level as keyof typeof colorMap] || 'text-gray-400';
  };

  const getRiskLevelLabel = (level: string) => {
    const labelMap = {
      'low': '低',
      'medium': '中',
      'high': '高'
    };
    return labelMap[level as keyof typeof labelMap] || level;
  };

  const getImpactColor = (impact: string) => {
    const colorMap = {
      'low': 'bg-green-500/20 border-green-500/30',
      'medium': 'bg-yellow-500/20 border-yellow-500/30',
      'high': 'bg-red-500/20 border-red-500/30'
    };
    return colorMap[impact as keyof typeof colorMap] || 'bg-gray-500/20 border-gray-500/30';
  };

  return (
    <div className="space-y-8">
      {/* Monte Carlo Results Summary */}
      <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
        <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          蒙特卡洛风险建模结果
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="p-4 bg-gray-700/20 rounded-lg text-center">
            <div className="flex items-center justify-center mb-2">
              <Target className="h-4 w-4 text-red-400 mr-2" />
            </div>
            <div className="text-2xl font-bold text-red-400 mb-1">{riskModelingResults.monteCarloSimulation.expectedLoss}%</div>
            <div className="text-sm text-gray-400">预期损失</div>
          </div>
          <div className="p-4 bg-gray-700/20 rounded-lg text-center">
            <div className="flex items-center justify-center mb-2">
              <AlertTriangle className="h-4 w-4 text-yellow-400 mr-2" />
            </div>
            <div className="text-2xl font-bold text-yellow-400 mb-1">{riskModelingResults.monteCarloSimulation.var95}%</div>
            <div className="text-sm text-gray-400">VaR (95%)</div>
          </div>
          <div className="p-4 bg-gray-700/20 rounded-lg text-center">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="h-4 w-4 text-green-400 mr-2" />
            </div>
            <div className="text-2xl font-bold text-green-400 mb-1">{riskModelingResults.monteCarloSimulation.expectedReturn}%</div>
            <div className="text-sm text-gray-400">预期收益</div>
          </div>
          <div className="p-4 bg-gray-700/20 rounded-lg text-center">
            <div className="flex items-center justify-center mb-2">
              <BarChart3 className="h-4 w-4 text-purple-400 mr-2" />
            </div>
            <div className="text-2xl font-bold text-purple-400 mb-1">{riskModelingResults.monteCarloSimulation.tailRisk}%</div>
            <div className="text-sm text-gray-400">尾部风险</div>
          </div>
        </div>

        <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span className="text-blue-400 font-medium">模型状态: 已完成</span>
          </div>
          <div className="text-blue-400 text-sm">
            最后运行: {riskModelingResults.monteCarloSimulation.lastRun} | 
            模拟次数: {riskModelingResults.monteCarloSimulation.simulations.toLocaleString()} | 
            置信水平: {riskModelingResults.monteCarloSimulation.confidenceLevel}%
          </div>
        </div>
      </div>

      {/* Scenario Analysis */}
      <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
        <h3 className="text-lg font-semibold text-white mb-6">情景分析对比</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="p-4 bg-gray-700/20 rounded-lg border border-gray-600/30">
            <h4 className="text-white font-medium mb-4 flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
              基准情景
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">违约率:</span>
                <span className="text-white">{riskModelingResults.scenarios.base.defaultRate}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">回收率:</span>
                <span className="text-white">{riskModelingResults.scenarios.base.recoveryRate}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">预期收益:</span>
                <span className="text-green-400">{riskModelingResults.scenarios.base.expectedReturn}%</span>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-gray-700/20 rounded-lg border border-red-500/30">
            <h4 className="text-white font-medium mb-4 flex items-center gap-2">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              压力情景
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">违约率:</span>
                <span className="text-red-400">{riskModelingResults.scenarios.stress.defaultRate}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">回收率:</span>
                <span className="text-red-400">{riskModelingResults.scenarios.stress.recoveryRate}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">预期收益:</span>
                <span className="text-red-400">{riskModelingResults.scenarios.stress.expectedReturn}%</span>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-gray-700/20 rounded-lg border border-green-500/30">
            <h4 className="text-white font-medium mb-4 flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              乐观情景
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">违约率:</span>
                <span className="text-green-400">{riskModelingResults.scenarios.optimistic.defaultRate}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">回收率:</span>
                <span className="text-green-400">{riskModelingResults.scenarios.optimistic.recoveryRate}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">预期收益:</span>
                <span className="text-green-400">{riskModelingResults.scenarios.optimistic.expectedReturn}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Shadow Rating */}
      <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
        <h3 className="text-lg font-semibold text-white mb-6">影子评级</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="p-4 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg border border-green-500/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white font-medium">Moody's 等效</span>
              <span className="text-green-400 font-bold text-lg">{riskModelingResults.shadowRating.moodys}</span>
            </div>
            <div className="text-sm text-gray-400">
              基于违约概率和损失分布计算
            </div>
          </div>

          <div className="p-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg border border-blue-500/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white font-medium">S&P 等效</span>
              <span className="text-blue-400 font-bold text-lg">{riskModelingResults.shadowRating.sp}</span>
            </div>
            <div className="text-sm text-gray-400">
              考虑回收率和相关性调整
            </div>
          </div>
        </div>

        <div className="p-3 bg-gray-700/20 rounded-lg">
          <div className="text-sm text-gray-400 mb-1">评级置信度</div>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-gray-600 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-cyan-500 to-purple-500 h-2 rounded-full"
                style={{ width: `${riskModelingResults.shadowRating.confidence}%` }}
              ></div>
            </div>
            <span className="text-white text-sm">{riskModelingResults.shadowRating.confidence}%</span>
          </div>
        </div>
      </div>

      {/* Detailed Risk Factors */}
      <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
        <h3 className="text-lg font-semibold text-white mb-6">详细风险分析</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {riskFactors.map((risk, index) => (
            <div key={index} className={`p-4 bg-gray-700/20 rounded-lg border ${getImpactColor(risk.impact)}`}>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-white font-medium">{risk.name}</h4>
                <span className={`text-sm font-medium ${getRiskLevelColor(risk.level)}`}>
                  {getRiskLevelLabel(risk.level)}风险
                </span>
              </div>
              <p className="text-gray-400 text-sm mb-3">{risk.description}</p>
              <div className="p-3 bg-gray-600/20 rounded border border-gray-500/30">
                <div className="text-xs text-gray-400 mb-1">缓释措施:</div>
                <div className="text-xs text-gray-300">{risk.mitigation}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Risk Mitigation Summary */}
      <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
        <h3 className="text-lg font-semibold text-white mb-6">风险缓释措施</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-green-400 font-medium mb-2">结构性保护</h4>
                <ul className="text-green-400 text-sm space-y-1">
                  <li>• 分散化资产组合降低集中度风险</li>
                  <li>• 优先/劣后分层结构提供信用增级</li>
                  <li>• 超额抵押和储备账户机制</li>
                  <li>• 现金流瀑布机制保护优先级投资者</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-blue-400 font-medium mb-2">运营保障</h4>
                <ul className="text-blue-400 text-sm space-y-1">
                  <li>• 专业服务商管理与运营</li>
                  <li>• 第三方担保及保险覆盖</li>
                  <li>• 定期资产质量评估与监控</li>
                  <li>• 多重备份和灾难恢复机制</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Risk Monitoring */}
      <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
        <h3 className="text-lg font-semibold text-white mb-6">风险监控指标</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-gray-700/20 rounded-lg">
            <h4 className="text-white font-medium mb-3">早期预警指标</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">30天逾期率:</span>
                <span className="text-yellow-400">2.15%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">预警阈值:</span>
                <span className="text-gray-300">2.50%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">状态:</span>
                <span className="text-green-400">正常</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-gray-700/20 rounded-lg">
            <h4 className="text-white font-medium mb-3">触发事件监控</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">累计违约率:</span>
                <span className="text-white">1.18%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">触发阈值:</span>
                <span className="text-gray-300">5.00%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">安全边际:</span>
                <span className="text-green-400">3.82%</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-gray-700/20 rounded-lg">
            <h4 className="text-white font-medium mb-3">流动性监控</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">储备账户:</span>
                <span className="text-green-400">$12.5M</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">最低要求:</span>
                <span className="text-gray-300">$8.0M</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">覆盖倍数:</span>
                <span className="text-green-400">1.56x</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Risk Disclosure */}
      <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6">
        <h3 className="text-red-400 font-semibold mb-4 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          重要风险披露
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-red-400 font-medium mb-2">主要风险</h4>
            <ul className="text-red-400 text-sm space-y-1">
              <li>• 本投资产品存在本金损失风险</li>
              <li>• 预期收益不代表实际收益，可能低于预期</li>
              <li>• 投资期间资金将被锁定，流动性有限</li>
              <li>• 底层资产质量变化可能影响投资回报</li>
            </ul>
          </div>
          <div>
            <h4 className="text-red-400 font-medium mb-2">投资建议</h4>
            <ul className="text-red-400 text-sm space-y-1">
              <li>• 请根据自身风险承受能力谨慎投资</li>
              <li>• 建议进行适当的资产配置分散风险</li>
              <li>• 定期关注资产池表现和市场变化</li>
              <li>• 如有疑问请咨询专业投资顾问</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

};

export default OfferRiskAnalysis;