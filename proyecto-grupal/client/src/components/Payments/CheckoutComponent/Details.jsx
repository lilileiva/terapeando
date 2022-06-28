import React, { useEffect, useState } from "react";
import { useStripe } from "@stripe/react-stripe-js";
import { Badge, Button, Checkbox, FormControl, FormLabel, GridItem, Heading, HStack, Input, Select, SimpleGrid, VStack } from '@chakra-ui/react'
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserPsychologistOne, createPayment, getUserPsychologistDetailsCli, getUserPsychologistDetails } from "../../../redux/actions";
import { fetchFromApi } from "./helper";
import Swal from 'sweetalert2';

const idClient = "62a3a0b4cc3f8656e112d930";

let psychologistCommission = 800;
let stripeTax = psychologistCommission*0.04;
let terapeandoTax = psychologistCommission*0.05;
let total = (psychologistCommission + stripeTax + terapeandoTax)

/* validaciones */
const regLetter = /^[A-Za-z ]+$/;
const regEmail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const regAddress = /^[A-Za-z0-9\s]+$/
const regCelular = /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/

function validate(input){
   const errors = {};
   if(!regLetter.test(input.firstName)) errors.firstName = 'El nombre no es valido'
   if(!regLetter.test(input.lastName)) errors.lastName = 'El apellido no es válido'
   if(!regAddress.test(input.address)) errors.address = 'La direccion no es valida'
   if(!regLetter.test(input.city)) errors.city = 'La ciudad no es valida'
   if(!regLetter.test(input.country)) errors.country = 'El país no es valida'
   if(!regCelular.test(input.celphone)) errors.celphone = 'El número de celular no es valida'
   if(!regEmail.test(input.email)) errors.email = 'El email no es válido'
   return errors
}

