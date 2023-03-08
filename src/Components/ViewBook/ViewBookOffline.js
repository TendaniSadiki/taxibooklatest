import { CgArrowLeft } from "react-icons/cg";
import { NavLink } from "react-router-dom";
import React, { useState } from "react"
import "./ViewBook.css";
const ViewBookOffline = () => {
   
    return (
        <div className='bookView'>
            <br></br>
            <NavLink to="../Home" exact='true'>
                <CgArrowLeft />
            </NavLink>
            <div className="">
                <p>Date: viewmore.BookingDate</p>
                <p>Destination: viewmore.BookServic</p>
                <NavLink to="../Login" exact='true'  > <button className="BookBtn">Book</button></NavLink>

            </div>

        </div>
    )
}

export default ViewBookOffline;