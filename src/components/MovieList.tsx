import { Film } from "lucide-react";
import { useMovieStore } from "@/store/useMovieStore";
import { filterMovies } from "@/utils/statistics";
import MovieCard from "./MovieCard";

export default function MovieList() {
  const { movies, filters } = useMovieStore();
  const filteredMovies = filterMovies(movies, filters);

  if (movies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
        <div className="w-20 h-20 rounded-2xl bg-cinema-surface/60 border border-cinema-gold/20 flex items-center justify-center mb-5">
          <Film size={36} className="text-cinema-gold/50" />
        </div>
        <h3 className="font-display text-xl text-gray-300 mb-2">还没有收藏电影</h3>
        <p className="text-gray-500 max-w-sm">
          点击上方的「添加新电影」按钮，开始记录你的观影旅程吧。
        </p>
      </div>
    );
  }

  if (filteredMovies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
        <div className="w-16 h-16 rounded-2xl bg-cinema-surface/60 border border-cinema-gold/20 flex items-center justify-center mb-4">
          <Film size={28} className="text-gray-500" />
        </div>
        <h3 className="font-display text-lg text-gray-400 mb-1">没有匹配的电影</h3>
        <p className="text-gray-500 text-sm">尝试调整筛选条件看看</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-400">
          共 <span className="text-cinema-gold font-semibold">{filteredMovies.length}</span> 部电影
          {filters.status !== "all" || filters.platform !== "all" || filters.minRating > 0 || filters.maxRating < 10 ? (
            <span className="text-gray-500"> (已筛选)</span>
          ) : null}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredMovies.map((movie, idx) => (
          <MovieCard key={movie.id} movie={movie} index={idx} />
        ))}
      </div>
    </div>
  );
}
