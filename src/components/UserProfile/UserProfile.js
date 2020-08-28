import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const UserProfile = (props, user) => {
  const backgroundImageUrl = 'https://i.imgur.com/X3qo3Y7.jpg'

  const profileHeader = {
    color: 'white',
    backgroundImage: `url(${backgroundImageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: '75% 75%',
    height: '50vh',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '10px'
  }

  const userPosts = {
    color: 'blue',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start'
  }

  const userView = {
    color: '#f7e7bd',
    display: 'flex'
  }

  return (
    <div>
      <div style={profileHeader}>
        <h1>Welcome to your Den</h1>
        <div>
          <Link to='/'>
            <button className="btn btn-primary">Home</button>
          </Link>
          <Link to='/devposts'>
            <button className="btn btn-primary">Dev Den</button>
          </Link>
        </div>
      </div>
      <div style={userView}>
        <Container>
          <Row>
            <Col>
              <div>
                <Card bg="primary" style={{ width: '18rem' }}>
                  <Card.Title>USERNAME</Card.Title>
                  <Card.Img variant="top" src="https://i.imgur.com/UoH44sU.jpg/100px180" />
                  <Card.Body>
                    <Card.Subtitle>EMAIL</Card.Subtitle>
                    <Card.Text>
                        Date Joined
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
            </Col>

            <Col sm={8}>
              <div style={userPosts}>
                {props.children}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  )
}

export default UserProfile