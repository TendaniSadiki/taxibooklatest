import React, { useState } from 'react';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "../../firebase-config";
import { CgArrowDown, CgArrowUp, CgCloseO, CgSearch } from 'react-icons/cg';

function SearchModal({ closeSearchModal }) {
    const [searchResults, setSearchResults] = useState([]);

    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");

    const handleSearch = async () => {
        if (from && to) {
            const q = query(
                collection(db, "tickets"),
                where("BookFrom", "==", from),
                where("BookTo", "==", to)
            );
            const querySnapshot = await getDocs(q);
            const docs =[]
            console.log(querySnapshot.docs.map((doc) => doc.data()));
            // Do something with the search results
            setSearchResults(docs);

        }
    };

    return (
        <div>
            <div className="searchContent">
                <div className="closesearchModal">
                    <CgCloseO onClick={() => {
                        closeSearchModal(false)
                    }} />
                </div>
                <div>
                    <h1>Search for Ticket</h1>
                </div>
                <div className="searchBar">
                    <div className="selectWrapper">
                        <div className="selectContent">
                            <label>From</label>
                            <select value={from} onChange={(e) => setFrom(e.target.value)}>
                                <option value="">Select a location</option>
                                <option value="Krugersdorp">Krugersdorp</option>
                                <option value="Roodepoort">Roodepoort</option>
                                <option value="Thembisa">Thembisa</option>
                            </select>
                        </div>
                        <br></br>
                        <div className="selectContent">
                            <label>To</label>
                            <select value={to} onChange={(e) => setTo(e.target.value)}>
                                <option value="">Select a location</option>
                                <option value="Elim">Elim</option>
                                <option value="Makhado">Makhado</option>
                                <option value="Mashamba">Mashamba</option>
                                <option value="Thohoyandou">Thohoyandou</option>
                                <option value="Tzaneen">Tzaneen</option>
                            </select>
                        </div>
                    </div>
                    <div className="submitSearchBtn">
                        <button onClick={handleSearch}>Search<CgSearch /></button>
                    </div>
                    <div className="ArrowsContent">
                        <div className="ArrowUpContent">
                            <CgArrowUp />
                        </div>
                        <div className="ArrowDownContent">
                            <CgArrowDown />
                        </div>
                    </div>
                </div>
            </div>
            {searchResults.length > 0 &&
                <div className='searchResults'>
                    <h2>Search Results:</h2>
                    {searchResults.map((result, index) => (
                        <div key={index}>
                            <p>From: {result.BookFrom}</p>
                            <p>To: {result.BookTo}</p>
                            <p>Date: {result.BookingDate}</p>
                            <p>Seats: {result.NumberOfPassengers}</p>
                            <p>Price: R{result.BookingPrice}</p>
                            <p>Description: {result.description}</p>
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}

export default SearchModal;
