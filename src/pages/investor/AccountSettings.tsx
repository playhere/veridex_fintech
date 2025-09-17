import React, { useState } from 'react';
import { Save, User, Shield, Bell, CreditCard, Key, Globe, Eye, EyeOff, CheckCircle, AlertTriangle } from 'lucide-react';

const AccountSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [showApiKey, setShowApiKey] = useState(false);

  const tabs = [
    { id: 'profile', name: '个人资料', icon: User },
    { id: 'security', name: '安全设置', icon: Shield },
    { id: 'notifications', name: '通知偏好', icon: Bell },
    { id: 'payment', name: '支付方式', icon: CreditCard },
    { id: 'api', name: 'API访问', icon: Key },
    { id: 'preferences', name: '偏好设置', icon: Globe }
  ];

  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    company: 'Investment Group LLC',
    investorType: 'qualified',
    jurisdiction: 'US'
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorEnabled: true,
    emailVerified: true,
    phoneVerified: true,
    didVerified: true
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    marketingEmails: false
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            账户设置
          </h1>
          <p className="text-gray-400 mt-2">管理您的个人资料、安全设置和偏好</p>
        </div>
        
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors">
            重置设置
          </button>
          <button className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors flex items-center gap-2">
            <Save className="h-4 w-4" />
            保存更改
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-700">
        <nav className="flex space-x-8 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors whitespace-nowrap flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'border-cyan-500 text-cyan-400'
                    : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.name}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {activeTab === 'profile' && (
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
              <h3 className="text-lg font-semibold text-white mb-6">个人资料</h3>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">名</label>
                    <input
                      type="text"
                      value={profileData.firstName}
                      onChange={(e) => setProfileData(prev => ({ ...prev, firstName: e.target.value }))}
                      className="w-full px-3 py-2 bg-gray-700/30 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">姓</label>
                    <input
                      type="text"
                      value={profileData.lastName}
                      onChange={(e) => setProfileData(prev => ({ ...prev, lastName: e.target.value }))}
                      className="w-full px-3 py-2 bg-gray-700/30 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">邮箱地址</label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-700/30 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">电话号码</label>
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-700/30 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">公司名称</label>
                  <input
                    type="text"
                    value={profileData.company}
                    onChange={(e) => setProfileData(prev => ({ ...prev, company: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-700/30 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">投资者类型</label>
                    <select
                      value={profileData.investorType}
                      onChange={(e) => setProfileData(prev => ({ ...prev, investorType: e.target.value }))}
                      className="w-full px-3 py-2 bg-gray-700/30 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white"
                    >
                      <option value="qualified">合格投资者</option>
                      <option value="professional">专业投资者</option>
                      <option value="institutional">机构投资者</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">司法辖区</label>
                    <select
                      value={profileData.jurisdiction}
                      onChange={(e) => setProfileData(prev => ({ ...prev, jurisdiction: e.target.value }))}
                      className="w-full px-3 py-2 bg-gray-700/30 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white"
                    >
                      <option value="US">美国</option>
                      <option value="EU">欧盟</option>
                      <option value="SG">新加坡</option>
                      <option value="HK">香港</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
                <h3 className="text-lg font-semibold text-white mb-6">安全设置</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-700/20 rounded-lg">
                    <div>
                      <h4 className="text-white font-medium">双因素认证</h4>
                      <p className="text-gray-400 text-sm">为您的账户添加额外安全层</p>
                    </div>
                    <div className="flex items-center gap-3">
                      {securitySettings.twoFactorEnabled && (
                        <CheckCircle className="h-5 w-5 text-green-400" />
                      )}
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                          checked={securitySettings.twoFactorEnabled}
                          onChange={(e) => setSecuritySettings(prev => ({ ...prev, twoFactorEnabled: e.target.checked }))}
                        />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
                      </label>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-700/20 rounded-lg">
                    <div>
                      <h4 className="text-white font-medium">邮箱验证</h4>
                      <p className="text-gray-400 text-sm">验证您的邮箱地址</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <span className="text-green-400 text-sm">已验证</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-700/20 rounded-lg">
                    <div>
                      <h4 className="text-white font-medium">手机验证</h4>
                      <p className="text-gray-400 text-sm">验证您的手机号码</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <span className="text-green-400 text-sm">已验证</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-700/20 rounded-lg">
                    <div>
                      <h4 className="text-white font-medium">DID身份验证</h4>
                      <p className="text-gray-400 text-sm">去中心化身份验证</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <span className="text-green-400 text-sm">已验证</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">密码管理</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">当前密码</label>
                    <input
                      type="password"
                      className="w-full px-3 py-2 bg-gray-700/30 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white"
                      placeholder="输入当前密码"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">新密码</label>
                    <input
                      type="password"
                      className="w-full px-3 py-2 bg-gray-700/30 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white"
                      placeholder="输入新密码"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">确认新密码</label>
                    <input
                      type="password"
                      className="w-full px-3 py-2 bg-gray-700/30 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white"
                      placeholder="再次输入新密码"
                    />
                  </div>
                  <button className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors">
                    更新密码
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
              <h3 className="text-lg font-semibold text-white mb-6">通知偏好</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-700/20 rounded-lg">
                  <div>
                    <h4 className="text-white font-medium">邮件通知</h4>
                    <p className="text-gray-400 text-sm">接收重要账户和投资更新</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={notificationSettings.emailNotifications}
                      onChange={(e) => setNotificationSettings(prev => ({ ...prev, emailNotifications: e.target.checked }))}
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-700/20 rounded-lg">
                  <div>
                    <h4 className="text-white font-medium">短信通知</h4>
                    <p className="text-gray-400 text-sm">接收紧急安全警报</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={notificationSettings.smsNotifications}
                      onChange={(e) => setNotificationSettings(prev => ({ ...prev, smsNotifications: e.target.checked }))}
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-700/20 rounded-lg">
                  <div>
                    <h4 className="text-white font-medium">推送通知</h4>
                    <p className="text-gray-400 text-sm">浏览器推送通知</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={notificationSettings.pushNotifications}
                      onChange={(e) => setNotificationSettings(prev => ({ ...prev, pushNotifications: e.target.checked }))}
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-700/20 rounded-lg">
                  <div>
                    <h4 className="text-white font-medium">营销邮件</h4>
                    <p className="text-gray-400 text-sm">接收产品更新和市场资讯</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={notificationSettings.marketingEmails}
                      onChange={(e) => setNotificationSettings(prev => ({ ...prev, marketingEmails: e.target.checked }))}
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'api' && (
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
              <h3 className="text-lg font-semibold text-white mb-6">API访问</h3>
              
              <div className="space-y-6">
                <div className="p-4 bg-gray-700/20 rounded-lg border border-gray-600/30">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-medium">个人API密钥</h4>
                    <span className="px-2 py-1 rounded text-xs bg-green-500/20 text-green-400 border border-green-500/30">
                      活跃
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-gray-400 font-mono text-sm">
                      {showApiKey ? 'sk_live_51H7qYKj...' : '••••••••••••••••'}
                    </span>
                    <button
                      onClick={() => setShowApiKey(!showApiKey)}
                      className="p-1 hover:bg-gray-600 rounded"
                    >
                      {showApiKey ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}
                    </button>
                  </div>
                  <div className="text-sm text-gray-400">
                    创建时间: 2024-01-10 | 最后使用: 2024-01-15 14:30:22
                  </div>
                </div>

                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-blue-400 font-medium mb-2">API使用说明</h4>
                      <ul className="text-blue-400 text-sm space-y-1">
                        <li>• API密钥用于程序化访问您的投资数据</li>
                        <li>• 请妥善保管密钥，不要与他人分享</li>
                        <li>• 如发现异常使用请立即重新生成密钥</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg font-medium hover:from-cyan-600 hover:to-purple-600 transition-all duration-300">
                  重新生成密钥
                </button>
              </div>
            </div>
          )}

          {(activeTab === 'payment' || activeTab === 'preferences') && (
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-8 text-center">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  {activeTab === 'payment' ? <CreditCard className="h-8 w-8 text-white" /> : <Globe className="h-8 w-8 text-white" />}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {activeTab === 'payment' ? '支付方式管理' : '偏好设置'}
                </h3>
                <p className="text-gray-400 mb-6">
                  此功能模块正在开发中，敬请期待
                </p>
                <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg font-medium hover:from-cyan-600 hover:to-purple-600 transition-all duration-300">
                  敬请期待
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Account Status */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">账户状态</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span className="text-sm text-gray-300">邮箱已验证</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span className="text-sm text-gray-300">手机已验证</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span className="text-sm text-gray-300">DID身份已验证</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span className="text-sm text-gray-300">合格投资者认证</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">快捷操作</h3>
            <div className="space-y-3">
              <button className="w-full p-3 text-left bg-gray-700/20 hover:bg-gray-700/40 rounded-lg border border-gray-600/30 hover:border-cyan-500/30 transition-all duration-300">
                <div className="font-medium text-white">下载数据</div>
                <div className="text-gray-400 text-sm">导出账户数据</div>
              </button>
              <button className="w-full p-3 text-left bg-gray-700/20 hover:bg-gray-700/40 rounded-lg border border-gray-600/30 hover:border-cyan-500/30 transition-all duration-300">
                <div className="font-medium text-white">联系支持</div>
                <div className="text-gray-400 text-sm">获取帮助</div>
              </button>
              <button className="w-full p-3 text-left bg-red-500/20 hover:bg-red-500/30 rounded-lg border border-red-500/30 hover:border-red-500/50 transition-all duration-300">
                <div className="font-medium text-red-400">删除账户</div>
                <div className="text-red-400 text-sm">永久删除账户</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;