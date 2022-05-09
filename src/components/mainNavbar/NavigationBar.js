import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav, Container, Button } from 'react-bootstrap'

function NavigationBar() {
  return (
    <>
      <Navbar bg='dark' variant='dark' className='sticky-top shadow-lg'>
        <Container className='mx-5'>
          <Navbar.Brand className='d-flex flex-row'>
            <Link to='/' style={{ color: '#F6F6F6', textDecoration: 'none' }}>
              <Button variant='dark' className='rounded-pill px-5'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  fill='#FFF'
                  className='mb-1 mx-2'
                  viewBox='0 0 16 16'
                >
                  <path d='M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1zm4 0v6h8V1H4zm8 8H4v6h8V9zM1 1v2h2V1H1zm2 3H1v2h2V4zM1 7v2h2V7H1zm2 3H1v2h2v-2zm-2 3v2h2v-2H1zM15 1h-2v2h2V1zm-2 3v2h2V4h-2zm2 3h-2v2h2V7zm-2 3v2h2v-2h-2zm2 3h-2v2h2v-2z' />
                </svg>
                Movie Database
              </Button>
            </Link>
          </Navbar.Brand>
          <Nav>
            <Nav.Link>
              <Link to='/' style={{ color: '#F6F6F6', textDecoration: 'none' }}>
                <Button variant='dark' className='rounded-pill'>
                  Home
                </Button>
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link
                to='/movies'
                style={{ color: '#F6F6F6', textDecoration: 'none' }}
              >
                <Button variant='dark' className='rounded-pill'>
                  Movies
                </Button>
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link
                to='/favorite'
                style={{ color: '#F6F6F6', textDecoration: 'none' }}
              >
                <Button variant='dark' className='rounded-pill'>
                  My Favorite Movies
                </Button>
              </Link>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}

export default NavigationBar
