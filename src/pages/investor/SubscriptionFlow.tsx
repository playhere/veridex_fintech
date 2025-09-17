import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Shield, DollarSign, Clock, CheckCircle, AlertTriangle, FileText, CreditCard, Wallet } from 'lucide-react';

const SubscriptionFlow: React.FC = () => {
  const { id } = useParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTranche, setSelectedTranche] = useState('');
  const [subscriptionData, setSubscriptionData] = useState({
    amount: '',
    paymentMethod: 'wire',
    agreeTerms: false,
    agreeRisk: false,
    confirmDetails: false
  });

  const steps = [
    { id: 1, name: '选择档次', description: '选择投资档次' },
    { id: 2, name: '投资金额', description: '选择投资金额' },
    { id: 3, name: '支付方式', description: '选择支付方式' },
    { id: 4, name: '文档确认', description: '确认相关文档' },
    { id: 5, name: '最终确认', description: '确认投资详情' },
    { id: 6, name: '完成', description: '认购完成' }
  ];

  const offerData = {
    id: 'offer-001',
    name: '消费信贷资产池 2024-Q1',
    issuer: 'ABC金融集团',
    minInvestment: 100000,
    stepAmount: 50000,
    maxInvestment: 5000000,
    expectedReturn: '8.5%',
    duration: '36个月',
    currency: 'USD'
  };

  const tranchesData = [
    {
      id: 'senior',
      name: '优先级 (Senior)',
      rating: 'AAA级',
      expectedReturn: '6.5%',
      minInvestment: 100000,
      stepAmount: 50000,
      maxInvestment: 5000000,
      available: 93750000,
      riskLevel: 'low',
      description: '享有优先受偿权，承担最低风险，适合风险偏好较低的投资者'
    },
    {
      id: 'mezzanine',
      name: '夹层级 (Mezzanine)',
      rating: 'BBB级',
      expectedReturn: '9.2%',
      minInvestment: 250000,
      stepAmount: 100000,
      maxInvestment: 3000000,
      available: 18750000,
      riskLevel: 'medium',
      description: '平衡风险与收益，在优先级之后受偿，适合追求较高收益的投资者'
    },
    {
      id: 'subordinate',
      name: '劣后级 (Subordinate)',
      rating: '无评级',
      expectedReturn: '15.8%',
      minInvestment: 500000,
      stepAmount: 250000,
      maxInvestment: 2000000,
      available: 12500000,
      riskLevel: 'high',
      description: '承担首损风险，享有剩余收益分配权，适合高风险偏好的专业投资者'
    }
  ];

  const handleAmountChange = (amount: string) => {
    setSubscriptionData(prev => ({ ...prev, amount }));
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return selectedTranche !== '';
      case 2:
        if (!selectedTranche) return false;
        const selectedTrancheData = tranchesData.find(t => t.id === selectedTranche);
        if (!selectedTrancheData) return false;
        const amount = parseInt(subscriptionData.amount);
        return amount >= selectedTrancheData.minInvestment && amount <= selectedTrancheData.maxInvestment;
      case 3:
        return subscriptionData.paymentMethod !== '';
      case 4:
        return subscriptionData.agreeTerms && subscriptionData.agreeRisk;
      case 5:
        return subscriptionData.confirmDetails;
      default:
        return true;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <Link
            to={`/invest/offers/${id}`}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white">投资认购</h1>
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
              <span>{offerData.name}</span>
              <span>•</span>
              <span>发行方: {offerData.issuer}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
        <div className="flex items-center justify-between mb-6">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                currentStep >= step.id 
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-500 border-cyan-500 text-white'
                  : 'border-gray-600 text-gray-400'
              }`}>
                {currentStep > step.id ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <span>{step.id}</span>
                )}
              </div>
              {index < steps.length - 1 && (
                <div className={`w-24 h-0.5 mx-4 ${
                  currentStep > step.id ? 'bg-gradient-to-r from-cyan-500 to-purple-500' : 'bg-gray-600'
                }`}></div>
              )}
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <h3 className="text-lg font-semibold text-white mb-2">
            {steps[currentStep - 1].name}
          </h3>
          <p className="text-gray-400">
            {steps[currentStep - 1].description}
          </p>
        </div>
      </div>

      {/* Step Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {currentStep === 1 && (
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <Shield className="h-5 w-5" />
                选择投资档次
              </h3>
              
              <div className="space-y-4">
                {tranchesData.map((tranche) => (
                  <label
                    key={tranche.id}
                    className={`block p-4 bg-gray-700/20 rounded-lg border cursor-pointer transition-all duration-300 ${
                      selectedTranche === tranche.id
                        ? 'border-cyan-500/50 bg-cyan-500/10'
                        : 'border-gray-600/30 hover:border-cyan-500/30'
                    }`}
                  >
                    <input
                      type="radio"
                      name="tranche"
                      value={tranche.id}
                      checked={selectedTranche === tranche.id}
                      onChange={(e) => setSelectedTranche(e.target.value)}
                      className="sr-only"
                    />
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-white font-medium">{tranche.name}</h4>
                          <span className="px-2 py-1 bg-gray-600/50 text-gray-300 text-xs rounded">
                            {tranche.rating}
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm">{tranche.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-green-400">{tranche.expectedReturn}</div>
                        <div className="text-gray-400 text-sm">预期收益</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">起投金额:</span>
                        <div className="text-white font-medium">${tranche.minInvestment.toLocaleString()}</div>
                      </div>
                      <div>
                        <span className="text-gray-400">可投余额:</span>
                        <div className="text-cyan-400 font-medium">${(tranche.available / 1000000).toFixed(1)}M</div>
                      </div>
                      <div>
                        <span className="text-gray-400">风险等级:</span>
                        <div className={`font-medium ${
                          tranche.riskLevel === 'low' ? 'text-green-400' :
                          tranche.riskLevel === 'medium' ? 'text-yellow-400' : 'text-red-400'
                        }`}>
                          {tranche.riskLevel === 'low' ? '低风险' :
                           tranche.riskLevel === 'medium' ? '中等风险' : '高风险'}
                        </div>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                选择投资金额
              </h3>
              
              <div className="space-y-6">
                <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                  <div className="text-cyan-400 font-medium mb-1">已选择档次</div>
                  <div className="text-white">
                    {tranchesData.find(t => t.id === selectedTranche)?.name || '未选择'}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    投资金额 ({offerData.currency})
                  </label>
                  <input
                    type="number"
                    value={subscriptionData.amount}
                    onChange={(e) => handleAmountChange(e.target.value)}
                    min={tranchesData.find(t => t.id === selectedTranche)?.minInvestment || offerData.minInvestment}
                    max={tranchesData.find(t => t.id === selectedTranche)?.maxInvestment || offerData.maxInvestment}
                    step={tranchesData.find(t => t.id === selectedTranche)?.stepAmount || offerData.stepAmount}
                    className="w-full px-4 py-3 bg-gray-700/30 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white text-lg"
                    placeholder={`最低 ${(tranchesData.find(t => t.id === selectedTranche)?.minInvestment || offerData.minInvestment).toLocaleString()}`}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {selectedTranche && (() => {
                    const tranche = tranchesData.find(t => t.id === selectedTranche);
                    if (!tranche) return [];
                    const amounts = [
                      tranche.minInvestment,
                      tranche.minInvestment * 2,
                      tranche.minInvestment * 5
                    ].filter(amount => amount <= tranche.maxInvestment);
                    return amounts;
                  })().map((amount) => (
                    <button
                      key={amount}
                      onClick={() => handleAmountChange(amount.toString())}
                      className="p-3 bg-gray-700/20 hover:bg-gray-700/40 rounded-lg border border-gray-600/30 hover:border-cyan-500/30 transition-all duration-300 text-center"
                    >
                      <div className="text-white font-medium">${amount.toLocaleString()}</div>
                    </button>
                  ))}
                </div>

                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-blue-400 font-medium mb-2">投资限制</h4>
                      <ul className="text-blue-400 text-sm space-y-1">
                        <li>• 最低投资金额: ${(tranchesData.find(t => t.id === selectedTranche)?.minInvestment || offerData.minInvestment).toLocaleString()}</li>
                        <li>• 递增步长: ${(tranchesData.find(t => t.id === selectedTranche)?.stepAmount || offerData.stepAmount).toLocaleString()}</li>
                        <li>• 单户投资上限: ${(tranchesData.find(t => t.id === selectedTranche)?.maxInvestment || offerData.maxInvestment).toLocaleString()}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                选择支付方式
              </h3>
              
              <div className="space-y-4">
                <div className="space-y-3">
                  <label className="flex items-center p-4 bg-gray-700/20 rounded-lg border border-gray-600/30 hover:border-cyan-500/30 transition-all duration-300 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="wire"
                      checked={subscriptionData.paymentMethod === 'wire'}
                      onChange={(e) => setSubscriptionData(prev => ({ ...prev, paymentMethod: e.target.value }))}
                      className="w-4 h-4 text-cyan-600 bg-gray-700 border-gray-600 focus:ring-cyan-500"
                    />
                    <div className="ml-3 flex-1">
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-5 w-5 text-gray-400" />
                        <span className="text-white font-medium">银行电汇</span>
                      </div>
                      <p className="text-gray-400 text-sm mt-1">通过银行电汇转账，通常需要1-3个工作日</p>
                    </div>
                  </label>

                  <label className="flex items-center p-4 bg-gray-700/20 rounded-lg border border-gray-600/30 hover:border-cyan-500/30 transition-all duration-300 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="crypto"
                      checked={subscriptionData.paymentMethod === 'crypto'}
                      onChange={(e) => setSubscriptionData(prev => ({ ...prev, paymentMethod: e.target.value }))}
                      className="w-4 h-4 text-cyan-600 bg-gray-700 border-gray-600 focus:ring-cyan-500"
                    />
                    <div className="ml-3 flex-1">
                      <div className="flex items-center gap-2">
                        <Wallet className="h-5 w-5 text-gray-400" />
                        <span className="text-white font-medium">数字货币</span>
                      </div>
                      <p className="text-gray-400 text-sm mt-1">使用USDC或USDT支付，即时到账</p>
                    </div>
                  </label>
                </div>

                <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-yellow-400 font-medium mb-2">支付说明</h4>
                      <ul className="text-yellow-400 text-sm space-y-1">
                        <li>• 所有支付将在确认后的72小时冷静期后生效</li>
                        <li>• 支付完成后将收到确认邮件和代币分配通知</li>
                        <li>• 如有疑问请联系客服支持</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <FileText className="h-5 w-5" />
                文档确认
              </h3>
              
              <div className="space-y-6">
                <div className="space-y-4">
                  <label className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={subscriptionData.agreeTerms}
                      onChange={(e) => setSubscriptionData(prev => ({ ...prev, agreeTerms: e.target.checked }))}
                      className="w-4 h-4 text-cyan-500 bg-gray-700 border-gray-600 rounded focus:ring-cyan-500 mt-1"
                    />
                    <div>
                      <span className="text-white">我已阅读并同意</span>
                      <div className="flex gap-2 mt-1">
                        <button className="text-cyan-400 hover:text-cyan-300 text-sm underline">
                          认购协议
                        </button>
                        <span className="text-gray-400">和</span>
                        <button className="text-cyan-400 hover:text-cyan-300 text-sm underline">
                          服务条款
                        </button>
                      </div>
                    </div>
                  </label>

                  <label className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={subscriptionData.agreeRisk}
                      onChange={(e) => setSubscriptionData(prev => ({ ...prev, agreeRisk: e.target.checked }))}
                      className="w-4 h-4 text-cyan-500 bg-gray-700 border-gray-600 rounded focus:ring-cyan-500 mt-1"
                    />
                    <div>
                      <span className="text-white">我已阅读并理解</span>
                      <div className="flex gap-2 mt-1">
                        <button className="text-cyan-400 hover:text-cyan-300 text-sm underline">
                          风险披露书
                        </button>
                        <span className="text-gray-400">中的所有风险因素</span>
                      </div>
                    </div>
                  </label>
                </div>

                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-red-400 font-medium mb-2">重要风险提示</h4>
                      <ul className="text-red-400 text-sm space-y-1">
                        <li>• 本投资产品存在本金损失风险</li>
                        <li>• 预期收益不代表实际收益，可能低于预期</li>
                        <li>• 投资期间资金将被锁定，无法提前赎回</li>
                        <li>• 请根据自身风险承受能力谨慎投资</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                确认投资详情
              </h3>
              
              <div className="space-y-6">
                <div className="p-4 bg-gray-700/20 rounded-lg">
                  <h4 className="text-white font-medium mb-3">投资摘要</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">投资产品:</span>
                      <span className="text-white">{offerData.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">投资档次:</span>
                      <span className="text-white">{tranchesData.find(t => t.id === selectedTranche)?.name || '未选择'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">投资金额:</span>
                      <span className="text-white">${parseInt(subscriptionData.amount || '0').toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">预期年化收益:</span>
                      <span className="text-green-400">{tranchesData.find(t => t.id === selectedTranche)?.expectedReturn || offerData.expectedReturn}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">投资期限:</span>
                      <span className="text-white">{offerData.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">支付方式:</span>
                      <span className="text-white">
                        {subscriptionData.paymentMethod === 'wire' ? '银行电汇' : '数字货币'}
                      </span>
                    </div>
                  </div>
                </div>

                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={subscriptionData.confirmDetails}
                    onChange={(e) => setSubscriptionData(prev => ({ ...prev, confirmDetails: e.target.checked }))}
                    className="w-4 h-4 text-cyan-500 bg-gray-700 border-gray-600 rounded focus:ring-cyan-500 mt-1"
                  />
                  <span className="text-white">
                    我确认以上投资详情无误，并同意提交认购申请
                  </span>
                </label>

                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-blue-400 font-medium mb-2">后续流程</h4>
                      <ul className="text-blue-400 text-sm space-y-1">
                        <li>• 提交认购申请后进入72小时冷静期</li>
                        <li>• 冷静期结束后将收到支付指引</li>
                        <li>• 支付完成后代币将分配至您的钱包</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 6 && (
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-8 text-center">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">认购申请已提交</h3>
                <p className="text-gray-400 mb-6">
                  您的认购申请已成功提交，我们将在72小时冷静期后向您发送支付指引
                </p>
                <div className="flex gap-3 justify-center">
                  <Link
                    to="/invest/portfolio"
                    className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg font-medium hover:from-cyan-600 hover:to-purple-600 transition-all duration-300"
                  >
                    查看我的投资
                  </Link>
                  <Link
                    to="/invest"
                    className="px-6 py-3 border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    继续浏览
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          {currentStep < 6 && (
            <div className="flex justify-between mt-6">
              <button
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className="px-6 py-2 border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                上一步
              </button>
              <button
                onClick={handleNext}
                disabled={!isStepValid()}
                className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg font-medium hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {currentStep === 5 ? '提交认购' : '下一步'}
              </button>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Investment Summary */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">投资概览</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">产品名称:</span>
                <span className="text-white text-right">{offerData.name}</span>
              </div>
              {selectedTranche && (
                <div className="text-sm text-cyan-400 mt-1">
                  {tranchesData.find(t => t.id === selectedTranche)?.name}: {tranchesData.find(t => t.id === selectedTranche)?.expectedReturn}
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-400">投资期限:</span>
                <span className="text-white">{offerData.duration}</span>
              </div>
              {selectedTranche && (
                <div className="text-sm text-purple-400 mt-1">
                  已选择: {tranchesData.find(t => t.id === selectedTranche)?.name}
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-400">起投金额:</span>
                <span className="text-white">{offerData.minInvestment}</span>
              </div>
              {selectedTranche && (
                <div className="text-sm text-cyan-400 mt-1">
                  当前档次: ${tranchesData.find(t => t.id === selectedTranche)?.minInvestment.toLocaleString()}
                </div>
              )}
              {subscriptionData.amount && (
                <div className="flex justify-between pt-2 border-t border-gray-600/30">
                  <span className="text-gray-400">投资金额:</span>
                  <span className="text-white font-medium">
                    ${parseInt(subscriptionData.amount).toLocaleString()}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Support */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">需要帮助？</h3>
            <div className="space-y-3">
              <button className="w-full p-3 text-left bg-gray-700/20 hover:bg-gray-700/40 rounded-lg border border-gray-600/30 hover:border-cyan-500/30 transition-all duration-300">
                <div className="font-medium text-white">在线客服</div>
                <div className="text-gray-400 text-sm">实时解答您的疑问</div>
              </button>
              <button className="w-full p-3 text-left bg-gray-700/20 hover:bg-gray-700/40 rounded-lg border border-gray-600/30 hover:border-cyan-500/30 transition-all duration-300">
                <div className="font-medium text-white">投资指南</div>
                <div className="text-gray-400 text-sm">了解投资流程</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionFlow;