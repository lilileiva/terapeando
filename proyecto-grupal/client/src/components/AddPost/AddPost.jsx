import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addPost, getCategories, getAllPosts } from "../../redux/actions";
import NavbarHome from "../NavbarHome/NavbarHome.jsx";
import Footer from "../Footer/Footer.jsx";
import './addPost.css';
import { Select, Button, Textarea, Text, Stack, Box } from '@chakra-ui/react'
import Swal from 'sweetalert2';
import { ArrowLeftIcon } from '@chakra-ui/icons';
import NotFound from '../404notFound/notFound.jsx';

function validarCampos(input) {
  //me guardo los errores
  let errors = {};
  //fecha
  if (!input.Date) {
    //si no hay nada le agrego objeto.name el mensaje a mostrar
    errors.Date = "La fecha es requerida";
  }
  // titulo
  if (!input.Title) {
    errors.Title = "El titulo de la nota es obligatoria";
  } else if (input.Title.length > 100) {
    errors.Title =
      "El titulo es demasiado largo. escribe un maximo de 100 caracteres";
  }
  // else if (!/^[a-zA-Z0-9-() .]+$/.test(input.Title)) {
  //   //ponemos la expresion regular y la validamos con el titulo
  //   errors.Title =
  //     "El titulo de la nota solo acepta letras, numeros, guiones medios y parentesis";
  // }
  //contenido
  if (!input.Content) {
    errors.Content = "El contenido es obligatorio";
  }
  // else if (!/^[a-zA-Z0-9-() .]+$/.test(input.Title)) {
  //   //ponemos la expresion regular y la validamos con el contenido
  //   errors.Content =
  //     "El contenido de la nota solo acepta letras, numeros, guiones medios y parentesis";
  // }
  //Imagen
  if (!input.Image) {
    errors.Image = "La Imagen es obligatoria";
  }
  //Tags
  if (!input.Tags.length) {
    errors.Tags = "Es obligatorio tener por lo menos una categoria";
  }

  return errors; //la funcion valiDate devuelve el objeto errors, ya sea vacio o con alguna propiedad si es q encuentra un error
}
export default function AddPost() {
  const navigate = useNavigate()

  const [input, setInput] = useState({
    Date: "",
    Title: "",
    Content: "",
    Image: "",
    Tags: [],
  });
  const [errors, setErrors] = useState({}); //me creo un estado local, en donde errors empieza con un objeto vacio
  const dispatch = useDispatch();
  //para navegar y probar esto
  //const navigate = useNavigate();
  const categories = useSelector((state) => state.categories);
  const posts = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getAllPosts());
  }, [dispatch]);

  function handleSubmit(event) {
    event.preventDefault();
    //para no repetir titlos de las notas
    let noRepetir = posts.filter((post) => post.Title === input.Title);

    if (noRepetir.length !== 0) {
      Swal.fire(
        "Error",
        "Ya existe una nota con ese nombre, por favor escriba otro",
        "error"
      );
    } else {
      let error = validarCampos(input);
      //solo habra propiedades si es que HAY ALGUN ERROR
      if (!error) {
        //Entonces si hay algun error,la variable error va a ser un array con la propiedad en donde haya un error
        Swal.fire("Error", "Llene los campos correctamente", "error");
        return;
      } else {
        //creo mi nota
        dispatch(addPost(input));
        setInput({
          // Date: "",
          Title: "",
          Content: "",
          Image: "",
          Tags: [],
        });
        navigate('/blog')
      }
    }
  }
  function handleChange(event) {
    event.preventDefault();
    //me traigo el nombre de mi input y su valor
    const { name, value } = event.target;
    setInput((state) => ({ ...state, [name]: value }));
    setErrors(
      validarCampos({
        //para no perder informacion y a la propiedad le asigno el valor
        ...input,
        [name]: [value],
      })
    );
  }
  function handleCategories(event) {
    const { value } = event.target;
    if (!input.Tags.includes(value)) {
      //me lleno el input.Tags con el valor que me pasaron por genero
      setInput({
        ...input,
        Tags: [...input.Tags, value],
      });
    }
  }
  function handleDeleteCategory(category) {
    setInput({
      ...input,
      Tags: input.Tags.filter((c) => c !== category),
    });
  }

  const tokenPsychologist = window.localStorage.getItem("tokenPsychologist");

  return (
    <>
      {tokenPsychologist ? (
        <>
          <NavbarHome />
          <Stack direction="column" width="70%" margin="auto" mt="2em" mb="3em">
            <Link to="/blog">
              <Text color="green.300" fontSize="2xl" textAlign="left" mb="1em">
                <ArrowLeftIcon /> Volver
              </Text>
            </Link>
            <form onSubmit={(e) => handleSubmit(e)} className="form">
              <div className="formulario">
                <h2 className="titulo">Crear Nota</h2>
                {/* Titulo */}
                <div className="group">
                  <input
                    className="input1"
                    required
                    type={"text"}
                    name="Title"
                    value={input.Title}
                    onChange={(e) => handleChange(e)}
                  />
                  <span className="bar"></span>
                  <label className="etiqueta">Titulo</label>
                  {errors.Title && <p className="peligro">{errors.Title}</p>}
                </div>
                {/* fecha */}
                {/* <div className="group"> */}
                  {/* controlamos tanto como la fecha y el valor cada vez que haya un cambio */}
                  {/* <input
                    className="input1"
                    type={"Date"}
                    required
                    name="Date"
                    value={input.Date}
                    onChange={(e) => handleChange(e)}
                  />
                  <span className="bar"></span>
                  <label className="etiqueta"> Fecha de creacion: </label> */}
                  {/* si hay un error mostramos el valor del objete con ese error */}
                  {/* {errors.Date && <p className="peligro">{errors.Date}</p>}
                </div> */}
                {/* Imagen */}
                <div className="group">
                  <input
                    className="input1"
                    required
                    type={"url"}
                    name="Image"
                    value={input.Image}
                    onChange={(e) => handleChange(e)}
                  />
                  <span className="bar"></span>
                  <label className="etiqueta">Url de la Imagen: </label>
                  {errors.Image && <p className="peligro">{errors.Image}</p>}
                </div>
                {/* categorias */}
                <div className="group">
                  <Select
                    placeholder="Elija las categorias asociadas a la nota creada"
                    defaultValue={""}
                    onChange={(e) => handleCategories(e)}
                    className="alert"
                  >
                    {/* me traigo todos mis generos y los muestro */}
                    {categories &&
                      categories.map((categorie) => {
                        return (
                          <option value={categorie.name}>
                            {categorie.name}
                          </option>
                        );
                      })}
                  </Select>
                  <span className="bar"></span>
                  {/* ahora muestro los generos que ha seleccionado el usuario */}
                  <label className="etiqueta">Categorias: </label>
                  {input.Tags &&
                    input.Tags.map((tag) => {
                      return (
                        <div className="opcion">
                          <div className="opcion_titulo">{tag}</div>
                          <button
                            className="button_delete"
                            onClick={() => handleDeleteCategory(tag)}
                            value={tag}
                            key={tag}
                          >
                            <span className={"delete"}>X</span>
                          </button>
                        </div>
                      );
                    })}
                </div>
                {errors.Tags && <p className="peligro">{errors.Tags}</p>}
                <div className="group">
                  <Textarea
                    cols="90"
                    rows="10"
                    placeholder="Escribe aca el contenido de la nota"
                    requerid
                    type="text"
                    name="Content"
                    value={input.Content}
                    onChange={(e) => handleChange(e)}
                  ></Textarea>
                  <label className="description">Contenido: </label>
                  {errors.Content && (
                    <p className="peligro">{errors.Content}</p>
                  )}
                </div>
              </div>
              <div>
                <button className="boton_submit">Crear Nota</button>
              </div>
            </form>
          </Stack>
        </>
      ) : (
        <NotFound />
      )}
      <Footer />
    </>
  );
}
