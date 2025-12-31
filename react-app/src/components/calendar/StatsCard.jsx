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
    <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-3 md:p-6 hover:shadow-md transition-all duration-300 animate-fade-in">
      <div className="flex items-start justify-between mb-2 md:mb-4">
        <div className={`w-8 h-8 md:w-12 md:h-12 ${bgColor} rounded-lg flex items-center justify-center shadow-sm flex-shrink-0`}>
          <Icon className="w-4 h-4 md:w-6 md:h-6 text-white" />
        </div>

        {trend && (
          <div className={`flex items-center gap-1 text-xs md:text-sm font-medium ${
            trend.positive ? 'text-green-600' : 'text-red-600'
          }`}>
            {trend.positive ? (
              <TrendingUp className="w-3 h-3 md:w-4 md:h-4" />
            ) : (
              <TrendingDown className="w-3 h-3 md:w-4 md:h-4" />
            )}
            <span>{trend.value}</span>
          </div>
        )}
      </div>

      <div>
        <p className="text-xs md:text-sm text-neutral-600 mb-1 truncate">{title}</p>
        <p className="text-xl md:text-3xl font-bold text-neutral-900">{value}</p>
        {trend?.label && (
          <p className="text-xs text-neutral-500 mt-1 truncate">{trend.label}</p>
        )}
      </div>
    </div>
  );
}
