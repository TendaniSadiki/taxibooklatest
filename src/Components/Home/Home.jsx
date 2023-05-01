import React, { useState, useEffect } from "react";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db, auth } from "../../firebase-config";
import { PaystackButton, PaystackPop } from "react-paystack";
import "./home.css";
import {  CgSearch } from "react-icons/cg";
import SearchModal from "../Modal/SearchModal"
import Carousel from '../Carousel/Carousel'
export default function Home() {
    const [tickets, setTickets] = useState([]);
    const [selectedTicketId, setSelectedTicketId] = useState(null);
    const [step, setStep] = useState(1);
    const [searchState, setSearchState] = useState(false);

    const [userEmail, setUserEmail] = useState('');
    console.log(userEmail)
    const ticketsCollectionRef = collection(db, "tickets");
    useEffect(() => {
        // Listen for authentication state changes
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                // If user is signed in, get their email
                setUserEmail(user.email);
            } else {
                // If user is signed out, clear the email
                setUserEmail("");
            }
        });
        // Unsubscribe from the listener when the component unmounts
        return () => unsubscribe();
    }, []);
    useEffect(() => {
        const getTickets = async () => {
            const data = await getDocs(ticketsCollectionRef);
            setTickets(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        getTickets();
    }, []);

    const handleBookClick = (ticketId) => {
        setSelectedTicketId(ticketId);
        setStep(2);
    };



    const selectedTicket = selectedTicketId
        ? tickets.find((ticket) => ticket.id === selectedTicketId)
        : null;

    const config = {
        reference: (new Date()).getTime(),
        email: userEmail,
        amount: selectedTicket?.BookingPrice * 100,
        currency: "ZAR",
        publicKey: "pk_test_baa046c09401f2592c3572734ea63b34ac11a4d2", // Replace with your Paystack public key
    };
    
    const handlePaystackPayment = () => {
        const handler = window.PaystackPop.setup({
            key: config.publicKey,
            email: config.email,
            amount: config.amount,
            currency: config.currency,
            ref: config.reference,
            onClose: () => {
                setStep(1);
                setSelectedTicketId(null);
            },
            callback: () => {
                // Write user's email and payment details to a new collection inside "tickets"
                const userPaymentRef = collection(db, "tickets", selectedTicketId, "payments");
                addDoc(userPaymentRef, {
                    email: config.email,
                    amount: config.amount,
                    date: new Date(),
                });
            },
        });
        handler.openIframe();
    };
    

    return (
        <div className="Content">
            <Carousel/>
            <div className="searchIconContent">
                <button><CgSearch onClick={() => {
                    setSearchState(true)
                }} />
                </button>
            </div>
            {searchState && 
           <SearchModal closeSearchModal={setSearchState} />
           }
           
            {tickets.map((book, inx) => {
                return (
                    <div className="bookContent" key={inx}>
                        <div className="LeftContent">
                            <div></div>
                            <div className="BtnContent">
                                <button
                                    className="BookBtn"
                                    onClick={() => handleBookClick(book.id)}
                                >
                                    Book
                                </button>
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
                );
            })}
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
                            <PaystackButton
                                className="paystackBtn"
                                {...config}
                                text="Continue to Payment"
                                onSuccess={() => setStep(4)}
                                onClose={() => {
                                    setStep(1);
                                    setSelectedTicketId(null);
                                }}
                                onClick={handlePaystackPayment}
                            />
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}