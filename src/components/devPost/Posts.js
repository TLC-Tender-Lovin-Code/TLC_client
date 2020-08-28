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

const Posts = ({ msgAlert, user, match }) => {
  const [devposts, setDevposts] = useState([])
  const [deleted, setDeleted] = useState(null)
  console.log(devposts)
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
      const isSameUser = (user._id === devpost.owner)
      return <div key={devpost._id}>
        <Container className="viewpost">
          <Row>
            <Col>
              <Card style={{ width: '18rem' }} className="">
                <Card.Body>
                  <Card.Title>Title: {devpost.title}</Card.Title>
                  <Card.Subtitle>Subject: {devpost.subject}</Card.Subtitle>
                  <Card.Text>
                    Content: <br />{devpost.content}<br />
                    Written By:
                  </Card.Text>
                  {isSameUser ? (
                    <React.Fragment>
                      <button onClick={() => destroy(devpost._id)} className='btn btn-danger'>Delete Post</button>
                      <Link to={`/update-post/${devpost._id}`}>
                        <button className='btn btn-warning'>Update Post</button>
                      </Link>
                    </React.Fragment>
                  ) : ''}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    })

    return (
      <div className="">
        <div>
          <h4>Posts</h4>
          {postsToRender}
        </div>
      </div>
    )
  }
}

export default withRouter(Posts)
