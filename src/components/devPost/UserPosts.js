import React, { useState, useEffect } from 'react'
import { viewPosts } from '../../api/devpost'
import { Link, withRouter } from 'react-router-dom'
import messages from '../AutoDismissAlert/messages'
import apiUrl from '../../apiConfig'
import axios from 'axios'
import { Card } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import UserProfile from '../UserProfile/UserProfile'
import Button from 'react-bootstrap/Button'

const Posts = ({ msgAlert, user, match }) => {
  const [devposts, setDevposts] = useState([])
  const [deleted, setDeleted] = useState(null)

  useEffect(() => {
    viewPosts(user, devposts)
      .then(res => setDevposts(res.data.devposts))
      .catch(console.error)
  }, [deleted])
  const destroy = (id) => {
    axios({
      url: apiUrl + `/devposts/${id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
      .then(() => setDeleted(id))
      .then(() => msgAlert({
        heading: 'Delete Post Success',
        message: messages.deletePostSuccess,
        variant: 'success'
      }))
      .catch(() => msgAlert({
        heading: 'Delete Post Failure',
        message: messages.deletePostFailure,
        variant: 'danger'
      }))
  }

  let postsToRender
  if (devposts) {
    postsToRender = devposts.map(devpost => {
      const isSameUser = (user._id === devpost.owner._id)
      return <div key={devpost._id}>
        <Container className="viewpost">
          <Row>
            <Col>
              {isSameUser ? (
                <React.Fragment>
                  <Card border="warning" style={{ width: '36rem' }} className="profile-cards">
                    <Card.Body>
                      <Card.Title>Title: {devpost.title}</Card.Title>
                      <Card.Subtitle>Subject: {devpost.subject}</Card.Subtitle>
                      <Card.Text>
                    Content: <br />{devpost.content}<br />
                    Written By:{devpost.owner.username} {/* we would like to access the username here. */}
                      </Card.Text>

                      <Button onClick={() => destroy(devpost._id)} style={{ backgroundColor: '#c26565', borderColor: '#a35d6a', color: '#f7e7bd', borderRadius: '25px', margin: '10px' }}>Delete Post</Button>
                      <Link to={`/update-post/${devpost._id}`}>
                        <Button style={{ backgroundColor: '#c26565', borderColor: '#a35d6a', color: '#f7e7bd', borderRadius: '25px', margin: '10px' }}>Update Post</Button>
                      </Link>
                    </Card.Body>
                  </Card>
                </React.Fragment>
              ) : ''}
            </Col>
          </Row>
        </Container>
      </div>
    })

    return (
      <UserProfile>
        <div className="">
          <h4>Posts</h4>
          <div className="">
            {postsToRender}
          </div>
        </div>
      </UserProfile>
    )
  }
}

export default withRouter(Posts)
