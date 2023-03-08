import React from 'react';
import './topbar.css';

/*Online Nav Bar*/
//Topbar Icons
import {NavLink} from 'react-router-dom';
import {CgHome} from "react-icons/cg";
import {CgLogIn} from "react-icons/cg";

function OfflineNav(props) {
    
    //Topbar navlinks Offline
    return (
        <div>
            
            <div className="linksContainer">  
                    <NavLink to="*" activestyle={{color: 'black'}} exact="true" onClick={() => props.isMobile && props.closeMobileMenu()}><span></span>
                    </NavLink>
                    <NavLink to="./Home" activestyle={{color: 'black'}} exact="true" onClick={() => {props.isMobile && props.closeMobileMenu(); window.location="/Home"}}><span><i><CgHome/>Home</i></span>
                    </NavLink>
                    <NavLink to="./Login" activestyle={{color: 'black'}} exact="true" onClick={() => {props.isMobile && props.closeMobileMenu(); window.location="/Login"}}><span><i><CgLogIn/>Login</i></span>
                    </NavLink>
                    </div>
        </div>
    )
}

export default OfflineNav
