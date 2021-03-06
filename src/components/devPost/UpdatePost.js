import React, { useState, useEffect } from 'react'
import { Redirect, Link, withRouter } from 'react-router-dom'
import Layout from '../shared/Layout'
import messages from '../AutoDismissAlert/messages'
import { updatePost, showPost } from '../../api/devpost'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

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
      <div className="row">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                placeholder="Enter a title"
                value={devpost.title}
                name="title"
                onChange={handleChange}
                type="text"
              /><br />
            </Form.Group>
            <Form.Group controlId="subject">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                placeholder="Enter a subject"
                value={devpost.subject}
                name="subject"
                onChange={handleChange}
                type="text"
              /><br />
            </Form.Group>
            <Form.Group controlId="content">
              <label>Content</label>
              <Form.Control
                as="textarea"
                placeholder="Enter text here ..."
                value={devpost.content}
                name="content"
                onChange={handleChange}
                type="text"
                rows="4"
              /><br />
            </Form.Group>
            <Button style={{ backgroundColor: '#c26565', borderColor: '#a35d6a', color: '#f7e7bd', borderRadius: '25px', margin: '10px' }} type="submit">Update</Button>
            <Link to='/'>
              <Button style={{ backgroundColor: '#c26565', borderColor: '#a35d6a', color: '#f7e7bd', borderRadius: '25px', margin: '10px' }}>Cancel</Button>
            </Link>
          </Form>
        </div>
      </div>
    </Layout>
  )
}

export default withRouter(UpdatePost)
