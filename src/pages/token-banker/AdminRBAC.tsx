import React, { useState } from 'react';
import { 
  Users, 
  Shield, 
  Key, 
  Eye,
  Plus,
  Search,
  Filter,
  Settings,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  Clock,
  Edit,
  Trash2
} from 'lucide-react';

const AdminRBAC: React.FC = () => {
  const [activeTab, setActiveTab] = useState('roles');

  const roles = [
    {
      id: 'role-001',
      name: '承销经理',
      description: '管理承销项目和簿记建档',
      permissions: ['underwriting.read', 'underwriting.write', 'bookbuild.manage'],
      userCount: 3,
      status: 'active',
      lastModified: '2024-01-10',
      riskLevel: 'high'
    },
    {
      id: 'role-002',
      name: '合规专员',
      description: 'KYC/KYB审核和合规监控',
      permissions: ['compliance.read', 'compliance.write', 'kyc.approve', 'kyc.reject'],
      userCount: 5,
      status: 'active',
      lastModified: '2024-01-08',
      riskLevel: 'high'
    },
    {
      id: 'role-003',
      name: '流动性管理员',
      description: '管理做市池和流动性参数',
      permissions: ['liquidity.read', 'liquidity.write', 'pools.manage'],
      userCount: 2,
      status: 'active',
      lastModified: '2024-01-12',
      riskLevel: 'medium'
    },
    {
      id: 'role-004',
      name: '财务审批员',
      description: '多签钱包交易审批',
      permissions: ['treasury.read', 'treasury.approve', 'payments.sign'],
      userCount: 4,
      status: 'active',
      lastModified: '2024-01-05',
      riskLevel: 'high'
    }
  ];

  const users = [
    {
      id: 'user-001',
      name: 'Alice Johnson',
      email: 'alice@platform.com',
      role: '承销经理',
      status: 'active',
      lastLogin: '2024-01-15 14:30:22',
      loginCount: 247,
      permissions: 15,
      mfaEnabled: true,
      riskScore: 'low'
    },
    {
      id: 'user-002',
      name: 'Bob Smith',
      email: 'bob@platform.com',
      role: '合规专员',
      status: 'active',
      lastLogin: '2024-01-15 13:45:18',
      loginCount: 189,
      permissions: 12,
      mfaEnabled: true,
      riskScore: 'low'
    },
    {
      id: 'user-003',
      name: 'Carol Chen',
      email: 'carol@platform.com',
      role: '财务审批员',
      status: 'active',
      lastLogin: '2024-01-15 10:15:33',
      loginCount: 156,
      permissions: 8,
      mfaEnabled: false,
      riskScore: 'medium'
    }
  ];

  const auditLogs = [
    {
      id: 'log-001',
      timestamp: '2024-01-15 14:30:22',
      user: 'alice@platform.com',
      action: 'Role Permission Modified',
      target: '承销经理角色',
      details: 'Added bookbuild.allocate permission',
      riskLevel: 'medium',
      ipAddress: '192.168.1.100'
    },
    {
      id: 'log-002',
      timestamp: '2024-01-15 13:45:18',
      user: 'bob@platform.com',
      action: 'User Status Changed',
      target: 'carol@platform.com',
      details: 'Disabled MFA requirement temporarily',
      riskLevel: 'high',
      ipAddress: '192.168.1.101'
    },
    {
      id: 'log-003',
      timestamp: '2024-01-15 12:15:33',
      user: 'system',
      action: 'Failed Login Attempt',
      target: 'unknown@external.com',
      details: 'Multiple failed login attempts detected',
      riskLevel: 'high',
      ipAddress: '203.0.113.1'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusMap = {
      'active': { label: '活跃', color: 'bg-green-500/20 text-green-400 border-green-500/30' },
      'inactive': { label: '停用', color: 'bg-red-500/20 text-red-400 border-red-500/30' },
      'suspended': { label: '暂停', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' }
    };
    
    const statusInfo = statusMap[status as keyof typeof statusMap];
    return (
      <span className={`px-2 py-1 rounded text-xs border ${statusInfo.color}`}>
        {statusInfo.label}
      </span>
    );
  };

  const getRiskLevelColor = (level: string) => {
    const colorMap = {
      'low': 'text-green-400',
      'medium': 'text-yellow-400',
      'high': 'text-red-400'
    };
    return colorMap[level as keyof typeof colorMap] || 'text-gray-400';
  };

  const tabs = [
    { id: 'roles', name: '角色管理', count: roles.length },
    { id: 'users', name: '用户管理', count: users.filter(u => !u.mfaEnabled).length },
    { id: 'permissions', name: '权限矩阵', count: null },
    { id: 'audit', name: '操作审计', count: auditLogs.filter(l => l.riskLevel === 'high').length }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            管理员与权限控制
          </h1>
          <p className="text-gray-400 mt-2">全局角色、权限管理与操作审计的统一平台</p>
        </div>
        
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            刷新数据
          </button>
          <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center gap-2">
            <Plus className="h-4 w-4" />
            新建角色
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
          <div className="flex items-center mb-3">
            <Shield className="h-5 w-5 text-blue-400 mr-2" />
            <span className="text-sm text-gray-400">活跃角色</span>
          </div>
          <div className="text-2xl font-bold text-blue-400">{roles.filter(r => r.status === 'active').length}</div>
        </div>
        
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
          <div className="flex items-center mb-3">
            <Users className="h-5 w-5 text-green-400 mr-2" />
            <span className="text-sm text-gray-400">活跃用户</span>
          </div>
          <div className="text-2xl font-bold text-green-400">{users.filter(u => u.status === 'active').length}</div>
        </div>
        
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
          <div className="flex items-center mb-3">
            <AlertTriangle className="h-5 w-5 text-yellow-400 mr-2" />
            <span className="text-sm text-gray-400">MFA未启用</span>
          </div>
          <div className="text-2xl font-bold text-yellow-400">{users.filter(u => !u.mfaEnabled).length}</div>
        </div>
        
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
          <div className="flex items-center mb-3">
            <Eye className="h-5 w-5 text-purple-400 mr-2" />
            <span className="text-sm text-gray-400">今日操作</span>
          </div>
          <div className="text-2xl font-bold text-purple-400">127</div>
          <div className="text-sm text-gray-400 mt-1">审计记录</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-700">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-purple-500 text-purple-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
              }`}
            >
              {tab.name}
              {tab.count !== null && tab.count > 0 && (
                <span className="ml-2 px-2 py-1 text-xs bg-red-500 text-white rounded-full">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'roles' && (
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700/20 border-b border-gray-600">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">角色名称</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">描述</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">权限数</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">用户数</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">风险等级</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">状态</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-600/30">
                {roles.map((role) => (
                  <tr key={role.id} className="hover:bg-gray-700/20 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-white">{role.name}</div>
                      <div className="text-sm text-gray-400">更新: {role.lastModified}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-300">{role.description}</td>
                    <td className="px-6 py-4 text-purple-400">{role.permissions.length}</td>
                    <td className="px-6 py-4 text-white">{role.userCount}</td>
                    <td className="px-6 py-4">
                      <span className={`font-medium ${getRiskLevelColor(role.riskLevel)}`}>
                        {role.riskLevel === 'high' ? '高风险' : 
                         role.riskLevel === 'medium' ? '中风险' : '低风险'}
                      </span>
                    </td>
                    <td className="px-6 py-4">{getStatusBadge(role.status)}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button className="text-purple-400 hover:text-purple-300 text-sm flex items-center gap-1">
                          <Edit className="h-3 w-3" />
                          编辑
                        </button>
                        <button className="text-red-400 hover:text-red-300 text-sm flex items-center gap-1">
                          <Trash2 className="h-3 w-3" />
                          删除
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700/20 border-b border-gray-600">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">用户</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">角色</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">权限数</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">MFA</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">风险评分</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">最后登录</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">状态</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-600/30">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-700/20 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-white">{user.name}</div>
                        <div className="text-sm text-gray-400">{user.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-300">{user.role}</td>
                    <td className="px-6 py-4 text-purple-400">{user.permissions}</td>
                    <td className="px-6 py-4">
                      {user.mfaEnabled ? (
                        <CheckCircle className="h-4 w-4 text-green-400" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 text-red-400" />
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`font-medium ${getRiskLevelColor(user.riskScore)}`}>
                        {user.riskScore === 'high' ? '高风险' : 
                         user.riskScore === 'medium' ? '中风险' : '低风险'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-300">{user.lastLogin}</td>
                    <td className="px-6 py-4">{getStatusBadge(user.status)}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button className="text-purple-400 hover:text-purple-300 text-sm flex items-center gap-1">
                          <Edit className="h-3 w-3" />
                          编辑
                        </button>
                        <button className="text-gray-400 hover:text-gray-300 text-sm flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          详情
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'permissions' && (
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-8 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Key className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">权限矩阵</h3>
            <p className="text-gray-400 mb-6">
              详细权限矩阵管理功能正在开发中，敬请期待
            </p>
            <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300">
              敬请期待
            </button>
          </div>
        </div>
      )}

      {activeTab === 'audit' && (
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden">
          <div className="p-6 border-b border-gray-600/30">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-white">操作审计日志</h3>
              <div className="flex gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="搜索操作记录..."
                    className="pl-10 pr-4 py-2 bg-gray-700/30 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400"
                  />
                </div>
                <button className="px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  筛选
                </button>
              </div>
            </div>
          </div>
          
          <div className="divide-y divide-gray-600/30">
            {auditLogs.map((log) => (
              <div key={log.id} className="p-6 hover:bg-gray-700/20 transition-colors">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-white font-medium">{log.action}</h4>
                      <span className={`px-2 py-1 rounded text-xs border ${
                        log.riskLevel === 'high' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                        log.riskLevel === 'medium' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                        'bg-green-500/20 text-green-400 border-green-500/30'
                      }`}>
                        {log.riskLevel === 'high' ? '高风险' : 
                         log.riskLevel === 'medium' ? '中风险' : '低风险'}
                      </span>
                    </div>
                    <div className="text-gray-400 text-sm mb-1">目标: {log.target}</div>
                    <div className="text-gray-300 text-sm">{log.details}</div>
                  </div>
                  <div className="text-right text-sm text-gray-400">
                    <div>{log.timestamp}</div>
                    <div className="text-xs mt-1">IP: {log.ipAddress}</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">操作人: {log.user}</span>
                  <button className="text-purple-400 hover:text-purple-300 flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    查看详情
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminRBAC;