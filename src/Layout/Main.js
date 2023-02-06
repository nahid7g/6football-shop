import React from 'react'
import { Container } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'
import Footer from '../Pages/Shared/Footer/Footer'
import NavbarMenu from '../Pages/Shared/NavbarMenu/NavbarMenu'

const Main = () => {
  return (
    <>
      <NavbarMenu />
      <main className='my-2'>
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
    </>
  )
}

export default Main
