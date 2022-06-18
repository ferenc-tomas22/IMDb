import create from 'zustand'

export const useMovies = create(set => ({
  movies: JSON.parse(localStorage.getItem('movies') ?? '[]'),
  favoriteMovies: JSON.parse(localStorage.getItem('favoriteMovies') ?? '[]'),
  setMovies: movies => {
    set(state => state.movies = movies)
    localStorage.setItem('movies', JSON.stringify(movies))
  },
  setFavoriteMovies: favoriteMovies => {
    set(state => state.favoriteMovies = favoriteMovies)
    localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies))
  },
}))