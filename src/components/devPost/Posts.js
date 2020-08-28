import React, { useState, useEffect } from 'react'
import { viewPosts } from '../../api/devpost'
import { Link, withRouter } from 'react-router-dom'
import messages from '../AutoDismissAlert/messages'
import apiUrl from '../../apiConfig'
import axios from 'axios'
import { Card } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Layout from '../shared/Layout'

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
          <Card as="col-6-sm">
            <Card.Header as="h5">Written By:{devpost.owner.username}</Card.Header>
            <Card.Body>
              <Card.Title>Title: {devpost.title}</Card.Title>
              <Card.Subtitle>Subject: {devpost.subject}</Card.Subtitle>
              <Card.Text>
                Content: <br />{devpost.content}
              </Card.Text>
              {isSameUser ? (
                <React.Fragment>
                  <Button variant='basic' onClick={() => destroy(devpost._id)}>Delete Post</Button>
                  <Link to={`/update-post/${devpost._id}`}>
                    <Button variant='basic'>Update Post</Button>
                  </Link>
                </React.Fragment>
              ) : '' }
            </Card.Body>
          </Card>
        </div>
      </div>
    })
    return (
      <Layout>
        <div className="">
          <h2>Posts</h2>
          <div>
            {postsToRender}
          </div>
        </div>
      </Layout>
    )
  }
}

export default withRouter(Posts)
