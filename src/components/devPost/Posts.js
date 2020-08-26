import React, { useState, useEffect } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { Link } from 'react-router-dom'

const Posts = props => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    axios(`${apiUrl}/devposts`)
      // .then(res => this.setState({ books: res.data.books }))
      .then(res => setPosts(res.data.devpost))
      .catch(console.error)
  }, [])

  let postsToRender
  if (posts) {
    postsToRender = posts.map(post => {
      return <li key={post._id}>
        <Link to={`/devposts/${post._id}`}>{post.title}</Link>
      </li>
    })
    return (
      <div>
        <h4>Posts</h4>
        <ul>
          {postsToRender}
        </ul>
      </div>
    )
  }
}

export default Posts
