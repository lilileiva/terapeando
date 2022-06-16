import Swal from "sweetalert2";
import axios from "axios";

import {
  GET_ALL_PSYCHOLOGIST,
  GET_ALL_USERCLIENTS,
  GET_USERCLIENT,
  LOCAL_HOST,
  CLEAR,
  CLEAR_CLIENT
} from "./types";

const baseURL = process.env.REACT_APP_API || LOCAL_HOST;



export function getAllUserClients() {
  return async function (dispatch) {
    fetch(`${baseURL}/userclient/clients`)
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: GET_ALL_USERCLIENTS,
          payload: data
        })
      })
  }
}

export function getUserClient(idUserClient) {
  return function (dispatch) {
    axios
      .get(`${baseURL}/userclient/client/${idUserClient}`)
      .then((client) => {
        dispatch({
          type: GET_USERCLIENT,
          payload: client.data,
        });
      })
      .catch((err) => console.log(err));
  };
}
// export async function signIn(payload) {
//   return function(dispatch){
//     try {
//       const userToken = await axios.post(`${baseURL}/userclient/client/login`, payload)
//       const token = userToken.data.token
//       window.localStorage.setItem('token', token)
//       console.log(userToken.data)
//       console.log(token)
//      return userToken
//     } catch (error) {
//       console.error(error)
//     }
//   }
// }

