import {GoogleLogin} from 'react-google-login'
import React from 'react'
import { useDispatch } from 'react-redux';
import { createClient } from '../../redux/actions';

const clientId = '566016241332-bvvkb1mn7nh4adol4m197pdgg5c48h26.apps.googleusercontent.com';

export default function Login(){

   const dispatch = useDispatch();
   const onSuccess = (res) => {
      console.log('Login success! Current user: ', res.profileObj)

      const profileInfo = {
         firstname: res.profileObj.name,
         lastname: res.profileObj.familyName,
         birthdate: '',
         country: '',
         email: res.profileObj.email,
         profileimage: res.profileObj.imageUrl,
      }
      dispatch(createClient(profileInfo))
   }

   const onFailure = (res) => {
      console.log('Login failed! res: ', res)
   }


   return(
      <div id='signInButton'>
         <GoogleLogin 
         clientId={clientId}
         buttonText='Login'
         onSuccess={onSuccess}
         onFailure={onFailure}
         cookiePolicy={'single_host_origin'}
         isSignedIn={true}
         />
      </div>
   )
}