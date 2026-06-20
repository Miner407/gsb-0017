import { useMovieStore } from "@/store/useMovieStore";
import { STATUS_LABELS, PLATFORM_OPTIONS, type MovieStatus } from "@/types/movie";
import { getUniquePlatforms } from "@/utils/statistics";
import { Filter, RotateCcw } from "lucide-react";

export default function FilterBar() {
  const { movies, filters, setFilters, resetFilters } = useMovieStore();
  const allPlatforms = getUniquePlatforms(movies);
  const platforms = allPlatforms.length > 0 ? allPlatforms : PLATFORM_OPTIONS;

  const statusTabs: Array<{ key: MovieStatus | "all"; color: string }> = [
    { key: "all", color: "cinema-gold" },
    { key: "watchlist", color: "cinema-watchlist" },
    { key: "watched", color: "cinema-watched" },
    { key: "dropped", color: "cinema-dropped" },
  ];

  const hasActiveFilters =
    filters.status !== "all" ||
    filters.minRating > 0 ||
    filters.maxRating < 10 ||
    filters.platform !== "all";

  return (
    <div className="bg-cinema-surface/60 backdrop-blur border border-cinema-gold/20 rounded-2xl p-4 sm:p-5 space-y-4 animate-slide-up">
      <div className="flex items-center gap-2 text-cinema-gold mb-1">
        <Filter size={16} className="sm:hidden" />
        <Filter size={18} className="hidden sm:block" />
        <span className="font-display font-semibold text-sm sm:text-base">筛选与状态</span>
        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="ml-auto flex items-center gap-1 text-xs text-gray-400 hover:text-cinema-gold transition-colors shrink-0"
          >
            <RotateCcw size={12} className="sm:hidden" />
            <RotateCcw size={14} className="hidden sm:block" />
            <span className="hidden sm:inline">重置筛选</span>
            <span className="sm:hidden">重置</span>
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-1.5 sm:gap-2">
        {statusTabs.map((tab) => {
          const isActive = filters.status === tab.key;
          const colorClass = tab.color;
          return (
            <button
              key={tab.key}
              onClick={() => setFilters({ status: tab.key })}
              className={`status-tab border px-3 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm ${
                isActive
                  ? colorClass === "cinema-gold"
                    ? `bg-cinema-gold/15 border-cinema-gold text-cinema-gold shadow-gold-sm`
                    : `bg-${colorClass}/15 border-${colorClass} text-${colorClass} shadow-${colorClass}`
                  : "bg-cinema-surface2 border-cinema-gold/20 text-gray-400 hover:border-cinema-gold/40 hover:text-gray-300"
              }`}
              style={
                isActive && colorClass !== "cinema-gold"
                  ? {
                      backgroundColor:
                        colorClass === "cinema-watchlist"
                          ? "rgba(107, 140, 240, 0.15)"
                          : colorClass === "cinema-watched"
                          ? "rgba(94, 194, 141, 0.15)"
                          : "rgba(224, 108, 117, 0.15)",
                      borderColor:
                        colorClass === "cinema-watchlist"
                          ? "#6b8cf0"
                          : colorClass === "cinema-watched"
                          ? "#5ec28d"
                          : "#e06c75",
                      color:
                        colorClass === "cinema-watchlist"
                          ? "#6b8cf0"
                          : colorClass === "cinema-watched"
                          ? "#5ec28d"
                          : "#e06c75",
                    }
                  : undefined
              }
            >
              {STATUS_LABELS[tab.key]}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <div>
          <label className="block text-xs text-gray-400 mb-1.5">最低评分</label>
          <select
            value={filters.minRating}
            onChange={(e) => setFilters({ minRating: parseFloat(e.target.value) })}
            className="gold-input text-sm py-2"
          >
            <option value={0}>不限</option>
            {[6, 7, 8, 9].map((r) => (
              <option key={r} value={r}>
                {r} 分以上
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs text-gray-400 mb-1.5">最高评分</label>
          <select
            value={filters.maxRating}
            onChange={(e) => setFilters({ maxRating: parseFloat(e.target.value) })}
            className="gold-input text-sm py-2"
          >
            <option value={10}>不限</option>
            {[5, 6, 7, 8].map((r) => (
              <option key={r} value={r}>
                {r} 分以下
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs text-gray-400 mb-1.5">平台</label>
          <select
            value={filters.platform}
            onChange={(e) => setFilters({ platform: e.target.value })}
            className="gold-input text-sm py-2"
          >
            <option value="all">全部平台</option>
            {platforms.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
