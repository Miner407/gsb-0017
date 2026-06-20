import { useState } from "react";
import { Plus, ChevronDown, ChevronUp, X, AlertCircle } from "lucide-react";
import { useMovieStore } from "@/store/useMovieStore";
import { STATUS_LABELS, PLATFORM_OPTIONS, type MovieStatus } from "@/types/movie";

export default function AddMovieForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState<MovieStatus>("watchlist");
  const [rating, setRating] = useState(0);
  const [watchDate, setWatchDate] = useState("");
  const [platform, setPlatform] = useState("");
  const [review, setReview] = useState("");
  const [titleError, setTitleError] = useState("");
  const [ratingError, setRatingError] = useState("");

  const addMovie = useMovieStore((s) => s.addMovie);

  const resetForm = () => {
    setTitle("");
    setStatus("watchlist");
    setRating(0);
    setWatchDate("");
    setPlatform("");
    setReview("");
    setTitleError("");
    setRatingError("");
  };

  const validateForm = (): boolean => {
    let valid = true;

    if (!title.trim()) {
      setTitleError("电影名称不能为空");
      valid = false;
    } else {
      setTitleError("");
    }

    if (rating < 0 || rating > 10) {
      setRatingError("评分必须在 0 到 10 之间");
      valid = false;
    } else {
      setRatingError("");
    }

    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    addMovie({
      title: title.trim(),
      status,
      rating: Math.max(0, Math.min(10, rating)),
      watchDate: watchDate || undefined,
      platform: platform || undefined,
      review: review.trim() || undefined,
    });

    resetForm();
    setIsOpen(false);
  };

  const handleCancel = () => {
    resetForm();
    setIsOpen(false);
  };

  return (
    <div className="bg-cinema-surface/60 backdrop-blur border border-cinema-gold/20 rounded-2xl overflow-hidden animate-slide-up">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 sm:p-5 hover:bg-cinema-surface2/30 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-cinema-gold to-cinema-bronze flex items-center justify-center text-cinema-bg shrink-0">
            <Plus size={18} className="sm:hidden" strokeWidth={2.5} />
            <Plus size={20} className="hidden sm:block" strokeWidth={2.5} />
          </div>
          <div className="text-left min-w-0">
            <h3 className="font-display text-base sm:text-lg font-semibold text-gray-100">添加新电影</h3>
            <p className="text-xs sm:text-sm text-gray-400 truncate">记录你的观影历程</p>
          </div>
        </div>
        <div className="text-cinema-gold shrink-0">
          {isOpen ? <ChevronUp size={20} className="sm:hidden" /> : <ChevronDown size={20} className="sm:hidden" />}
          {isOpen ? <ChevronUp size={22} className="hidden sm:block" /> : <ChevronDown size={22} className="hidden sm:block" />}
        </div>
      </button>

      {isOpen && (
        <form
          onSubmit={handleSubmit}
          className="px-4 sm:px-5 pb-4 sm:pb-5 pt-2 border-t border-cinema-gold/10 space-y-4 animate-fade-in"
        >
          <div>
            <label className="block text-sm text-gray-300 mb-1.5">电影名称 *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (titleError) setTitleError("");
              }}
              placeholder="例如：盗梦空间"
              className={`gold-input ${titleError ? "border-cinema-dropped focus:border-cinema-dropped" : ""}`}
              autoFocus
            />
            {titleError && (
              <p className="mt-1.5 text-xs text-cinema-dropped flex items-center gap-1">
                <AlertCircle size={12} />
                {titleError}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-300 mb-1.5">状态</label>
              <div className="flex gap-2">
                {(["watchlist", "watched", "dropped"] as MovieStatus[]).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setStatus(s)}
                    className={`status-tab flex-1 border ${
                      status === s
                        ? s === "watchlist"
                          ? "bg-cinema-watchlist/20 border-cinema-watchlist text-cinema-watchlist shadow-watchlist"
                          : s === "watched"
                          ? "bg-cinema-watched/20 border-cinema-watched text-cinema-watched shadow-watched"
                          : "bg-cinema-dropped/20 border-cinema-dropped text-cinema-dropped shadow-dropped"
                        : "bg-cinema-surface2 border-cinema-gold/20 text-gray-400 hover:border-cinema-gold/40"
                    }`}
                  >
                    {STATUS_LABELS[s]}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-1.5">
                评分 {rating > 0 ? `(${rating}/10)` : "(可选)"}
              </label>
              <input
                type="range"
                min={0}
                max={10}
                step={0.5}
                value={rating}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  setRating(val);
                  if (ratingError) setRatingError("");
                }}
                className="w-full h-2 bg-cinema-surface2 rounded-full appearance-none cursor-pointer accent-cinema-gold"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0</span>
                <span>5</span>
                <span>10</span>
              </div>
              {ratingError && (
                <p className="mt-1.5 text-xs text-cinema-dropped flex items-center gap-1">
                  <AlertCircle size={12} />
                  {ratingError}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-300 mb-1.5">
                观影日期
                {status === "watched" && (
                  <span className="text-cinema-watched ml-1">(建议填写)</span>
                )}
              </label>
              <input
                type="date"
                value={watchDate}
                onChange={(e) => setWatchDate(e.target.value)}
                className="gold-input"
              />
              {status === "watched" && !watchDate && (
                <p className="mt-1.5 text-xs text-cinema-watched/80 flex items-center gap-1">
                  <AlertCircle size={12} />
                  标记为已看的电影建议填写观影日期
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-1.5">观影平台</label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="gold-input"
              >
                <option value="">选择平台（可选）</option>
                {PLATFORM_OPTIONS.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1.5">短评</label>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="写下你的观影感受..."
              rows={3}
              className="gold-input resize-none"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button type="submit" className="gold-btn flex-1" disabled={!title.trim()}>
              保存电影
            </button>
            <button type="button" onClick={handleCancel} className="ghost-btn flex items-center gap-1.5">
              <X size={16} />
              取消
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
