import { Film, Clapperboard } from "lucide-react";
import StatsPanel from "@/components/StatsPanel";
import AddMovieForm from "@/components/AddMovieForm";
import FilterBar from "@/components/FilterBar";
import MovieList from "@/components/MovieList";

export default function Home() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-cinema-gold/10 bg-cinema-bg/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container px-4 sm:px-6 py-4 sm:py-5">
          <div className="flex items-center gap-3">
            <div className="relative shrink-0">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-cinema-gold to-cinema-bronze flex items-center justify-center shadow-gold animate-pulse-glow">
                <Clapperboard size={20} className="text-cinema-bg sm:hidden" strokeWidth={2.2} />
                <Clapperboard size={24} className="text-cinema-bg hidden sm:block" strokeWidth={2.2} />
              </div>
              <Film size={12} className="absolute -bottom-1 -right-1 text-cinema-gold bg-cinema-bg p-0.5 rounded-full sm:hidden" />
              <Film size={14} className="absolute -bottom-1 -right-1 text-cinema-gold bg-cinema-bg p-0.5 rounded-full hidden sm:block" />
            </div>
            <div className="min-w-0">
              <h1 className="font-display text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cinema-gold to-cinema-bronze truncate">
                观影清单
              </h1>
              <p className="text-xs sm:text-sm text-gray-400 truncate">记录每一次光影之旅</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8">
        <section>
          <StatsPanel />
        </section>

        <section className="space-y-5 lg:grid lg:grid-cols-5 lg:gap-5 lg:space-y-0">
          <div className="lg:col-span-2">
            <AddMovieForm />
          </div>
          <div className="lg:col-span-3">
            <FilterBar />
          </div>
        </section>

        <section>
          <MovieList />
        </section>
      </main>

      <footer className="border-t border-cinema-gold/10 py-4 sm:py-6 mt-8 sm:mt-12">
        <div className="container px-4 sm:px-6 text-center">
          <p className="text-xs text-gray-500 font-body">
            数据本地存储 · 隐私安全 · © {new Date().getFullYear()} 观影清单
          </p>
        </div>
      </footer>
    </div>
  );
}
