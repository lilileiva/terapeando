import {GoogleLogOut} from 'react-google-login'

import React from 'react'

const clientId = '451354418729-kmjdfi10akrfqi9a8ln8ntrieehu21v8.apps.googleusercontent.com';


export default function LogOutGoogle() {
   const onSuccess = () => {
      console.log('Logout success!')
   }

   return(
      <div id='signInButton'>
         <GoogleLogOut 
         clientId={clientId}
         buttonText='Logout'
         onSuccess={onSuccess}
         />
      </div>
   )
}
