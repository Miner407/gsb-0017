import { useState } from "react";
import { Star, Calendar, Monitor, Trash2, Edit2, Check, X, Eye, ThumbsDown } from "lucide-react";
import type { Movie, MovieStatus } from "@/types/movie";
import { STATUS_LABELS, PLATFORM_OPTIONS } from "@/types/movie";
import { formatDate } from "@/utils/statistics";
import { useMovieStore } from "@/store/useMovieStore";

interface MovieCardProps {
  movie: Movie;
  index: number;
}

export default function MovieCard({ movie, index }: MovieCardProps) {
  const { changeStatus, deleteMovie, updateMovie } = useMovieStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editRating, setEditRating] = useState(movie.rating);
  const [editReview, setEditReview] = useState(movie.review || "");
  const [editPlatform, setEditPlatform] = useState(movie.platform || "");
  const [editDate, setEditDate] = useState(movie.watchDate || "");
  const [editTitle, setEditTitle] = useState(movie.title);

  const statusColorMap: Record<MovieStatus, { text: string; bg: string; border: string; shadow: string }> = {
    watchlist: {
      text: "text-cinema-watchlist",
      bg: "bg-cinema-watchlist/10",
      border: "border-cinema-watchlist/30",
      shadow: "shadow-watchlist",
    },
    watched: {
      text: "text-cinema-watched",
      bg: "bg-cinema-watched/10",
      border: "border-cinema-watched/30",
      shadow: "shadow-watched",
    },
    dropped: {
      text: "text-cinema-dropped",
      bg: "bg-cinema-dropped/10",
      border: "border-cinema-dropped/30",
      shadow: "shadow-dropped",
    },
  };

  const colors = statusColorMap[movie.status];

  const handleSaveEdit = () => {
    if (!editTitle.trim()) return;
    updateMovie(movie.id, {
      title: editTitle.trim(),
      rating: editRating,
      review: editReview.trim() || undefined,
      platform: editPlatform || undefined,
      watchDate: editDate || undefined,
    });
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditTitle(movie.title);
    setEditRating(movie.rating);
    setEditReview(movie.review || "");
    setEditPlatform(movie.platform || "");
    setEditDate(movie.watchDate || "");
    setIsEditing(false);
  };

  const StatusIcon = movie.status === "watchlist" ? Eye : movie.status === "watched" ? Check : ThumbsDown;
  const nextStatus: Record<MovieStatus, MovieStatus> = {
    watchlist: "watched",
    watched: "dropped",
    dropped: "watchlist",
  };

  return (
    <div
      className={`group relative bg-cinema-surface/80 backdrop-blur border ${colors.border} rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:${colors.shadow} animate-slide-up film-border`}
      style={{ animationDelay: `${Math.min(index * 0.04, 0.4)}s` }}
    >
      <div className="pt-3 pb-3 px-5">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            {isEditing ? (
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="gold-input text-sm py-1.5 px-2"
              />
            ) : (
              <h3 className="font-display text-lg font-semibold text-gray-100 truncate group-hover:text-cinema-gold transition-colors">
                {movie.title}
              </h3>
            )}
          </div>
          <div className="flex items-center gap-1 shrink-0">
            {!isEditing && (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-1.5 rounded-lg text-gray-500 hover:text-cinema-gold hover:bg-cinema-gold/10 transition-colors"
                  title="编辑"
                >
                  <Edit2 size={14} />
                </button>
                <button
                  onClick={() => deleteMovie(movie.id)}
                  className="p-1.5 rounded-lg text-gray-500 hover:text-cinema-dropped hover:bg-cinema-dropped/10 transition-colors"
                  title="删除"
                >
                  <Trash2 size={14} />
                </button>
              </>
            )}
            {isEditing && (
              <>
                <button
                  onClick={handleSaveEdit}
                  className="p-1.5 rounded-lg text-cinema-watched hover:bg-cinema-watched/10 transition-colors"
                >
                  <Check size={14} />
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="p-1.5 rounded-lg text-cinema-dropped hover:bg-cinema-dropped/10 transition-colors"
                >
                  <X size={14} />
                </button>
              </>
            )}
          </div>
        </div>

        <button
          onClick={() => changeStatus(movie.id, nextStatus[movie.status])}
          className={`mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${colors.text} ${colors.bg} border ${colors.border} hover:opacity-80 transition-opacity`}
          title={`点击切换为${STATUS_LABELS[nextStatus[movie.status]]}`}
        >
          <StatusIcon size={12} />
          {STATUS_LABELS[movie.status]}
          <span className="opacity-50">→ {STATUS_LABELS[nextStatus[movie.status]]}</span>
        </button>

        <div className="mt-4 space-y-2.5">
          {isEditing ? (
            <>
              <div>
                <label className="text-xs text-gray-400">评分 ({editRating}/10)</label>
                <input
                  type="range"
                  min={0}
                  max={10}
                  step={0.5}
                  value={editRating}
                  onChange={(e) => setEditRating(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-cinema-surface2 rounded-full appearance-none cursor-pointer accent-cinema-gold"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="date"
                  value={editDate}
                  onChange={(e) => setEditDate(e.target.value)}
                  className="gold-input text-xs py-1.5 px-2"
                />
                <select
                  value={editPlatform}
                  onChange={(e) => setEditPlatform(e.target.value)}
                  className="gold-input text-xs py-1.5 px-2"
                >
                  <option value="">平台</option>
                  {PLATFORM_OPTIONS.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>
              <textarea
                value={editReview}
                onChange={(e) => setEditReview(e.target.value)}
                placeholder="短评..."
                rows={2}
                className="gold-input text-xs py-1.5 px-2 resize-none"
              />
            </>
          ) : (
            <>
              {movie.rating > 0 && (
                <div className="flex items-center gap-1.5">
                  <Star size={14} className="text-cinema-gold fill-cinema-gold/30" />
                  <span className="text-cinema-gold font-semibold">{movie.rating.toFixed(1)}</span>
                  <span className="text-gray-500 text-xs">/ 10</span>
                </div>
              )}

              {(movie.watchDate || movie.platform) && (
                <div className="flex flex-wrap gap-3 text-xs text-gray-400">
                  {movie.watchDate && (
                    <div className="flex items-center gap-1">
                      <Calendar size={12} />
                      <span>{formatDate(movie.watchDate)}</span>
                    </div>
                  )}
                  {movie.platform && (
                    <div className="flex items-center gap-1">
                      <Monitor size={12} />
                      <span>{movie.platform}</span>
                    </div>
                  )}
                </div>
              )}

              {movie.review && (
                <p className="text-sm text-gray-300 bg-cinema-bg/40 rounded-lg p-3 border-l-2 border-cinema-gold/50 italic leading-relaxed">
                  "{movie.review}"
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
