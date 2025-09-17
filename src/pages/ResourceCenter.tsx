import React, { useState } from 'react';
import { Search, Download, Play, FileText, Video, BookOpen, ExternalLink } from 'lucide-react';

const ResourceCenter: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: '全部资源', count: 24 },
    { id: 'whitepaper', name: '白皮书', count: 5 },
    { id: 'case-study', name: '案例研究', count: 8 },
    { id: 'glossary', name: '术语库', count: 6 },
    { id: 'tutorial', name: '操作演示', count: 5 }
  ];

  const resources = [
    {
      id: 'wp-001',
      title: '私募信贷资产证券化技术白皮书',
      description: '详细介绍资产证券化的技术架构、风险模型和合规框架',
      category: 'whitepaper',
      type: 'document',
      size: '2.8MB',
      downloadCount: 1247,
      featured: true
    },
    {
      id: 'cs-001',
      title: '消费信贷ABS成功案例分析',
      description: '深度解析某消费金融公司125M美元资产池的结构化设计',
      category: 'case-study',
      type: 'document',
      size: '1.5MB',
      downloadCount: 892,
      featured: true
    },
    {
      id: 'tut-001',
      title: '蒙特卡洛风险建模操作指南',
      description: '15分钟视频教程：如何使用平台进行风险压力测试',
      category: 'tutorial',
      type: 'video',
      duration: '15:32',
      viewCount: 2156,
      featured: true
    },
    {
      id: 'gl-001',
      title: 'DeFi资产证券化术语词典',
      description: '涵盖传统金融与区块链技术的专业术语解释',
      category: 'glossary',
      type: 'document',
      size: '0.9MB',
      downloadCount: 567,
      featured: false
    },
    {
      id: 'wp-002',
      title: 'ERC-3643受限证券标准解读',
      description: '合规代币化的技术标准与实施指南',
      category: 'whitepaper',
      type: 'document',
      size: '1.2MB',
      downloadCount: 734,
      featured: false
    },
    {
      id: 'cs-002',
      title: '绿色债券代币化项目案例',
      description: '210M美元绿色能源资产包的ESG合规与代币化实践',
      category: 'case-study',
      type: 'document',
      size: '2.1MB',
      downloadCount: 445,
      featured: false
    }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || resource.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredResources = resources.filter(resource => resource.featured);

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4">
          资源中心
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          深入了解私募信贷资产证券化与代币化的专业知识与最佳实践
        </p>
        
        {/* Search */}
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="搜索文档、案例、教程..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-gray-800/30 border border-gray-700 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white placeholder-gray-400 text-lg"
          />
        </div>
      </div>

      {/* Featured Resources */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6">精选资源</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {featuredResources.map((resource) => (
            <div
              key={resource.id}
              className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6 hover:border-cyan-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {resource.type === 'video' ? (
                    <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center">
                      <Play className="h-5 w-5 text-white" />
                    </div>
                  ) : (
                    <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <FileText className="h-5 w-5 text-white" />
                    </div>
                  )}
                  <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded border border-yellow-500/30">
                    精选
                  </span>
                </div>
                <ExternalLink className="h-4 w-4 text-gray-400" />
              </div>
              
              <h3 className="text-lg font-semibold text-white mb-2">{resource.title}</h3>
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">{resource.description}</p>
              
              <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                {resource.type === 'video' ? (
                  <>
                    <span>时长: {resource.duration}</span>
                    <span>{resource.viewCount} 次观看</span>
                  </>
                ) : (
                  <>
                    <span>大小: {resource.size}</span>
                    <span>{resource.downloadCount} 次下载</span>
                  </>
                )}
              </div>
              
              <button className="w-full px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg font-medium hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 flex items-center justify-center gap-2">
                {resource.type === 'video' ? (
                  <>
                    <Play className="h-4 w-4" />
                    观看视频
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4" />
                    下载文档
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Categories and Resources */}
      <section>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Categories Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <h3 className="text-lg font-semibold text-white mb-4">资源分类</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 ${
                    activeCategory === category.id
                      ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400 border border-cyan-500/30'
                      : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                  }`}
                >
                  <span>{category.name}</span>
                  <span className="text-sm bg-gray-700 px-2 py-1 rounded">{category.count}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Resources List */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">
                {activeCategory === 'all' ? '全部资源' : categories.find(c => c.id === activeCategory)?.name}
                <span className="text-gray-400 ml-2">({filteredResources.length})</span>
              </h3>
              
              <select className="px-3 py-2 bg-gray-800/30 border border-gray-700 rounded-lg text-white text-sm">
                <option>最新发布</option>
                <option>下载最多</option>
                <option>名称排序</option>
              </select>
            </div>

            <div className="space-y-4">
              {filteredResources.map((resource) => (
                <div
                  key={resource.id}
                  className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6 hover:border-cyan-500/30 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      {resource.type === 'video' ? (
                        <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center">
                          <Play className="h-6 w-6 text-white" />
                        </div>
                      ) : (
                        <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center">
                          <FileText className="h-6 w-6 text-white" />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-lg font-semibold text-white">{resource.title}</h4>
                        {resource.featured && (
                          <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded border border-yellow-500/30">
                            精选
                          </span>
                        )}
                      </div>
                      
                      <p className="text-gray-400 mb-3">{resource.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          {resource.type === 'video' ? (
                            <>
                              <span>时长: {resource.duration}</span>
                              <span>{resource.viewCount} 次观看</span>
                            </>
                          ) : (
                            <>
                              <span>大小: {resource.size}</span>
                              <span>{resource.downloadCount} 次下载</span>
                            </>
                          )}
                        </div>
                        
                        <button className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors flex items-center gap-2">
                          {resource.type === 'video' ? (
                            <>
                              <Play className="h-4 w-4" />
                              观看
                            </>
                          ) : (
                            <>
                              <Download className="h-4 w-4" />
                              下载
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResourceCenter;