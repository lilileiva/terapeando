import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAllPsychologist } from '../../redux/actions';
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import CardPsychologist from '../CardPsychologist/CardPsychologist';
import smoothscroll from '../../animations';
import Paged from '../Paged/Paged';
import './psychologist.css'
import { Text, Stack } from "@chakra-ui/react"


export default function Psychologists() {

    const AllPsychologist = useSelector(state => state.allUsersPsichologists);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllPsychologist())
        smoothscroll();
    }, [dispatch]);

    /* Paginado */
    const [page, setPage] = useState(1);
    const [postPage, setPostPage] = useState(3);
    const quantityPostPage = page * postPage;
    const firstPage = quantityPostPage - postPage;
    const Psychologists = AllPsychologist.slice(firstPage, quantityPostPage)

    const paged = function (pageNumber) {
        setPage(pageNumber);
        smoothscroll();
    }

    return (
        <div>
            <NavBar />

            <div className='psy'>

                <Stack width='100%' direction='row' justifyContent='left'>
                    <Text fontWeight='semibold' fontSize='3xl' marginTop='1em' marginBottom='1em' color='green.300'>Psicólogos</Text>
                </Stack>

                {/* <div className='psyContainer'>
                     {AllPsychologist.map(el => {
                        return (console.log(el))
                        })}
                </div> */}
                <div >
                    {
                        AllPsychologist.length !== 0 ?
                            AllPsychologist.map(el => {
                                //console.log(el.about.slice(0,100))
                                return (
                                    <CardPsychologist
                                        key={el._id}
                                        firstName={el.firstName}
                                        lastName={el.lastName}
                                        profileImage={el.profileImage}
                                        rating={el.rating}
                                        education={el.education}
                                        about={el.about.slice(0, 300)}
                                        idUserPsychologist={el._id}
                                        Specialties={el.Specialties}
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
                <Footer />
            </div>
        </div>
    )
}

