import React, { useState } from "react";
import bar from "./bar.jpg";
import { NavLink } from 'react-router-dom';
// import SideBar from "../SideBar/SideBar";
import "./home.css";


export default function Home() {
    
    const [Bookings] = useState(JSON.parse(localStorage.getItem("Bookings")));
  

  
    return (
        <div className="Content">
            {Bookings.map((book, inx) => {
                const viewmore = () => {
                    console.log(inx + book);
                    sessionStorage.setItem("viewMore", JSON.stringify(book));
                }
                return (
                    <div className="bookContent" key={inx}>
                        <div className="LeftContent">
                            <div>
                                <img src={bar} alt="Logo" className="TaxiLogo" />
                            </div>
                            <div className="BtnContent">
                                <NavLink to="../ViewBook" exact='true' onClick={viewmore} > <button className="BookBtn">Book</button></NavLink>
                            </div>
                        </div>
                        <div className="RightContent">
                            <div className="homeBookContent">
                                <p>Date: {book.BookingDate}</p>
                                <p>Destination: {book.BookService}</p>
                                <p>Seats available: {book.NumberOfPassengers}</p>
                            </div>

                        </div>
                    </div>
                )
            })}
            <div className="circle1"></div>
            <div className="circle2"></div>
        </div>

    )
        ;

}