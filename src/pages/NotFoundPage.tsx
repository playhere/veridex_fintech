import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search, HelpCircle } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  const quickLinks = [
    { name: '首页', href: '/', icon: Home, description: '返回平台首页' },
    { name: '资产管理', href: '/issuer/dashboard', icon: Search, description: '查看资产管理概览' },
    { name: '投资市场', href: '/invest', icon: Search, description: '浏览投资标的' },
    { name: '帮助中心', href: '/resources', icon: HelpCircle, description: '获取帮助和文档' }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Visual */}
        <div className="mb-8">
          <div className="text-8xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4">
            404
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">
            页面未找到
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            抱歉，您访问的页面不存在或已被移动
          </p>
        </div>

        {/* Error Details */}
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6 mb-8">
          <h2 className="text-lg font-semibold text-white mb-4">可能的原因：</h2>
          <div className="text-left space-y-2 text-gray-400">
            <div className="flex items-start gap-2">
              <span className="text-cyan-400 mt-1">•</span>
              <span>URL地址输入错误</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-cyan-400 mt-1">•</span>
              <span>页面已被移动或删除</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-cyan-400 mt-1">•</span>
              <span>您没有访问该页面的权限</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-cyan-400 mt-1">•</span>
              <span>链接已过期或无效</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-6">快速导航</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <Link
                  key={index}
                  to={link.href}
                  className="p-4 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 text-left"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <Icon className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-white font-medium">{link.name}</span>
                  </div>
                  <p className="text-gray-400 text-sm">{link.description}</p>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Back Button */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
          >
            <ArrowLeft className="h-5 w-5" />
            返回上一页
          </button>
          
          <Link
            to="/"
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg font-medium hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Home className="h-5 w-5" />
            返回首页
          </Link>
        </div>

        {/* Support Info */}
        <div className="mt-12 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <p className="text-blue-400 text-sm">
            如果您认为这是一个错误，请联系我们的技术支持团队：
            <a href="mailto:support@platform.com" className="ml-1 underline hover:no-underline">
              support@platform.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;