function Details({idPsy}) {
   const [check, setCheck] = useState(false);
   console.log(check)
   const [errors, setErrors] = useState({});
   const [input, setInput] = useState({
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      country: '',
      celphone: '',
      email: ''
   })

   // traigo datos psicologo
   const dispatch = useDispatch();
   const { idPsychologist } = useParams()

   const tokenClient = window.localStorage.getItem('tokenClient')
   const tokenPsychologist = window.localStorage.getItem('tokenPsychologist')

   useEffect(() => {
      tokenClient
        ? dispatch(getUserPsychologistDetailsCli(idPsychologist))
        : dispatch(getUserPsychologistDetails(idPsychologist))
    }, [dispatch]);
    const psyDetails = useSelector((state) => state.userPsichologistDetail)

   const stripe = useStripe();
   
   // manejo evento stripe
   const handleGuestCheckout = async (e) => {
     e.preventDefault();

     const line_items = [
       {
         quantity: 1,
         price_data: {
           currency: "usd",
           unit_amount: `${total}`,
           product_data: {
             name: `${psyDetails.firstName} ${psyDetails.lastName}`,
               description: 'Terapeando S.A.',
               images: [`${psyDetails.profileImage}`]
           }
       }
       }
     ]

     const newPayment = {
      firstName: input.firstName,
      lastName: input.lastName,
      address: input.address,
      city: input.city,
      country: input.country,
      celphone: input.celphone,
      email: input.email,
      idClient: idClient,
      idPsychologist: idPsychologist,
      quantity: line_items[0].quantity,
      amount: line_items[0].price_data.unit_amount,
      currency: line_items[0].price_data.currency,
      psyName: line_items[0].price_data.product_data.name,
     }

     console.log(newPayment)

     if (Object.values(errors).length > 0) {
      alert("La información no cumple con los requerimientos");
   } else if (
      input.firstName === "" &&
      input.lastName === "" &&
      input.address === "" &&
      input.city === "" &&
      input.country === "" &&
      input.celphone === "" &&
      input.email === ""
   ) {
       Swal.fire("Por favor, no dejes campos en blanco")
   } else if(!check){
      Swal.fire("Debes aceptar nuestros Términos y Condiciones para seguir")
   }else{
      dispatch(createPayment(newPayment))
      setInput({
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      country: '',
      celphone: '',
      email: ''
      })
   }
 
     const response = await fetchFromApi('payment/checkout', {
       body: { line_items, customer_email: input.email }
     });
 
     const { sessionId } = response;
     console.log(sessionId)
     const { error } = await stripe.redirectToCheckout({
       sessionId
     });
 
     if(error) {
       console.log(error);
     }
   }

function handleChange(e){
   e.preventDefault();
   setInput((input) => {
     const newInput = {
       ...input,
       [e.target.name]: e.target.value,
     };
     const validation = validate(newInput);
     setErrors(validation);
     return newInput;
   });
}

  return (
    <VStack w={'full'} h={'100%'} p={10} spacing={10} py={5} alignItems='flex-start'>
      <VStack spacing={3} alignItems='flex-start'>
   <Heading size={'2xl'}>Detalles de pago</Heading>
      </VStack>
      <SimpleGrid column={2} columnGap={3} rowGap={6} w={'full'}>
      <GridItem colSpan={1}>
      <FormControl>
         <HStack alignItems={'center'}>
         <FormLabel>Nombre</FormLabel>
         {errors.firstName && <Badge colorScheme='red'>{errors.firstName}</Badge>}
         </HStack>
         <Input placeholder='Nombre'
         name="firstName"
         value={input.firstName}
         onChange={(e) => handleChange(e)} />
      </FormControl>
      </GridItem>

      <GridItem colSpan={1}>
      <FormControl>
      <HStack alignItems={'center'}>
         <FormLabel>Apellido</FormLabel>
            {errors.lastName && <Badge colorScheme='red'>{errors.lastName}</Badge>}
         </HStack>
         <Input placeholder='Apellido'
         name="lastName"
         value={input.lastName}
         onChange={(e) => handleChange(e)}/>
      </FormControl>
      </GridItem>

      <GridItem colSpan={2}>
      <FormControl>
      <HStack alignItems={'center'}>
         <FormLabel>Dirección</FormLabel>
            {errors.address && <Badge colorScheme='red'>{errors.address}</Badge>}
            </HStack>
         <Input placeholder='Dirección'
         name="address"
         value={input.address}
         onChange={(e) => handleChange(e)}/>
      </FormControl>
      </GridItem>

      <GridItem colSpan={1}>
      <FormControl>
      <HStack alignItems={'center'}>
         <FormLabel>Ciudad</FormLabel>
            {errors.city && <Badge colorScheme='red'>{errors.city}</Badge>}
            </HStack>
         <Input placeholder='Ciudad'
         name="city"
         value={input.city}
         onChange={(e) => handleChange(e)}/>
      </FormControl>
      </GridItem>

      <GridItem colSpan={1}>
      <FormControl>
      <HStack alignItems={'center'}>
         <FormLabel>Pais</FormLabel>
            {errors.country && <Badge colorScheme='red'>{errors.country}</Badge>}
            </HStack>
         <Input placeholder='País'
         name="country"
         value={input.country}
         onChange={(e) => handleChange(e)}/>
      </FormControl>
      </GridItem>

      <GridItem colSpan={1}>
      <FormControl>
      <HStack alignItems={'center'}>
         <FormLabel>Celular</FormLabel>
            {errors.celphone && <Badge colorScheme='red'>{errors.celphone}</Badge>}
            </HStack>
         <Input placeholder='Celular'
         name="celphone"
         value={input.celphone}
         onChange={(e) => handleChange(e)}/>
      </FormControl>
      </GridItem>

      <GridItem colSpan={1}>
      <FormControl>
      <HStack alignItems={'center'}>
         <FormLabel>Email</FormLabel>
         {errors.email && <Badge colorScheme='red'>{errors.email}</Badge>}
            </HStack>
         <Input placeholder='Email'
         name="email"
         value={input.email}
         onChange={(e) => handleChange(e)}/>
      </FormControl>
      </GridItem>
      <GridItem colSpan={1}>
         <Checkbox onChange={() => setCheck(true)}>Acepto los Términos y Condiciones de la plataforma.</Checkbox>
      </GridItem>
      {(input.email === "" || !regEmail.test(input.email))? <Button isDisabled colorScheme={'teal'} type='submit'  onClick={handleGuestCheckout}>
          Pagar Sesión
        </Button> : 
        <Button colorScheme={'teal'} type='submit'  onClick={handleGuestCheckout}>
        Pagar Sesión
      </Button>
      }
      </SimpleGrid>
    </VStack>
  )
}

export default Details