export const getAllPosts = () => {
  //me traigo todas las notas de mi db y si no tengo notas muestro el error
  return async function (dispatch) {
    const responseApi = await fetch(`${baseURL}/posts`);
    const json = await responseApi.json();
    if (responseApi) {
      dispatch({ type: "GET_POSTS", payload: json });
    } else {
      Swal.fire("Error", "No Hay Notas Disponibles Vuelve a Intentar", "error");
    }
  };
};
//buscar notas por titulo
export const searchPostsByTitle = (title) => {
  return async function (dispatch) {
    try {
      let posts = await axios.get(`${baseURL}/posts?title=${title}`);
      if (posts.data.length) {
        dispatch({
          type: "SEARCH_POSTS_BY_TITLE",
          payload: posts.data,
        });
      } else {
        dispatch({ type: "SEARCH_POSTS_BY_TITLE", payload: posts.data });
        Swal.fire(
          "Error",
          "No hay notas disponibles. Vuelve a intentar. No buscar letras ni carácteres especiales.",
          "error"
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getPostOrder = (order, arreglo) => {
  return function (dispatch) {
    //me traigo el arreglo de las posts
    const notas = arreglo.slice();
    //empiezo a ordenar con sort
    if (order === "Titulo de A-Z")
      notas.sort((a, b) => (a.Title > b.Title ? 1 : -1));
    if (order === "Titulo de Z-A")
      notas.sort((a, b) => (a.Title > b.Title ? -1 : 1));
    dispatch({ type: "ORDER_POSTS", payload: notas });
  };
};
//obtener todas las categorias
export const getCategories = () => {
  return async function (dispatch) {
    try {
      const responseBack = await fetch(`${baseURL}/categories`);
      const jsonBack = await responseBack.json();
      //envio todas las categorias de mi db
      dispatch({ type: "GET_CATEGORIES", payload: jsonBack });
    } catch (e) {
      console.log(e);
    }
  };
};
//mostrar por categoria
export const getByCategory = (category) => {
  return async function (dispatch) {
    try {
      const responseBack = await fetch(`${baseURL}/filter/${category}`);
      const jsonBack = await responseBack.json();
      //envio las notas que se filtren con esa catagory
      dispatch({ type: "GET_BY_CATEGORY_POST", payload: jsonBack });
    } catch (error) {
      console.log(error);
    }
  }
}
//crear una nota
export const addPost = (body) => {
  return async function (dispatch){
    try {
      const {info} = await axios.post(
        `${baseURL}/post`,body
      )
      return dispatch({
        type: "CREATE_POST",
        payload: info
      })     
    } catch (error) {
      console.log(error)
    }
  }
}

export function getPostDetail(id) {
  return async function (dispatch) {
    try {
      let detail = await axios.get(`${baseURL}/post/${id}`);
      return dispatch({
        type: "GET_POST_DETAIL",
        payload: detail.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export const clearStatePostDetail = () => {
  return {
    type: "CLEAR_POST_DETAIL",
  };
};

////////////////// Post para los user Psychologist ///////////////////

/////// GET para obetener todos los psychologist ////////

export function createPsychologist(signupForm) {
  return async function (dispatch) {
    try {
      return await fetch(`${baseURL}/userpsychologist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupForm),
      })
        .then((res) => res.json())
        .then((data) => {
          dispatch({
            type: "CREATE_PSYCHOLOGIST",
            payload: data,
          });
        });
    } catch (error) {
      console.error(error)
    }
  };
}

/////// GET para obetener todos los psychologist ////////

export const getUserPsychologist = () => {
  return async function (dispatch) {
    try {
      const psychologist = await axios.get(`${baseURL}/userpsychologist`);
      dispatch({
        type: "GET_PSYCHOLOGISTS",
        payload: psychologist.data,
      });
    } catch (error) {
      Swal.fire("Error", "No Hay Psicologos Para Mostrar", "error");
    }
  };
};

//getPsychologist by email
export function getPsychologistByEmail(signupForm) {
  return async function (dispatch) {
    try {
      return await fetch(`${baseURL}/userpsychologist/email/psychologistEmail`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupForm),
      })
        .then((res) => res.json())
        .then((data) => {
          dispatch({
            type: "GET_EMAIL_PSY",
            payload: data,
          });
        });
    } catch (error) {
      console.error(error)
    }
  };
}
// export const getPsychologistByEmail = (email) => {
//   return async function(dispatch) {
//     const psychologist = await axios.get(`${baseURL}/userpsychologist/email/psychologistEmail`, email)
//     dispatch({
//       type: "GET_EMAIL_PSY",
//       payload: psychologist.data
//     })
//   } 
// }

////// GET para obtener un solo psychologist //////

export const getUserPsychologistOne = (IdUserPsychologist) => {
  return async function (dispatch) {
    try {
      const psychologist = await axios.get(
        `${baseURL}/userpsychologist/${IdUserPsychologist}`
      );
      dispatch({
        type: "GET_PSYCHOLOGISTS_ONE",
        payload: psychologist.data,
      });
    } catch (error) {
      Swal.fire("Error", "No Hay Psicologos Para Mostrar", "error");
    }
  };
};

//Clean detail state
export function clear() {
  return {
    type: CLEAR,
  };
}

export function clearClient() {
  return {
    type: CLEAR_CLIENT,
  };
}

export const getAllPsychologist = () => {
  return async function (dispatch) {
    try {
      const json = await axios.get(`${baseURL}/userpsychologist`);
      dispatch({
        type: GET_ALL_PSYCHOLOGIST,
        payload: json.data,
      });
    } catch (error) {
      Swal.fire("Error", "No Hay Psicologos Para Mostrar", "error");
    }
  };
};
/////////       post para los userClient        /////////

export function createClient(payload) {
  return async function (dispatch) {
    try {
      return await fetch(`${baseURL}/userclient/client/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((res) => res.json())
        .then((data) => {
          dispatch({
            type: "CREATE_CLIENT",
            payload: data,
          });
        });
    } catch (error) {
      return console.log(error);
    }
  };
}

export function editClient(id, updatedUserClient) {
  return async function () {
    try {
      const data = await axios.put(
        `${baseURL}/userclient/${id}`,
        updatedUserClient
      );
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
}

export function deleteUserClient(id) {
  return async function () {
    try {
      await axios.delete(`${baseURL}/userclient/deleteuserclient/${id}`);
    } catch (err) {
      console.log(err);
    }
  };
}

export function createReview(payload) {
  return async function () {
    try {
      const newReview = axios.post(`${baseURL}/reviews`, payload);
      return newReview;
    } catch (error) {
      console.log(error);
    }
  };
}
