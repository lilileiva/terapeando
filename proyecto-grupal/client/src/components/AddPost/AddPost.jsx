import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector } from 'react-redux';
import { addPost,getCategories,getAllPosts} from '../../redux/actions';
import NavBar from "../NavBar/NavBar.jsx";
import Footer from "../Footer/Footer.jsx";
import './addPost.css';
import { Select,Link,Button, Textarea } from '@chakra-ui/react'
function validarCampos(input) {
    //me guardo los errores
      let errors = {}  
      //fecha
      if(!input.date){
          //si no hay nada le agrego objeto.name el mensaje a mostrar
          errors.date = "La fecha es requerida"
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
      if(!input.content){
          errors.content = 'El contenido es obligatorio'
      }else if(!/^[a-zA-Z0-9-() .]+$/.test(input.title)){
        //ponemos la expresion regular y la validamos con el contenido
        errors.content = "El contenido de la nota solo acepta letras, numeros, guiones medios y parentesis"
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
        dispatch(getAllPosts())
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
                console.log(input)
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
    function handleDeleteCategory(category){
        setInput({
            ...input,
            tags: input.tags.filter((c) =>  c !== category)
        })
    }
    console.log(input.tags)
    console.log(errors)
    return(
        <div>
            <NavBar/>
            <form onSubmit={(e) => handleSubmit(e)} className="form">
                <div className='formulario'>
                    <h2 className='titulo'>Crear Nota</h2>
                    {/* Titulo */}
                    <div className='group'>
                        <input className='input1'
                            required
                            type={"text"}
                            name="title"
                            value={input.title}
                            onChange={(e) => handleChange(e)}
                        />
                        <span className='bar'></span>
                        <label className='etiqueta'>Titulo</label>
                        {errors.title && (
                            <p className='peligro'>{errors.title}</p>   
                        )}
                    </div>
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
                        <label className='etiqueta'> Fecha de creacion: </label>
                        {/* si hay un error mostramos el valor del objete con ese error */}
                        {errors.date && (
                            <p className='peligro'>{errors.date}</p>
                        )}
                    </div>
                    {/* imagen */}
                    <div className='group'>
                        <input className='input1'
                            required
                            type={"url"}
                            name="image"
                            value={input.image}
                            onChange={(e) => handleChange(e)}
                        />
                        <span className='bar'></span>
                        <label className='etiqueta'>Url de la Imagen: </label>
                        {errors.image && (
                            <p className='peligro'>{errors.image}</p>   
                        )}
                    </div>
                    {/* categorias */}
                    <div className='group'>
                        <Select placeholder="Elija las categorias asociadas a la nota creada" defaultValue={""} onChange={(e) => handleCategories(e)} className="alert">
                            {/* me traigo todos mis generos y los muestro */}
                            {categories && categories.map((categorie) => {
                                return (
                                    <option value={categorie.name}>{categorie.name}</option>
                                )
                            })}
                        </Select><span className='bar'></span>
                        {/* ahora muestro los generos que ha seleccionado el usuario */}
                        <label className='etiqueta'>Categorias: </label>
                        {input.tags && input.tags.map((tag) => {
                            return(
                           <div className='opcion'>
                               <div className='opcion_titulo'>{tag}</div>
                               <button className='button_delete' onClick={() => handleDeleteCategory(tag)} value={tag} key={tag}><span className={"delete"}>X</span></button>
                           </div> )
                        })}
                    </div>
                        {errors.tags && (
                            <p className='peligro'>{errors.tags}</p>   
                        )}
                    <div className='group'>
                        <Textarea cols="90" rows="10"
                            placeholder='Escribe aca el contenido de la nota'
                            requerid 
                            type="text"
                            name="content"
                            value={input.content}
                            onChange={(e) => handleChange(e)}
                        ></Textarea>
                        <label className='description'>Contenido: </label>
                        {errors.content && (
                            <p className='peligro'>{errors.content}</p>   
                        )}
                    </div>
                </div>
                <div>
                <Button colorScheme='teal' variant='outline'>
    Button
  </Button>
                </div>
                <Link href="/">        
                    <Button className='button_home'>
                        Volver al Home
                    </Button>
                </Link>  
            </form>
            <Footer/>
        </div>
    )
} 