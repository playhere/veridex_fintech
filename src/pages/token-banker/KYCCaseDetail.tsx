import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  FileText, 
  AlertTriangle, 
  CheckCircle, 
  X, 
  Download,
  Eye,
  Shield,
  Clock,
  User,
  Building,
  Flag,
  Search
} from 'lucide-react';

const KYCCaseDetail: React.FC = () => {
  const { id } = useParams();
  const [decision, setDecision] = useState<'approve' | 'reject' | null>(null);
  const [notes, setNotes] = useState('');

  const caseData = {
    id: 'kyc-001',
    applicantName: 'John Smith',
    applicantType: 'individual',
    submissionDate: '2024-01-15 09:30:22',
    status: 'pending_review',
    riskScore: 'medium',
    jurisdiction: 'US',
    investorType: 'qualified',
    email: 'john.smith@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, New York, NY 10001',
    nationality: 'US',
    dateOfBirth: '1985-03-15',
    occupation: 'Investment Manager',
    employer: 'Investment Group LLC',
    annualIncome: '$500,000',
    netWorth: '$2,500,000',
    investmentExperience: 'Professional',
    assignedTo: 'Compliance Officer A',
    priority: 'high'
  };

  const documents = [
    {
      id: 'doc-001',
      name: 'Government ID (Passport)',
      type: 'identity',
      status: 'verified',
      uploadDate: '2024-01-15 09:30:22',
      size: '2.1MB',
      hash: 'sha256:a1b2c3...'
    },
    {
      id: 'doc-002',
      name: 'Proof of Address',
      type: 'address',
      status: 'verified',
      uploadDate: '2024-01-15 09:32:15',
      size: '1.8MB',
      hash: 'sha256:d4e5f6...'
    },
    {
      id: 'doc-003',
      name: 'Income Verification',
      type: 'financial',
      status: 'flagged',
      uploadDate: '2024-01-15 09:35:08',
      size: '3.2MB',
      hash: 'sha256:g7h8i9...',
      flagReason: 'Income amount inconsistent with tax documents'
    },
    {
      id: 'doc-004',
      name: 'Investment Experience Certificate',
      type: 'qualification',
      status: 'pending',
      uploadDate: '2024-01-15 09:38:45',
      size: '1.5MB',
      hash: 'sha256:j0k1l2...'
    }
  ];

  const externalChecks = [
    {
      provider: 'OFAC Sanctions List',
      status: 'clear',
      lastCheck: '2024-01-15 10:15:22',
      result: 'No matches found'
    },
    {
      provider: 'PEP Database',
      status: 'clear',
      lastCheck: '2024-01-15 10:15:25',
      result: 'No PEP status detected'
    },
    {
      provider: 'Credit Bureau',
      status: 'flagged',
      lastCheck: '2024-01-15 10:15:28',
      result: 'Credit score: 720 (Good)'
    },
    {
      provider: 'Adverse Media',
      status: 'clear',
      lastCheck: '2024-01-15 10:15:31',
      result: 'No adverse media found'
    }
  ];

  const auditTrail = [
    {
      timestamp: '2024-01-15 09:30:22',
      action: 'Case Created',
      user: 'System',
      details: 'KYC application submitted by applicant'
    },
    {
      timestamp: '2024-01-15 09:45:15',
      action: 'Document Verification',
      user: 'Auto Verification',
      details: 'Government ID and address proof verified'
    },
    {
      timestamp: '2024-01-15 10:15:22',
      action: 'External Checks',
      user: 'Compliance Engine',
      details: 'OFAC, PEP, and credit checks completed'
    },
    {
      timestamp: '2024-01-15 10:30:45',
      action: 'Manual Review Required',
      user: 'System',
      details: 'Income verification flagged for manual review'
    }
  ];

  const getDocumentStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'flagged':
        return <AlertTriangle className="h-4 w-4 text-red-400" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-400" />;
      default:
        return <FileText className="h-4 w-4 text-gray-400" />;
    }
  };

  const getCheckStatusIcon = (status: string) => {
    switch (status) {
      case 'clear':
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'flagged':
        return <AlertTriangle className="h-4 w-4 text-yellow-400" />;
      case 'failed':
        return <X className="h-4 w-4 text-red-400" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <Link
            to="/token-banker/compliance"
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white">KYC案例详情</h1>
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
              <span>案例ID: {caseData.id}</span>
              <span>•</span>
              <span>提交时间: {caseData.submissionDate}</span>
              <span>•</span>
              <span>负责人: {caseData.assignedTo}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button className="px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors">
            转交案例
          </button>
          <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors">
            请求补充材料
          </button>
        </div>
      </div>

      {/* Case Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Applicant Information */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              {caseData.applicantType === 'individual' ? <User className="h-5 w-5" /> : <Building className="h-5 w-5" />}
              申请人信息
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">姓名:</span>
                  <span className="text-white">{caseData.applicantName}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">邮箱:</span>
                  <span className="text-white">{caseData.email}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">电话:</span>
                  <span className="text-white">{caseData.phone}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">国籍:</span>
                  <span className="text-white">{caseData.nationality}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">出生日期:</span>
                  <span className="text-white">{caseData.dateOfBirth}</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">职业:</span>
                  <span className="text-white">{caseData.occupation}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">雇主:</span>
                  <span className="text-white">{caseData.employer}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">年收入:</span>
                  <span className="text-white">{caseData.annualIncome}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">净资产:</span>
                  <span className="text-white">{caseData.netWorth}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">投资经验:</span>
                  <span className="text-white">{caseData.investmentExperience}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Documents Review */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">文档审核</h3>
            
            <div className="space-y-4">
              {documents.map((doc) => (
                <div key={doc.id} className="p-4 bg-gray-700/20 rounded-lg border border-gray-600/30">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      {getDocumentStatusIcon(doc.status)}
                      <div>
                        <h4 className="text-white font-medium">{doc.name}</h4>
                        <div className="text-gray-400 text-sm">{doc.type} • {doc.size} • {doc.uploadDate}</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-1 hover:bg-gray-600 rounded text-gray-400 hover:text-white">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-1 hover:bg-gray-600 rounded text-gray-400 hover:text-white">
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  {doc.flagReason && (
                    <div className="mt-2 p-2 bg-red-500/10 border border-red-500/20 rounded text-sm text-red-400">
                      标记原因: {doc.flagReason}
                    </div>
                  )}
                  
                  <div className="mt-2 text-xs text-gray-500 font-mono">
                    哈希: {doc.hash}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* External Checks */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">外部数据查询</h3>
            
            <div className="space-y-3">
              {externalChecks.map((check, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-700/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    {getCheckStatusIcon(check.status)}
                    <div>
                      <div className="text-white font-medium">{check.provider}</div>
                      <div className="text-gray-400 text-sm">{check.result}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-gray-400 text-sm">{check.lastCheck}</div>
                    <button className="text-purple-400 hover:text-purple-300 text-sm">
                      重新查询
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Case Status */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">案例状态</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">当前状态:</span>
                <span className="px-2 py-1 rounded text-xs bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                  待审核
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-400">风险评分:</span>
                <span className="text-yellow-400 font-medium">中风险</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-400">优先级:</span>
                <span className="text-red-400 font-medium">高</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-400">处理时间:</span>
                <span className="text-white">2小时 15分钟</span>
              </div>
            </div>
          </div>

          {/* Decision Panel */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">审核决定</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="flex items-center p-3 bg-gray-700/20 rounded-lg border border-gray-600/30 hover:border-green-500/30 transition-all duration-300 cursor-pointer">
                  <input
                    type="radio"
                    name="decision"
                    value="approve"
                    checked={decision === 'approve'}
                    onChange={(e) => setDecision(e.target.value as 'approve')}
                    className="w-4 h-4 text-green-600 bg-gray-700 border-gray-600 focus:ring-green-500"
                  />
                  <div className="ml-3">
                    <div className="text-green-400 font-medium">批准通过</div>
                    <div className="text-gray-400 text-sm">申请人符合所有要求</div>
                  </div>
                </label>

                <label className="flex items-center p-3 bg-gray-700/20 rounded-lg border border-gray-600/30 hover:border-red-500/30 transition-all duration-300 cursor-pointer">
                  <input
                    type="radio"
                    name="decision"
                    value="reject"
                    checked={decision === 'reject'}
                    onChange={(e) => setDecision(e.target.value as 'reject')}
                    className="w-4 h-4 text-red-600 bg-gray-700 border-gray-600 focus:ring-red-500"
                  />
                  <div className="ml-3">
                    <div className="text-red-400 font-medium">拒绝申请</div>
                    <div className="text-gray-400 text-sm">申请人不符合要求</div>
                  </div>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">审核备注</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 bg-gray-700/30 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400"
                  placeholder="请输入审核意见和理由..."
                />
              </div>

              <button
                disabled={!decision}
                className="w-full px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                提交审核决定
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">快捷操作</h3>
            <div className="space-y-3">
              <button className="w-full p-3 text-left bg-gray-700/20 hover:bg-gray-700/40 rounded-lg border border-gray-600/30 hover:border-purple-500/30 transition-all duration-300">
                <div className="font-medium text-white">请求补充材料</div>
                <div className="text-gray-400 text-sm">向申请人发送补充要求</div>
              </button>
              <button className="w-full p-3 text-left bg-gray-700/20 hover:bg-gray-700/40 rounded-lg border border-gray-600/30 hover:border-purple-500/30 transition-all duration-300">
                <div className="font-medium text-white">升级至高级审核</div>
                <div className="text-gray-400 text-sm">转交给高级合规官</div>
              </button>
              <button className="w-full p-3 text-left bg-gray-700/20 hover:bg-gray-700/40 rounded-lg border border-gray-600/30 hover:border-purple-500/30 transition-all duration-300">
                <div className="font-medium text-white">生成SAR报告</div>
                <div className="text-gray-400 text-sm">可疑活动报告</div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Audit Trail */}
      <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">审计轨迹</h3>
        
        <div className="space-y-3">
          {auditTrail.map((entry, index) => (
            <div key={index} className="flex items-start gap-4 p-3 bg-gray-700/20 rounded-lg">
              <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-white font-medium">{entry.action}</span>
                  <span className="text-gray-400 text-sm">{entry.timestamp}</span>
                </div>
                <div className="text-gray-400 text-sm">{entry.details}</div>
                <div className="text-gray-500 text-xs mt-1">操作人: {entry.user}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KYCCaseDetail;