import React, { useState, useEffect, useRef } from 'react'
import { useMovies } from '../../AppProvider'
import MovieGridTemplate from '../utils/MovieGridTemplate'
import { Container, Row, InputGroup, FormControl, Button } from 'react-bootstrap'
import axios from 'axios'
import Loader from '../utils/Loader'

const API_KEY = process.env.REACT_APP_API_KEY ?? '64940d9e'
const API_URL = process.env.REACT_APP_API_URL ?? 'https://omdbapi.com/'

const Movies = () => {
  const ref = useRef(null)
  const [ loading, setLoading ] = useState(false)
  const [ searchValue, setSearchValue ] = useState('')
  const { movies, setMovies } = useMovies()

  useEffect(() => {
    const handleKeyDown = e => e.key === 'Enter' && handleSearch()
    ref.current?.focus()
    window.addEventListener('keydown', e => handleKeyDown(e))
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleSearch = async () => {
    if (searchValue.length > 0) {
      try {
        setLoading(true)
        const response = await axios.get(`${ API_URL }?apikey=${ API_KEY }&s=${ searchValue }`)
        if (response.status === 200) {
          const data = response.data.Searc
          console.log('data: ', data)
          if (data.length > 0) setMovies(data)
        } else console.error('Something went wrong', response.status)
      } catch (err) {
        console.error('Something went wrong', err)
      } finally {
        setLoading(false)
      }
    }
  }

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
