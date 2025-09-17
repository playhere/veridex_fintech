import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, User, Building, CheckCircle } from 'lucide-react';

const SignupPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userType, setUserType] = useState<'individual' | 'institutional'>('individual');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    company: '',
    agreeTerms: false,
    agreePrivacy: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle registration logic
    console.log('Registration attempt:', formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
            创建账户
          </h1>
          <p className="text-gray-400">
            加入私募信贷资产证券化与代币化平台
          </p>
        </div>

        {/* User Type Selection */}
        <div className="flex mb-6 bg-gray-800/30 rounded-lg p-1">
          <button
            onClick={() => setUserType('individual')}
            className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
              userType === 'individual'
                ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <User className="h-4 w-4" />
            个人投资者
          </button>
          <button
            onClick={() => setUserType('institutional')}
            className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
              userType === 'institutional'
                ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Building className="h-4 w-4" />
            机构用户
          </button>
        </div>

        {/* Registration Form */}
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {userType === 'individual' ? '姓' : '联系人姓'}
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-gray-700/30 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white placeholder-gray-400"
                    placeholder="请输入姓"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {userType === 'individual' ? '名' : '联系人名'}
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-700/30 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white placeholder-gray-400"
                  placeholder="请输入名"
                  required
                />
              </div>
            </div>

            {/* Company Information (for institutional users) */}
            {userType === 'institutional' && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  机构名称
                </label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-gray-700/30 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white placeholder-gray-400"
                    placeholder="请输入机构全称"
                    required
                  />
                </div>
              </div>
            )}

            {/* Email */}
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
                  placeholder="输入您的邮箱地址"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    placeholder="设置密码"
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

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  确认密码
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full pl-10 pr-12 py-3 bg-gray-700/30 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white placeholder-gray-400"
                    placeholder="再次输入密码"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Password Requirements */}
            <div className="bg-gray-700/20 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-300 mb-2">密码要求：</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span className="text-gray-400">至少8个字符</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span className="text-gray-400">包含大小写字母</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span className="text-gray-400">包含数字</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span className="text-gray-400">包含特殊字符</span>
                </div>
              </div>
            </div>

            {/* Terms and Privacy */}
            <div className="space-y-3">
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={formData.agreeTerms}
                  onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                  className="w-4 h-4 text-cyan-500 bg-gray-700 border-gray-600 rounded focus:ring-cyan-500 mt-1"
                  required
                />
                <span className="text-sm text-gray-300">
                  我已阅读并同意{' '}
                  <Link to="/terms" className="text-cyan-400 hover:text-cyan-300">
                    服务条款
                  </Link>{' '}
                  和{' '}
                  <Link to="/privacy" className="text-cyan-400 hover:text-cyan-300">
                    隐私政策
                  </Link>
                </span>
              </label>

              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={formData.agreePrivacy}
                  onChange={(e) => setFormData({ ...formData, agreePrivacy: e.target.checked })}
                  className="w-4 h-4 text-cyan-500 bg-gray-700 border-gray-600 rounded focus:ring-cyan-500 mt-1"
                  required
                />
                <span className="text-sm text-gray-300">
                  我同意接收平台相关的重要通知和更新
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg font-medium hover:from-cyan-600 hover:to-purple-600 transition-all duration-300"
            >
              创建账户
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-gray-400">
            已有账户？{' '}
            <Link to="/login" className="text-cyan-400 hover:text-cyan-300 font-medium">
              立即登录
            </Link>
          </p>
        </div>

        {/* Compliance Notice */}
        <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
          <p className="text-yellow-400 text-sm text-center">
            ⚠️ 注册完成后，您需要完成身份验证和合格投资者认证才能参与投资
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;