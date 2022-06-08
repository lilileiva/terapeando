import React from 'react'
import './post.css'
export default function Post(){
    return(
        <div className="cards">
            <div className="card">
              <img src='https://picsum.photos/id/54/400/300' alt=""/>
              <div className="card-body">
                <h2>What I learned from my visit to The Upside Down</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut  enim ad minim veniam.</p>
                <h5>Nancy Wheeler</h5>
              </div>
            </div>
        </div>
    )
}