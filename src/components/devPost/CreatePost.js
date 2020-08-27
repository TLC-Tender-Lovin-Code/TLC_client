import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
// import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
// import apiUrl from '../../apiConfig'
import { createPost } from '../../api/devpost'
import messages from '../AutoDismissAlert/messages'

const PostCreate = ({ msgAlert, user }) => {
  const [devpost, setDevpost] = useState({ title: '', subject: '', content: '' })
  const [createdPostId, setCreatedPostId] = useState(null)

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
    // const msgAlert = this.props
    createPost(user, devpost)
      .then(res => setCreatedPostId(res.data.devpost._id))
      .then(() => msgAlert({
        heading: 'Create Post Success',
        message: messages.createPostSuccess,
        variant: 'success'
      }))
      .catch(() => msgAlert({
        heading: 'Failed To Create Post: ',
        message: messages.createPostFailure,
        variant: 'danger'
      }))
  }

  if (createdPostId) {
    return <Redirect to={`/devpost/${createdPostId}`} />
  }

  return (
    <div className="row">
      <div className="col-sm-10 col-md-8 mx-auto mt-5">
        <h3>Create New Post</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              required
              type="title"
              name="title"
              value={devpost.title}
              placeholder="Enter title"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="subject">
            <Form.Label>Subject</Form.Label>
            <Form.Control
              required
              name="subject"
              value={devpost.subject}
              type="text"
              placeholder="Subject"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="content">
            <Form.Label>Content</Form.Label>
            <Form.Control
              required
              name="content"
              value={devpost.content}
              type="text"
              placeholder="Content"
              onChange={handleChange}
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
          >
            Submit
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default PostCreate
