# Asset Pool Management System Documentation

## Overview
The Asset Pool Management System for asset issuers is the core module of the private credit asset securitization platform, providing a complete functional chain from asset pool creation to structural design.

## 1. Asset Pool Management Interface (`/issuer/pools`)

### 1.1 Main Features
- **Asset Pool List Display**: Shows overview information of all asset pools
- **Search & Filter**: Supports filtering by name, industry, status, and other criteria
- **Status Management**: Tracks the complete lifecycle from modeling to on-chain deployment
- **Quick Actions**: Create new asset pools, export reports, etc.

### 1.2 Data Display
- **Basic Information**: Asset pool name, size, duration, industry classification, geographic region
- **Risk Indicators**: Default rate, recovery rate, risk level assessment
- **Status Identification**: Modeling, structuring, issuing, live on-chain
- **Yield Information**: Expected yield vs. actual performance comparison

### 1.3 Filtering Features
- **Status Filter**: By asset pool status (modeling/structuring/issuing/live)
- **Search Function**: Supports asset pool name and industry keyword search
- **Advanced Filter**: By risk level, region, size range, and other criteria

### 1.4 Summary Statistics
- **Total Asset Pools**: Total number of currently managed asset pools
- **Total AUM**: Aggregate funding size of all asset pools
- **Average Default Rate**: Weighted average default rate calculation
- **Average Expected Yield**: Average of expected yields across asset pools

## 2. Asset Pool Detail Page (`/issuer/pools/:id`)

### 2.1 Page Structure
- **Top Navigation**: Back to list, basic asset pool info, action buttons
- **Key Metrics**: Real-time display of asset size, default rate, recovery rate, expected yield
- **Tab Navigation**: Four main modules - Asset Overview, Asset Details, Analytics & Modeling, Structuring

### 2.2 Asset Overview Module (`overview`)

#### 2.2.1 Key Performance Indicators (KPIs)
- **Current Delinquency Rate**: Real-time monitoring with benchmark comparison
- **30-Day Delinquency Rate**: Early warning indicator
- **90-Day Delinquency Rate**: Risk assessment indicator
- **Cumulative Default Rate**: Historical cumulative data
- **Recovery Rate**: Asset recovery efficiency
- **Prepayment Rate**: Liquidity impact analysis

#### 2.2.2 Asset Distribution Analysis
- **Industry Distribution**: 
  - Personal consumer loans, auto installments, credit card installments, etc.
  - Dual display of amounts and percentages
  - Visual progress bars
- **Geographic Distribution**: 
  - Asset distribution by province/city
  - Concentration risk assessment
- **Rating Distribution**: 
  - Credit rating distribution (AAA, AA, A, BBB, etc.)
  - Risk weight analysis

#### 2.2.3 Real-time Monitoring
- **Daily Additions**: New loans, repayments, delinquency data
- **Monthly Trends**: Default rate changes, recovery rate changes, prepayment trends
- **Risk Alerts**: Overall risk, regional concentration, liquidity status

### 2.3 Asset Details Module (`asset-details`)

#### 2.3.1 Asset List Features
- **Paginated Display**: Paginated browsing for large asset datasets
- **Search Function**: Search by asset ID, borrower ID, loan type
- **Status Filter**: Current, 30-day delinquent, 60-day delinquent, 90-day delinquent, paid off
- **Batch Operations**: Support for batch export, batch updates, etc.

#### 2.3.2 Detailed Asset Information
- **Basic Info**: Asset ID, borrower ID, loan type
- **Financial Data**: Original amount, outstanding balance, monthly payment, interest rate
- **Term Information**: Total term, remaining term
- **Risk Indicators**: Credit score, LTV ratio, DTI ratio
- **Geographic Info**: Borrower location
- **Status Tracking**: Current status, last payment date

#### 2.3.3 Summary Statistics
- **Total Assets**: Total number of assets under current filter conditions
- **Total Balance**: Aggregate outstanding amount
- **Performing Assets**: Number of assets with current status
- **Delinquent Assets**: Statistics for various delinquency stages

### 2.4 Analytics & Modeling Module (`analytics`)

#### 2.4.1 Monte Carlo Risk Analysis
- **Core Metrics**:
  - Expected Loss
  - Value at Risk VaR (95%/99%)
  - Expected Return Rate
  - Tail Risk Assessment
- **Model Parameters**:
  - Default rate distribution (mean, standard deviation, distribution type)
  - Recovery rate distribution
  - Prepayment rate distribution
  - Correlation coefficient
  - Number of simulations and confidence level

