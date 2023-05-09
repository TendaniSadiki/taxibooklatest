import OnlineNav from "./OnlineNav";
import OfflineNav from "./OfflineNav";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import React, { useState } from 'react'
import { onAuthStateChanged, getAuth } from "firebase/auth";

const Status = () =>{
    const [loginState, setLoginState] = useState(null);
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user && user.emailVerified) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setLoginState(true)
        
        // ...
      } 
      else{
          setLoginState(false)
      }
    });
    
        return(
            <Router>
                {
                    loginState ?
                    <Routes>
                    <Route exact path="*" element={<OnlineNav/>}/>
                    </Routes>
                :
                    <Routes>
                        <Route exact path="*" element={<OfflineNav/>}/> 
                    </Routes>
    }
            </Router>
        )
    }
    
    export default Status;