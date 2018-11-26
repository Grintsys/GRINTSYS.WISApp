// a library to wrap and simplify api calls
import apisauce from 'apisauce'
import Secrets from 'react-native-config'
let qs = require('querystringify');

// our "constructor"
const create = (baseURL = Secrets.WIS_API_URL) => {
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
      'Cache-Control': 'no-cache',
      'Accept': 'application/json',
    },
    // 10 second timeout...
    timeout: 10000
  })

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  
  const doLogin = (username, password) => api.post(`/users/login`, { username: username, password: password})
  const getStudent = (username) => api.get(`/student/${username}$`)
  const getStudentData = (student) => api.get(`student/${student}/data`)
  const getStudents = (username) => api.get(`/students/${username}`)
  const getHomeWork = (grade, section) => api.get(`/homework/${grade}.${section}`)
  const getNews = () => api.get(`/news`)
  const getPayments = (grade, plancod) => api.get(`/payments/${grade}.${plancod}`)
  const getGrades = (grade, section, student, partial) => api.get(`/grades/${grade}.${section}.${student}.${partial}`)
  const getAverage = (grade, section, student, partial) => api.get(`/grades/average/${grade}.${section}.${student}.${partial}`)

  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    doLogin,
    getStudent,
    getStudentData,
    getStudents,
    getHomeWork,
    getNews,
    getPayments,
    getGrades,
    getAverage
  }
}

// let's return back our create method as the default.
export default {
  create
}
