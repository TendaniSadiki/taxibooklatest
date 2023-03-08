import React, {useState} from 'react';
import './topbar.css';
import { signOut, onAuthStateChanged } from "firebase/auth";
import {getAuth} from 'firebase/auth';
/*Online Nav Bar*/
//Topbar Icons
import {NavLink} from 'react-router-dom';
import {CgHome} from "react-icons/cg";
import {CgUser} from "react-icons/cg";
import {CgLogOff} from "react-icons/cg";
import {CgToolbox} from "react-icons/cg";
function OnlineNav(props) {
    
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
    
const logout = async () =>{
    await signOut(auth);
    setLoginState(false);
    window.location="/HomeOffline";

}
    //Topbar navlinks Online
    return (
        <div>
            
            <div className="linksContainer">  
                    <NavLink to="*" activestyle={{color: 'black'}} exact="true" onClick={() => props.isMobile && props.closeMobileMenu()}><span></span>
                    </NavLink>
                    <NavLink to="./Home" activestyle={{color: 'black'}} exact="true" onClick={() => {props.isMobile && props.closeMobileMenu(); window.location="/Home"}}><span><i><CgHome/>Home</i></span>
                    </NavLink>
                    <NavLink to="./Profile" activestyle={{color: 'black'}} exact="true" onClick={() => {props.isMobile && props.closeMobileMenu();window.location="/Profile"}}><span><i><CgUser/>Profile</i></span>
                    </NavLink>
                    <NavLink to="./Settings" activestyle={{color: 'black'}} exact="true" onClick={() => {props.isMobile && props.closeMobileMenu();window.location="/Settings"}}><span><i><CgToolbox/>Settings</i></span>
                    </NavLink>
                    <NavLink to="./" activestyle={{color: 'black'}} exact onClick={logout} ><span ><i>Log Out</i></span>
                    </NavLink>
                    </div>
        </div>
    )
}

export default OnlineNav
