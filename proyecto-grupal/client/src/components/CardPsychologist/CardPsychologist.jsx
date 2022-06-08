import React from "react";
import {Box, Avatar , Text, Stack} from "@chakra-ui/react"
import {style} from "././CardPsychologist.module.css"

export default function CardPsychologist({firstName , lastName , Specialties, profileImage, rating})  {

return( 
    <Box width="850px" height="280px"   marginTop={150} rounded="10px" display='inline-block' border='2px' borderColor='blackAlpha.400' position="absolute">
        <Stack  width='250px' height="280px" border='2px'  >
        <Avatar src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="img not found" size='2xl' margin='auto' marginTop='15px' marginBottom='10px' ></Avatar>
        <Text as='ins' textAlign='center' fontWeight='semibold'>Doctor Juan Carlos Prieto</Text>
        <Text> Especialidad </Text>
        <Text> Calificación </Text>
        </Stack>
        <Box width='250px' height="280px" border='2px' display='inline-block' position='absolute' top={0} right='0' >
        </Box>

    </Box>
)
};