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
  GET_POSTS_BY_PSYCHOLOGIST_ID,
  LOCAL_HOST,
  CLEAR_PSYCHOLOGIST,
  CLEAR_CLIENT,
  FILTER_PSICHOLOGIST_BY_SPECIALTIES,
  ORDER_PSICHOLOGIST_BY_RATING,
  FILTER_PSYCHOLOGIST_BY_RATING,
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
  FILTER_BY_STATUS,
  PUT_APPOINTMENT,
  GET_SCHEDULE,
  GET_SCHEDULE_BY_ID,
  GET_APPOINTMENT_AS_PSYCHOLOGIST,
  GET_APPOINTMENT_AS_CLIENT,
  DELETE_APPOINTMENT_AS_CLIENT,
  REMEMBER_PASSWORD_PSYCHOLOGIST,
  CLEAR_SCHEDULE,
  SORT_BY_DATE_CLI,
  SORT_BY_DATE_PSY,
  GET_APPOINTMENT_BY_ID
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

export const getUserPsychologistDetailsasClient = (IdUserPsychologist) => {
  return async function (dispatch) {
    try {
      const psychologist = await axios.get(
        `${baseURL}/userclient/${IdUserPsychologist}`, { headers: { Authorization: `Bearer ${localStorage.getItem("tokenClient")}` } }
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

export function getUserClient() {
  return function (dispatch) {
    axios
      .get(
        `${baseURL}/userclient/client`,
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
      const data = await axios.put(`${baseURL}/userclient/editprofile`, updatedUserClient, { headers: { Authorization: `Bearer ${localStorage.getItem("tokenClient")}` } });
      if (data.response === 200) {
        Swal.fire("Su perfil ha sido actualizado exitosamente", "", "success");
      }
    } catch (err) {
      console.log(err);
      Swal.fire("No se ha podido actualizar su perfil", "Intente nuevamente", "error");
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
      .catch((err) => console.log(err))
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
        `${baseURL}/userpsychologist/profile`, { headers: { Authorization: `Bearer ${localStorage.getItem("tokenPsychologist")}` } }
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
export const getUserPsychologistDetails = (IdUserPsichologist) => {
  return async function (dispatch) {
    try {
      const psychologist = await axios.get(
        `${baseURL}/userpsychologist/${IdUserPsichologist}`, { headers: { Authorization: `Bearer ${localStorage.getItem("tokenPsychologist")}` } }
      );
      dispatch({
        type: "GET_PSYCHOLOGISTS_DETAILS",
        payload: psychologist.data,
      });
    } catch (error) {
      console.log(error)
    }
  };
};

export const getUserPsychologistDetailsCli = (idUserPsychologist) => {
  return async function (dispatch) {
    try {
      const psychologist = await axios.get(
        `${baseURL}/userclient/${idUserPsychologist}`, { headers: { Authorization: `Bearer ${localStorage.getItem("tokenClient")}` } }
      );
      dispatch({
        type: "GET_PSYCHOLOGISTS_DETAILS",
        payload: psychologist.data,
      });
    } catch (error) {
      console.log(error)
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
export function editUserPsichologist(updatedUserPsychologist) {
  return async function () {
    try {
      const data = await axios.put(
        `${baseURL}/userpsychologist/put_userpsychologist/`,
        updatedUserPsychologist,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("tokenPsychologist")}` }
        })
      // if (data.response === 200) {
      //   Swal.fire("Su perfil ha sido actualizado exitosamente", "", "success");
      // }
    } catch (error) {
      console.error(error)
      Swal.fire("No se ha podido actualizar su perfil", "Intente nuevamente", "error");
    }
  }
}

//----- olvide mi password
export function forgotPassword(payload) {
  return async function (dispatch) {
    try {
      const json = await axios.put(`${baseURL}/nodemailer/rememberpassword`, payload)
      dispatch({
        type: REMEMBER_PASSWORD_PSYCHOLOGIST,
        payload: json.data
      })
    } catch (error) {
      console.log(error)
    }
  };
};
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
    }
    // else {
    //   Swal.fire("Error", "No Hay Notas Disponibles Vuelve a Intentar", "error");
    // }
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

export const getPostsByPsychologistId = (IdUserPsychologist) => {
  return async function (dispatch) {
    try {
      let posts = await axios.get(`${baseURL}/posts/author/${IdUserPsychologist}`);
      dispatch({
        type: GET_POSTS_BY_PSYCHOLOGIST_ID,
        payload: posts.data,
      });
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
        `${baseURL}/post`, body, { headers: { Authorization: `Bearer ${localStorage.getItem("tokenPsychologist")}` } }
      )
      dispatch({
        type: "CREATE_POST",
        payload: info
      })
      Swal.fire('Post creado correctamente!', '', 'success')
    } catch (error) {
      console.log(error)

      Swal.fire('Error', `No se puede crear la nota por ${error}`, 'error')
    }
  }
}

//eliminar nota
export const deletePost = (id) => {
  return async function (dispatch) {
    try {
      await axios.delete(
        `${baseURL}/deletePost/${id}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("tokenPsychologist")}` } }
      )
      dispatch({ type: "DELETE_POST", payload: id })
      Swal.fire('Post eliminado correctamente!', '', 'success')
    } catch (error) {
      console.log(error)
      Swal.fire('Error', `No se puede eliminar la nota por ${error}`, 'error')
    }
  }
}


export const putPost = (body, IdPost) => {
  return async function (dispatch) {
    try {
      const { info } = await axios.put(
        `${baseURL}/edit/${IdPost}`,
        body,
        { headers: { Authorization: `Bearer ${localStorage.getItem("tokenPsychologist")}` } }
      )
      dispatch({ type: PUT_POSTS, pyaload: info })
      Swal.fire('Post editada correctamente!', 'muy bien', 'success')
    } catch (e) {
      console.log(e)
      Swal.fire('Error', `No se puede editar la nota por ${e}`, 'error')
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

/*---------------------REVIEWS ACTIONS-------------------*/

export function createReview(IdUserPsychologist, payload) {
  return async function () {
    try {
      const newReview = axios.post(`${baseURL}/reviews/${IdUserPsychologist}`, payload, { headers: { Authorization: `Bearer ${localStorage.getItem("tokenClient")}` } });
      return newReview;
    } catch (error) {
      console.log(error);
    }
  };
}

export function filterReviewsBySychologistAsClient(IdUserPsichologist) {
  return async function (dispatch) {
    try {
      const json = await axios.get(
        `${baseURL}/reviews/filter/review/${IdUserPsichologist}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("tokenClient")}` } }
      );
      dispatch({
        type: FILTER_PSYCHOLOGIST_BY_RATING,
        payload: json.data,
      })
    } catch (error) {
      console.log(error);
    }
  }
};

export function filterReviewsBySychologistAsPsycho(IdUserPsichologist) {
  return async function (dispatch) {
    try {
      const json = await axios.get(
        `${baseURL}/reviews/filter/review/${IdUserPsichologist}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("tokenPsychologist")}` } }
      );
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
      let payment = await axios.post(`${baseURL}/payment/checkoutpayment`, payload, { headers: { Authorization: `Bearer ${localStorage.getItem("tokenClient")}` } })
      console.log(payment)
    } catch (err) {
      console.log(err)
    }
  }
}

export const getAllPayments = () => {
  return async function (dispatch) {
    try {
      const payments = await axios.get(`${baseURL}/payment`, { headers: { Authorization: `Bearer ${localStorage.getItem("tokenAdmin")}` } });
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
      .get(`${baseURL}/payment/paymentsclient`, { headers: { Authorization: `Bearer ${localStorage.getItem("tokenClient")}` } })
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
      .get(`${baseURL}/payment/paymentspsi`, { headers: { Authorization: `Bearer ${localStorage.getItem("tokenPsychologist")}` } })
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

export const sortByDateCli = (payload) => {
  return {
    type: SORT_BY_DATE_CLI,
    payload
  }
}

export const sortByDatePsy = (payload) => {
  return {
    type: SORT_BY_DATE_PSY,
    payload
  }
}

export const filterByStatus = (payload) => {
  return {
    type: FILTER_BY_STATUS,
    payload
  }
}

/*---------------------SCHEDULE ACTIONS-------------------*/

export function createSchedule(appointment) {
  return async function () {
    try {
      const newSchedule = await axios.post(
        `${baseURL}/schedule/create`,
        appointment,
        { headers: { Authorization: `Bearer ${localStorage.getItem("tokenPsychologist")}` } }
      )
      if (newSchedule.status === 201) {
        return Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Fecha y hora agregadas exitosamente',
          showConfirmButton: false,
          timer: 3000
        })
      }
      // return newSchedule;
    } catch (error) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'No se ha podido agregar horario.',
        text: 'Verifique que no cuente con este horario en su agenda',
        showConfirmButton: true
      })
      console.log(error)
    }
  }
}

export function getScheduleByIdAsClient(idSchedule) {
  return async function (dispatch) {
    try {
      axios.get(`${baseURL}/schedule/getbyid/${idSchedule}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("tokenClient")}` } }
      )
        .then((schedule) => {
          dispatch({
            type: GET_SCHEDULE_BY_ID,
            payload: schedule.data
          })
        })
    } catch (error) {
      console.log(error)
    }
  }
}

export function getScheduleByIdAsPsychologist(idSchedule) {
  return async function (dispatch) {
    try {
      axios.get(`${baseURL}/schedule/getbyid/${idSchedule}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("tokenPsychologist")}` } }
      )
        .then((schedule) => {
          dispatch({
            type: GET_SCHEDULE_BY_ID,
            payload: schedule.data
          })
        })
    } catch (error) {
      console.log(error)
    }
  }
}

export function getScheduleAsPsychologist(IdUserPsychologist) {
  return async function (dispatch) {
    try {
      axios.get(`${baseURL}/schedule/get/${IdUserPsychologist}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("tokenPsychologist")}` } }
      )
        .then((schedule) => {
          dispatch({
            type: GET_SCHEDULE,
            payload: schedule.data
          })
        })
    } catch (error) {
      console.log(error)
    }
  }
}

export function getScheduleAsClient(IdUserPsychologist) {
  return async function (dispatch) {
    try {
      axios.get(`${baseURL}/schedule/get/${IdUserPsychologist}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("tokenClient")}` } }
      )
        .then((schedule) => {
          dispatch({
            type: GET_SCHEDULE,
            payload: schedule.data
          })
        })
    } catch (error) {
      console.log(error)
    }
  }
}

export function updateScheduleAsClient(idSchedule, updateSchedule) {
  return async function () {
    try {
      const data = await axios.put(
        `${baseURL}/schedule/update/${idSchedule}`,
        updateSchedule,
        { headers: { Authorization: `Bearer ${localStorage.getItem("tokenClient")}` } }
      );
      console.log(data);
    } catch (err) {
      console.log(err)
    }
  }
}

export function updateScheduleAsPsychologist(idSchedule, updateSchedule) {
  return async function () {
    try {
      const data = await axios.put(
        `${baseURL}/schedule/update/${idSchedule}`,
        updateSchedule,
        { headers: { Authorization: `Bearer ${localStorage.getItem("tokenPsychologist")}` } }
      );
      console.log(data);
    } catch (err) {
      console.log(err)
    }
  }
}

/*---------------------APPOINTMENTS ACTIONS-------------------*/

export function createAppointmentAsClient(IdUserPsychologist, appointmentData) {
  return async function (dispatch) {
    try {
      const newAppointment = await axios.post(`${baseURL}/appointment/create/${IdUserPsychologist}`,
        appointmentData,
        { headers: { Authorization: `Bearer ${localStorage.getItem("tokenClient")}` } }
      )
      if (newAppointment.status === 201) {
        return Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Cita reservada exitosamente',
          confirmButtonText: "Para continuar debes pagar la sesión!",
          confirmButtonColor: '#38B2AC',
          closeOnConfirm: true
        }).then(function () {
          window.location = `http://localhost:3000/checkout/${IdUserPsychologist}`
        })
      }
    } catch (error) {
      console.log(error)
      Swal.fire(
        "No se ha podido reservar esta cita",
        "Verifique no haber reservado una cita en la fecha seleccionada.",
        "error"
      );
    }
  }
}
export function createAppointmentAsPsychologist(IdUserPsychologist, appointmentData) {
  return async function (dispatch) {
    try {
      await axios.post(`${baseURL}/appointment/create/${IdUserPsychologist}`,
        appointmentData,
        { headers: { Authorization: `Bearer ${localStorage.getItem("tokenPsychologist")}` } }
      )
    } catch (error) {
      console.log(error)
    }
  }
}

