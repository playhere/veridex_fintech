import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import ResourceCenter from './pages/ResourceCenter';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import StatusPage from './pages/StatusPage';
import NotFoundPage from './pages/NotFoundPage';

// Issuer Pages (10 pages)
import IssuerDashboard from './pages/issuer/Dashboard';
import PoolsList from './pages/issuer/PoolsList';
import PoolDetail from './pages/issuer/PoolDetail';
import PoolAnalytics from './pages/issuer/PoolAnalytics';
import PoolTokenization from './pages/issuer/PoolTokenization';
import OfferConfiguration from './pages/issuer/OfferConfiguration';
import ServicerWorkbench from './pages/issuer/ServicerWorkbench';
import ServicerReports from './pages/issuer/ServicerReports';
import IssuerSettings from './pages/issuer/IssuerSettings';

// Investor Pages (7 pages)
import InvestmentMarket from './pages/investor/InvestmentMarket';
import OfferDetail from './pages/investor/OfferDetail';
import OfferAnalytics from './pages/investor/OfferAnalytics';
import SubscriptionFlow from './pages/investor/SubscriptionFlow';
import Portfolio from './pages/investor/Portfolio';
import Liquidity from './pages/investor/Liquidity';
import AccountSettings from './pages/investor/AccountSettings';

// Token Banker Pages (10 pages)
import TokenBankerDashboard from './pages/token-banker/Dashboard';
import UnderwritingConsole from './pages/token-banker/UnderwritingConsole';
import ComplianceEngine from './pages/token-banker/ComplianceEngine';
import KYCCaseDetail from './pages/token-banker/KYCCaseDetail';
import LiquidityDesk from './pages/token-banker/LiquidityDesk';
import TreasuryManagement from './pages/token-banker/TreasuryManagement';
import FeesIncentives from './pages/token-banker/FeesIncentives';
import DataAuditHub from './pages/token-banker/DataAuditHub';
import IncidentCenter from './pages/token-banker/IncidentCenter';
import AdminRBAC from './pages/token-banker/AdminRBAC';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="flex">
          <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
          
          <main className="flex-1 ml-0 lg:ml-48">
            <div className="min-h-screen">
              <Routes>
                {/* Public Pages (3 pages) */}
                <Route path="/" element={<HomePage />} />
                <Route path="/resources" element={<ResourceCenter />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/status" element={<StatusPage />} />
                
                {/* Issuer Pages (10 pages) */}
                <Route path="/issuer/dashboard" element={<IssuerDashboard />} />
                <Route path="/issuer/pools" element={<PoolsList />} />
                <Route path="/issuer/pools/:id" element={<PoolDetail />} />
                <Route path="/issuer/pools/:id/analytics" element={<PoolAnalytics />} />
                <Route path="/issuer/pools/:id/tokenization" element={<PoolTokenization />} />
                <Route path="/issuer/offers/new" element={<OfferConfiguration />} />
                <Route path="/servicer" element={<ServicerWorkbench />} />
                <Route path="/servicer/reports" element={<ServicerReports />} />
                <Route path="/issuer/settings" element={<IssuerSettings />} />
                
                {/* Investor Pages (7 pages) */}
                <Route path="/invest" element={<InvestmentMarket />} />
                <Route path="/invest/offers/:id" element={<OfferDetail />} />
                <Route path="/invest/offers/:id/analytics" element={<OfferAnalytics />} />
                <Route path="/invest/offers/:id/subscribe" element={<SubscriptionFlow />} />
                <Route path="/invest/portfolio" element={<Portfolio />} />
                <Route path="/invest/liquidity" element={<Liquidity />} />
                <Route path="/account" element={<AccountSettings />} />
                
                {/* Token Banker Pages (10 pages) */}
                <Route path="/token-banker/dashboard" element={<TokenBankerDashboard />} />
                <Route path="/token-banker/underwriting" element={<UnderwritingConsole />} />
                <Route path="/token-banker/compliance" element={<ComplianceEngine />} />
                <Route path="/token-banker/compliance/cases/:id" element={<KYCCaseDetail />} />
                <Route path="/token-banker/liquidity" element={<LiquidityDesk />} />
                <Route path="/token-banker/treasury" element={<TreasuryManagement />} />
                <Route path="/token-banker/fees" element={<FeesIncentives />} />
                <Route path="/token-banker/data" element={<DataAuditHub />} />
                <Route path="/token-banker/incidents" element={<IncidentCenter />} />
                <Route path="/token-banker/admin" element={<AdminRBAC />} />
                
                {/* 404 Page */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;