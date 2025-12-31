import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

/**
 * Card de estatística com ícone, valor e trend opcional
 */
export default function StatsCard({
  icon: Icon,
  title,
  value,
  bgColor = 'bg-primary-500',
  trend = null
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6 hover:shadow-md transition-all duration-300 animate-fade-in">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 ${bgColor} rounded-lg flex items-center justify-center shadow-sm`}>
          <Icon className="w-6 h-6 text-white" />
        </div>

        {trend && (
          <div className={`flex items-center gap-1 text-sm font-medium ${
            trend.positive ? 'text-green-600' : 'text-red-600'
          }`}>
            {trend.positive ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            <span>{trend.value}</span>
          </div>
        )}
      </div>

      <div>
        <p className="text-sm text-neutral-600 mb-1">{title}</p>
        <p className="text-3xl font-bold text-neutral-900">{value}</p>
        {trend?.label && (
          <p className="text-xs text-neutral-500 mt-1">{trend.label}</p>
        )}
      </div>
    </div>
  );
}
