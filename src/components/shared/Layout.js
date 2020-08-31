import React from 'react'
import Footer from './Footer'

const Layout = props => {
  const pageLayout = {
    backgroundColor: '#f7e7bd',
    // when I tried to update the opacity on the background image, this also affected the cards.
    // I tried to change the opacity on the cards back but that didn't work. So I gave up on opacity.
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
