import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector } from 'react-redux';
import { addVideogame, getGenres, getPlatforms } from '../../Store/Actions';
import { NavLink } from "react-router-dom";

function validarCampos(input) {
    //me guardoi los errores
      let errors = {}  
      //nombre
      if(!input.name){
          //si no hay nada le agrego objeto.name el mensaje a mostrar
          errors.name = "El nombre es requerido"
      }else if(!/^[a-zA-Z0-9-() .]+$/.test(input.name)){
          //ponemos la expresion regular y la validamos con el nombre
          errors.name = "El nombre del videojuego solo acepta letras, numeros, guiones medios y parentesis"
      }
      // descripcion
      if(!input.description){
          errors.description = 'La descripcion es obligatoria'
      }else if(input.description.length > 200){
          errors.description = 'La descripcion es demasiado larga. escribe un maximo de 200 caracteres'
      }
      //fecha de lanzamiento
      if(!input.released){
          errors.released = 'La fecha de lanzamiento es obligatoria'
      }
      //rating
      if(!input.rating){
          errors.rating = 'El rating es obligatorio'
      }else if(input.rating <= 0 ){
          errors.rating = 'El rating debe ser mayor a cero'
      }else if(input.rating > 10){
          errors.rating = 'El rating no puede ser mayor a 10'
      }
  
      return errors //la funcion validate devuelve el objeto errors, ya sea vacio o con alguna propiedad si es q encuentra un error
};
export default function AddPost(){
    const [input, setInput] = useState({
        name: "",
        description:"",
        released: "",
        rating: "",
        genres: [],
        platforms: []
    })
    const [errors, setErrors] = useState({}) //me creo un estado local, en donde errors empieza con un objeto vacio
    const dispatch = useDispatch();
    //para navegar y probar esto
    //const navigate = useNavigate();
    const generos = useSelector((state) => state.genres)
    const videogames = useSelector((state) => state.videogames)
    const plataformas = useSelector((state) => state.platforms)
    useEffect(() => {
        dispatch(getGenres())
        dispatch(getPlatforms())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    function handleSubmit(event) {
        event.preventDefault();
        //para no repetir nombres de juegos
        let noRepetir = videogames.filter(juego => juego.name === input.name)
        if(noRepetir.length !== 0){
            alert('Ya existe un juego con ese nombre, por favor escriba otro')
        }else{
            let error = validarCampos(input)
            //solo habra propiedades si es que HAY ALGUN ERROR
            if(!error){
                //Entonces si hay algun error,la variable error va a ser un array con la propiedad en donde haya un error
                alert('Llene los campos correctamente')
                return 
            }else{
                //creo mi juego
                dispatch(addVideogame(input));
                setInput({
                    name: "",
                    description:"",
                    released: "",
                    rating: "",
                    genres: [],
                    platforms: []
                });
                alert("Felicitaciones, tu juego ha sido creado exitosamente")
            }
            //navigate('/home')
        }
    }
    function handleChange(event){
        event.preventDefault();
        //me traigo el nombre de mi input y su valor
        const { name, value } = event.target;
        setInput((state) => ({...state, [name]: value}))
        setErrors(validarCampos({
            //para no perder informacion y a la propiedad le asigno el valor
            ...input,
            [name]:[value]
        }))
    }
    function handleGenres(event){
        const {value} = event.target
        if(!input.genres.includes(value)){
            //me lleno el input.genres con el valor que me pasaron por genero
            setInput({
                ...input,
                genres: [...input.genres, value]
            })
        }
    }
    function handleDeleteGenere(genre){
        setInput({
            ...input,
            genres: input.genres.filter((g) => g !== genre)
        })
    }
    function handlePlatforms(event){
        const {value} = event.target
        setInput({
            ...input,
            platforms: [...input.platforms, value]
        })
    }
    function handleDeletePlatform(event){
        setInput({
            ...input,
            platforms: input.platforms.filter(p => p !== event)
        })
    }
    console.log(input.genres)
    console.log(errors)
    return(
        <div>
            <form onSubmit={(e) => handleSubmit(e)} className="form">
                <div className='formulario'>
                    <h2 className='titulo'>CREA TU PROPIO VIDEOJUEGO</h2>
                    {/* nombre */}
                    <div className='group'>
                        {/* controlamos tanto como el nombre y el valor cada vez que haya un cambio */}
                        <input className='input1'
                            type={"text"}
                            required
                            name="name"
                            value={input.name}
                            onChange={(e) => handleChange(e)}
                        />
                        <span className='bar'></span>
                        <label className='etiqueta'> Nombre: </label>
                        {/* si hay un error mostramos el valor del objete con ese error */}
                        {errors.name && (
                            <p className='peligro'>{errors.name}</p>
                        )}
                    </div>
                    {/* fecha de lanzamiento */}
                    <div className='group'>
                        <input className='input1'
                            type={"date"}
                            name="released"
                            value={input.released}
                            placeholder={"yyyy-mm-dd"}
                            onChange={(e) => handleChange(e)}
                        />
                        <span className='bar'></span>
                        <label className='etiqueta'>Fecha de Lanzamiento:</label>
                        {errors.released && (
                            <p className='peligro'>{errors.released}</p>   
                        )}
                    </div>
                    {/* rating */}
                    <div className='group'>
                        <input className='input1'
                            required
                            type={"number"}
                            name="rating"
                            value={input.rating}
                            onChange={(e) => handleChange(e)}
                        />
                        <span className='bar'></span>
                        <label className='etiqueta'>Rating: </label>
                        {errors.rating && (
                            <p className='peligro'>{errors.rating}</p>   
                        )}
                    </div>
                    {/* generos */}
                    <div className='group'>
                        <select className='create_select' defaultValue={""} onChange={(e) => handleGenres(e)}>
                            {/* desabilitamos la opcion vacia */}
                            <option className='option_group' value='' disable>Elijas los Generos</option>
                            {/* me traigo todos mis generos y los muestro */}
                            {generos && generos.map((genero) => {
                                return (
                                    <option className='option_group' value={genero.name}>{genero.name}</option>
                                )
                            })}
                        </select><span className='bar'></span>
                        {/* ahora muestro los generos que ha seleccionado el usuario */}
                        <label className='etiqueta'>Generos: </label>
                        {input.genres && input.genres.map((genero) => {
                            return(
                           <div className='opcion'>
                               <div className='opcion_titulo'>{genero}</div>
                               <button className='button_delete' onClick={() => handleDeleteGenere(genero)} value={genero} key={genero}><span className={"delete"}>X</span></button>
                           </div> )
                        })}
                    </div>
                        {errors.genres && (
                            <p className='peligro'>{errors.genres}</p>   
                        )}
                    {/* plataformas */}
                    <div className='group'>
                        <select className='create_select' defaultValue={""} onChange={(e) => handlePlatforms(e)}>
                            {/* desabilitamos la opcion vacia */}
                            <option className='option_group' value='' disable>Elija Las Plataformas</option>
                            {/* me traigo todos mis plataformas y los muestro */}
                            {plataformas && plataformas.map((p) => {
                                return (
                                    <option className='option_group' value={p} >{p}</option>
                                )
                            })}
                        </select><span className='bar'></span>
                        {/* ahora muestro las platafromas que ha seleccionado el usuario */}
                        <label className='etiqueta'>Plataformas: </label>
                        {input.platforms && input.platforms.map((p) => {
                            return(
                           <div className='opcion'>
                               <div className='opcion_titulo'>{p}</div>
                               <button className='button_delete' onClick={() => handleDeletePlatform()} value={p} key={p}><span className={"delete"}>X</span></button>
                           </div> )
                        })}
                    </div>
                    {errors.platforms && (
                        <p className='peligro'>{errors.platforms}</p>   
                    )}
                    <div className='group'>
                        <textarea cols="50" rows="10"
                            requerid 
                            type="text"
                            name="description"
                            value={input.description}
                            onChange={(e) => handleChange(e)}
                        ></textarea>
                        <label className='description'>Descripcion: </label>
                        {errors.description && (
                            <p className='peligro'>{errors.description}</p>   
                        )}
                    </div>
                </div>
                <div>
                    <button type='submit' className='boton_submit'>Crear Videojuego</button>
                </div>
                <div className='back_home'>
                    <NavLink to={'/home'} className={"button_home"}>Volver a Home</NavLink>
                </div>
            </form>
        </div>
    )
}