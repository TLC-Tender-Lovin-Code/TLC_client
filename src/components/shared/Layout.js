import React from 'react'
import Footer from './Footer'

const Layout = props => {
  // const backgroundImageUrl = 'https://i.imgur.com/X3qo3Y7.jpg'

  const pageLayout = {
    // backgroundImage: `url(${backgroundImageUrl})`,
    backgroundSize: '',
    backgroundPosition: 'center',
    width: '100%'
  }

  return (
    <div style={pageLayout}>

      {props.children}

      <Footer />
    </div>
  )
}
export default Layout
