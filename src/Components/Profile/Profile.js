import { useState } from "react";


const Profile = () =>{
    const [user, setUser]= useState(JSON.parse(localStorage.getItem("profileInfo")));
    return(
        <div>
            <br></br>
            <br></br>
            <br></br>
            <p>Profile page</p>
            
                        <li>
                            <div>
                                <span> Name: {user.name} </span>
                                <span> Surname: {user.surname} </span>
                                <span> Email: {user.email}</span>
                                <span> Contact number: {user.number} </span>
                              
                            </div>
                        </li>
                        
                    
        </div>
    )
}

export default Profile;