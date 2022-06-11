import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getAllPsychologist } from '../../redux/actions';
import NavBar from "../NavBar/NavBar";
import CardPsychologist from '../CardPsychologist/CardPsychologist';


export default function Psychologists() {

    const AllPsychologist = useSelector(state => state.allUsersPsichologists);
    const dispatch = useDispatch();

    useEffect(() => { dispatch(getAllPsychologist()); }, [dispatch]);


    return (
        <div>
            <div>
                <NavBar/>
            </div>
            <div>
                {AllPsychologist.map(el => {
                    return (
                        console.log(el)
                    )
                })}
            </div>
            <div>
                {AllPsychologist.length !== 0 ?
                    AllPsychologist.map(el => {
                        //console.log(el.about.slice(0,100))
                        return (
                            <CardPsychologist
                                firstName={el.firstName}
                                lastName={el.lastName}
                                profileImage={el.profileImage}
                                rating={el.rating}
                                education={el.education}
                                about={el.about.slice(0, 300)}
                            />
                        )
                    }) : <div>Cargando...</div>}
            </div>
        </div>
    )
}

