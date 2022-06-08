<<<<<<< HEAD
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducer/index.js";
import thunk from "redux-thunk";


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))


export default store;
=======
import {createStore,applyMiddleware,compose} from 'redux';
import rootReducer from '../reducer/index.js';
import thunk from "redux-thunk";
//para poder acceder a la herramienta reduxdevtools
const composeEnhancers =  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//Para poder trabajar con cosas asincronas o funciones no puras ya que el reducer lo restringe
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
//para pasarselo al provaider que es el encargado de abrazar toda nuestra app
export default store
>>>>>>> ad316de5b9d0a56d2562b0e541ec70ff18e2ff0e
