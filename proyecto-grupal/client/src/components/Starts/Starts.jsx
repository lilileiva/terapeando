import React from "react";
import { GoStar } from "react-icons/go";
import '../Starts/Starts.css';


export default function Starts ({ rating }) {

  const roundRating = Math.round(rating)



  return (
    <div className="starts">
       {Array(roundRating).fill(<GoStar size={16} style={{
         color: 'orange',
         position: 'relative',
         display: 'inline-block',
         marginRight: '4px',              
        }} />)} 
    </div>
  );
};




