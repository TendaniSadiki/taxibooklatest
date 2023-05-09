import React, { useState, useEffect } from "react";
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { auth, db } from "../../firebase-config";
// import SideBar from "../SideBar/SideBar";
import "./HomeOffline.css";
import Carousel from "../Carousel/Carousel";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";

export default function HomeOffline() {
    const [userEmail, setUserEmail] = useState('');
    const [tickets, setTickets] = useState([]);
    const [selectedTicketId, setSelectedTicketId] = useState(null);
    const [step, setStep] = useState(1);
    const ticketsCollectionRef = collection(db, "tickets");
    const handleBookClick = (ticketId) => {
        setSelectedTicketId(ticketId);
        setStep(2);
    };
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
          setUserEmail(user?.email || '');
        });
    
        const getTickets = async () => {
          const data = await getDocs(ticketsCollectionRef);
          setTickets(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        };
        getTickets();
    
        return () => unsubscribe();
      }, []);
    
    const selectedTicket = selectedTicketId
        ? tickets.find((ticket) => ticket.id === selectedTicketId)
        : null;
    return (
        <div className="Content">
            <Carousel />

            {tickets.map((book, id) => {
                return (
                    <div className="bookContent" key={id}>
                        <div className="LeftContent">
                            <div></div>
                            <div className="BtnContent">
                                <button className="BookBtn" onClick={() => handleBookClick(book.id)}>Book</button>
                            </div>
                        </div>
                        <div className="RightContent">
                            <p>Date: {book.BookingDate}</p>
                            <p>From: {book.BookFrom}</p>
                            <p>To: {book.BookTo}</p>
                            <p>Seats: {book.NumberOfPassengers}</p>
                            <p>Price: R{book.BookingPrice}</p>
                        </div>
                    </div>
                );})}
            {selectedTicket && step === 2 && (
                <div className="modal">
                    <div className="modalContent">
                        <h2>
                            {selectedTicket.BookFrom} to {selectedTicket.BookTo}
                        </h2>
                        <p>Date: {selectedTicket.BookingDate}</p>
                        <p>Seats: {selectedTicket.NumberOfPassengers}</p>
                        <p>Price: R{selectedTicket.BookingPrice}</p>
                        <div>
                            <button
                                className="closeBtn"
                                onClick={() => setSelectedTicketId(null)}
                            >
                                Close
                            </button>
                        </div>
                        <div>
                            <h3>Sign In or Sign Up to Continue:</h3>
                            <div className="authButtons">
                                <button onClick={() => setStep(3)}>Sign In</button>
                                <button onClick={() => setStep(4)}>Sign Up</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {step === 3 && (
                <div className="modal">
                    <div className="modalContent">
                        {/* Sign up form goes here */}
                        <Login />
                        <button className="closeBtn" onClick={() => setStep(2)}>Cancel</button>
                        <div>
                        </div>
                    </div>
                </div>
            )}
             {step === 4 && (
                <div className="modal">
                    <div className="modalContent">
                        <button className="closeBtn" onClick={() => setStep(2)}>Cancel</button>
                        {/* Sign up form goes here */}
                        <Signup />
                        <button className="closeBtn" onClick={() => setStep(2)}>Cancel</button>
                        <div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}