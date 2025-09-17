import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Wallet, Chrome } from 'lucide-react';

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'email' | 'wallet' | 'sso'>('email');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic
    console.log('Login attempt:', formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
            登录平台
          </h1>
          <p className="text-gray-400">
            访问您的私募信贷资产证券化账户
          </p>
        </div>

        {/* Login Method Tabs */}
        <div className="flex mb-6 bg-gray-800/30 rounded-lg p-1">
          <button
            onClick={() => setLoginMethod('email')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
              loginMethod === 'email'
                ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            邮箱登录
          </button>
          <button
            onClick={() => setLoginMethod('wallet')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
              loginMethod === 'wallet'
                ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            钱包连接
          </button>
          <button
            onClick={() => setLoginMethod('sso')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
              loginMethod === 'sso'
                ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            SSO
          </button>
        </div>

        {/* Login Form */}
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
          {loginMethod === 'email' && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  邮箱地址
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-gray-700/30 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white placeholder-gray-400"
                    placeholder="输入您的邮箱"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  密码
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-10 pr-12 py-3 bg-gray-700/30 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white placeholder-gray-400"
                    placeholder="输入您的密码"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-cyan-500 bg-gray-700 border-gray-600 rounded focus:ring-cyan-500"
                  />
                  <span className="ml-2 text-sm text-gray-300">记住我</span>
                </label>
                <Link to="/forgot-password" className="text-sm text-cyan-400 hover:text-cyan-300">
                  忘记密码？
                </Link>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg font-medium hover:from-cyan-600 hover:to-purple-600 transition-all duration-300"
              >
                登录
              </button>
            </form>
          )}

          {loginMethod === 'wallet' && (
            <div className="space-y-4">
              <p className="text-gray-400 text-center mb-6">
                连接您的数字钱包以访问平台
              </p>
              
              <div className="space-y-3">
                <button className="w-full p-4 bg-gray-700/30 border border-gray-600 rounded-lg hover:border-cyan-500/50 transition-all duration-300 flex items-center gap-3">
                  <Wallet className="h-6 w-6 text-orange-400" />
                  <div className="text-left">
                    <div className="text-white font-medium">MetaMask</div>
                    <div className="text-gray-400 text-sm">连接 MetaMask 钱包</div>
                  </div>
                </button>
                
                <button className="w-full p-4 bg-gray-700/30 border border-gray-600 rounded-lg hover:border-cyan-500/50 transition-all duration-300 flex items-center gap-3">
                  <Wallet className="h-6 w-6 text-blue-400" />
                  <div className="text-left">
                    <div className="text-white font-medium">WalletConnect</div>
                    <div className="text-gray-400 text-sm">扫码连接移动钱包</div>
                  </div>
                </button>
                
                <button className="w-full p-4 bg-gray-700/30 border border-gray-600 rounded-lg hover:border-cyan-500/50 transition-all duration-300 flex items-center gap-3">
                  <Wallet className="h-6 w-6 text-purple-400" />
                  <div className="text-left">
                    <div className="text-white font-medium">Coinbase Wallet</div>
                    <div className="text-gray-400 text-sm">连接 Coinbase 钱包</div>
                  </div>
                </button>
              </div>
            </div>
          )}

          {loginMethod === 'sso' && (
            <div className="space-y-4">
              <p className="text-gray-400 text-center mb-6">
                使用企业单点登录系统
              </p>
              
              <div className="space-y-3">
                <button className="w-full p-4 bg-gray-700/30 border border-gray-600 rounded-lg hover:border-cyan-500/50 transition-all duration-300 flex items-center gap-3">
                  <Chrome className="h-6 w-6 text-blue-400" />
                  <div className="text-left">
                    <div className="text-white font-medium">Google SSO</div>
                    <div className="text-gray-400 text-sm">使用 Google 企业账户登录</div>
                  </div>
                </button>
                
                <button className="w-full p-4 bg-gray-700/30 border border-gray-600 rounded-lg hover:border-cyan-500/50 transition-all duration-300 flex items-center gap-3">
                  <Chrome className="h-6 w-6 text-blue-600" />
                  <div className="text-left">
                    <div className="text-white font-medium">Microsoft SSO</div>
                    <div className="text-gray-400 text-sm">使用 Microsoft 企业账户登录</div>
                  </div>
                </button>
                
                <button className="w-full p-4 bg-gray-700/30 border border-gray-600 rounded-lg hover:border-cyan-500/50 transition-all duration-300 flex items-center gap-3">
                  <Chrome className="h-6 w-6 text-gray-400" />
                  <div className="text-left">
                    <div className="text-white font-medium">SAML SSO</div>
                    <div className="text-gray-400 text-sm">企业 SAML 身份提供商</div>
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-gray-400">
            还没有账户？{' '}
            <Link to="/signup" className="text-cyan-400 hover:text-cyan-300 font-medium">
              立即注册
            </Link>
          </p>
        </div>

        {/* Security Notice */}
        <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <p className="text-blue-400 text-sm text-center">
            🔒 您的登录信息通过端到端加密保护，符合金融级安全标准
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;