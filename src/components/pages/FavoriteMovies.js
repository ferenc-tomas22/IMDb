import React, { useContext } from 'react'
import { AppContext } from '../../AppContext'
import MovieGridTemplate from '../utils/MovieGridTemplate'
import { Container, Row } from 'react-bootstrap'

const FavoriteMovies = () => {
  const { favoriteMovies } = useContext(AppContext)

  return favoriteMovies.length > 0 ? (
    <Container>
      <MovieGridTemplate movies={favoriteMovies} />
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
