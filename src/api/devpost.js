import apiUrl from '../apiConfig'
import axios from 'axios'
// import { withRouter } from 'react-router-dom'

export const createPost = (user, devpost) => {
  return axios({
    url: apiUrl + '/create-post',
    method: 'POST',
    data: { devpost },
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}

export const viewPosts = (user, devpost) => {
  return axios({
    url: apiUrl + '/devposts',
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}

export const showPost = (user, devpost, id) => {
  return axios({
    url: apiUrl + `/devposts/${id}`,
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}

export const updatePost = (user, devpost, id) => {
  return axios({
    url: `${apiUrl}/devposts/${id}`,
    method: 'PATCH',
    data: { devpost },
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}
