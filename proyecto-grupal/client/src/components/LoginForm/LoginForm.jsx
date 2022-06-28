import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getPsychologistByStatus,
  getAllPsychologist,
  getUserPsychologistByName,
  clearPsychologistList,
} from "../../redux/actions";
import NavbarHome from "../NavbarHome/NavbarHome";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import CardPsychologist from "../CardPsychologist/CardPsychologist";
import "./Home.css";
import Loader from "../Loader/Loader";
import smoothscroll from "../../animations";
import Paged from "../Paged/Paged";
import { BsSearch } from "react-icons/bs";
import { Text, Container, Stack, Button, Input } from "@chakra-ui/react";
import FiltersPsichologist from "../FilterPsichologist/FilterPsichologist";
import AdminSearchbar from "../AdminPanel/AdminSearchbar/AdminSearchbar.jsx";
import { getScheduleAsPsychologist, getScheduleAsClient } from '../../redux/actions';
import Chat from '../Chat/Chat'


export default function Home() {
  const AllPsychologist = useSelector((state) => state.allUsersPsichologists);
  const adminSearchbar = useSelector((state) => state.adminSearchbar);
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(true);
   
  const search = useLocation().search; 
  const token = new URLSearchParams(search).get('token');
  const setToken =  token ? window.localStorage.setItem('tokenClient', token) : null ;


  const tokenClient = window.localStorage.getItem('tokenClient')
  const tokenPsychologist = window.localStorage.getItem('tokenPsychologist')

<<<<<<< HEAD
  useEffect(() => {
    dispatch(getPsychologistByStatus());
    smoothscroll();
  }, [dispatch]);
=======
// function handleAxios() {
//   const response =  axios.get("http://localhost:3001/userclient/auth/google")
// }

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
>>>>>>> c49881fc30ba21556bfb58d99e0027acefe32a19

  useEffect(() => {
    if (adminSearchbar.length !== 0) {
      dispatch(clearPsychologistList());
      dispatch(getUserPsychologistByName(adminSearchbar));
      setLoader(true);
      setTimeout(() => {
        setLoader(false);
      }, 1500);
    }
  }, [dispatch, adminSearchbar]);

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 1500);
  }, [dispatch]);

  /* Paginado */
  const [page, setPage] = useState(1);
  const [postPage, setPostPage] = useState(5);
  const quantityPostPage = page * postPage;
  const firstPage = quantityPostPage - postPage;
  const AllPsychologists = AllPsychologist.slice(firstPage, quantityPostPage);

  const paged = function (pageNumber) {
    setPage(pageNumber);
    smoothscroll();
  };

  const handleSubmit = () => {
    dispatch(getPsychologistByStatus())
    setPage(1)
  }


  return (
    <Stack minHeight='100%' maxHeight='fit-content' justify='space-between'>
      <Stack>
        {
          tokenClient || tokenPsychologist ? <NavbarHome /> : <NavBar />
        }
        <div className="cardContainer">
          <Stack
            mt="1em"
            mb="1em"
            width="100%"
            direction="row"
            justifyContent="space-between"
            align='center'
          >
            <Text fontWeight="semibold" fontSize="3xl" color="green.300">
              Psicólogos
            </Text>

            <Stack direction='row' width='50%' justify='right'>
              <AdminSearchbar width='50%' />
              <Button variant='outline' width='40%' colorScheme='teal' onClick={handleSubmit}>
                Todos los psicólogos
              </Button>
            </Stack>

          </Stack>

          <Stack width="100%" direction="row">
            <FiltersPsichologist />
          </Stack>
          {
            loader
              ? <Loader />
              : AllPsychologist && AllPsychologist.length > 0
                ? AllPsychologists.map(el => {
                  return (
                    <CardPsychologist
                      key={el._id}
                      firstName={el.firstName}
                      lastName={el.lastName}
                      profileImage={el.profileImage}
                      rating={el.rating}
                      education={el.education}
                      about={el.about}
                      IdUserPsychologist={el._id}
                      Specialties={el.Specialties}
                    />
<<<<<<< HEAD
                  )
                })
                : loader ? <Loader></Loader> : <Stack height={'100%'} justify={"flex-start"} mt='7em' ><Text fontSize={'xl'}>No hay resultados</Text></Stack>
          }
        </div>
        <Chat/>
      </Stack>
      <Stack>
        <Paged
          postPage={postPage}
          allPosts={AllPsychologist.length}
          paged={paged}
          page={page}
          setPage={setPage}
        />
        <Footer />
      </Stack>
    </Stack>
=======
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleClick}>
                        {show ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  {formErrors.password && (
                    <Text fontSize="sm" color="teal.500">
                      {formErrors.password}
                    </Text>
                  )}

                  <Stack direction="row"  justifyContent={'center'}   margin={'2em'}>
                    <Button
                      type="submit"
                      bg={"#63caa7"}
                      color="white"
                      variant="solid"
                      _hover={[{ color: "#63caa7" }, { bg: "white" }]}
                      display={'flex'}
                  
                    >
                      Iniciar sesión
                    </Button>

                     {/* <Login mt='1em' /> */}
                    {/* <Button bg='green.100' color={'#63caa7'}> */}
                    {/* Inicia sesión con &nbsp; <FaGoogle /> */}
                    {/* </Button> */}

                    {/* <Button onClick={handleAxios}> Inicia sesión con &nbsp;<FaGoogle/>  </Button> */}
                    <a href="http://localhost:3001/userclient/auth/google"> Inicia sesión con &nbsp;<FaGoogle/>  </a>

                   
                   {/* <Button
                     type="submit"
                     bg={"#63caa7"}
                     color="white"
                     variant="solid"
                     _hover={[{ color: "#63caa7" }, { bg: "white" }]}
                     display={'flex'}
                     onClick={handleLogin}
                 
                      
                      > 
                   Inicia sesión con &nbsp;<FaGoogle /> 
                    </Button> */}

                    </Stack>

                    <Stack >

                    <Button
                      bg="green.100"
                      color={"#285e61"}
                      onClick={() => navigate("/signup")}
                    >
                      ¿Aún no tienes una cuenta?
                    </Button>
                    <Button
                      bg="green.100"
                      color={"#285e61"}
                      
                    >
                      <ForgotPassword/>
                    </Button>
                    </Stack>
                  
                </form>
              </Box>
            </Box>
          </>
        )}
      </Container>

      <Footer />
    </div>
>>>>>>> c49881fc30ba21556bfb58d99e0027acefe32a19
  );
}