import React, { useState } from 'react'
import { Redirect, Link, withRouter } from 'react-router-dom'
import Layout from '../shared/Layout'
// import messages from '../AutoDismissAlert/messages'
import { updatePost } from '../../api/devpost'

const UpdatePost = ({ user, props }) => {
  const [devpost, setDevpost] = useState({ title: '', subject: '', content: '' })
  const [updated, setUpdated] = useState(false)

  const handleChange = event => {
    event.persist()
    setDevpost(prevDevpost => {
      const updatedField = { [event.target.name]: event.target.value }
      const editedPost = Object.assign({}, prevDevpost, updatedField)
      return { editedPost }
    })
  }

  const handleSubmit = event => {
    event.preventDefault()
    // const { user } = this.props
    updatePost(user, devpost)
      .then(() => setUpdated({ updated: true }))
      // .then(() => msgAlert({
      //   heading: 'Update Post Success',
      //   message: messages.updatePostSuccess,
      //   variant: 'success'
      // }))
      // .msgAlert({
      //   heading: 'Update Post Failed. ',
      //   message: messages.updatePostFailure,
      //   variant: 'danger'
      // })
      .catch(console.error)
  }

  if (updated) {
    return <Redirect to='/devposts' />
  }

  return (
    <Layout>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          placeholder="Enter a Title"
          value={devpost.title}
          name="title"
          onChange={handleChange}
        /><br />

        <label>Subject</label>
        <input
          placeholder="John Doe"
          value={devpost.subject}
          name="subject"
          onChange={handleChange}
        /><br />

        <label>Content</label>
        <textarea
          placeholder="Enter text here ..."
          value={devpost.content}
          name="content"
          onChange={handleChange}
        /><br />

        <button type="submit">Submit</button>
        <Link to='/'>
          <button>Cancel</button>
        </Link>
      </form>
    </Layout>
  )
}

export default withRouter(UpdatePost)
