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
  CLEAR_ADMIN_SEARCHBAR,
  PUT_POSTS,
  GET_PAYMENT, 
  GET_PAYMENT_PSY, 
  GET_PAYMENT_CLIENT,
  GET_RANGE_BY_DATE,
  SORT_BY_DATE,
  GET_ALL_PSYCHOLOGIST_BY_STATUS,
  FILTER_PSYCHOLOGIST_BY_RATING
} from "./types";

const baseURL = process.env.REACT_APP_API || LOCAL_HOST;

/*-------------------USER CLIENT ACTIONS----------------*/

export function getUserClientsByName(name) {
  return async function (dispatch) {
    fetch(
      `${baseURL}/userclient/clients?name=${name}`,
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    )
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

export function getUserClient() {
  return function (dispatch) {
    axios
      .get(
        `${baseURL}/userclient/client/`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("tokenClient")}` } }
      )
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

export function editClient(updatedUserClient) {
  return async function () {
    try {
      const data = await axios.put(
        `${baseURL}/userclient/editprofile`,
        updatedUserClient,
        { headers: { Authorization: `Bearer ${localStorage.getItem("tokenClient")}` } }
      );
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
}

export function deleteUserClient() {
  return async function () {
    try {
      await axios.delete(
        `${baseURL}/userclient/deleteuserclient`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("tokenClient")}` } }
      );
    } catch (err) {
      console.log(err);
    }
  };
}

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


//GET para obtener los psicologos con status activo 
export const getPsychologistByStatus = () => {
  return async function (dispatch) {
    try {
      const json = await axios.get(`${baseURL}/userpsychologist/status/psycologiststatus`);
      dispatch({
        type: GET_ALL_PSYCHOLOGIST_BY_STATUS,
        payload: json.data,
      });

    } catch (error) {
      console.log(error);
      Swal.fire("Error", "No Hay Psicologos Para Mostrar", "error");
    }
  }
};


//GET para obtener los psicologos por nombre

export function getUserPsychologistByName(name) {
  return async function (dispatch) {
    fetch(`${baseURL}/userpsychologist?name=${name}`)
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: GET_USER_PSYCHOLOGISTS_BY_NAME,
          payload: data,
        });
      })
      .catch((err) => console.log(err));
  };
}

//getPsychologist by email
export function getPsychologistByEmail(signupForm) {
  return async function (dispatch) {
    try {
      return await fetch(
        `${baseURL}/userpsychologist/email/psychologistEmail`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(signupForm),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          dispatch({
            type: "GET_EMAIL_PSY",
            payload: data,
          });
        });
    } catch (error) {
      console.error(error);
    }
  };
}

