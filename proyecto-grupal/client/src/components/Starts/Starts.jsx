import React from "react";
import { GoStar } from "react-icons/go";
import '../Starts/Starts.css';


export default function Starts ({rating}) {



  return (
    <div className="starts">
<<<<<<< HEAD
        {Array(Math.round(rating)).fill(<GoStar size={16} style={{
=======
       {Array(Math.round(rating)).fill(<GoStar size={16} style={{
>>>>>>> 1fbccb5a99e6b58d440d49c9f604553752f5483c
         color: 'orange',
         position: 'relative',
         display: 'inline-block',
         marginRight: '4px',              
        }} />)} 
    </div>
  );
};




