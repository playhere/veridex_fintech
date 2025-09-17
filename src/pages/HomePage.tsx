import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, TrendingUp, Layers, BarChart3, Zap, Globe } from 'lucide-react';
import { Card, MetricCard } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      

      {/* CTA Section */}
      <section className="px-6 py-24 lg:px-8 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              私募信贷资产
            </span>
            <br />
            <span className="text-white">
              证券化与代币化平台
            </span>
          </h1>
          <h2 className="text-3xl lg:text-5xl font-bold mb-12 tracking-tight">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              开始您的数字资产之旅
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 mb-12">
            无论您是寻求资产证券化的金融机构，还是寻找优质投资机会的合格投资者，
            我们的平台都能为您提供专业、安全、合规的解决方案
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center max-w-5xl mx-auto">
            <Card hover gradient className="p-8 text-center">
              <h3 className="text-xl font-bold mb-4 text-cyan-400">资产发行方</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                专业的资产池管理、风险建模与代币化发行工具
              </p>
              <Link
                to="/issuer/dashboard"
                className="w-full px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl font-semibold hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl hover:shadow-cyan-500/25"
              >
                立即开始
              </Link>
            </Card>

            
            <Card hover gradient className="p-8 text-center">
              <h3 className="text-xl font-bold mb-4 text-white">合格投资者</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                透明的投资机会、专业的风险评估与便捷的资产管理
              </p>
              <Link
                to="/invest"
                className="w-full px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/30 backdrop-blur-xl rounded-xl font-semibold transition-all duration-300 flex items-center justify-center"
              >
                浏览投资
              </Link>
            </Card>

            

            <Card hover gradient className="p-8 text-center">
              <h3 className="text-xl font-bold mb-4 text-purple-400">数字投行</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                承销管理、合规引擎、流动性做市与风险控制
              </p>
              <Link
                to="/token-banker/dashboard"
                className="w-full px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl hover:shadow-purple-500/25"
              >
                进入控制台
              </Link>
            </Card>

          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-6 py-20 lg:px-8 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricCard
                key={index}
                title={stat.label}
                value={stat.value}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-24 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent"></div>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-8 tracking-tight">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                平台核心功能
              </span>
            </h2>
            <p className="text-gray-300 text-xl max-w-3xl mx-auto leading-relaxed">
              整合传统金融与区块链技术，提供端到端的资产证券化与代币化解决方案
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  hover
                  className="p-8 group"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-white">{feature.title}</h3>
                  <p className="text-gray-300 leading-relaxed text-sm">{feature.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative px-6 py-24 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent"></div>
        
        <div className="relative max-w-4xl mx-auto text-center">
          
          
          <p className="text-xl text-gray-300 mb-16 max-w-3xl mx-auto leading-relaxed">
            为金融机构提供专业的资产证券化解决方案，结合区块链技术实现资产代币化，
            为合格投资者打造透明、合规的投资生态系统
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-2xl mx-auto">
            <Button size="lg" className="flex items-center gap-3">
              <Link to="/issuer/dashboard" className="flex items-center gap-3">
                资产发行方入口
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="secondary" size="lg" className="flex items-center gap-3">
              <Link to="/invest" className="flex items-center gap-3">
                投资者入口
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            
            <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-xl hover:shadow-purple-500/25 flex items-center gap-3">
              <Link to="/token-banker/dashboard" className="flex items-center gap-3">
                数字投行入口
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            
            
           
          </div>
        </div>
      </section>
      
    </div>
  );
};

export default HomePage;