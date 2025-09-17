import React, { useState } from 'react';
import { Save, Key, Shield, Bell, Users, Globe, Database, RefreshCw, Eye, EyeOff } from 'lucide-react';

const IssuerSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('keys');
  const [showApiKey, setShowApiKey] = useState(false);

  const tabs = [
    { id: 'keys', name: '签名密钥', icon: Key },
    { id: 'compliance', name: '合规策略', icon: Shield },
    { id: 'notifications', name: '通知设置', icon: Bell },
    { id: 'users', name: '用户管理', icon: Users },
    { id: 'api', name: 'API配置', icon: Database },
    { id: 'regional', name: '地区设置', icon: Globe }
  ];

  const apiKeys = [
    {
      name: 'Production API Key',
      key: 'sk_live_51H7...',
      created: '2024-01-10',
      lastUsed: '2024-01-15 14:30:22',
      status: 'active'
    },
    {
      name: 'Sandbox API Key',
      key: 'sk_test_4eC3...',
      created: '2024-01-05',
      lastUsed: '2024-01-15 12:15:33',
      status: 'active'
    }
  ];

  const complianceRules = [
    {
      id: 'rule-001',
      name: '合格投资者验证',
      description: '要求所有投资者完成合格投资者认证',
      enabled: true,
      category: 'investor'
    },
    {
      id: 'rule-002',
      name: 'DID身份验证',
      description: '强制要求去中心化身份验证',
      enabled: true,
      category: 'identity'
    },
    {
      id: 'rule-003',
      name: '司法辖区限制',
      description: '限制特定司法辖区的投资者参与',
      enabled: false,
      category: 'jurisdiction'
    }
  ];

  const users = [
    {
      id: 'user-001',
      name: '张三',
      email: 'zhang.san@company.com',
      role: '资产管理员',
      status: 'active',
      lastLogin: '2024-01-15 14:30:22'
    },
    {
      id: 'user-002',
      name: '李四',
      email: 'li.si@company.com',
      role: '合规专员',
      status: 'active',
      lastLogin: '2024-01-15 10:15:33'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            后台设置
          </h1>
          <p className="text-gray-400 mt-2">管理系统配置、用户权限和合规策略</p>
        </div>
        
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            重置配置
          </button>
          <button className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors flex items-center gap-2">
            <Save className="h-4 w-4" />
            保存设置
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
      {activeTab === 'keys' && (
        <div className="space-y-6">
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">API密钥管理</h3>
            <div className="space-y-4">
              {apiKeys.map((key, index) => (
                <div key={index} className="p-4 bg-gray-700/20 rounded-lg border border-gray-600/30">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-medium">{key.name}</h4>
                    <span className={`px-2 py-1 rounded text-xs border ${
                      key.status === 'active' 
                        ? 'bg-green-500/20 text-green-400 border-green-500/30'
                        : 'bg-red-500/20 text-red-400 border-red-500/30'
                    }`}>
                      {key.status === 'active' ? '活跃' : '禁用'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-gray-400 font-mono text-sm">
                      {showApiKey ? key.key + '...' : '••••••••••••••••'}
                    </span>
                    <button
                      onClick={() => setShowApiKey(!showApiKey)}
                      className="p-1 hover:bg-gray-600 rounded"
                    >
                      {showApiKey ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}
                    </button>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <span>创建时间: {key.created}</span>
                    <span>最后使用: {key.lastUsed}</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-4 px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg font-medium hover:from-cyan-600 hover:to-purple-600 transition-all duration-300">
              生成新密钥
            </button>
          </div>
        </div>
      )}

      {activeTab === 'compliance' && (
        <div className="space-y-6">
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">合规策略库</h3>
            <div className="space-y-4">
              {complianceRules.map((rule) => (
                <div key={rule.id} className="p-4 bg-gray-700/20 rounded-lg border border-gray-600/30">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="text-white font-medium">{rule.name}</h4>
                      <p className="text-gray-400 text-sm">{rule.description}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        defaultChecked={rule.enabled}
                      />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
                    </label>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs ${
                    rule.category === 'investor' ? 'bg-blue-500/20 text-blue-400' :
                    rule.category === 'identity' ? 'bg-green-500/20 text-green-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {rule.category === 'investor' ? '投资者' : 
                     rule.category === 'identity' ? '身份验证' : '司法辖区'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="space-y-6">
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">用户管理</h3>
              <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg font-medium hover:from-cyan-600 hover:to-purple-600 transition-all duration-300">
                添加用户
              </button>
            </div>
            {/* Desktop Table */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700/20 border-b border-gray-600">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">用户</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">角色</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">状态</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">最后登录</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-600/30">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-700/20">
                      <td className="px-4 py-3">
                        <div>
                          <div className="text-white font-medium">{user.name}</div>
                          <div className="text-gray-400 text-sm">{user.email}</div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-300">{user.role}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded text-xs border ${
                          user.status === 'active' 
                            ? 'bg-green-500/20 text-green-400 border-green-500/30'
                            : 'bg-red-500/20 text-red-400 border-red-500/30'
                        }`}>
                          {user.status === 'active' ? '活跃' : '禁用'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-300">{user.lastLogin}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button className="text-cyan-400 hover:text-cyan-300 text-sm">编辑</button>
                          <button className="text-red-400 hover:text-red-300 text-sm">删除</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Mobile Cards */}
            <div className="lg:hidden divide-y divide-gray-600/30">
              {users.map((user) => (
                <div key={user.id} className="p-4 hover:bg-gray-700/20 transition-colors">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <div className="text-white font-medium">{user.name}</div>
                      <div className="text-gray-400 text-sm">{user.email}</div>
                      <div className="text-sm text-gray-300 mt-1">{user.role}</div>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-1 rounded text-xs border ${
                        user.status === 'active' 
                          ? 'bg-green-500/20 text-green-400 border-green-500/30'
                          : 'bg-red-500/20 text-red-400 border-red-500/30'
                      }`}>
                        {user.status === 'active' ? '活跃' : '禁用'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-400 mb-3">
                    最后登录: {user.lastLogin}
                  </div>
                  
                  <div className="flex gap-2">
                    <button className="flex-1 text-cyan-400 hover:text-cyan-300 text-sm py-2 px-3 border border-gray-600 rounded hover:bg-gray-800 transition-colors">
                      编辑
                    </button>
                    <button className="flex-1 text-red-400 hover:text-red-300 text-sm py-2 px-3 border border-red-500/30 rounded hover:bg-red-500/10 transition-colors">
                      删除
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {(activeTab === 'notifications' || activeTab === 'api' || activeTab === 'regional') && (
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-8 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
              {activeTab === 'notifications' ? <Bell className="h-8 w-8 text-white" /> :
               activeTab === 'api' ? <Database className="h-8 w-8 text-white" /> :
               <Globe className="h-8 w-8 text-white" />}
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              {activeTab === 'notifications' ? '通知设置' :
               activeTab === 'api' ? 'API配置' : '地区设置'}
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
  );
};

export default IssuerSettings;