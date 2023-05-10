import React, { useRef, useState, useEffect } from 'react';
import { CgArrowLeftO, CgArrowRightO } from 'react-icons/cg';
import "./Carousel.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase-config";

function Carousel() {
  const carouselRef = useRef(null);
  const [carousel, setCarousel] = useState([]);
  const [isAtBeginning, setIsAtBeginning] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const carouselCollectionRef = collection(db, "carousel");

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    const getCarousel = async () => {
      const data = await getDocs(carouselCollectionRef);
      setCarousel(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getCarousel();
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
    overflowX: 'hidden',
    width: '100%',
    display: 'flex',
  };

  const carouselBtnsStyle = {
    width: '100%',
    position: 'absolute',
    right: '1px',
    marginTop: windowWidth > 768 ? '204px' : '140px',
  };

  const carsouselContentLeftStyle = {
    float: 'left',
    marginLeft: windowWidth > 768 ? '15px' : '5px',
    marginRight: windowWidth > 768 ? '20px' : '5px',
    fontSize: windowWidth > 768 ? '2rem' : '1.5rem',
    cursor: 'pointer',
    visibility: isAtBeginning ? 'hidden' : 'visible',
  };

  const carsouselContentRightStyle = {
    float: 'right',
    marginRight: windowWidth > 768 ? '10px' : '5px',
    marginLeft: windowWidth > 768 ? '20px' : '5px',
    fontSize: windowWidth > 768 ? '2rem' : '1.5rem',
    cursor: 'pointer',
    visibility: isAtEnd ? 'hidden' : 'visible',
  };

  const carouselLeftStyle = {
    boxShadow: '0 7px 21px 0 rgba(0, 0, 0, 0.20)',
    background: 'none',
    borderRadius: '50%',
  };

  const carouselImgStyle = {
    width: '100%',
    maxHeight: '100%',
    objectFit: 'contain',
  };
  const carouselImgWrapperStyle = {
    maxWidth: '100%',
    height: windowWidth > 768 ? '250px' : '180px',
    flex: '0 0 100%',
    overflow: 'hidden'
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
      if (carouselRef.current) { // check if carouselRef.current is not null
        carouselRef.current.removeEventListener('scroll', handleScroll);
      }
      clearInterval(interval);
    };
  }, [isAtEnd]);
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
      {carousel.map((item) => (
        <div style={carouselImgWrapperStyle}>
          <img style={carouselImgStyle} alt="carouselImgs" src={item.carouselImg} />
        </div>
        ))}
      </div>
    </div>
  )
}
export default Carousel;