import { memo } from "react";
function StatsCard({
  icon: Icon,
  title,
  value,
  subtitle,
  bgColor = "bg-blue-600",
  iconColor = "text-info",
  trend,
}) {
  return (
    <div className="bg-white rounded-md p-3 sm:p-4 md:p-5 shadow-sm border border-neutral-300 hover:shadow-md transition-shadow overflow-hidden">
      <div className="flex items-start justify-between gap-2 sm:gap-3">
        <div className="flex-1 min-w-0 overflow-hidden">
          <p className="text-[10px] sm:text-xs md:text-sm font-medium text-neutral-600 mb-1 truncate">
            {title}
          </p>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-neutral-900 mb-0.5 sm:mb-1 truncate">
            {value}
          </p>
          {subtitle && (
            <p className="text-[10px] sm:text-xs text-neutral-500 line-clamp-2 leading-tight">{subtitle}</p>
          )}
          {trend && (
            <div
              className={`inline-flex items-center gap-1 mt-1.5 sm:mt-2 text-[10px] sm:text-xs font-medium ${
                trend.positive ? "text-green-700" : "text-red-700"
              }`}
            >
              <span className="truncate">{trend.value}</span>
              <span className="truncate">{trend.label}</span>
            </div>
          )}
        </div>
        <div
          className={`w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 ${bgColor} bg-opacity-10 rounded-md flex items-center justify-center flex-shrink-0 border border-neutral-200`}
        >
          <Icon className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 ${iconColor}`} />
        </div>
      </div>
    </div>
  );
}
export default memo(StatsCard);
