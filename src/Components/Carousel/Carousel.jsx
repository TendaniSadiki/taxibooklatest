import React, { useRef, useState, useEffect } from 'react';
import ImageOne from './Images/image-gallery-cone.jpg';
import ImageTwo from './Images/image-gallery-milkbottles.jpg';
import ImageThree from './Images/image-gallery-orange.jpg';
import ImageFour from './Images/image-gallery-sugarcubes.jpg';
import { CgArrowLeftO, CgArrowRightO } from 'react-icons/cg';
import "./Carousel.css"

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

  useEffect(() => {
    carouselRef.current.addEventListener('scroll', handleScroll);
    const interval = setInterval(() => {
      if (!isAtEnd) {
        carouselRef.current.scrollLeft += carouselRef.current.clientWidth;
      } else {
        carouselRef.current.scrollLeft = 0;
      }
    }, 5000);
    return () => {
      carouselRef.current.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, [isAtEnd]);

  return (
    <div>
      <div className="carousel">
        <div className="carouselBtns">
          <div
            className={`carouselContent carouselContent-left ${isAtBeginning ? 'disabled' : ''}`}
            onClick={scrollLeft}
          >
            <CgArrowLeftO />
          </div>
          <div
            className={`carouselContent carouselContent-right ${isAtEnd ? 'disabled' : ''}`}
            onClick={scrollRight}
          >
            <CgArrowRightO />
          </div>
        </div>
        <div className="carouselImgWrapper" ref={carouselRef}>
          <div className="carouselImgWrapper">
            <img className="carouselImg" alt="carouselImgs" src={ImageOne} />
          </div>
          <div className="carouselImgWrapper">
            <img className="carouselImg" alt="carouselImgs" src={ImageTwo} />
          </div>
          <div className="carouselImgWrapper">
            <img className="carouselImg" alt="carouselImgs" src={ImageThree} />
          </div>
          <div className="carouselImgWrapper">
            <img className="carouselImg" alt="carouselImgs" src={ImageFour} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Carousel;
