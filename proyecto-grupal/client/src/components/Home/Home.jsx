import React, { useState, useEffect } from "react";
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

export default function Home() {
  const AllPsychologist = useSelector((state) => state.allUsersPsichologists);
  const adminSearchbar = useSelector((state) => state.adminSearchbar);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPsychologistByStatus());
    smoothscroll();
  }, [dispatch]);

  useEffect(() => {
    if (adminSearchbar.length !== 0) {
      dispatch(clearPsychologistList());
      dispatch(getUserPsychologistByName(adminSearchbar));
    }
  }, [dispatch, adminSearchbar]);

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
  }

  const tokenClient = window.localStorage.getItem('tokenClient')
  const tokenPsychologist = window.localStorage.getItem('tokenPsychologist')

  return (
    <div>
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

        {AllPsychologist && AllPsychologist.length > 0 ?
          AllPsychologists.map(el => {
            { console.log(el.status) }
            return (

              <CardPsychologist
                key={el._id}
                firstName={el.firstName}
                lastName={el.lastName}
                profileImage={el.profileImage}
                rating={el.rating}
                education={el.education}
                about={el.about}
                // about={`${el.about.slice(0, 270)}...`}
                idPsychologist={el._id}
                Specialties={el.Specialties}
              />
            )
          }) : null
        }

        {/* <Psychologists></Psychologists> */}
      </div>
      <Paged
        postPage={postPage}
        allPosts={AllPsychologist.length}
        paged={paged}
        page={page}
        setPage={setPage}
      />
      <Footer />
    </div>
  );
}