#### 2.4.2 Scenario Analysis
- **Base Scenario**: Expected performance under normal market conditions
- **Stress Scenario**: Risk assessment under economic recession conditions
- **Optimistic Scenario**: Best performance under economic growth conditions
- **Parameter Comparison**: Key indicator comparison across different scenarios

#### 2.4.3 Shadow Rating
- **Moody's Equivalent Rating**: Based on default probability calculation
- **S&P Equivalent Rating**: Adjusted for recovery rate considerations
- **Confidence Assessment**: Reliability analysis of rating results
- **Version Comparison**: Version management of historical rating results

#### 2.4.4 Model Management
- **Parameter Configuration**: Custom model parameter settings
- **Simulation Execution**: One-click Monte Carlo simulation
- **Result Export**: Multi-format export of analysis results
- **Version Control**: Model version management and result comparison

### 2.5 Structuring Module (`structuring`)

#### 2.5.1 Tranche Structure Design
- **Senior Tranche**:
  - Size allocation configuration (typically 75%)
  - Expected yield setting
  - Credit enhancement ratio
  - AAA rating target
- **Mezzanine Tranche**:
  - Size allocation configuration (typically 15%)
  - Risk-return balance
  - BBB rating target
- **Subordinate Tranche**:
  - Size allocation configuration (typically 10%)
  - First-loss mechanism
  - Residual return distribution rights

#### 2.5.2 Cash Flow Waterfall Mechanism
- **Payment Priority**:
  1. Servicing fee payments
  2. Senior principal and interest payments
  3. Mezzanine principal and interest payments
  4. Subordinate residual distribution
- **Waterfall Rules**: Strict cash flow distribution according to priority order

#### 2.5.3 Trigger Mechanism Design
- **Acceleration Triggers**:
  - Cumulative default rate exceeds 5%
  - 90-day delinquency rate exceeds 3%
  - Servicer rating downgrade
- **Cash Flow Diversion Triggers**:
  - Monthly default rate exceeds 2%
  - Recovery rate below 85%
  - Reserve account insufficiency

#### 2.5.4 Structuring Tools
- **Parameter Adjustment**: Real-time adjustment of tranche ratios and yields
- **Stress Testing**: Validate structure performance under different scenarios
- **Optimization Recommendations**: Structure optimization suggestions based on risk models

## 3. Technical Features

### 3.1 Data Management
- **Real-time Updates**: Real-time synchronization and updates of asset data
- **Version Control**: Data version management and change tracking
- **Integrity Verification**: SHA-256 hash verification for data integrity

### 3.2 User Experience
- **Responsive Design**: Support for desktop and mobile access
- **Paginated Loading**: Efficient pagination for large datasets
- **Search Optimization**: Fast search and intelligent filtering
- **Export Functionality**: Support for Excel and other format data export

### 3.3 Security
- **Access Control**: Role-based access control
- **Data Encryption**: Encrypted storage and transmission of sensitive data
- **Audit Logging**: Complete operation log recording

## 4. Business Processes

### 4.1 Asset Pool Lifecycle
1. **Creation Phase**: Basic information entry and asset import
2. **Modeling Phase**: Risk analysis and Monte Carlo simulation
3. **Structuring Phase**: Tranche design and cash flow waterfall configuration
4. **Validation Phase**: Compliance check and risk assessment confirmation

### 4.2 Risk Management Process
1. **Data Collection**: Collection and validation of underlying asset data
2. **Model Construction**: Build risk models based on historical data
3. **Stress Testing**: Risk stress testing under multiple scenarios
4. **Result Assessment**: Risk indicator evaluation and optimization recommendations

### 4.3 Compliance Management
- **Data Quality**: Ensure accuracy and completeness of asset data
- **Risk Disclosure**: Full disclosure of various risk factors
- **Regulatory Reporting**: Generate reports compliant with regulatory requirements

## 5. Key Indicator Definitions

### 5.1 Risk Indicators
- **Default Rate**: Proportion of defaulted assets to total assets
- **Recovery Rate**: Proportion of recovered amount to defaulted amount
- **Delinquency Rate**: Asset proportions at different delinquency stages
- **Concentration**: Geographic, industry, and borrower concentration indicators

### 5.2 Yield Indicators
- **Expected Return**: Expected annualized yield based on cash flow models
- **Risk-Adjusted Return**: Yield rate considering risk factors
- **Duration**: Average duration of asset portfolio
- **Convexity**: Interest rate sensitivity indicator

### 5.3 Liquidity Indicators
- **Prepayment Rate**: Proportion of borrower prepayments
- **Cash Flow Stability**: Cash flow volatility analysis
- **Reserve Account**: Liquidity buffer fund size

## 6. Data Models

