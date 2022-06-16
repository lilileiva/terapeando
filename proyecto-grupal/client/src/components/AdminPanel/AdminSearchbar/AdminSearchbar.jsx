import React, { useState } from 'react';
import './AdminSearchbar.css';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Button } from '@chakra-ui/react';
import { BsSearch } from "react-icons/bs";
import { adminSearchbar } from '../../../redux/actions';

function AdminSearchbar() {

    const dispatch = useDispatch();

    const [inputText, setInputText] = useState('');

    const handleInputChange = (e) => {
        e.preventDefault();
        setInputText(e.target.value)
    }

    const handleInputSubmit = (e) => {
        e.preventDefault();     
        dispatch(adminSearchbar(inputText))
    }

    return (
        <form className='formSearchbar' onSubmit={(e) => handleInputSubmit(e)}>
            <Input name='inputText' focusBorderColor='teal.400' placeholder='Buscar usuarios clientes' onChange={(e) => handleInputChange(e)} />
            <Button type='submit' colorScheme='teal' variant='outline' ml='0.5em'>
                <BsSearch />
            </Button>
        </form>
    )
}

export default AdminSearchbar;