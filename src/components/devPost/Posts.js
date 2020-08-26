import React, { useState, useEffect } from 'react'
import { viewPosts } from '../../api/devpost'

const Posts = ({ user }) => {
  const [devposts, setDevposts] = useState([])

  useEffect(() => {
    viewPosts(user, devposts)
      .then(res => setDevposts(res.data.devposts))
      .catch(console.error)
  }, [])

  let postsToRender
  if (devposts) {
    postsToRender = devposts.map(devpost => {
      return <div key={devpost._id}>
        <h4>{devpost.title}</h4>
        <h6>Subject: {devpost.subject}</h6>
        <p>Content: {devpost.content}</p>
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

export default Posts
