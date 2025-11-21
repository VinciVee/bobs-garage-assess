/**
 * src/utils/setAuthToken.js
 * Set Token to be sent in http headers whenever an http request is sent from client-side
 */

import axios from "axios"

const setAuthToken = (token) => {
  console.log(token)

  if(token){
    axios.defaults.headers.common['x-auth-token'] = token
  } else {
    delete axios.defaults.headers.common['x-auth-token']
  }
}

export default setAuthToken
