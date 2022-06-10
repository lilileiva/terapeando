import Swal from 'sweetalert2';
import axios from 'axios';
import { GET_ALL_PSYCHOLOGIST, FETCH_USERCLIENT, LOCAL_HOST } from './types';

const baseURL = process.env.REACT_APP_API || LOCAL_HOST;


export function fetchUserClient() {
    return function (dispatch) {
        axios.get(`${baseURL}/userclient`)
            .then((client) => {
                dispatch({
                    type: FETCH_USERCLIENT,
                    payload: client.data
                })
            })
            .catch((err) => console.log(err))
    }
}

export const getAllPosts = () => {
    //me traigo todas las notas de mi db y si no tengo notas muestro el error
    return async function (dispatch) {
        const responseApi = await fetch(`${baseURL}/posts`)
        const json = await responseApi.json()
        if (responseApi) {
            dispatch({ type: "GET_POSTS", payload: json })
        } else {
            Swal.fire('Error', 'No Hay Notas Disponibles Vuelve a Intentar', 'error')
        }
    }
}

export const searchPostsByTitle = (title) => {
    return async function (dispatch) {
        try {
            let posts = await axios.get(`${baseURL}/blog?title=` + title)
            return dispatch({
                type: "SEARCH_POSTS_BY_TITLE",
                payload: posts.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export const getPostOrder = (order, arreglo) => {
    return function (dispatch) {
        //me traigo el arreglo de las posts
        const notas = arreglo.slice()
        //empiezo a ordenar con short
        if (order === "Titulo de A-Z") notas.sort((a, b) => (a.Title > b.Title) ? 1 : -1)
        if (order === "Titulo de Z-A") notas.sort((a, b) => (a.Title > b.Title) ? -1 : 1)
        dispatch({ type: "ORDER_POSTS", payload: notas })
    }
}

////////////////// Post para los user Psychologist ///////////////////

export const postPsychologist = async ({ firstname, lastname, birthdate, country, email,
    profileimage, license, dni, specialities, education,
    password, about }) => {
    return axios.post(`${baseURL}/userpsychologist`, {
        firstName: firstname,
        lastName: lastname,
        email: email,
        password: password,
        birthDate: birthdate,
        country: country,
        License: license,
        DNI: dni,
        Specialties: specialities,
        profileImage: profileimage,
        education: education,
        about: about
    })
        .then(data => data)
}

/////// GET para obetener todos los psychologist ////////


export const getAllPsychologist = ()  => {
    return async function (dispatch) {

        try {
            const json = await axios.get(`${baseURL}/userpsychologist`)
            dispatch({
                type: GET_ALL_PSYCHOLOGIST,
                payload: json.data
            })

        } catch (error) {
            Swal.fire('Error', 'No Hay Psicologos Para Mostrar', 'error')
        }
    }
}
/////////       post para los userClient        /////////

export const postUserClient = async ({ firstName, lastName, email, password, birthDate, country, profileImage }) => {
    return axios.post(`${baseURL}/userClient`, {
        firstName,
        lastName,
        email,
        password,
        birthDate,
        country,
        profileImage
    })
        .then(data => data)

}

