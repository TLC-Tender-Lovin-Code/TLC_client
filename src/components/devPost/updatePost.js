import React, { useState, useEffect } from 'react'
import { Redirect, Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Layout from '../shared/Layout'
import messages from '../AutoDismissAlert/messages'

const UpdatePost = props => {
  const [post, setPost] = useState({ title: '', subject: '', content: '' })
  const [updated, setUpdated] = useState(false)

  useEffect(() => {
    axios(`${apiUrl}/posts/${props.match.params.id}`)
      .then(res => setPost(res.data.devpost))
      .catch(console.error)
  }, [])

  const handleChange = event => {
    event.persist()

    setPost(prevPost => {
      const updatedField = { [event.target.name]: event.target.value }

      const editedPost = Object.assign({}, prevPost, updatedField)

      return { editedPost }
    })
  }

  const handleSubmit = event => {
    event.preventDefault()

    const { msgAlert, user } = this.props

    axios({
      url: `${apiUrl}/devposts/${props.match.params.id}`,
      method: 'PATCH',
      data: { post },
      headers: {
        'Authorization': `Token token=${user.token}`
      }
    })
      .then(() => setUpdated({ updated: true }))
      .then(() => msgAlert({
        heading: 'Update Post Success',
        message: messages.updatePostSuccess,
        variant: 'success'
      }))
      .msgAlert({
        heading: 'Change Password Failed. ',
        message: messages.updatePostFailure,
        variant: 'danger'
      })
  }

  if (updated) {
    return <Redirect to={`/posts/${props.match.params.id}`} />
  }

  return (
    <Layout>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          placeholder="Enter a Title"
          value={post.title}
          name="title"
          onChange={handleChange}
        />

        <label>Subject</label>
        <input
          placeholder="John Doe"
          value={post.subject}
          name="subject"
          onChange={handleChange}
        />

        <label>Content</label>
        <textarea
          placeholder="Enter text here ..."
          value={post.content}
          name="content"
          onChange={handleChange}
        />

        <button type="submit">Submit</button>
        <Link to='/'>
          <button>Cancel</button>
        </Link>
      </form>
    </Layout>
  )
}

export default UpdatePost
