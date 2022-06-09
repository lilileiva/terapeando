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
export const getPostOrder = (order,arreglo) => {
    return function(dispatch){
        //me traigo el arreglo de las posts
        const notas = arreglo.slice()
        //empiezo a ordenar con short
        if(order === "Titulo de A-Z") notas.sort((a,b) => (a.Title > b.Title) ? 1 : -1)
        if(order === "Titulo de Z-A") notas.sort((a,b) => (a.Title > b.Title) ? -1 : 1)
        dispatch({type:"ORDER_POSTS", payload:notas})
    }
}
const putPsychologist = async ({firstname, lastname, birthdate, country ,email,
                                 profileimage, license, dni, specialities, education,
                                  password}) => {
    return axios.post(`${LOCAL_HOST}/userpsychologist`,{
        firstName:firstname,
        lastName:lastname,
        email:email,
        password:password,
        birthDate:birthdate,
        country:country,
        License:license,
        DNI:dni,
        Specialties:specialities,
        profileImage:profileimage,
        education:education,
})
.then(data => data)

}