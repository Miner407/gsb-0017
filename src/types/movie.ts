export type MovieStatus = "watchlist" | "watched" | "dropped";

export interface Movie {
  id: string;
  title: string;
  status: MovieStatus;
  rating: number;
  watchDate?: string;
  platform?: string;
  review?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Filters {
  status: MovieStatus | "all";
  minRating: number;
  maxRating: number;
  platform: string | "all";
}

export interface Statistics {
  totalMovies: number;
  watchlistCount: number;
  watchedCount: number;
  droppedCount: number;
  averageRating: number;
  yearlyCounts: Record<string, number>;
}

export const STATUS_LABELS: Record<MovieStatus | "all", string> = {
  all: "全部",
  watchlist: "想看",
  watched: "已看",
  dropped: "弃看",
};

export const PLATFORM_OPTIONS = [
  "Netflix",
  "Disney+",
  "HBO",
  "Prime Video",
  "Apple TV+",
  "优酷",
  "爱奇艺",
  "腾讯视频",
  "B站",
  "影院",
  "蓝光/DVD",
  "其他",
];
