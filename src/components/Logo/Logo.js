import React from "react";
import Tilt from 'react-parallax-tilt';
import './Logo.css';
import bender from './bender.png';


const Logo = () => {
  return(
    <div className="ma5 mt0" >

    <Tilt style={{ height: '150px', width: '150px'}} className="tilt br2 shadow-2">
      <div className="pa3">
        <img style={{paddingTop: '5px'}} alt="logo" src={bender} />
      </div>
    </Tilt>

    </div>
    
  )
}

export default Logo;