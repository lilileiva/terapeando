import {
  Stack,
} from "@chakra-ui/react";
import NotFound from '../404notFound/notFound.jsx';
import PsychologistProfile from './PsychologistProfile'
import ClientProfile from "./ClientProfile";


export default function ClientDetails() {

  const tokenClient = window.localStorage.getItem('tokenClient')
  const tokenPsychologist = window.localStorage.getItem('tokenPsychologist')

  return (
    <Stack className='ClientDetailsContainer'>
      {
        tokenClient
          ? (
            <>
              <ClientProfile />
            </>

          ) : tokenPsychologist ? ( 
              <>
              <PsychologistProfile />
            </>
          )
            : (<NotFound />)
      }
    </Stack>
  );
}