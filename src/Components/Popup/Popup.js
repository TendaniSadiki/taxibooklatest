import  { useState } from "react";
import {CgClose} from "react-icons/cg";
import "./PopUp.css"
const PopUp = () =>{
    const [userPopUp]= useState(JSON.parse(sessionStorage.getItem("userPopUp")));
    const closeBtn = () => {
        console.log("hi");
        document.getElementById("popUpContainer").style.display = "none";
        
    }
    return(
        <div className='popUpContainer' id="popUpContainer"> 
        <CgClose onClick={closeBtn} />
           <li >
               <div>
                  
               </div>
           </li>
                        
         </div>
    )
}

export default PopUp;