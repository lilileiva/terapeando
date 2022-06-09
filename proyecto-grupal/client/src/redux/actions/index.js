import Swal from 'sweetalert2';

const baseURL = process.env.REACT_APP_API || 'http://localhost:3001';
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