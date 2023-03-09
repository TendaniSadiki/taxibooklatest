import React, { useState, useEffect } from "react";
import {  collection, getDocs } from 'firebase/firestore';
import { db } from "../../firebase-config";
import { NavLink } from "react-router-dom";
// import SideBar from "../SideBar/SideBar";
import "./home.css";

export default function Home() {
    const [tickets, setTickets] = useState([]);
    const ticketsCollectionRef = collection(db,"tickets");
    useEffect(() => {
        const getTickets = async () =>{
          const data = await getDocs(ticketsCollectionRef);
          setTickets(data.docs.map((doc) =>({...doc.data(), id: doc.id })))
        }
        getTickets()
      }, []);
    return (
        <div className="Content">
            {tickets.map((book, inx) => {
                const viewmore = () => {
                    console.log(inx + book);
                    sessionStorage.setItem("viewMore", JSON.stringify(book));
                }
                return (
                    <div className="bookContent" key={inx}>
                        <div className="LeftContent">
                            <div>
                                
                            </div>
                            <div className="BtnContent">
                                <NavLink to="../ViewBookOffline" exact='true' onClick={viewmore} > <button className="BookBtn">Book</button></NavLink>
                            </div>
                        </div>
                        <div className="RightContent">
                            <p>Date: {book.BookingDate}</p>
                            <p>From: {book.BookFrom}</p>
                            <p>To: {book.BookTo}</p>
                            <p>Price: R{book.BookingPrice}</p>
                        </div>
                    </div>)
            })}
            <div className="circle1"></div>
            <div className="circle2"></div>
            
              
        </div>
    );}