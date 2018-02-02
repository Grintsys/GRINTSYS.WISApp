// a library to wrap and simplify api calls
import apisauce from 'apisauce'
import Secrets from 'react-native-config'

// our "constructor"
const create = (baseURL = Secrets.GHOST_API_URL) => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache'
    },
    // 10 second timeout...
    timeout: 10000
  })

  const getBlogPosts = () => api.get(`/posts?client_id=${Secrets.GHOST_API_CLIENT_ID}&client_secret=${Secrets.GHOST_API_SECRET}`)
  const getBlogPostsToken = (access_token) => api.get(`/posts?access_token=${access_token}`)

  return {
    // a list of the API functions from step 2
    getBlogPosts,
    getBlogPostsToken
  }
}

const auth = (baseURL = Secrets.GHOST_API_URL) => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache'
    },
    // 10 second timeout...
    timeout: 10000
  })

  const getToken = () => api.get(`/posts/?client_id=${Secrets.GHOST_API_CLIENT_ID}&client_secret=${Secrets.GHOST_API_SECRET}`)


  return {
    // a list of the API functions from step 2
    getToken,
  }
}

// let's return back our create method as the default.
export default {
  create,
  auth
}
