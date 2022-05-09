import React from 'react'
import { Route, Switch } from 'react-router-dom'

import NavigationBar from './components/mainNavbar/NavigationBar'
import Home from './components/pages/Home'
import Movies from './components/pages/Movies'
import MovieDetail from './components/pages/MovieDetail'
import FavoriteMovies from './components/pages/FavoriteMovies'
import NotFound from './components/pages/NotFound'

function App() {
  return (
    <>
      <NavigationBar />
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route exact path='/movies'>
          <Movies />
        </Route>
        <Route exact path='/favorite'>
          <FavoriteMovies />
        </Route>
        <Route exact path='/movie/:id'>
          <MovieDetail />
        </Route>
        <Route path='*'>
          <NotFound />
        </Route>
      </Switch>
    </>
  )
}

export default App
