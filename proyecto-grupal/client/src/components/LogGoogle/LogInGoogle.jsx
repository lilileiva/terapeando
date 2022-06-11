import {GoogleLogin} from 'react-google-login'
import React, { useEffect } from 'react'

const clientId = '451354418729-kmjdfi10akrfqi9a8ln8ntrieehu21v8.apps.googleusercontent.com';

export default function Login(){


   const onSuccess = (res) => {
      console.log('Login success! Current user: ', res.profileObj)
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