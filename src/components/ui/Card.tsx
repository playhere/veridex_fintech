import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  gradient?: boolean;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  hover = false,
  gradient = false 
}) => {
  return (
    <div className={`
      bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl
      ${hover ? 'hover:bg-white/10 hover:border-white/20 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300' : ''}
      ${gradient ? 'bg-gradient-to-br from-white/10 to-white/5' : ''}
      ${className}
    `}>
      {children}
    </div>
  );
};

export const MetricCard: React.FC<{
  title: string;
  value: string;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon?: React.ReactNode;
}> = ({ title, value, change, trend, icon }) => {
  return (
    <Card hover className="p-6">
      <div className="flex items-center justify-between mb-4">
        {icon && (
          <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-xl flex items-center justify-center border border-cyan-500/20">
            {icon}
          </div>
        )}
        {change && (
          <div className={`flex items-center text-sm font-medium ${
            trend === 'up' ? 'text-emerald-400' : 
            trend === 'down' ? 'text-red-400' : 'text-gray-400'
          }`}>
            {change}
          </div>
        )}
      </div>
      <div className="space-y-1">
        <h3 className="text-3xl font-bold text-white tracking-tight">{value}</h3>
        <p className="text-gray-400 text-sm font-medium">{title}</p>
      </div>
    </Card>
  );
};