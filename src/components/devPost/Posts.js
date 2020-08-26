import React, { useState, useEffect } from 'react'
import { viewPosts } from '../../api/devpost'
import { Redirect, withRouter } from 'react-router-dom'
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
      .catch(console.error)
    if (deleted) {
      return (
        <Redirect to={{
          pathname: '/devposts'
        }} />
      )
    }
  }
  // destroy()
  //   .then(() => setDeleted(true))
  //   .then(() => msgAlert({
  //     heading: 'Delete Post Success',
  //     message: messages.createPostSuccess,
  //     variant: 'success'
  //   }))
  //   .catch(console.error)
  // if (deleted) {
  //   return (
  //     <Redirect to={{
  //       pathname: '/'
  //     }} />
  //   )
  // }
  let postsToRender
  if (devposts) {
    postsToRender = devposts.map(devpost => {
      return <div key={devpost._id}>
        <h4>{devpost.title}</h4>
        <h6>Subject: {devpost.subject}</h6>
        <p>Content: {devpost.content}</p>
        <button onClick={() => destroy(devpost._id)} className='btn btn-danger'>Delete Post</button>
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
