import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';


//components
import Home from '../Components/Home/Home';
import HomeOffline from '../Components/Home/HomeOffline';
import Login from '../Components/Login/Login';
import Profile from '../Components/Profile/Profile';

import SIgnup from '../Components/SIgnup/SIgnup';
import ViewBookOffline from '../Components/ViewBook/ViewBookOffline';
import ViewBook from '../Components/ViewBook/ViewBook'
import PaymentChoice from '../Components/Payments/PaymentChoice';
import Card from '../Components/Payments/Card';


import SignUpAdmin from '../Components/SignupAdmin/SIgnup';
import BankCode from '../Components/Payments/BankCode';
import Settings from '../Components/Settings/Settings';



const AuthRoutes = () =>{
    const [loginState, setLoginState] = useState(null);
    
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
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
//Router


        <Router>
            {
            loginState ?
            //Online Handler
                <Routes>
               <Route exact path="*" element={<Home/>}/>
                <Route exact path="/Home" element={<Home/>}/>
                <Route exact path="/Profile" element={<Profile/>}/>
                <Route exact path="/ViewBook" element={<ViewBook/>}/>
                <Route exact path="/PayMethods" element={<PaymentChoice/>}/>
                <Route exact path="/Card" element={<Card/>}/>
                <Route exact path="/BankCode" element={<BankCode/>}/>
                <Route exact path="/Settings" element={<Settings/>}/>
                </Routes>
            :
            //Offline Handler
            <Routes>
                    <Route exact path="*" element={<HomeOffline/>}/>
                    <Route exact path="/" element={<HomeOffline/>}/>
                    <Route exact path="/HomeOffline" element={<HomeOffline/>}/>
                    <Route exact path="//ViewBookOffline" element={<ViewBookOffline/>}/>
                    <Route exact path="/Signup" element={<SIgnup/>}/>
                    <Route exact path="/Login" element={<Login/>}/>

                    {/* Admin */}
                    <Route exact path="/SignUpAdmin" element={<SignUpAdmin/>}/>
                </Routes>
            }
        </Router>
         
    )
}

export default AuthRoutes;
 