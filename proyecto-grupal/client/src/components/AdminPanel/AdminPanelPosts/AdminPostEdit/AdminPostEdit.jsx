// import React, { useEffect, useState } from 'react';
// import {useNavigate, useParams } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import AdminPanelNavbar from '../../AdminPanelNavbar/AdminPanelNavbar.jsx';
// import AdminPanelSidebar from '../../AdminPanelSidebar/AdminPanelSidebar.jsx';
// import Footer from '../../../Footer/Footer.jsx';
// import { Stack, Button, Avatar, Text, Input, Select } from '@chakra-ui/react';
// import { ArrowLeftIcon, CloseIcon, CheckIcon } from '@chakra-ui/icons';
// import { getPostDetail, clearStatePostDetail, getCategories } from '../../../../redux/actions';
// import Loader from '../../../Loader/Loader.jsx';
// import Swal from 'sweetalert2';



// // function AdminPostEdit() {
// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();

// //   const categories = useSelector((state) => state.categories)


// //   const { IdPost } = useParams();

// //   useEffect(() => {
// //     dispatch(getCategories())
// //     dispatch(getPostDetail(IdPost))

// //     return () => {
// //       dispatch(clearStatePostDetail())
// //     }
// //   }, [dispatch])
// //   const postDetail = useSelector((state) => state.postDetail);

// //   const [inputText, setInputText] = useState({
// //     Date: postDetail.Date,
// //     Title: postDetail.Title,
// //     Content: postDetail.Content,
// //     Image: postDetail.Image,
// //     Tags: []
// //   })

// //   /*------------------validaciones----------------*/
// //   function validarCampos(input) {
// //     //me guardo los errores
// //       let errors = {}  
// //       //fecha
// //       if(!input.Date){
// //           //si no hay nada le agrego objeto.name el mensaje a mostrar
// //           errors.Date = "La fecha es requerida"
// //       }
// //       // titulo
// //       if(!input.Title){
// //           errors.Title = 'El titulo de la nota es obligatoria'
// //       }else if(input.Title.length > 100){
// //           errors.Title = 'El titulo es demasiado largo. escribe un maximo de 100 caracteres'
// //       }else if(!/^[a-zA-Z0-9-() .]+$/.test(input.Title)){
// //         //ponemos la expresion regular y la validamos con el titulo
// //         errors.Title = "El titulo de la nota solo acepta letras, numeros, guiones medios y parentesis"
// //       }
// //       //contenido
// //       if(!input.Content){
// //           errors.Content = 'El contenido es obligatorio'
// //       }else if(!/^[a-zA-Z0-9-() .]+$/.test(input.Title)){
// //         //ponemos la expresion regular y la validamos con el contenido
// //         errors.Content = "El contenido de la nota solo acepta letras, numeros, guiones medios y parentesis"
// //       }
// //       //Imagen
// //       if(!input.Image){
// //           errors.Image = 'La Imagen es obligatoria'
// //       }
// //       //Tags
     
  
// //       return errors //la funcion valiDate devuelve el objeto errors, ya sea vacio o con alguna propiedad si es q encuentra un error
// //     };
// //   const [formErrors, setFormErrors] = useState({})
// //   /*------------------fin-validaciones----------------*/

// //   const posts = useSelector((state) => state.posts)
// //   const handleInputChange = (e) => {
// //     setInputText({
// //       ...inputText, 
// //       [e.target.name]: e.target.value
// //     })
// //   }
// //   function handleCategories(event){
// //     const {value} = event.target
// //     if(!inputText.Tags.includes(value)){
// //         //me lleno el input.Tags con el valor que me pasaron por genero
// //         setInputText({
// //             ...inputText,
// //             Tags: [...inputText.Tags, value]
// //         })
// //     }
// // }
// // function handleDeleteCategory(category){
// //   setInputText({
// //       ...inputText,
// //       Tags: inputText.Tags.filter((c) =>  c !== category)
// //   })
// // }

//   const handleInputSubmit = (e) => {
//     e.preventDefault();
//         //para no repetir titlos de las notas
//         let noRepetir = posts.filter(post => post.Title === inputText.Title)
//         if(noRepetir.length !== 0){
//             Swal.fire('Error', 'Ya existe una nota con ese nombre, por favor escriba otro','error')
//         }else{
//             let error = validarCampos(inputText)
//             //solo habra propiedades si es que HAY ALGUN ERROR
//             if(!error){
//                 //Entonces si hay algun error,la variable error va a ser un array con la propiedad en donde haya un error
//                 Swal.fire('Error','Llene los campos correctamente','error')
//                 return 
//             }else{
//                 //creo mi juego
//                 console.log(inputText)
//                 //dispatch(putPost(inputText, IdPost));
//                 setInputText({
//                     Date: "",
//                     Title:"",
//                     Content: "",
//                     Image: "",
//                     Tags: [],
//                 });
//             }
//             //navigate('/home')
//         }
   
