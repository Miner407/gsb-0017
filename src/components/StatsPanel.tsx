import { Film, Star, Calendar, TrendingUp } from "lucide-react";
import { useMovieStore } from "@/store/useMovieStore";
import { calculateStatistics } from "@/utils/statistics";

export default function StatsPanel() {
  const movies = useMovieStore((s) => s.movies);
  const stats = calculateStatistics(movies);
  const currentYear = new Date().getFullYear().toString();
  const thisYearCount = stats.yearlyCounts[currentYear] || 0;

  const statItems = [
    {
      label: "总收藏",
      value: stats.totalMovies,
      icon: Film,
      color: "text-cinema-gold",
      bgColor: "from-cinema-gold/10 to-transparent",
    },
    {
      label: "平均评分",
      value: stats.averageRating > 0 ? stats.averageRating.toFixed(1) : "—",
      icon: Star,
      color: "text-cinema-watched",
      bgColor: "from-cinema-watched/10 to-transparent",
      sub: `已评 ${movies.filter((m) => m.rating > 0 && m.status === "watched").length} 部`,
    },
    {
      label: `${currentYear}年观影`,
      value: thisYearCount,
      icon: Calendar,
      color: "text-cinema-watchlist",
      bgColor: "from-cinema-watchlist/10 to-transparent",
    },
    {
      label: "想看/已看/弃看",
      value: `${stats.watchlistCount}/${stats.watchedCount}/${stats.droppedCount}`,
      icon: TrendingUp,
      color: "text-cinema-dropped",
      bgColor: "from-cinema-dropped/10 to-transparent",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {statItems.map((item, idx) => {
        const Icon = item.icon;
        return (
          <div
            key={idx}
            className={`relative overflow-hidden bg-gradient-to-br ${item.bgColor} bg-cinema-surface/60 backdrop-blur border border-cinema-gold/20 rounded-xl sm:rounded-2xl p-3 sm:p-5 transition-all duration-300 hover:border-cinema-gold/40 hover:shadow-gold-sm group animate-fade-in`}
            style={{ animationDelay: `${idx * 0.05}s` }}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <p className="text-gray-400 text-xs sm:text-sm font-body truncate">{item.label}</p>
                <p className={`font-display text-xl sm:text-3xl font-bold mt-1 sm:mt-2 ${item.color} group-hover:scale-105 transition-transform duration-300 truncate`}>
                  {item.value}
                </p>
                {item.sub && <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5 sm:mt-1 truncate">{item.sub}</p>}
              </div>
              <div className={`p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-cinema-bg/50 ${item.color} opacity-70 group-hover:opacity-100 transition-opacity shrink-0`}>
                <Icon size={16} className="sm:hidden" />
                <Icon size={22} className="hidden sm:block" />
              </div>
            </div>
            <div className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full bg-gradient-to-br from-cinema-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        );
      })}
    </div>
  );
}