export function getAppointmentByIdAsClient(IdAppointment) {
  return async function (dispatch) {
    try {
      axios.get(`${baseURL}/appointment/${IdAppointment}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("tokenClient")}` } }
      )
        .then((appointment) => {
          dispatch({
            type: GET_APPOINTMENT_BY_ID,
            payload: appointment.data
          })
        })
    } catch (error) {
      console.log(error)
    }
  }
}

export function getAppointmentByIdAsPsychologist(IdAppointment) {
  return async function (dispatch) {
    try {
      axios.get(`${baseURL}/appointment/${IdAppointment}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("tokenPsychologist")}` } }
      )
        .then((appointment) => {
          dispatch({
            type: GET_APPOINTMENT_BY_ID,
            payload: appointment.data
          })
        })
    } catch (error) {
      console.log(error)
    }
  }
}

export function getAppointmentAsPsychologist() {
  return async function (dispatch) {
    try {
      axios.get(`${baseURL}/appointment/psychologist`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("tokenPsychologist")}` } }
      )
        .then((appointment) => {
          dispatch({
            type: GET_APPOINTMENT_AS_PSYCHOLOGIST,
            payload: appointment.data
          })
        })
    } catch (error) {
      console.log(error)
    }
  }
}

export function getAppointmentAsClient() {
  return async function (dispatch) {
    try {
      axios.get(`${baseURL}/appointment/client`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("tokenClient")}` } }
      )
        .then((appointment) => {
          dispatch({
            type: GET_APPOINTMENT_AS_CLIENT,
            payload: appointment.data
          })
        })
    } catch (error) {
      console.log(error)
    }
  }
}

