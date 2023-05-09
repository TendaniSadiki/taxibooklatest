import React, { useState, useEffect } from 'react';
import './topbar.css';
import { signOut, onAuthStateChanged } from "firebase/auth";
import { getAuth } from 'firebase/auth';
import { NavLink } from 'react-router-dom';
import { CgHome, CgUser, CgLogOff, CgToolbox } from "react-icons/cg";

function OnlineNav(props) {
  const [loginState, setLoginState] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
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
  }

  const handleStep = (step) => {
    setCurrentStep(step);
    props.closeMobileMenu && props.closeMobileMenu(); // close menu if in mobile view
  }

  return (
    <div>
      <div className="linksContainer">
        <NavLink to="#" exact={true} onClick={() => handleStep(0)}>
          <span></span>
        </NavLink>
        <NavLink to="/Home" exact={true} onClick={() => handleStep(1)}>
          <span>
            <i><CgHome />Home</i>
          </span>
        </NavLink>
        <NavLink to="/Profile" exact={true} onClick={() => handleStep(2)}>
          <span>
            <i><CgUser />Profile</i>
          </span>
        </NavLink>
        <NavLink to="/Settings" exact={true} onClick={() => handleStep(3)}>
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
      {currentStep === 0 && <div>Step 0</div>}
      {currentStep === 1 && <div>Step 1</div>}
      {currentStep === 2 && <div>Step 2</div>}
      {currentStep === 3 && <div>Step 3</div>}
    </div>
  )
}

export default OnlineNav;
