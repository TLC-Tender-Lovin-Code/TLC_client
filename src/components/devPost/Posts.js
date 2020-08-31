import React, { useState, useEffect } from 'react'
import { viewPosts } from '../../api/devpost'
import { Link, withRouter } from 'react-router-dom'
import messages from '../AutoDismissAlert/messages'
import apiUrl from '../../apiConfig'
import axios from 'axios'
import { Card } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Layout from '../shared/Layout'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const Posts = ({ msgAlert, user, match }) => {
  const [devposts, setDevposts] = useState([])
  const [deleted, setDeleted] = useState(false)
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
        <div className="viewpost">
          <Container>
            <Row>
              <Col xl={{ span: 12, offset: 3 }}>
                <Card style={{ backgroundColor: '#f7e7bd', width: '35rem', margin: '10px', opacity: '100%' }}>
                  <Card.Header as="h5" style={{ backgroundColor: '#a35d6a' }}>Title: {devpost.title}</Card.Header>
                  <Card.Body>
                    <Card.Title>Written By:{devpost.owner.username}</Card.Title>
                    <Card.Subtitle>Subject: {devpost.subject}</Card.Subtitle>
                    <Card.Text>
                      Content: <br />{devpost.content}
                    </Card.Text>
                    {isSameUser ? (
                      <React.Fragment>
                        <Button style={{ backgroundColor: '#c26565', borderColor: '#a35d6a', color: '#f7e7bd', borderRadius: '25px', margin: '10px' }} onClick={() => destroy(devpost._id)}>Delete Post</Button>
                        <Link to={`/update-post/${devpost._id}`}>
                          <Button style={{ backgroundColor: '#c26565', borderColor: '#a35d6a', color: '#f7e7bd', borderRadius: '25px', margin: '10px' }}>Update Post</Button>
                        </Link>
                      </React.Fragment>
                    ) : '' }
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    })
    return (
      <Layout>
        <div className="">
          <div>
            {postsToRender}
          </div>
        </div>
      </Layout>
    )
  }
}

export default withRouter(Posts)
