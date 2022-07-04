import React from 'react'
import { useMovies } from '../../AppContext'
import { Container, Row } from 'react-bootstrap'
import MovieGridTemplate from '../utils/MovieGridTemplate'

const FavoriteMovies = () => {
  const { favoriteMovies } = useMovies()

  return favoriteMovies.length > 0 ? (
    <Container>
      <MovieGridTemplate movies={ favoriteMovies } />
    </Container>
  ) : (
    <Container>
      <Row className='text-center'>
        <div className='mt-5'>
          <h1>You dont have saved any favorite movie</h1>
        </div>
      </Row>
    </Container>
  )
}

export default FavoriteMovies
