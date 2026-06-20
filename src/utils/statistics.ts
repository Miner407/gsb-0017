import type { Movie, Filters, Statistics, MovieStatus } from "@/types/movie";

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

export function calculateStatistics(movies: Movie[]): Statistics {
  const watchedMovies = movies.filter((m) => m.status === "watched" && m.rating > 0);
  const totalRating = watchedMovies.reduce((sum, m) => sum + m.rating, 0);
  const averageRating = watchedMovies.length > 0 ? totalRating / watchedMovies.length : 0;

  const yearlyCounts: Record<string, number> = {};
  movies.forEach((m) => {
    const year = m.watchDate ? m.watchDate.slice(0, 4) : new Date(m.createdAt).getFullYear().toString();
    yearlyCounts[year] = (yearlyCounts[year] || 0) + 1;
  });

  return {
    totalMovies: movies.length,
    watchlistCount: movies.filter((m) => m.status === "watchlist").length,
    watchedCount: movies.filter((m) => m.status === "watched").length,
    droppedCount: movies.filter((m) => m.status === "dropped").length,
    averageRating: Number(averageRating.toFixed(1)),
    yearlyCounts,
  };
}

export function filterMovies(movies: Movie[], filters: Filters): Movie[] {
  return movies.filter((movie) => {
    if (filters.status !== "all" && movie.status !== filters.status) {
      return false;
    }
    if (filters.minRating > 0 && (movie.rating < filters.minRating || movie.rating === 0)) {
      return false;
    }
    if (filters.maxRating < 10 && (movie.rating > filters.maxRating || movie.rating === 0)) {
      return false;
    }
    if (filters.platform !== "all" && movie.platform !== filters.platform) {
      return false;
    }
    return true;
  });
}

export function getUniquePlatforms(movies: Movie[]): string[] {
  const platforms = new Set<string>();
  movies.forEach((m) => {
    if (m.platform) platforms.add(m.platform);
  });
  return Array.from(platforms).sort();
}

export function formatDate(dateStr?: string): string {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export function getStatusColor(status: MovieStatus): string {
  const colors: Record<MovieStatus, string> = {
    watchlist: "cinema-watchlist",
    watched: "cinema-watched",
    dropped: "cinema-dropped",
  };
  return colors[status];
}