//GET para obtener un solo psychologist
export const getUserPsychologistOne = () => {
  return async function (dispatch) {
    try {
      const psychologist = await axios.get(
        `${baseURL}/userpsychologist/profile`,{ headers: { Authorization: `Bearer ${localStorage.getItem("tokenPsychologist")}` } }
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

// GET USE RPSYCHOLOGIST DETAILS
export const getUserPsychologistDetails = (IdUserPsychologist) => {
  return async function (dispatch) {
    try {
      const psychologist = await axios.get(
        `${baseURL}/userpsychologist/${IdUserPsychologist}`, { headers: { Authorization: `Bearer ${localStorage.getItem("tokenClient")}` } }
      );
      dispatch({
        type: "GET_PSYCHOLOGISTS_DETAILS",
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
      console.error(error);
    }
  };
}

//PUT para editar usuario psicologo
export function editUserPsichologist( updatedUserPsychologist) {
  return async function () {
    try {
      axios.put(
        `${baseURL}/userpsychologist/put_userpsychologist/`,
        updatedUserPsychologist,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("tokenPsychologist")}` }
        })
    } catch (error) {
      console.error(error)
    }
  }
}

// filtrar psicologs por  especialidad

export function getBySpecialties(payload) {
  return {
    type: FILTER_PSICHOLOGIST_BY_SPECIALTIES,
    payload: payload,
  };
}

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
}




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
        `${baseURL}/post`, body, { headers: { Authorization: `Bearer ${localStorage.getItem("tokenPsychologist")}` }}
      )
      return dispatch({
        type: "CREATE_POST",
        payload: info,
      });
    } catch (error) {
      console.log(error);
    }
  }
}
export const putPost = (body, IdPost) => {
  return async function (dispatch) {
    try{
      const {info} = await axios.put(
        `${baseURL}/edit/${IdPost}`,body
      )
      dispatch({type:PUT_POSTS, pyaload:info})
      Swal.fire('Post editada correctamente!', 'muy bien', 'success')
    }catch(e){
      console.log(e)
      Swal.fire('Error', `No se puede editar la nota por ${e}`,'error')
    }
  }
}
//eliminar nota
export const deletePost = (id) => {
  return async function (dispatch) {
    try {
      await axios.delete(`${baseURL}/deletePost/${id}`)
      dispatch({ type: "DELETE_POST", payload: id })
      Swal.fire('Post eliminado correctamente!', '', 'success')
    } catch (error) {
      console.log(error)
      Swal.fire('Error', `No se puede eliminar la nota por ${error}`,'error')
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
    } catch (e) { }
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

export const getPostsAuthors = () => {
  return async function (dispatch) {
    try {
      const response = await fetch(`${baseURL}/author`);
      const json = await response.json();
      //json trae un obj de arrays con first y last Name
      dispatch({
        type: "GET_POSTS_AUTHORS",
        payload: json,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const filterByAuthor = (payload) => {
  return {
    type: "FILTER_POSTS_BY_AUTHOR",
    payload,
  }
}

/*---------------------REVIEWS ACTIONS-------------------*/

export function createReview(IdUserPsychologist, payload) {
  return async function () {
    try {
      const newReview = axios.post(`${baseURL}/reviews/${IdUserPsychologist}`, payload , {headers: { Authorization: `Bearer ${localStorage.getItem("tokenClient")}` }});
      return newReview;
    } catch (error) {
      console.log(error);
    }
  };
}

export function filterReviewsBySychologist(payload){
  return async function (dispatch) {
    try {
      const json = await axios.get(`${baseURL}/reviews/filter/review/${payload}`);
      dispatch({
        type: FILTER_PSYCHOLOGIST_BY_RATING,
        payload: json.data,
      })
    } catch (error) {
      console.log(error);
    }
    }
  };


  

/* ---------------------- PAYMENTS ---------------------- */

export function createPayment(payload) {
  console.log(payload)
  return async function () {
    try {
      let payment = await axios.post(`${baseURL}/payment/checkoutpayment`, payload, {headers: { Authorization: `Bearer ${localStorage.getItem("tokenClient")}` }})
      console.log(payment)
    } catch (err) {
      console.log(err)
    }
  }
}

export const getAllPayments = () => {
  return async function (dispatch) {
    try {
      const payments = await axios.get(`${baseURL}/payment`, {headers: { Authorization: `Bearer ${localStorage.getItem("tokenAdmin")}` }});
      dispatch({
        type: GET_PAYMENT,
        payload: payments.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const getPaymentByClientId = () => {
  return function (dispatch) {
    axios
      .get(`${baseURL}/payment/paymentsclient`, {headers: { Authorization: `Bearer ${localStorage.getItem("tokenClient")}` }})
      .then((payment) => {
        dispatch({
          type: GET_PAYMENT_CLIENT,
          payload: payment.data
        })
      })
  }
}

export const getPaymentByPsyId = () => {
  return function (dispatch) {
    axios
      .get(`${baseURL}/payment/paymentspsi`, {headers: { Authorization: `Bearer ${localStorage.getItem("tokenPsychologist")}` }})
      .then((payment) => {
        dispatch({
          type: GET_PAYMENT_PSY,
          payload: payment.data
        })
      })
  }
}

/* filtrar por rango de fechas */
export const getRangeByDate = (payload) => {
  return {
    type: GET_RANGE_BY_DATE,
    payload
  }
}

export const sortByDate = (payload) => {
  return {
    type: SORT_BY_DATE,
    payload
  }
}

/*---------------------ADMIN ACTIONS-------------------*/
export function adminSearchbar(inputText) {
  return {
    type: ADMIN_SEARCHBAR,
    payload: inputText,
  };
}

export const signInAdmin = (signupForm) => {
  return async function () {
    try {
      const psychologist = await axios.post(`${baseURL}/admin/logIn}`, signupForm);
      return psychologist;
    } catch (error) {
      console.error(error);
    }
  };
};

//------>          admin clients actions 
export function AdminGetUserClient(idUserClient) {
  return function (dispatch) {
    axios
      .get(
        `${baseURL}/admin/userclient/clients/${idUserClient}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("tokenAdmin")}` } }
      )
      .then((client) => {
        dispatch({
          type: GET_USERCLIENT,
          payload: client.data,
        });
      })
      .catch((err) => console.log(err));
  };
}

export function AdminGetAllUserClients() {
  return async function (dispatch) {
    fetch(
      `${baseURL}/admin/userclient/clients`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem("tokenAdmin")}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: GET_ALL_USERCLIENTS,
          payload: data,
        });
      })
      .catch((err) => console.log(err));
  };
}

export function AdminGetUserClientsByName(name) {
  return async function (dispatch) {
    fetch(
      `${baseURL}/admin/userclient/clients?name=${name}`,
      { headers: { Authorization: `Bearer ${localStorage.getItem("tokenAdmin")}` } }
    )
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: GET_USER_CLIENTS_BY_NAME,
          payload: data,
        });
      })
      .catch((err) => console.log(err));
  };
}

export function AdminEditClient(id, updatedUserClient) {
  return async function () {
    try {
      const data = await axios.put(
        `${baseURL}/admin/userclient/update/${id}`,
        updatedUserClient,
        { headers: { Authorization: `Bearer ${localStorage.getItem("tokenAdmin")}` } }
      );
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
}

export function AdminDeleteUserClient(idUserClient) {
  return async function () {
    try {
      await axios.delete(
        `${baseURL}/admin/userclient/deleteuserclient/${idUserClient}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("tokenAdmin")}` } }
      );
    } catch (err) {
      console.log(err);
    }
  };
}

// ----->        admin psychologist actions
export const AdminGetAllPsychologist = () => {
  return async function (dispatch) {
    try {
      const json = await axios.get(`${baseURL}/admin/userpsychologist`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("tokenAdmin")}` } })
      dispatch({
        type: GET_ALL_PSYCHOLOGIST,
        payload: json.data,
      });
    } catch (error) {
      Swal.fire("Error", "No Hay Psicologos Para Mostrar", "error");
    }
  };
};

