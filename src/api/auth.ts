import axios from 'axios'

//define url of api in axios
axios.defaults.baseURL = 'http://localhost:3000/'

export async function login(username: string, password: string) {
  const response = await axios.post('/auth/login', { username, password })
  //check if response is unauthorized
  if (response.status === 401) {
    return "Unauthorized"
  }
  return response.data.access_token
}

//get movies with baeer token
export async function getMovies(token: string) {
  const response = await axios.get('/movies', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

export async function searchMovie(token: string, title: string) {
  const response = await axios.get(`/omdb/search?search=${title}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}




