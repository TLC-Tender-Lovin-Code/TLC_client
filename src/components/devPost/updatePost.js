import React, { useState, useEffect } from 'react'
import { Redirect, Link, withRouter } from 'react-router-dom'
import Layout from '../shared/Layout'
import messages from '../AutoDismissAlert/messages'
import { updatePost, showPost } from '../../api/devpost'

const UpdatePost = ({ msgAlert, user, match }) => {
  const [devpost, setDevpost] = useState({ title: '', subject: '', content: '' })
  const [updated, setUpdated] = useState(false)

  useEffect(() => {
    showPost(user, devpost, match.params.id)
      .then(res => setDevpost(res.data.devpost))
      .catch(console.error)
  }, [])

  const handleChange = event => {
    event.persist()
    setDevpost(prevDevpost => {
      const updatedField = { [event.target.name]: event.target.value }
      const editedPost = Object.assign({}, prevDevpost, updatedField)
      return editedPost
    })
  }

  const handleSubmit = event => {
    event.preventDefault()
    updatePost(user, devpost, match.params.id)
      .then(() => setUpdated({ updated: true }))
      .then(() => msgAlert({
        heading: 'Update Post Success',
        message: messages.updatePostSuccess,
        variant: 'success'
      }))
      .catch(() => msgAlert({
        heading: 'Failed To Update Post',
        message: messages.updatePostFailure,
        variant: 'danger'
      }))
  }

  if (updated) {
    return <Redirect to='/devposts' />
  }

  return (
    <Layout>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          placeholder="Enter a title"
          value={devpost.title}
          name="title"
          onChange={handleChange}
          type="text"
        /><br />

        <label>Subject</label>
        <input
          placeholder="Enter a subject"
          value={devpost.subject}
          name="subject"
          onChange={handleChange}
          type="text"
        /><br />

        <label>Content</label>
        <textarea
          placeholder="Enter text here ..."
          value={devpost.content}
          name="content"
          onChange={handleChange}
          type="text"
        /><br />

        <button className='btn btn-warning' type="submit">Update</button>
        <Link to='/'>
          <button className='btn btn-primary'>Cancel</button>
          <button type="submit">Update</button>
        </Link>
        <Link to='/'>
          <button>Cancel</button>
        </Link>
      </form>
    </Layout>
  )
}

export default withRouter(UpdatePost)
