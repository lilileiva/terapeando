import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector } from 'react-redux';
import { addPost,getCategories } from '../../redux/actions';
import { NavLink } from "react-router-dom";

function validarCampos(input) {
    //me guardo los errores
      let errors = {}  
      //fecha
      if(!input.date){
          //si no hay nada le agrego objeto.name el mensaje a mostrar
          errors.date = "La fecha es requerida"
      }else if(!/^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[1-9]|2[1-9])$/.test(input.date)){
          //ponemos la expresion regular y la validamos con el nombre
          errors.date = "La fecha de creacion de la nota debe ser valida"
      }
      // titulo
      if(!input.title){
          errors.title = 'El titulo de la nota es obligatoria'
      }else if(input.title.length > 100){
          errors.title = 'El titulo es demasiado largo. escribe un maximo de 100 caracteres'
      }else if(!/^[a-zA-Z0-9-() .]+$/.test(input.title)){
        //ponemos la expresion regular y la validamos con el titulo
        errors.title = "El titulo de la nota solo acepta letras, numeros, guiones medios y parentesis"
      }
      //contenido
      if(!input.Content){
          errors.Content = 'El contenido es obligatorio'
      }else if(!/^[a-zA-Z0-9-() .]+$/.test(input.title)){
        //ponemos la expresion regular y la validamos con el contenido
        errors.Content = "El contenido de la nota solo acepta letras, numeros, guiones medios y parentesis"
      }
      //imagen
      if(!input.image){
          errors.image = 'La imagen es obligatoria'
      }
      //tags
      if(!input.tags){
        errors.tags = 'Es obligatorio tener por lo menos una categoria'
      }
  
      return errors //la funcion validate devuelve el objeto errors, ya sea vacio o con alguna propiedad si es q encuentra un error
};
export default function AddPost(){
    const [input, setInput] = useState({
        date: "",
        title:"",
        content: "",
        image: "",
        tags: [],
    })
    const [errors, setErrors] = useState({}) //me creo un estado local, en donde errors empieza con un objeto vacio
    const dispatch = useDispatch();
    //para navegar y probar esto
    //const navigate = useNavigate();
    const categories = useSelector((state) => state.categories)
    const posts = useSelector((state) => state.posts)
    useEffect(() => {
        dispatch(getCategories())
    },[dispatch]) 
    function handleSubmit(event) {
        event.preventDefault();
        //para no repetir titlos de las notas
        let noRepetir = posts.filter(post => post.Title === input.title)
        if(noRepetir.length !== 0){
            alert('Ya existe una nota con ese nombre, por favor escriba otro')
        }else{
            let error = validarCampos(input)
            //solo habra propiedades si es que HAY ALGUN ERROR
            if(!error){
                //Entonces si hay algun error,la variable error va a ser un array con la propiedad en donde haya un error
                alert('Llene los campos correctamente')
                return 
            }else{
                //creo mi juego
                dispatch(addPost(input));
                setInput({
                    date: "",
                    title:"",
                    content: "",
                    image: "",
                    tags: [],
                });
                alert("Felicitaciones, tu nota ha sido creado exitosamente")
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
    function handleCategories(event){
        const {value} = event.target
        if(!input.tags.includes(value)){
            //me lleno el input.tags con el valor que me pasaron por genero
            setInput({
                ...input,
                tags: [...input.tags, value]
            })
        }
    }
    function handleDeleteGenere(category){
        setInput({
            ...input,
            tags: input.tags.filter((c) =>  c !== category)
        })
    }
    console.log(input.tags)
    console.log(errors)
    return(
        <div>
            <form onSubmit={(e) => handleSubmit(e)} className="form">
                <div className='formulario'>
                    <h2 className='titulo'>Crear Nota</h2>
                    {/* fecha */}
                    <div className='group'>
                        {/* controlamos tanto como la fecha y el valor cada vez que haya un cambio */}
                        <input className='input1'
                            type={"date"}
                            required
                            name="date"
                            value={input.date}
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
                            name="Content"
                            value={input.Content}
                            placeholder={"yyyy-mm-dd"}
                            onChange={(e) => handleChange(e)}
                        />
                        <span className='bar'></span>
                        <label className='etiqueta'>Fecha de Lanzamiento:</label>
                        {errors.Content && (
                            <p className='peligro'>{errors.Content}</p>   
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
                        <select className='create_select' defaultValue={""} onChange={(e) => handleCategories(e)}>
                            {/* desabilitamos la opcion vacia */}
                            <option className='option_group' value='' disable>Elijas los Generos</option>
                            {/* me traigo todos mis generos y los muestro */}
                            {categories && categories.map((categorie) => {
                                return (
                                    <option className='option_group' value={categories.name}>{categories.name}</option>
                                )
                            })}
                        </select><span className='bar'></span>
                        {/* ahora muestro los generos que ha seleccionado el usuario */}
                        <label className='etiqueta'>Generos: </label>
                        {input.tags && input.tags.map((genero) => {
                            return(
                           <div className='opcion'>
                               <div className='opcion_titulo'>{genero}</div>
                               <button className='button_delete' onClick={() => handleDeleteGenere(genero)} value={genero} key={genero}><span className={"delete"}>X</span></button>
                           </div> )
                        })}
                    </div>
                        {errors.tags && (
                            <p className='peligro'>{errors.tags}</p>   
                        )}
                    {errors.platforms && (
                        <p className='peligro'>{errors.platforms}</p>   
                    )}
                    <div className='group'>
                        <textarea cols="50" rows="10"
                            requerid 
                            type="text"
                            name="title"
                            value={input.title}
                            onChange={(e) => handleChange(e)}
                        ></textarea>
                        <label className='title'>Descripcion: </label>
                        {errors.title && (
                            <p className='peligro'>{errors.title}</p>   
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