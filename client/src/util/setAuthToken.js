/**
 * src/utils/setAuthToken.js
 * Set Token to be sent in http headers whenever an http request is sent from client-side
 */

import api from "../services/api"

const setAuthToken = (token) => {
  console.log('setAuthToken: ', token)

  if(token){
    api.defaults.headers.common['x-auth-token'] = token
  } else {
    delete api.defaults.headers.common['x-auth-token']
  }
}

export default setAuthToken
