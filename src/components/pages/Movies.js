import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useMovies } from '../../AppContext'
import MovieGridTemplate from '../utils/MovieGridTemplate'
import { Container, Row, InputGroup, FormControl, Button } from 'react-bootstrap'
import axios from 'axios'
import { Loader } from '../utils/Loader'

const API_KEY = process.env.REACT_APP_API_KEY ?? '64940d9e'
const API_URL = process.env.REACT_APP_API_URL ?? 'https://omdbapi.com/'

const Movies = () => {
  const ref = useRef(null)
  const { movies, setMovies } = useMovies()
  const [ loading, setLoading ] = useState(false)
  const [ searchValue, setSearchValue ] = useState('')

  const handleSearch = useCallback(async () => {
    if (searchValue) {
      try {
        setLoading(true)
        const response = await axios.get(`${ API_URL }?apikey=${ API_KEY }&s=${ searchValue }`)
        const { data, status } = response
        if (status === 200) {
          if (data.Search.length > 0) setMovies(data.Search)
        } else console.error('Something went wrong', status)
      } catch (err) {
        console.error('Something went wrong', err)
      } finally {
        setLoading(false)
      }
    }
  }, [ searchValue, setMovies ])

  useEffect(() => {
    const handleKeyDown = e => e.key === 'Enter' && handleSearch()
    ref.current?.focus()
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [ handleSearch ])

  return (
    <Container>
      <Row className='d-flex flex-row justify-content-center'>
        <InputGroup className='my-5 w-25'>
          <FormControl
            type='text'
            size='sm'
            placeholder='Search for a movie'
            ref={ ref }
            value={ searchValue ?? '' }
            onChange={ e => setSearchValue(e.target.value) }
          />
          <Button
            variant='secondary'
            size='sm'
            className='shadow px-3'
            onClick={ handleSearch }
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              fill='#FFF'
              viewBox='0 0 16 16'
            >
              <path d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z' />
            </svg>
          </Button>
        </InputGroup>
      </Row>
      <MovieGridTemplate movies={ movies } />
      <Loader show={ loading } />
    </Container>
  )
}

export default Movies
