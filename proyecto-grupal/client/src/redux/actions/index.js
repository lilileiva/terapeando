import axios from 'axios';
import { FETCH_USERCLIENT, LOCAL_HOST } from './types';

const baseURL = process.env.REACT_APP_API || LOCAL_HOST;


export function fetchUserClient(){
   return function(dispatch){
      axios.get(`/userclient/${payload}`)
      .then((client) => {
         dispatch({
            type: FETCH_USERCLIENT,
            payload: client
         })
      })
      .catch((err) => console.log(err))
   }
}