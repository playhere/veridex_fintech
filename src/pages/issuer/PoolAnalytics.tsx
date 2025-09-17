import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Play, Download, Settings, TrendingUp, AlertTriangle, BarChart3, Target } from 'lucide-react';

const PoolAnalytics: React.FC = () => {
  const { id } = useParams();
  const [activeScenario, setActiveScenario] = useState('base');
  const [simulationStatus, setSimulationStatus] = useState<'idle' | 'running' | 'completed'>('idle');

  const poolInfo = {
    id: 'pool-001',
    name: '消费信贷资产池 2024-Q1',
    size: '$125,000,000',
    lastAnalysis: '2024-01-15 10:30:22'
  };

  const scenarios = [
    { id: 'base', name: '基准情景', description: '正常市场条件下的预期表现' },
    { id: 'stress', name: '压力情景', description: '经济衰退条件下的风险评估' },
    { id: 'optimistic', name: '乐观情景', description: '经济增长条件下的最佳表现' }
  ];

  const modelParameters = {
    base: {
      defaultRate: { mean: 1.2, std: 0.3, distribution: 'Beta' },
      recoveryRate: { mean: 89.5, std: 5.2, distribution: 'Normal' },
      prepaymentRate: { mean: 12.3, std: 2.1, distribution: 'Lognormal' },
      correlation: 0.15,
      simulations: 10000,
      confidenceLevel: 95
    },
    stress: {
      defaultRate: { mean: 3.8, std: 0.8, distribution: 'Beta' },
      recoveryRate: { mean: 72.1, std: 8.5, distribution: 'Normal' },
      prepaymentRate: { mean: 8.7, std: 1.8, distribution: 'Lognormal' },
      correlation: 0.35,
      simulations: 10000,
      confidenceLevel: 99
    },
    optimistic: {
      defaultRate: { mean: 0.6, std: 0.2, distribution: 'Beta' },
      recoveryRate: { mean: 94.2, std: 3.1, distribution: 'Normal' },
      prepaymentRate: { mean: 15.8, std: 2.5, distribution: 'Lognormal' },
      correlation: 0.08,
      simulations: 10000,
      confidenceLevel: 90
    }
  };

  const simulationResults = {
    base: {
      expectedLoss: 1.18,
      var95: 2.45,
      var99: 3.87,
      expectedReturn: 8.32,
      duration: 2.8,
      convexity: 0.15,
      breakEvenDefault: 2.1,
      tailRisk: 0.23
    },
    stress: {
      expectedLoss: 4.12,
      var95: 8.23,
      var99: 12.45,
      expectedReturn: 4.67,
      duration: 3.2,
      convexity: 0.28,
      breakEvenDefault: 1.2,
      tailRisk: 1.87
    },
    optimistic: {
      expectedLoss: 0.52,
      var95: 1.23,
      var99: 1.89,
      expectedReturn: 9.15,
      duration: 2.6,
      convexity: 0.12,
      breakEvenDefault: 3.8,
      tailRisk: 0.08
    }
  };

  const runSimulation = () => {
    setSimulationStatus('running');
    // Simulate analysis running
    setTimeout(() => {
      setSimulationStatus('completed');
    }, 3000);
  };

  const currentParams = modelParameters[activeScenario as keyof typeof modelParameters];
  const currentResults = simulationResults[activeScenario as keyof typeof simulationResults];

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
            <h1 className="text-2xl font-bold text-white">测算与影子评级</h1>
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
              <span>{poolInfo.name}</span>
              <span>•</span>
              <span>规模: {poolInfo.size}</span>
              <span>•</span>
              <span>最后分析: {poolInfo.lastAnalysis}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={runSimulation}
            disabled={simulationStatus === 'running'}
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg font-medium hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 flex items-center gap-2 disabled:opacity-50"
          >
            {simulationStatus === 'running' ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                运行中...
              </>
            ) : (
              <>
                <Play className="h-4 w-4" />
                运行蒙特卡洛
              </>
            )}
          </button>
          <button className="px-4 py-3 border border-gray-600 hover:bg-gray-800 rounded-lg transition-colors flex items-center gap-2">
            <Download className="h-4 w-4" />
            导出结果
          </button>
          <button className="px-4 py-3 border border-gray-600 hover:bg-gray-800 rounded-lg transition-colors">
            <Settings className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Scenario Tabs */}
      <div className="border-b border-gray-700">
        <nav className="flex space-x-8">
          {scenarios.map((scenario) => (
            <button
              key={scenario.id}
              onClick={() => setActiveScenario(scenario.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeScenario === scenario.id
                  ? 'border-cyan-500 text-cyan-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
              }`}
            >
              <div>
                <div>{scenario.name}</div>
                <div className="text-xs text-gray-500 mt-1">{scenario.description}</div>
              </div>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Model Parameters */}
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Settings className="h-5 w-5" />
            模型参数
          </h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-white font-medium mb-2">违约率分布</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">均值:</span>
                  <span className="text-white">{currentParams.defaultRate.mean}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">标准差:</span>
                  <span className="text-white">{currentParams.defaultRate.std}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">分布类型:</span>
                  <span className="text-white">{currentParams.defaultRate.distribution}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-white font-medium mb-2">回收率分布</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">均值:</span>
                  <span className="text-white">{currentParams.recoveryRate.mean}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">标准差:</span>
                  <span className="text-white">{currentParams.recoveryRate.std}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">分布类型:</span>
                  <span className="text-white">{currentParams.recoveryRate.distribution}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-white font-medium mb-2">提前还款率</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">均值:</span>
                  <span className="text-white">{currentParams.prepaymentRate.mean}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">标准差:</span>
                  <span className="text-white">{currentParams.prepaymentRate.std}%</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-600/30">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">相关性系数:</span>
                  <span className="text-white">{currentParams.correlation}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">模拟次数:</span>
                  <span className="text-white">{currentParams.simulations.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">置信水平:</span>
                  <span className="text-white">{currentParams.confidenceLevel}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Simulation Results */}
        <div className="lg:col-span-2 space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-4">
              <div className="flex items-center mb-2">
                <Target className="h-4 w-4 text-red-400 mr-2" />
                <span className="text-sm text-gray-400">预期损失</span>
              </div>
              <div className="text-xl font-bold text-red-400">{currentResults.expectedLoss}%</div>
            </div>

            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-4">
              <div className="flex items-center mb-2">
                <AlertTriangle className="h-4 w-4 text-yellow-400 mr-2" />
                <span className="text-sm text-gray-400">VaR (95%)</span>
              </div>
              <div className="text-xl font-bold text-yellow-400">{currentResults.var95}%</div>
            </div>

            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-4">
              <div className="flex items-center mb-2">
                <TrendingUp className="h-4 w-4 text-green-400 mr-2" />
                <span className="text-sm text-gray-400">预期收益</span>
              </div>
              <div className="text-xl font-bold text-green-400">{currentResults.expectedReturn}%</div>
            </div>

            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-4">
              <div className="flex items-center mb-2">
                <BarChart3 className="h-4 w-4 text-purple-400 mr-2" />
                <span className="text-sm text-gray-400">尾部风险</span>
              </div>
              <div className="text-xl font-bold text-purple-400">{currentResults.tailRisk}%</div>
            </div>
          </div>

          {/* Detailed Results */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">详细分析结果</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-white font-medium mb-3">风险指标</h4>
                <div className="space-y-3">
                  <div className="flex justify-between p-3 bg-gray-700/20 rounded-lg">
                    <span className="text-gray-400">VaR (99%)</span>
                    <span className="text-white font-medium">{currentResults.var99}%</span>
                  </div>
                  <div className="flex justify-between p-3 bg-gray-700/20 rounded-lg">
                    <span className="text-gray-400">盈亏平衡违约率</span>
                    <span className="text-white font-medium">{currentResults.breakEvenDefault}%</span>
                  </div>
                  <div className="flex justify-between p-3 bg-gray-700/20 rounded-lg">
                    <span className="text-gray-400">久期</span>
                    <span className="text-white font-medium">{currentResults.duration} 年</span>
                  </div>
                  <div className="flex justify-between p-3 bg-gray-700/20 rounded-lg">
                    <span className="text-gray-400">凸性</span>
                    <span className="text-white font-medium">{currentResults.convexity}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-white font-medium mb-3">影子评级</h4>
                <div className="space-y-3">
                  <div className="p-4 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg border border-green-500/30">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium">Moody's 等效</span>
                      <span className="text-green-400 font-bold text-lg">
                        {activeScenario === 'base' ? 'Baa2' : activeScenario === 'stress' ? 'Ba2' : 'Baa1'}
                      </span>
                    </div>
                    <div className="text-sm text-gray-400">
                      基于违约概率和损失分布计算
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg border border-blue-500/30">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium">S&P 等效</span>
                      <span className="text-blue-400 font-bold text-lg">
                        {activeScenario === 'base' ? 'BBB' : activeScenario === 'stress' ? 'BB' : 'BBB+'}
                      </span>
                    </div>
                    <div className="text-sm text-gray-400">
                      考虑回收率和相关性调整
                    </div>
                  </div>

                  <div className="p-3 bg-gray-700/20 rounded-lg">
                    <div className="text-sm text-gray-400 mb-1">置信度评估</div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-600 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-cyan-500 to-purple-500 h-2 rounded-full"
                          style={{ width: activeScenario === 'base' ? '85%' : activeScenario === 'stress' ? '72%' : '91%' }}
                        ></div>
                      </div>
                      <span className="text-white text-sm">
                        {activeScenario === 'base' ? '85%' : activeScenario === 'stress' ? '72%' : '91%'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Distribution Chart Placeholder */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">损失分布图</h3>
            <div className="h-64 bg-gray-700/20 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400">蒙特卡洛模拟结果分布图</p>
                <p className="text-gray-500 text-sm mt-2">
                  {simulationStatus === 'completed' ? '显示损失概率分布' : '运行模拟后显示'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Version Comparison */}
      <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">版本对比</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700/20 border-b border-gray-600">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">版本</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">日期</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">预期损失</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">VaR (95%)</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">预期收益</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">影子评级</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-600/30">
              <tr className="hover:bg-gray-700/20">
                <td className="px-4 py-3 text-white">v2.1.3 (当前)</td>
                <td className="px-4 py-3 text-gray-300">2024-01-15</td>
                <td className="px-4 py-3 text-red-400">{currentResults.expectedLoss}%</td>
                <td className="px-4 py-3 text-yellow-400">{currentResults.var95}%</td>
                <td className="px-4 py-3 text-green-400">{currentResults.expectedReturn}%</td>
                <td className="px-4 py-3 text-blue-400">
                  {activeScenario === 'base' ? 'Baa2/BBB' : activeScenario === 'stress' ? 'Ba2/BB' : 'Baa1/BBB+'}
                </td>
                <td className="px-4 py-3">
                  <button className="text-cyan-400 hover:text-cyan-300 text-sm">导出</button>
                </td>
              </tr>
              <tr className="hover:bg-gray-700/20">
                <td className="px-4 py-3 text-gray-300">v2.1.2</td>
                <td className="px-4 py-3 text-gray-300">2024-01-10</td>
                <td className="px-4 py-3 text-red-400">1.25%</td>
                <td className="px-4 py-3 text-yellow-400">2.58%</td>
                <td className="px-4 py-3 text-green-400">8.28%</td>
                <td className="px-4 py-3 text-blue-400">Baa2/BBB</td>
                <td className="px-4 py-3">
                  <button className="text-gray-400 hover:text-gray-300 text-sm">查看</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PoolAnalytics;