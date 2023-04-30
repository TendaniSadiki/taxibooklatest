import React from 'react';
import "./carousel.css"
import ImageOne from './Images/image-gallery-cone.jpg'
import ImageTwo from './Images/image-gallery-milkbottles.jpg'
import ImageThree from './Images/image-gallery-orange.jpg'
import ImageFour from './Images/image-gallery-sugarcubes.jpg'
import ImageFive from './Images/image-transform.jpg'

import {CgArrowLeftO, CgArrowRightO} from "react-icons/cg";


function Carousel() {
  const ScrollLeft =()=>{
    console.log("Left")
  }
  const ScrollRight =()=>{
    console.log("Right")
  }
  return (
    <div>
      <div className='carouselBtns'>
          <div className='carsouselContentLeft' onClick={ScrollLeft}>
            <CgArrowLeftO className='carouselLeft'/>
          </div>
          <div className='carsouselContentRight' onClick={ScrollRight}>
            <CgArrowRightO className='carouselRight'/>
          </div>
        </div>
      <div className="carousel">
       <img className="carouselImg"alt="carouselImgs"src={ImageOne}/>
       <img className="carouselImg"alt="carouselImgs"src={ImageTwo}/>
       <img className="carouselImg"alt="carouselImgs"src={ImageThree}/>
       <img className="carouselImg"alt="carouselImgs"src={ImageFour}/>
       <img className="carouselImg"alt="carouselImgs"src={ImageFive}/>
      </div>
    </div>
  )
}

export default Carousel