import React, { useState } from "react";

// import SideBar from "../SideBar/SideBar";
import "./HomeOffline.css";

export default function HomeOffline() {

    return (
        <div className="Content">
            {/* {Bookings.map((book, inx) => {
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
                                <NavLink to="../ViewBookOffline" exact='true' onClick={viewmore} > <button className="BookBtn">Book</button></NavLink>
                            </div>
                        </div>
                        <div className="RightContent">
                            <p>Date: {book.BookingDate}</p>
                            <p>Destination: {book.BookService}</p>
                        </div>
                    </div>)
            })}
            <div className="circle1"></div>
            <div className="circle2"></div> */}
            <div>
                <div>
                
                </div>
                <div>
                    <div>
                        <label>From</label>
                        <select>
                            <option></option>
                        </select>
                    </div>
                    <div>
                        <label>To</label>
                        <select>
                            <option></option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );}