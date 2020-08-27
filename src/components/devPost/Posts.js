import React, { useState, useEffect } from 'react'
import { viewPosts } from '../../api/devpost'
import { Link, Redirect, withRouter } from 'react-router-dom'
import messages from '../AutoDismissAlert/messages'
import apiUrl from '../../apiConfig'
import axios from 'axios'

const Posts = ({ msgAlert, user, match }) => {
  const [devposts, setDevposts] = useState([])
  const [deleted, setDeleted] = useState(false)

  useEffect(() => {
    viewPosts(user, devposts)
      .then(res => setDevposts(res.data.devposts))
      .catch(console.error)
  }, [])
  const destroy = (id) => {
    axios({
      url: apiUrl + `/delete-post/${id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
      .then(() => setDeleted(true))
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
  if (deleted) {
    return (
      <Redirect to={{
        pathname: '/devposts'
      }} />
    )
  }

  let postsToRender
  if (devposts) {
    postsToRender = devposts.map(devpost => {
      return <div key={devpost._id}>
        <h4>{devpost.title}</h4>
        <h6>Subject: {devpost.subject}</h6>
        <p>Content: {devpost.content}</p>
        <button onClick={() => destroy(devpost._id)} className='btn btn-danger'>Delete Post</button>
        <Link to={`/update-post/${devpost._id}`}>
          <button>Update Post</button>
        </Link>
      </div>
    })

    return (
      <div>
        <h4>Posts</h4>
        <div>
          {postsToRender}
        </div>
      </div>
    )
  }
}

export default withRouter(Posts)
