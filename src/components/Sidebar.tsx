import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import LoginModal from './LoginModal';
import { 
  Home, 
  BarChart3, 
  Layers, 
  TrendingUp, 
  Shield, 
  Settings,
  Menu,
  X,
  Hexagon
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const [showLoginModal, setShowLoginModal] = React.useState(false);

  // Determine user role based on current path
  const isIssuer = location.pathname.startsWith('/issuer') || location.pathname.startsWith('/servicer');
  const isInvestor = location.pathname.startsWith('/invest') || location.pathname.startsWith('/account');
  const isTokenBanker = location.pathname.startsWith('/token-banker');

  const issuerNavigation = [
    { name: '首页', href: '/', icon: Home },
    { name: '资产概览', href: '/issuer/dashboard', icon: BarChart3 },
    { name: '资产池管理', href: '/issuer/pools', icon: Layers },
    { name: '服务商工作台', href: '/servicer', icon: Settings },
    { name: '资产服务报告', href: '/servicer/reports', icon: TrendingUp },
    { name: '后台设置', href: '/issuer/settings', icon: Shield },
  ];

  const investorNavigation = [
    { name: '首页', href: '/', icon: Home },
    { name: '标的广场', href: '/invest', icon: TrendingUp },
    { name: '我的投资', href: '/invest/portfolio', icon: Shield },
    { name: '合规转让', href: '/invest/liquidity', icon: Layers },
    { name: '账户设置', href: '/account', icon: Settings },
  ];

  const tokenBankerNavigation = [
    { name: '首页', href: '/', icon: Home },
    { name: '控制台', href: '/token-banker/dashboard', icon: BarChart3 },
    { name: '承销管理', href: '/token-banker/underwriting', icon: TrendingUp },
    { name: '合规引擎', href: '/token-banker/compliance', icon: Shield },
    { name: '流动性做市', href: '/token-banker/liquidity', icon: Layers },
    { name: '资金托管', href: '/token-banker/treasury', icon: Settings },
    { name: '费用激励', href: '/token-banker/fees', icon: Settings },
    { name: '数据审计', href: '/token-banker/data', icon: Settings },
    { name: '事件管理', href: '/token-banker/incidents', icon: Settings },
    { name: '权限管理', href: '/token-banker/admin', icon: Settings },
  ];

  const publicNavigation = [
    { name: '首页', href: '/', icon: Home },
    { name: '资源中心', href: '/resources', icon: BarChart3 },
  ];

  // Select navigation based on current context
  let navigation = publicNavigation;
  if (isIssuer) {
    navigation = issuerNavigation;
  } else if (isTokenBanker) {
    navigation = tokenBankerNavigation;
  } else if (isInvestor) {
    navigation = investorNavigation;
  }

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="lg:hidden fixed top-4 right-4 z-50 p-2 bg-gray-800 rounded-md border border-gray-700"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-40 w-48 bg-gray-800/50 backdrop-blur-xl border-r border-gray-700 transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out lg:translate-x-0`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-16 px-4 border-b border-gray-700">
            <div className="flex items-center gap-3">
              <Link 
                to="/" 
                className="flex items-center gap-3 hover:opacity-80 transition-opacity duration-200"
                onClick={() => setIsOpen(false)}
              >
                <img 
                  src="/veridex_logo.png" 
                  alt="VERIDEX Logo" 
                  className="w-16 h-16 object-contain"
                />
              </Link>
              <div className="text-xs text-gray-400 w-16">
                {isIssuer ? '资产发行方' : isTokenBanker ? '数字投行' : isInvestor ? '投资者' : 'Veridex'}
              </div>
            </div>
          </div>

          <nav className="flex-1 px-4 py-8 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href || 
                             location.pathname.startsWith(item.href + '/');
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400 border border-cyan-500/30'
                      : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-gray-700">
            <div 
              className="flex items-center space-x-3 cursor-pointer hover:bg-gray-700/30 rounded-lg p-2 transition-colors"
              onClick={() => setShowLoginModal(true)}
            >
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"></div>
              <div>
                <p className="text-sm font-medium">
                  {isIssuer ? '资产管理员' : isTokenBanker ? '投行经理' : isInvestor ? '投资者' : '访客'}
                </p>
                <p className="text-xs text-gray-400">
                  {isIssuer ? 'issuer@platform.com' : isTokenBanker ? 'banker@platform.com' : isInvestor ? 'investor@platform.com' : '未登录'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
      />

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black opacity-50 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;