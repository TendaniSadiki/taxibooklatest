import React, { useRef, useState, useEffect } from 'react';
import ImageOne from './Images/image-gallery-cone.jpg';
import ImageTwo from './Images/image-gallery-milkbottles.jpg';
import ImageThree from './Images/image-gallery-orange.jpg';
import ImageFour from './Images/image-gallery-sugarcubes.jpg';
import { CgArrowLeftO, CgArrowRightO } from 'react-icons/cg';

function Carousel() {
  const carouselRef = useRef(null);
  const [isAtBeginning, setIsAtBeginning] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const handleScroll = () => {
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    setIsAtBeginning(scrollLeft === 0);
    setIsAtEnd(scrollLeft + clientWidth === scrollWidth);
  };

  const scrollLeft = () => {
    carouselRef.current.scrollLeft -= carouselRef.current.clientWidth;
  };

  const scrollRight = () => {
    carouselRef.current.scrollLeft += carouselRef.current.clientWidth;
  };

  const carouselStyle = {
    overflowX: 'auto',
    width: '100%',
    display: 'flex',
  };

  const carouselBtnsStyle = {
    width: '100%',
    position: 'absolute',
    right: '1px',
    marginTop: '204px',
  };

  const carsouselContentLeftStyle = {
    float: 'left',
    marginLeft: '15px',
    fontSize: '2rem',
    cursor: 'pointer',
    visibility: isAtBeginning ? 'hidden' : 'visible',
  };

  const carsouselContentRightStyle = {
    float: 'right',
    marginRight: '10px',
    fontSize: '2rem',
    cursor: 'pointer',
    visibility: isAtEnd ? 'hidden' : 'visible',
  };

  const carouselLeftStyle = {
    boxShadow: '0 7px 21px 0 rgba(0, 0, 0, 0.20)',
    background: 'none',
    borderRadius: '50%',
  };

  const carouselImgStyle = {
    width:'100%',
    maxHeight:'100%',
    objectFit: 'contain',
  };
  
  const carouselImgWrapperStyle = {
    maxWidth: '100%',
    height: '250px',
    flex: '0 0 100%',
    overflow: 'hidden'
  };
  
  useEffect(() => {
    carouselRef.current.addEventListener('scroll', handleScroll);
    return () => {
      carouselRef.current.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <div>
      <div style={carouselBtnsStyle}>
        <div style={carsouselContentLeftStyle} onClick={scrollLeft}>
          <CgArrowLeftO style={carouselLeftStyle} />
        </div>
        <div style={carsouselContentRightStyle} onClick={scrollRight}>
          <CgArrowRightO style={carouselLeftStyle} />
        </div>
      </div>
      <div style={carouselStyle} ref={carouselRef}>
  <div style={carouselImgWrapperStyle}>
    <img style={carouselImgStyle} alt="carouselImgs" src={ImageOne} />
  </div>
  <div style={carouselImgWrapperStyle}>
    <img style={carouselImgStyle} alt="carouselImgs" src={ImageTwo} />
  </div>
  <div style={carouselImgWrapperStyle}>
    <img style={carouselImgStyle} alt="carouselImgs" src={ImageThree} />
  </div>
  <div style={carouselImgWrapperStyle}>
    <img style={carouselImgStyle} alt="carouselImgs" src={ImageFour} />
  </div>

</div>
    </div>
  );
}


export default Carousel;
