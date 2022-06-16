import React, { useState } from 'react';
import './AdminSearchbar.css';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Button } from '@chakra-ui/react';
import { BsSearch } from "react-icons/bs";

function AdminSearchbar() {

    const dispatch = useDispatch();

    const [inputText, setinputText] = useState("");

    // const handleInputSubmit = () => {

    // }

    return (
        <form className='formSearchbar'>
            <Input name='name' focusBorderColor='teal.400' placeholder='Buscar usuarios clientes' />
            <Button type='submit' colorScheme='teal' variant='outline' ml='0.5em'>
                <BsSearch />
            </Button>
        </form>
    )
}

export default AdminSearchbar;