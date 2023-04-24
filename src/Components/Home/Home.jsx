import React, { useState, useEffect } from "react";
import {  collection, getDocs } from 'firebase/firestore';
import { db } from "../../firebase-config";
import "./home.css";

export default function Home() {
    const [tickets, setTickets] = useState([]);
    const [selectedTicketId, setSelectedTicketId] = useState(null);
    const ticketsCollectionRef = collection(db,"tickets");

    useEffect(() => {
        const getTickets = async () =>{
          const data = await getDocs(ticketsCollectionRef);
          setTickets(data.docs.map((doc) =>({...doc.data(), id: doc.id })))
        }
        getTickets()
    }, []);

    const handleBookClick = (ticketId) => {
        setSelectedTicketId(ticketId);
    }

    const selectedTicket = selectedTicketId ? tickets.find(ticket => ticket.id === selectedTicketId) : null;

    return (
        <div className="Content">
            {tickets.map((book, inx) => {
                return (
                    <div className="bookContent" key={inx}>
                        <div className="LeftContent">
                            <div>
                            </div>
                            <div className="BtnContent">
                                <button className="BookBtn" onClick={() => handleBookClick(book.id)}>Book</button>
                            </div>
                        </div>
                        <div className="RightContent">
                            <p>Date: {book.BookingDate}</p>
                            <p>From: {book.BookFrom}</p>
                            <p>To: {book.BookTo}</p>
                            <p>Price: R{book.BookingPrice}</p>
                        </div>
                    </div>
                )
            })}
            <div className="circle1"></div>
            <div className="circle2"></div>
            {selectedTicket && (
                <div className="modal">
                    <div className="modalContent">
                        <h2>{selectedTicket.BookFrom} to {selectedTicket.BookTo}</h2>
                        <p>Date: {selectedTicket.BookingDate}</p>
                        <p>Price: R{selectedTicket.BookingPrice}</p>
                        <button className="closeBtn" onClick={() => setSelectedTicketId(null)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}
