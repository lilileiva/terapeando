import Swal from "sweetalert2";
import axios from "axios";

import {
  GET_ALL_USERCLIENTS,
  GET_USER_CLIENTS_BY_NAME,
  GET_USERCLIENT,
  LOGIN_CLIENT,
  CREATE_CLIENT,
  GET_ALL_PSYCHOLOGIST,
  GET_USER_PSYCHOLOGISTS_BY_NAME,
  GET_POSTS,
  LOCAL_HOST,
  CLEAR_PSYCHOLOGIST,
  CLEAR_CLIENT,
  FILTER_PSICHOLOGIST_BY_SPECIALTIES,
  ORDER_PSICHOLOGIST_BY_RATING,
  CLEAR_CLIENT_LIST,
  CLEAR_PSYCHOLOGIST_LIST,
  ADMIN_SEARCHBAR,
} from "./types";


const baseURL = process.env.REACT_APP_API || LOCAL_HOST;


/*-------------------USER CLIENT ACTIONS----------------*/
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
      .catch((err) => console.log(err));
  }
}

export function getUserClientsByName(name) {
  return async function (dispatch) {
    fetch(`${baseURL}/userclient/clients?name=${name}`)
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: GET_USER_CLIENTS_BY_NAME,
          payload: data
        });
      })
      .catch((err) => console.log(err));
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
            type: CREATE_CLIENT,
            payload: data,
          });
        });
    } catch (error) {
      return console.log(error);
    }
  };
}

export function loginClient(signinForm) {
  return async function (dispatch) {
    try {
      return await fetch(`${baseURL}/userclient/client/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signinForm),
      })
        .then((res) => res.json())
        .then((data) => {
          dispatch({
            type: LOGIN_CLIENT,
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


/*-----------------------USER PSYCHOLOGIST ACTIONS---------------------------*/
//GET para obetener todos los psychologist

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

//GET para obtener los psicologos por nombre

export function getUserPsychologistByName(name) {
  return async function (dispatch) {
    fetch(`${baseURL}/userpsychologist?name=${name}`)
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: GET_USER_PSYCHOLOGISTS_BY_NAME,
          payload: data
        });
      })
      .catch((err) => console.log(err));
  }
}

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

//GET para obtener un solo psychologist
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

//Post para los user Psychologist
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

// DELETE user psychologist

export function deleteUserPsichologist(id) {
  return async function () {
    try {
      await axios.delete(`${baseURL}/userpsychologist/deleteuserpsychologist/${id}`);
    } catch (error) {
      console.error(error);
    } 
  };
};

// PUT para editar usuario psicologo 

export function editUserPsichologist(id , updatedUserPsychologist ){
  return async function (){
    try{
      const editPsichologist = axios.put(`${baseURL}/userpsychologist/put_userpsychologist/${id}`, updatedUserPsychologist)
    }catch(error){
      console.error(error)
    }
  }
}



// filtrar psicologs por  especialidad 


export function getBySpecialties(payload) {
  return {
    type: FILTER_PSICHOLOGIST_BY_SPECIALTIES,
    payload: payload
  }
};

// ordenar psicolofos por calificacion

export function orderByRating(order, array) {
  return function (dispatch) {
    //me traigo el arreglo de las posts
    const psicologos = array.slice();
    //empiezo a ordenar con sort
    if (order === "Desendente")
      psicologos.sort((a, b) => (a.rating > b.rating ? 1 : -1));
    if (order === "Ascendente")
      psicologos.sort((a, b) => (a.rating > b.rating ? -1 : 1));
    dispatch({ type: ORDER_PSICHOLOGIST_BY_RATING, payload: psicologos });
  };
};





/*------------------------POST ACTIONS----------------------*/
export const getAllPosts = () => {
  //me traigo todas las notas de mi db y si no tengo notas muestro el error
  return async function (dispatch) {
    const responseApi = await fetch(`${baseURL}/posts`);
    const json = await responseApi.json();
    if (responseApi) {
      dispatch({ type: GET_POSTS, payload: json });
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

export function getPostDetail(id) {
  return async function (dispatch) {
    try {
      let detail = await axios.get(`${baseURL}/post/${id}`, {headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
      return dispatch({
        type: "GET_POST_DETAIL",
        payload: detail.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

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

//crear una nota
export const addPost = (body) => {
  return async function (dispatch) {
    try {
      const { info } = await axios.post(
        `${baseURL}/post`, body,  {headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      }
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
//eliminar nota
export const deletePost = (id) => {
  return async function (dispatch){
    try {
      await axios.delete(`${baseURL}/deletePost/${id}`)
      dispatch({type:"DELETE_POST", payload:id})
    } catch (error) {
      console.log(error)
    }
  }
}

/*---------------------CATEGORIES ACTIONS------------------*/
//obtener todas las categorias
export const getCategories = () => {
  return async function (dispatch) {
    try {
      const responseBack = await fetch(`${baseURL}/categories`);
      const jsonBack = await responseBack.json();
      //envio todas las categorias de mi db
      dispatch({ type: "GET_CATEGORIES", payload: jsonBack });
    } catch (e) {
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

export const clearStatePostDetail = () => {
  return {
    type: "CLEAR_POST_DETAIL",
  };
};




/*---------------------REVIEWS ACTIONS-------------------*/

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

/*---------------------CLEAR ACTIONS-------------------*/
//Clean detail state
export function clear() {
  return {
    type: CLEAR_PSYCHOLOGIST,
  };
}

export function clearClient() {
  return {
    type: CLEAR_CLIENT,
  };
}

export function clearClientList() {
  return {
    type: CLEAR_CLIENT_LIST,
  };
}

export function clearPsychologistList() {
  return {
    type: CLEAR_PSYCHOLOGIST_LIST,
  };
}

/*---------------------ADMIN SEARCHBAR ACTION-------------------*/
export function adminSearchbar(inputText) {
  return {
    type: ADMIN_SEARCHBAR,
    payload: inputText

  };
};






