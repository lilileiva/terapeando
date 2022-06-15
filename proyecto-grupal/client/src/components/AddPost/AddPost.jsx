import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector } from 'react-redux';
import { addVideogame, getGenres, getPlatforms } from '../../Store/Actions';
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
