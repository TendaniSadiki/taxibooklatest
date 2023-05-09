import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';


//components
import Home from '../Components/Home/Home';
import HomeOffline from '../Components/Home/HomeOffline';
import Login from '../Components/Login/Login';
import Profile from '../Components/Profile/Profile';



import Settings from '../Components/Settings/Settings';



const AuthRoutes = () =>{
    const [loginState, setLoginState] = useState(null);
    
    const auth = getAuth();
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user  && user.emailVerified) {
          setLoginState(true);
        } 
        else {
          setLoginState(false);
        }
      });

      return () => unsubscribe();
    }, [auth]);

   
    return(
      //Router
      <Router>
        {loginState ? (
          //Online Handler
          <Routes>
            <Route exact path="*" element={<Home/>}/>
            <Route exact path="/Home" element={<Home/>}/>
            <Route exact path="/Profile" element={<Profile/>}/>
            <Route exact path="/Settings" element={<Settings/>}/>
          </Routes>
        ) : (
          //Offline Handler
          <Routes>
            <Route exact path="*" element={<HomeOffline/>}/>
            <Route exact path="/" element={<HomeOffline/>}/>
            <Route exact path="/HomeOffline" element={<HomeOffline/>}/>
            <Route exact path="/Login" element={<Login/>}/>

            {/* Admin */}
            
          </Routes>
        )}
      </Router>
    )
}

export default AuthRoutes;
