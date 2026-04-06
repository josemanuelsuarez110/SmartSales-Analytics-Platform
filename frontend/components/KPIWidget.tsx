import React from 'react';

interface TrendProps {
  type: 'up' | 'down';
  value: number;
}

interface KPIProps {
  title: string;
  value: string | number;
  unit?: string;
  trend?: TrendProps | null;
  icon?: React.ReactNode;
}

export default function KPIWidget({ title, value, unit = '', trend = null, icon = null }: KPIProps) {
  return (
    <div className="glass-card">
      <div className="flex justify-between items-start mb-4">
        <span className="kpi-label">{title}</span>
        {icon && <span className="text-emerald-400">{icon}</span>}
      </div>
      <div className="kpi-value text-white">
        {unit}{value}
      </div>
      {trend && (
        <div className={`text-xs font-medium flex items-center mt-2 ${trend.type === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
          {trend.type === 'up' ? '▲' : '▼'} {trend.value}% 
          <span className="text-gray-500 ml-1">vs last month</span>
        </div>
      )}
    </div>
  )
}
