import { memo } from "react";
function StatsCard({
  icon: Icon,
  title,
  value,
  subtitle,
  bgColor = "bg-blue-600",
  iconColor = "text-blue-600",
  trend,
}) {
  return (
    <div className="bg-white rounded-md p-4 sm:p-6 shadow-sm border border-slate-300 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm font-medium text-slate-600 mb-1 sm:mb-2 truncate">
            {title}
          </p>
          <p className="text-2xl sm:text-3xl font-bold text-slate-900 mb-1">
            {value}
          </p>
          {subtitle && (
            <p className="text-xs text-slate-500 line-clamp-2">{subtitle}</p>
          )}
          {trend && (
            <div
              className={`inline-flex items-center gap-1 mt-2 sm:mt-3 text-xs font-medium ${
                trend.positive ? "text-green-700" : "text-red-700"
              }`}
            >
              <span>{trend.value}</span>
              <span>{trend.label}</span>
            </div>
          )}
        </div>
        <div
          className={`w-12 h-12 sm:w-14 sm:h-14 ${bgColor} bg-opacity-10 rounded-md flex items-center justify-center flex-shrink-0 border border-slate-200`}
        >
          <Icon className={`w-6 h-6 sm:w-7 sm:h-7 ${iconColor}`} />
        </div>
      </div>
    </div>
  );
}
export default memo(StatsCard);
