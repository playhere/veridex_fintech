import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, TrendingUp, Layers, BarChart3, Zap, Globe } from 'lucide-react';

const HomePage: React.FC = () => {
  const features = [
    {
      icon: Layers,
      title: '资产证券化',
      description: '专业的资产池管理与结构化设计，支持多种资产类型的证券化'
    },
    {
      icon: Zap,
      title: '区块链代币化',
      description: '基于智能合约的资产代币化，确保透明度和可追溯性'
    },
    {
      icon: Shield,
      title: '合规框架',
      description: 'DID/VC身份验证与受限证券标准，满足全球监管要求'
    },
    {
      icon: BarChart3,
      title: '风险建模',
      description: '蒙特卡洛模拟与压力测试，提供专业的风险分析'
    },
    {
      icon: TrendingUp,
      title: '投资管理',
      description: '面向合格投资者的专业投资平台与流动性解决方案'
    },
    {
      icon: Globe,
      title: '全球合规',
      description: '支持多司法辖区的合规要求与跨境投资管理'
    }
  ];

  const stats = [
    { label: '资产管理规模', value: '$2.8B' },
    { label: '活跃资产池', value: '156' },
    { label: '注册投资者', value: '2,400+' },
    { label: '合规覆盖', value: '18国家/地区' }
  ];

  return (
    <div className="min-h-screen">
      

      {/* CTA Section */}
      <section className="px-6 py-20 lg:px-8 border-t border-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-8">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              私募信贷资产
            </span>
            <br />
            <span className="text-white">
              证券化与代币化平台
            </span>
          </h1>
          <h2 className="text-3xl lg:text-4xl font-bold mb-8">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              开始您的数字资产之旅
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 mb-12">
            无论您是寻求资产证券化的金融机构，还是寻找优质投资机会的合格投资者，
            我们的平台都能为您提供专业、安全、合规的解决方案
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700 flex-1 max-w-sm">
              <h3 className="text-lg font-semibold mb-3 text-cyan-400">资产发行方</h3>
              <p className="text-gray-300 mb-4 text-sm">
                专业的资产池管理、风险建模与代币化发行工具
              </p>
              <Link
                to="/issuer/dashboard"
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg font-semibold hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-cyan-500/25"
              >
                立即开始
              </Link>
            </div>

            
            <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700 flex-1 max-w-sm">
              <h3 className="text-lg font-semibold mb-3">合格投资者</h3>
              <p className="text-gray-300 mb-4 text-sm">
                透明的投资机会、专业的风险评估与便捷的资产管理
              </p>
              <Link
                to="/invest"
                className="px-8 py-4 border border-gray-600 rounded-lg font-semibold hover:bg-gray-800 transition-all duration-300 flex items-center justify-center"
              >
                浏览投资
              </Link>
            </div>

            

            <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700 flex-1 max-w-sm">
              <h3 className="text-lg font-semibold mb-3 text-purple-400">数字投行</h3>
              <p className="text-gray-300 mb-4 text-sm">
                承销管理、合规引擎、流动性做市与风险控制
              </p>
              <Link
                to="/token-banker/dashboard"
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-purple-500/25"
              >
                进入控制台
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-6 py-16 lg:px-8 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm lg:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                平台核心功能
              </span>
            </h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              整合传统金融与区块链技术，提供端到端的资产证券化与代币化解决方案
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="p-8 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center mb-6">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-white">{feature.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative px-6 py-20 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-800/20 to-transparent"></div>
        
        <div className="relative max-w-4xl mx-auto text-center">
          
          
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            为金融机构提供专业的资产证券化解决方案，结合区块链技术实现资产代币化，
            为合格投资者打造透明、合规的投资生态系统
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/issuer/dashboard"
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg font-semibold hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-cyan-500/25"
            >
              资产发行方入口
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>

            
             <Link
              to="/invest"    
              className="px-8 py-4 border border-gray-600 rounded-lg font-semibold hover:bg-gray-800 transition-all duration-300 flex items-center justify-center"
            >
              投资者入口
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            

            <Link
              to="/token-banker/dashboard"          
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-purple-500/25"
            >
              数字投行入口
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            
            
           
          </div>
        </div>
      </section>
      
    </div>
  );
};

export default HomePage;