### 6.1 Asset Pool Basic Information
```typescript
interface AssetPool {
  id: string;
  name: string;
  size: string;
  duration: string;
  status: 'modeling' | 'structuring' | 'issuing' | 'live';
  industry: string;
  region: string;
  defaultRate: string;
  recoveryRate: string;
  yield: string;
  riskLevel: 'low' | 'medium' | 'high';
  contractAddress?: string;
  lastUpdated: string;
  dataVersion: string;
  dataHash: string;
}
```

### 6.2 Underlying Asset Information
```typescript
interface Asset {
  id: string;
  borrowerId: string;
  loanType: string;
  originalAmount: number;
  outstandingBalance: number;
  monthlyPayment: number;
  interestRate: string;
  term: number;
  remainingTerm: number;
  status: 'Current' | '30-day delinquent' | '60-day delinquent' | '90-day delinquent' | 'Paid off';
  originationDate: string;
  lastPaymentDate: string;
  creditScore: number;
  region: string;
  ltv: string;
  dti: string;
}
```

### 6.3 Risk Analysis Results
```typescript
interface RiskAnalysis {
  expectedLoss: number;
  var95: number;
  var99: number;
  expectedReturn: number;
  tailRisk: number;
  shadowRating: {
    moodys: string;
    sp: string;
    confidence: number;
  };
  scenarios: {
    base: ScenarioResult;
    stress: ScenarioResult;
    optimistic: ScenarioResult;
  };
}
```

### 6.4 Tranche Structure
```typescript
interface TrancheStructure {
  senior: {
    allocation: number;
    expectedReturn: string;
    creditEnhancement: string;
    rating: string;
  };
  mezzanine: {
    allocation: number;
    expectedReturn: string;
    creditEnhancement: string;
    rating: string;
  };
  subordinate: {
    allocation: number;
    expectedReturn: string;
    firstLoss: string;
    rating: string;
  };
}
```

## 7. User Interface Design Principles

### 7.1 Information Hierarchy
- **Key Metrics Prominence**: Priority display of important risk and yield indicators
- **Progressive Disclosure**: Hierarchical display from overview to detailed information
- **Status Visualization**: Clear status identification and progress indication

### 7.2 Interaction Design
- **Responsive Layout**: Adapts to desktop and mobile devices
- **Real-time Updates**: Real-time reflection of data changes
- **Operation Feedback**: Clear success/failure feedback for operations

### 7.3 Data Visualization
- **Chart Display**: Pie charts and bar charts for asset distribution
- **Trend Analysis**: Trend charts for time series data
- **Risk Heatmap**: Visualization of risk factors

## 8. Technical Implementation Points

### 8.1 Performance Optimization
- **Paginated Loading**: Pagination handling for large datasets
- **Virtual Scrolling**: Performance optimization for long lists
- **Caching Strategy**: Reasonable data caching mechanisms

### 8.2 Data Security
- **Permission Verification**: Strict user permission control
- **Data Encryption**: Encryption of sensitive data
- **Audit Trail**: Complete operation log recording

### 8.3 Integration Interfaces
- **Risk Model API**: Integration with risk modeling engine
- **Blockchain Interface**: Interaction with smart contracts
- **Third-party Services**: Interfaces with rating agencies and data providers

## 9. Business Rules

### 9.1 Data Validation Rules
- **Completeness Check**: Validation of required field completeness
- **Logic Validation**: Validation of logical relationships between data
- **Range Validation**: Reasonableness check of numerical ranges

### 9.2 Risk Control Rules
- **Warning Thresholds**: Warning line settings for various risk indicators
- **Trigger Mechanisms**: Automatic risk control measures
- **Approval Process**: Approval workflow for important operations

### 9.3 Compliance Requirements
- **Data Protection**: Compliance with data protection regulations
- **Information Disclosure**: Adequate risk information disclosure
- **Regulatory Reporting**: Regular regulatory report generation

## 10. Extended Features

### 10.1 Advanced Analytics
- **Machine Learning Models**: AI-driven risk prediction
- **Real-time Monitoring**: 24/7 asset performance monitoring
- **Alert System**: Intelligent risk warning mechanisms

### 10.2 Integration Capabilities
- **API Openness**: Standardized API interfaces
- **Data Synchronization**: Data sync with external systems
- **Report Automation**: Automated report generation and distribution

### 10.3 Mobile Support
- **Mobile Application**: Native mobile app support
- **Offline Functionality**: Offline access to key features
- **Push Notifications**: Real-time push for important events

---

*This document describes the core functionality of the Asset Pool Management System, providing detailed functional specifications for replication in other AI systems.*