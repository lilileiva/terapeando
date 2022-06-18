import React, { useEffect, useState, useMemo } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AdminPanelNavbar from '../../AdminPanelNavbar/AdminPanelNavbar.jsx';
import AdminPanelSidebar from '../../AdminPanelSidebar/AdminPanelSidebar.jsx';
import Footer from '../../../Footer/Footer.jsx';
import { Stack, Button, Avatar, Text, Input, Select } from '@chakra-ui/react';
import { ArrowLeftIcon, CloseIcon, CheckIcon } from '@chakra-ui/icons';
import { getUserClient, clearClient, deleteUserClient, getPostDetail, clearStatePostDetail} from '../../../../redux/actions';
import Loader from '../../../Loader/Loader.jsx';
import Swal from 'sweetalert2';
import countryList from 'react-select-country-list';


function AdminPostEdit() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const countries = useMemo(() => countryList().getData(), [])

  const { idPost } = useParams();

  useEffect(() => {
    dispatch(getPostDetail(idPost))
    return () => {
      dispatch(clearStatePostDetail())
    }
  }, [dispatch])
  const postDetail = useSelector((state) => state.postDetail);
  console.log(postDetail)

  const handleAlertEdit = (clientId) => {
    Swal.fire({
      title: '¿Estás seguro que quieres guardar estos cambios?',
      icon: 'info',
      showConfirmButton: true,
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Sí',
    }).then((result) => {
      if (result.isConfirmed) {        
        navigate(`/adminpanel/posts/${clientId}`)
        Swal.fire('Post editado correctamente!', '', 'success')
      }
    })
  }

  const [inputText, setInputText] = useState({
    Date: "",
    Title: "",
    Content: "",
    Image: "",
    Tags: []
  })

  /*------------------validaciones----------------*/
  function validarCampos(input) {
    //me guardo los errores
      let errors = {}  
      //fecha
      if(!input.Date){
          //si no hay nada le agrego objeto.name el mensaje a mostrar
          errors.Date = "La fecha es requerida"
      }
      // titulo
      if(!input.Title){
          errors.Title = 'El titulo de la nota es obligatoria'
      }else if(input.Title.length > 100){
          errors.Title = 'El titulo es demasiado largo. escribe un maximo de 100 caracteres'
      }else if(!/^[a-zA-Z0-9-() .]+$/.test(input.Title)){
        //ponemos la expresion regular y la validamos con el titulo
        errors.Title = "El titulo de la nota solo acepta letras, numeros, guiones medios y parentesis"
      }
      //contenido
      if(!input.Content){
          errors.Content = 'El contenido es obligatorio'
      }else if(!/^[a-zA-Z0-9-() .]+$/.test(input.Title)){
        //ponemos la expresion regular y la validamos con el contenido
        errors.Content = "El contenido de la nota solo acepta letras, numeros, guiones medios y parentesis"
      }
      //Imagen
      if(!input.Image){
          errors.Image = 'La Imagen es obligatoria'
      }
      //Tags
      if(!input.Tags.length){
        errors.Tags = 'Es obligatorio tener por lo menos una categoria'
      }
  
      return errors //la funcion valiDate devuelve el objeto errors, ya sea vacio o con alguna propiedad si es q encuentra un error
    };
  const [formErrors, setFormErrors] = useState({})
  /*------------------fin-validaciones----------------*/

  const handleCountries = (e) => {
    setInputText({
      ...inputText,
      country: e.target.value
    })
  }

  const handleInputChange = (e) => {
    setInputText({
      ...inputText,
      [e.target.name]: e.target.value
    })
  }

  const handleInputSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validarCampos(inputText))
  }

  return (

    <div className='adminPanelContainer'>
      <AdminPanelNavbar />

      <Stack bg='#d6d6d6' height='100%' direction='row' justifyContent='center' alignItems='flex-start' pl='0' pt='2%' pb='2%' pr='2%'>

        <AdminPanelSidebar />

        <Stack width='100%' height='fit-content' bg='white' p='2%' direction='column' justifyContent='top' align='center' boxShadow={`0px 0px 10px 0px rgba(0,0,0,0.3)`}>

          <Stack direction='row' width='100%'>
            <Button colorScheme='teal' variant='outline' onClick={() => navigate('/adminpanel/posts')}>
              <ArrowLeftIcon />
              <Text ml='0.5em'> Volver</Text>
            </Button>
          </Stack>
          {
            Object.keys(postDetail).length !== 0
              ? (
                <Stack w='100%' direction='column' justify='center' align='center' p='2em'>
                  <Avatar src={postDetail.Image} size='xl' />
                  <Stack w='25em' direction='column' justify='center' align='flex-start'>
                    <br />
                    <form onSubmit={handleInputSubmit}>
                      <Stack direction='row' width='100%'>
                        <Text fontSize='xl' fontWeight='600' textAlign='left'> Imagen : </Text>
                        <Input name='Image' value={inputText.Image} placeholder={postDetail.Image} borderColor='gray' onChange={handleInputChange} />
                        {formErrors.Image && <Text fontSize='sm' color='teal.500'>{formErrors.Image}</Text>}
                      </Stack>
                      <br />
                      <Stack direction='row' width='100%'>
                        <Text fontSize='xl' fontWeight='600' > Titulo: </Text>
                        <Input name='firstName' value={inputText.firstName} placeholder={postDetail.firstName} borderColor='gray' onChange={handleInputChange} />
                        {formErrors.firstname && <Text fontSize='sm' color='teal.500'>{formErrors.firstname}</Text>}
                      </Stack>
                      <br />
                      <Stack direction='row' width='100%'>
                        <Text fontSize='xl' fontWeight='600'> Apellido: </Text>
                        <Input name='lastName' value={inputText.lastName} placeholder={postDetail.lastName} borderColor='gray' width='100%' onChange={handleInputChange} />
                        {formErrors.lastName && <Text fontSize='sm' color='teal.500'>{formErrors.lastName}</Text>}
                      </Stack>
                      <br />
                      <Stack direction='row' width='100%'>
                        <Text fontSize='xl' fontWeight='600'> País: </Text>
                        <Select placeholder=' País' color='gray.500' mt='2em' onChange={handleCountries} >
                          {
                            countries.map(c => (
                              <option key={c.label} value={c.label}>{c.label}</option>
                            ))
                          }
                        </Select>
                        {formErrors.country && <Text fontSize='sm' color='teal.500'>{formErrors.country}</Text>}
                      </Stack>
                      <br />
                      <Stack direction='row' width='100%'>
                        <Text fontSize='xl' fontWeight='600' textAlign='left'> Fecha de nacimiento: </Text>
                        <Input type='date' value={inputText.date} placeholder={postDetail.birthDate} borderColor='gray' onChange={handleInputChange} />
                        {formErrors.date && <Text fontSize='sm' color='teal.500'>{formErrors.date}</Text>}
                      </Stack>
                      <br />
                      <Stack direction='row' width='100%'>
                        <Text fontSize='xl' fontWeight='600'> Email: </Text>
                        <Input name='email' value={inputText.email} placeholder={postDetail.email} borderColor='gray' onChange={handleInputChange} />
                        {formErrors.email && <Text fontSize='sm' color='teal.500'>{formErrors.email}</Text>}
                      </Stack>
                    </form>
                    <br />
                    <Stack direction='row' width='100%'>
                      <Button width='50%' colorScheme='teal' variant='outline' onClick={handleInputSubmit}>
                        <CheckIcon />
                        <Text pr='0.5em'> Guardar cambios</Text>
                      </Button>
                      <Button width='50%' colorScheme='red' variant='outline' onClick={() => navigate(`/adminpanel/clients/${postDetail._id}`)}>
                        <CloseIcon />
                        <Text pr='0.5em'> Cancelar cambios</Text>
                      </Button>
                    </Stack>

                  </Stack>

                </Stack>
              ) : <Loader />
          }
        </Stack>

      </Stack>

      <Footer />
    </div>
  )
}

export default AdminPostEdit;