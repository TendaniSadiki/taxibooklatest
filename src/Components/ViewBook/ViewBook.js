import { CgArrowLeft } from "react-icons/cg";
import { NavLink } from "react-router-dom";
import React, { useState } from "react"
import "./ViewBook.css";
import cityImage from '../Home/bar.jpg'
const ViewBook = () => {
    const [viewmore] = useState(JSON.parse(sessionStorage.getItem("viewMore")));
    return (
        <div className='bookView'>
            <br></br>
            <NavLink to="../Home" exact='true'>
                <i className="backIcon"><CgArrowLeft /></i>
            </NavLink>
            <p className="date">Date: {viewmore.BookingDate}</p>
            <div className="viewMoreContent">
                <div className="viewMoreImage">
                    <img alt="city" src={cityImage} />
                </div>
                <div>
                    
                    <p>Destination: {viewmore.BookService}</p>
                    <p>Price: R{viewmore.BookingPrice}.00</p>
                    <div className="descriptionContent">
                    <h3>Description </h3>
                    <p>{viewmore.description}</p>
                    </div>
                    
                </div>
                <div className="BtnViewContent">
                    <NavLink to="../Paymethods" exact='true'> <button className="ViewBookBtn">Book</button></NavLink>
                </div>
            </div>

        </div>
    )
}

export default ViewBook;