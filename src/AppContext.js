import React, { useState, useEffect } from 'react'

export const AppContext = React.createContext({})

export const AppContextProvider = ({ children }) => {
  const [movies, setMovies] = useState([])
  const [favoriteMovies, setFavoriteMovies] = useState([])

  useEffect(() => {
    const storedMovies = localStorage.getItem('movies')
    const storedFavoriteMovies = localStorage.getItem('favoriteMovies')
    if (storedMovies) setMovies(JSON.parse(storedMovies))
    if (storedFavoriteMovies)
      setFavoriteMovies(JSON.parse(storedFavoriteMovies))
  }, [])

  useEffect(() => {
    localStorage.setItem('movies', JSON.stringify(movies))
    localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies))
  }, [movies, favoriteMovies])

  return (
    <AppContext.Provider
      value={{
        movies,
        setMovies,
        favoriteMovies,
        setFavoriteMovies,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
