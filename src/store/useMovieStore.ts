import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Movie, MovieStatus, Filters } from "@/types/movie";
import { generateId } from "@/utils/statistics";

interface MovieState {
  movies: Movie[];
  filters: Filters;
  addMovie: (data: Omit<Movie, "id" | "createdAt" | "updatedAt">) => void;
  updateMovie: (id: string, data: Partial<Movie>) => void;
  deleteMovie: (id: string) => void;
  changeStatus: (id: string, status: MovieStatus) => void;
  setFilters: (filters: Partial<Filters>) => void;
  resetFilters: () => void;
}

const defaultFilters: Filters = {
  status: "all",
  minRating: 0,
  maxRating: 10,
  platform: "all",
};

export const useMovieStore = create<MovieState>()(
  persist(
    (set) => ({
      movies: [],
      filters: defaultFilters,
      addMovie: (data) =>
        set((state) => {
          const now = new Date().toISOString();
          const newMovie: Movie = {
            ...data,
            id: generateId(),
            createdAt: now,
            updatedAt: now,
          };
          return { movies: [newMovie, ...state.movies] };
        }),
      updateMovie: (id, data) =>
        set((state) => ({
          movies: state.movies.map((m) =>
            m.id === id ? { ...m, ...data, updatedAt: new Date().toISOString() } : m
          ),
        })),
      deleteMovie: (id) =>
        set((state) => ({
          movies: state.movies.filter((m) => m.id !== id),
        })),
      changeStatus: (id, status) =>
        set((state) => ({
          movies: state.movies.map((m) =>
            m.id === id
              ? {
                  ...m,
                  status,
                  updatedAt: new Date().toISOString(),
                  watchDate:
                    status === "watched" && !m.watchDate
                      ? new Date().toISOString().slice(0, 10)
                      : m.watchDate,
                }
              : m
          ),
        })),
      setFilters: (filters) =>
        set((state) => ({
          filters: { ...state.filters, ...filters },
        })),
      resetFilters: () => set({ filters: defaultFilters }),
    }),
    {
      name: "movie-watchlist-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
