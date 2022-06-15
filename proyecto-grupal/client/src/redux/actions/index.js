import Swal from "sweetalert2";
import axios from "axios";
import { GET_ALL_PSYCHOLOGIST, GET_USERCLIENT, LOCAL_HOST, CLEAR, CLEAR_CLIENT} from "./types";
const baseURL = process.env.REACT_APP_API || LOCAL_HOST;


export function getUserClient(idUserClient) {
    return function (dispatch) {
        axios.get(`${baseURL}/userclient/client/${idUserClient}`)
            .then((client) => {
                dispatch({
                    type: GET_USERCLIENT,
                    payload: client.data
                })
            })
            .catch((err) => console.log(err))
    }}

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
          "No hay notas disponibles vuelve a intentar, no escribir letras ni caracteres especiales para la busqueda solamente caracteres validos",
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

export function getPostDetail(id) {
  return async function(dispatch) {
    try {
      let detail = await axios.get(`${baseURL}/posts/${id}`)
      return dispatch({
        type: "GET_POST_DETAIL",
        payload: detail.data,
      })
    } catch (error) {
      console.log(error)
    }
  }
}

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
      return console.log(error);
    }
  };
}

/////// GET para obetener todos los psychologist ////////

export const getUserPsychologist = () => {
  return function (dispatch) {
    axios.get(`${baseURL}/userpsychologist`).then((psychologist) => {
      dispatch({
        type: "GET_PSYCHOLOGISTS",
        payload: psychologist.data,
      });
    });
  };
};

////// GET para obtener un solo psychologist //////

export const getUserPsychologistOne = (IdUserPsychologist) => {
  return function (dispatch) {
    axios
      .get(`${baseURL}/userpsychologist/${IdUserPsychologist}`)
      .then((psychologist) => {
        dispatch({
          type: "GET_PSYCHOLOGISTS_ONE",
          payload: psychologist.data,
        });
      });
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
      return await fetch(`${baseURL}/userclient/client`, {
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
    try{
      const data = await axios.put(`${baseURL}/userclient/${id}`, updatedUserClient)
      console.log(data)
    }catch(err){
      console.log(err)
    }
  }
}

export function deleteUserClient(id){
  return async function(){
    try{
      await axios.delete(`${baseURL}/userclient/deleteuserclient/${id}`)
    }catch(err) {
      console.log(err)
   }
  }
}


export function createReview(payload){
  return async function() {
    
    try {
      const newReview = axios.post(`${baseURL}/reviews` , payload)
      return newReview
      
    } catch (error) {
      console.log(error)
    }
  };
}


