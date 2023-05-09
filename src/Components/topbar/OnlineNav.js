import React, { useState, useEffect } from 'react';
import './topbar.css';
import { signOut, onAuthStateChanged } from "firebase/auth";
import { getAuth } from 'firebase/auth';
import { NavLink } from 'react-router-dom';
import { CgHome, CgUser, CgLogOff, CgToolbox } from "react-icons/cg";

function OnlineNav(props) {
  const [loginState, setLoginState] = useState(false);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoginState(true);
      } else {
        setLoginState(false);
      }
    });

    return unsubscribe;
  }, [auth]);

  const logout = async () => {
    await signOut(auth);
    setLoginState(false);
    window.location.href = '/';
  }

  const handleStep = (path) => {
    props.closeMobileMenu && props.closeMobileMenu(); // close menu if in mobile view
    window.location.href = path;
  }

  return (
    <div>
      <div className="linksContainer">
        <NavLink to="#" exact={true} onClick={() => handleStep('/')}>
          <span></span>
        </NavLink>
        <NavLink to="/Home" exact={true} onClick={() => handleStep('/Home')}>
          <span>
            <i><CgHome />Home</i>
          </span>
        </NavLink>
        <NavLink to="/Profile" exact={true} onClick={() => handleStep('/Profile')}>
          <span>
            <i><CgUser />Profile</i>
          </span>
        </NavLink>
        <NavLink to="/Settings" exact={true} onClick={() => handleStep('/Settings')}>
          <span>
            <i><CgToolbox />Settings</i>
          </span>
        </NavLink>
        <NavLink to="/" exact={true} onClick={logout}>
          <span>
            <i><CgLogOff />Log Out</i>
          </span>
        </NavLink>
      </div>
    </div>
  )
}

export default OnlineNav;