// //   }

// //   return (

// //     <div className='adminPanelContainer'>
// //       <AdminPanelNavbar />

// //       <Stack bg='#d6d6d6' height='100%' direction='row' justifyContent='center' alignItems='flex-start' pl='0' pt='2%' pb='2%' pr='2%'>

// //         <AdminPanelSidebar />

// //         <Stack width='100%' height='fit-content' bg='white' p='2%' direction='column' justifyContent='top' align='center' boxShadow={`0px 0px 10px 0px rgba(0,0,0,0.3)`}>

// //           <Stack direction='row' width='100%'>
// //             <Button colorScheme='teal' variant='outline' onClick={() => navigate('/adminpanel/posts')}>
// //               <ArrowLeftIcon />
// //               <Text ml='0.5em'> Volver</Text>
// //             </Button>
// //           </Stack>
// //           {
// //             Object.keys(postDetail).length !== 0
// //               ? (
// //                 <Stack w='100%' direction='column' justify='center' align='center' p='2em'>
// //                   <Avatar src={postDetail.Image} size='xl' />
// //                   <Stack w='25em' direction='column' justify='center' align='flex-start'>
// //                     <br />
// //                     <form onSubmit={handleInputSubmit}>
// //                       <Stack direction='row' width='100%'>
// //                         <Text fontSize='xl' fontWeight='600' textAlign='left'> Imagen: </Text>
// //                         <Input name='Image' value={inputText.Image} placeholder={postDetail.Image} borderColor='gray' onChange={handleInputChange} />
// //                         {formErrors.Image && <Text fontSize='sm' color='teal.500'>{formErrors.Image}</Text>}
// //                       </Stack>
// //                       <br />
// //                       <Stack direction='row' width='100%'>
// //                         <Text fontSize='xl' fontWeight='600' > Titulo: </Text>
// //                         <Input name='Title' value={inputText.Title} placeholder={postDetail.Title} borderColor='gray' onChange={handleInputChange} />
// //                         {formErrors.Title && <Text fontSize='sm' color='teal.500'>{formErrors.Title}</Text>}
// //                       </Stack>
// //                       <br />
// //                       <Stack direction='row' width='100%'>
// //                         <Text fontSize='xl' fontWeight='600'> Content: </Text>
// //                         <Input name='Content' value={inputText.Content} placeholder={postDetail.Content} borderColor='gray' width='100%' onChange={handleInputChange} />
// //                         {formErrors.Content && <Text fontSize='sm' color='teal.500'>{formErrors.Content}</Text>}
// //                       </Stack>
// //                       <br />
// //                       <Stack direction='row' width='100%'>
// //                         <Text fontSize='xl' fontWeight='600'> Categorias: </Text>
// //                         <Select placeholder='Categorias' color='gray.500' mt='2em' onChange={handleCategories} >
// //                           {
// //                             categories.map(c => (
// //                               <option key={c._id} value={c.name}>{c.name}</option>
// //                             ))
// //                           }
// //                         </Select>
// //                         {inputText.Tags && inputText.Tags.map((tag) => {
// //                             return(
// //                            <div className='opcion'>
// //                                <div className='opcion_titulo'>{tag}</div>
// //                                <button className='button_delete' onClick={() => handleDeleteCategory(tag)} value={tag} key={tag}><span className={"delete"}>X</span></button>
// //                            </div> )
// //                         })}
// //                         {formErrors.Tags && <Text fontSize='sm' color='teal.500'>{formErrors.Tags}</Text>}
// //                       </Stack>
// //                       <br />
// //                     <Stack direction='row' width='100%'>
// //                       <Button width='50%' colorScheme='teal' variant='outline' onClick={handleInputSubmit}>
// //                         <CheckIcon />
// //                         <Text pr='0.5em'> Guardar cambios</Text>
// //                       </Button>
// //                       <Button width='50%' colorScheme='red' variant='outline' onClick={() => navigate(`/adminpanel/posts/${postDetail._id}`)}>
// //                         <CloseIcon />
// //                         <Text pr='0.5em'> Cancelar cambios</Text>
// //                       </Button>
// //                     </Stack>
// //                   </form>
// //                   </Stack>
// //                 </Stack>
// //               ) : <Loader />
// //           }
// //         </Stack>

// //       </Stack>

// //       <Footer />
// //     </div>
// //   )
// // }

// // export default AdminPostEdit;