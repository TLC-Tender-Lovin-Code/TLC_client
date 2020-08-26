import apiUrl from '../apiConfig'
import axios from 'axios'

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