export function putAppointmentAsClient(IdAppointment, type) {
  return async function (dispatch) {
    try {
      const appointment = await axios.put(
        `${baseURL}/appointment/put_appointment/${IdAppointment}`,
        type,
        { headers: { Authorization: `Bearer ${localStorage.getItem("tokenClient")}` } }
      )
      if (appointment.status === 200) {
        Swal.fire('Se ha modificado la modaldiad de esta cita', '', 'success')
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export function putAppointmentAsPsychologist(IdAppointment, type) {
  return async function (dispatch) {
    try {
      const appointment = await axios.put(
        `${baseURL}/appointment/put_appointment/${IdAppointment}`,
        type,
        { headers: { Authorization: `Bearer ${localStorage.getItem("tokenPsychologist")}` } }
      )
      if (appointment.status === 200) {
        Swal.fire('Se ha modificado la modaldiad de esta cita', '', 'success')
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export function deleteAppointmentAsClient(IdAppointment) {
  return async function (dispatch) {
    try {
      const appointment = await axios.delete(`${baseURL}/appointment/delete/client/${IdAppointment}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("tokenClient")}` } }
      )
      if (appointment.status === 200) {
        Swal.fire('Has cancelado esta cita', '', 'success')
      }
    } catch (error) {
      console.log(error)
      Swal.fire('No se ha podido cancelar esta cita', '', 'error')
    }
  }
}

export function deleteAppointmentAsPsychologist(IdAppointment) {
  return async function (dispatch) {
    try {
      const appointment = await axios.delete(`${baseURL}/appointment/delete/psychologist/${IdAppointment}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("tokenPsychologist")}` } }
      )
      dispatch({
        type: DELETE_APPOINTMENT_AS_CLIENT,
        payload: appointment.data
      })
      if (appointment.status === 200) {
        Swal.fire('Has cancelado esta cita', '', 'success')
      }
    } catch (error) {
      console.log(error)
      Swal.fire('No se ha podido cancelar esta cita', '', 'error')
    }
  }
}

export function putAppointment(body, id) {
  return async function (dispatch) {
    try {
      const { info } = await axios.put(`${baseURL}/appointment/putappoint/${id}`, body)
      dispatch({ type: PUT_APPOINTMENT, payload: info })
      Swal.fire('Ya cambiamos tu turno!', 'muy bien', 'success')
    } catch (e) {
      console.log(e)
    }
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

export const AdminGetUserPsychologistDetail = (idUserPsychologist) => {
  return async function (dispatch) {
    try {
      const psychologist = await axios.get(
        `${baseURL}/admin/userpsychologist/${idUserPsychologist}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("tokenAdmin")}` } }
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
  }
}

export const clearSchedule = () => {
  return {
    type: "CLEAR_SCHEDULE",
  }
}