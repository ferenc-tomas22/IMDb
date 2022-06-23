import React, { useState, useRef, useEffect } from 'react'
import { useMovies } from '../../AppContext'
import { useHistory } from 'react-router-dom'
import { CardGroup, Card, ListGroup, ListGroupItem, Row, Col } from 'react-bootstrap'

const recordsPerPage = 20

const MovieGridTemplate = ({ movies }) => {
  const history = useHistory()
  const pageRecords = useRef(recordsPerPage)
  const favoriteMovies = useMovies(state => state.favoriteMovies)
  const setFavoriteMovies = useMovies(state => state.setFavoriteMovies)
  const [ moviesInPage, setMoviesInPage ] = useState([])

  useEffect(() => {
    if (movies.length > recordsPerPage) setMoviesInPage(movies.slice(0, recordsPerPage))
    else setMoviesInPage(movies)
  }, [ movies ])

  const isFavoriteMovie = (e, movie) => {
    e.stopPropagation()
    let movies = [ ...favoriteMovies ]
    if (movies.find(m => m.imdbID === movie.imdbID)) movies = movies.filter(m => m.imdbID !== movie.imdbID)
    else movies.push(movie)
    setFavoriteMovies(movies)
  }

  const showMore = () => {
    if (pageRecords.current >= movies.length) return
    pageRecords.current = pageRecords.current + recordsPerPage
    setMoviesInPage(movies.slice(0, pageRecords.current))
  }

  return (
    <>
      {moviesInPage.length > 0 && (
        <CardGroup className='d-flex justify-content-center'>
          {moviesInPage.map((movie, index) => {
            const title =
              movie.Title.length > 10
                ? movie.Title.substring(0, 10) + '...'
                : movie.Title ?? ''
            return (
              <div key={index} className='px-1 py-2'>
                <Card
                  id={movie.imdbID}
                  variant='light'
                  style={{ width: '12rem', cursor: 'pointer' }}
                  className='border border-secondary'
                  onClick={(e) => history.push(`movie/${e.target.id}`)}
                >
                  <Card.Img
                    id={movie.imdbID}
                    variant='top'
                    src={movie.Poster}
                    alt='No Img'
                    style={{ height: '18rem' }}
                  />
                  <Card.Body id={movie.imdbID}>
                    <Card.Title id={movie.imdbID} className='text-center'>
                      {title}
                    </Card.Title>
                  </Card.Body>
                  <ListGroup
                    id={movie.imdbID}
                    className='text-center list-group-flush'
                  >
                    <ListGroupItem
                      id={movie.imdbID}
                      style={{ textTransform: 'capitalize' }}
                    >
                      {`Type: ${movie.Type ?? ''}`}
                      <br />
                      {`Year: ${movie.Year ?? ''}`}
                    </ListGroupItem>
                    <ListGroupItem id={movie.imdbID}>
                      <button
                        style={{ backgroundColor: 'white' }}
                        className='border-0 w-100'
                        onClick={(e) => isFavoriteMovie(e, movie)}
                      >
                        {favoriteMovies.find(
                          (m) => m.imdbID === movie.imdbID
                        ) ? (
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='18'
                            height='18'
                            fill='orange'
                            viewBox='0 0 16 16'
                          >
                            <path d='M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z' />
                          </svg>
                        ) : (
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='18'
                            height='18'
                            viewBox='0 0 16 16'
                          >
                            <path d='M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z' />
                          </svg>
                        )}
                      </button>
                    </ListGroupItem>
                  </ListGroup>
                </Card>
              </div>
            )
          })}
        </CardGroup>
      )}
      {movies.length > moviesInPage.length &&
        moviesInPage.length !== movies.length && (
          <Row className='d-flex flex-row justify-content-center my-5'>
            <Col className='d-flex flex-column align-items-center'>
              <button
                style={{ backgroundColor: '#F6F6F6' }}
                className='border-0'
                onClick={showMore}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='32'
                  height='32'
                  fill='currentColor'
                  viewBox='0 0 16 16'
                >
                  <path d='M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z' />
                </svg>
              </button>
              Load More Movies
            </Col>
          </Row>
        )}
    </>
  )
}

export default MovieGridTemplate
