import Swal from 'sweetalert2';
import axios from 'axios';
import { FETCH_USERCLIENT, LOCAL_HOST } from './types';

const baseURL = process.env.REACT_APP_API || LOCAL_HOST;


export function fetchUserClient(){
   return function(dispatch){
      axios.get(`/userclient`)
      .then((client) => {
         dispatch({
            type: FETCH_USERCLIENT,
            payload: client
         })
      })
      .catch((err) => console.log(err))
   }
}

export const getAllPosts = () => {
    //me traigo todas las notas de mi db y si no tengo notas muestro el error
    return async function(dispatch){
        const responseApi = await fetch(`${baseURL}/posts`)
        const json = await responseApi.json()
        if(responseApi){
            dispatch({type:"GET_POSTS", payload:json})
        }else{
            Swal.fire('Error','No Hay Notas Disponibles Vuelve a Intentar','error')
        }
    }
}