export function AdminGetUserPsychologistByName(name) {
  return async function (dispatch) {
    fetch(`${baseURL}/userpsychologist?name=${name}`, {
      method: 'GET',
      Authorization: `Bearer ${localStorage.getItem("tokenAdmin")}`
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: GET_USER_PSYCHOLOGISTS_BY_NAME,
          payload: data,
        });
      })
      .catch((err) => console.log(err));
  };
}

// PUT para editar usuario psicologo
export function AdminEditUserPsichologist(IdUserPsychologist, updatedUserPsychologist) {
  return async function () {
    try {
      const editPsichologist = axios.put(
        `${baseURL}/admin/userpsychologist/put_userpsychologist/${IdUserPsychologist}`,
        updatedUserPsychologist,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("tokenAdmin")}` }
        })
    } catch (error) {
      console.error(error)
    }
  };
}

export const AdminGetUserPsychologistDetail = (IdUserPsychologist) => {
  return async function (dispatch) {
    try {
      const psychologist = await axios.get(
        `${baseURL}/admin/userpsychologist/${IdUserPsychologist}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("tokenAdmin")}` } }
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

// DELETE user psychologist
export function AdminDeleteUserPsichologist(IdUserPsychologist) {
  return async function () {
    try {
      await axios.delete(
        `${baseURL}/admin/deleteuserpsychologist/${IdUserPsychologist}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("tokenAdmin")}` } }
      );
    } catch (error) {
      console.error(error);
    }
  };
}

//-------> admin actions posts
//eliminar nota
export const AdminDeletePost = (id) => {
  return async function (dispatch) {
    try {
      await axios.delete(`${baseURL}/admin/deletePost/${id}`);
      dispatch({ type: "DELETE_POST", payload: id });
    } catch (error) {
      console.log(error);
    }
  };
};

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

export function clearAdminSearchbar() {
  return {
    type: CLEAR_ADMIN_SEARCHBAR
  };
};

export const clearStatePostDetail = () => {
  return {
    type: "CLEAR_POST_DETAIL",
  };
};
