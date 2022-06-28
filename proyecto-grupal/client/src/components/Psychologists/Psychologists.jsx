import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getPsychologistByStatus } from '../../redux/actions';
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import CardPsychologist from '../CardPsychologist/CardPsychologist';
import smoothscroll from '../../animations';
import Paged from '../Paged/Paged';
import './psychologist.css'
import { Text, Stack } from "@chakra-ui/react"
import FiltersPsichologist from '../FilterPsichologist/FilterPsichologist';


export default function Psychologists() {
    const AllPsychologist = useSelector(state => state.allUsersPsichologists);
   

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPsychologistByStatus())
        console.log(AllPsychologist)
        smoothscroll();
    }, [dispatch]);

    /* Paginado */
    const [page, setPage] = useState(1);
    const [postPage, setPostPage] = useState(5);
    const quantityPostPage = page * postPage;
    const firstPage = quantityPostPage - postPage;
    const AllPsychologists = AllPsychologist.slice(firstPage, quantityPostPage)

    const paged = function (pageNumber) {
        setPage(pageNumber);
        smoothscroll();
    }

    return (
        <div>
            <NavBar />
            <div className='cardContainer'>


                <Stack width='100%' direction='row' justifyContent='left'>
                    <Text fontWeight='semibold' fontSize='3xl' marginTop='1em' marginBottom='1em' color='green.300'>Psicólogos</Text>

                </Stack>


                <FiltersPsichologist />

                <div >
                    {AllPsychologist && AllPsychologist.length > 0 ?
                        AllPsychologists.map(el => {
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
                                    inicio={el.inicio}
                                    fin={el.fin}
                                    dias={el.dias}
                                />
                                
                            )
                        }) : null
                    }
                </div>
                <Paged
                    position='relative'
                    postPage={postPage}
                    allPosts={AllPsychologist.length}
                    paged={paged}
                    page={page}
                    setPage={setPage} />
            </div>
            <Footer />
        </div>
    )
}

