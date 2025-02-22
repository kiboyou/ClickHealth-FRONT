import React from 'react'
import Navbar from './navbar/Navbar'
import Header from './navbar/Header'


import videoSrc from '../../assets/deo/bgConsult.mp4';


function Acceuil() {
  return (
    <div>
        <div className="w-full mx-auto section1">
            <Navbar />
            <Header />
            <video src={videoSrc} autoPlay muted playsInline loop className="deo-banane"></video>
            {/* <img src={imageBg} alt="bg-banane" className="deo-banane" /> */}
        </div>
    </div>
  )
}

export default Acceuil