import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Container, Col, Row, Button } from 'react-bootstrap'
import Loader from '../utils/Loader' 
import axios from 'axios'

const API_KEY = process.env.REACT_APP_API_KEY ?? '64940d9e'
const API_URL = process.env.REACT_APP_API_URL ?? 'https://omdbapi.com/'

const MovieDetail = () => {
  const { id } = useParams()
  const [ loading, setLoading ] = useState(false)
  const [ movieDetail, setMovieDetail ] = useState({})

  useEffect(() => {
    const loadMovieDetail = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`${ API_URL }?apikey=${ API_KEY }&i=${ id }`)
        if (response.status === 200) setMovieDetail(response.data)
        else console.error('Something went wrong', response.status)
      } catch (err) {
        console.error('Something went wrong', err)
      } finally {
        setLoading(false)
      }
    }
    loadMovieDetail()
  }, [ id ])

  return (
    <>
      {!loading && (
        <Container>
          <Row>
            <Col md={ 3 }>
              <img
                src={ movieDetail.Poster }
                className='rounded shadow mt-4'
                style={{ width: '18rem', height: '27rem' }}
                alt='No Img'
              />
            </Col>
            <Col md={ 9 }>
              <h5 className='mt-4'>
                <strong>{ movieDetail.Title }</strong>
              </h5>
              <hr />
              <p>{ movieDetail.Plot }</p>
              <br />
              { movieDetail.Genre }
              <br />
              { `${ movieDetail.Country }, ${ movieDetail.Year }, ${ movieDetail.Runtime }` }
              <div className='border rounded my-5 p-2'>
                <strong>Released: </strong>
                { movieDetail.Released }
                <br />
                <strong>Director: </strong>
                { movieDetail.Director }
                <br />
                <strong>Actors: </strong>
                { movieDetail.Actors }
                <br />
                <strong>Awards: : </strong>
                { movieDetail.Awards }
                <br />
                <strong>Ratings: : </strong>
                { movieDetail.imdbRating }
              </div>
            </Col>
          </Row>
          <Row className='text-end'>
            <Link
              to='/movies'
              style={{ color: '#F6F6F6', textDecoration: 'none' }}
            >
              <Button variant='outline-dark' className='w-25 rounded-pill'>
                Back To Movies Page
              </Button>
            </Link>
          </Row>
        </Container>
      )}
      <Loader show={ loading } />
    </>
  )
}
export default MovieDetail
