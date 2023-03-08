import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const SignUpAdmin = () => {

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNUmber] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [loginState, setLoginState] = useState(false);
  let day = new Date().getDay();
  let month = new Date().getDate();
  let year = new Date().getFullYear();
  let hours = new Date().getHours();
  let min = new Date().getMinutes();
  let sec = new Date().getSeconds();
  const today = day+"/"+month+"/"+year+": "+hours+":"+min+":"+sec
  console.log(today)
  let lowerCaseLetters = /[a-z]/g;
  let upperCaseLetters = /[A-Z]/g;
  let numbers = /[0-9]/g;

  const converImage = e =>{
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () =>{
      setImage(reader.result.toString())
    };
    reader.readAsDataURL(file)
  };
  const register = () => {
    let userdDetails = {
      name: name,
      surname: surname,
      email: email,
      number: contactNumber,
      userImage: image,
      pass: password,
      login:loginState,
      time: today
      
    };
    if(userdDetails.name === "" && userdDetails.surname === "" && userdDetails.email ==="" && userdDetails.number ==="" && userdDetails.userImage.length ===0 && userdDetails.pass === ""){
      alert("Please fill in all inputs")
    }
    else if(userdDetails.name === ""){
      alert("Enter Username")
    }else if(userdDetails.surname === ""){
      alert("Enter Surname")
    }
    else if(userdDetails.email === ""){
      alert("Enter Email")
    }
    else if(!userdDetails.email.includes("@")){
      alert("Email doesn't exist")
    }
    else if(userdDetails.number === ""){
      alert("Enter Contact number")
    }
    else if(userdDetails.userImage.length === 0){
      alert("Select Image")
    }
    else if(userdDetails.pass === ""){
      alert("Enter Password")
    }
    else if(userdDetails.pass.length < 6){
      alert("password should be 6 characters")
    }
    else if(!userdDetails.pass.match(numbers)){
      alert('please add 1 number');
  
  }
  else if(!userdDetails.pass.match(upperCaseLetters)){
      alert('please add 1 uppercase letter');
  
  }
  else if(!userdDetails.pass.match(lowerCaseLetters)){
      alert('please add 1 lovercase letter');
  
  }
    
    else{
    let storedUserDetails = new Array();
    let storedUsers = JSON.parse(localStorage.getItem("users"));
    if (storedUsers) {
      storedUserDetails = storedUsers;
      storedUserDetails.push(userdDetails);
    } else {
      storedUserDetails.push(userdDetails);
    }
    alert('Your account has been created');
    localStorage.setItem("users", JSON.stringify(storedUserDetails));
    window.location = "/Login";
   
  };}

  return (
    <div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <p>Sign Up Admin</p>
      <div className="container">
        <div className="form-box">
          <div className="header-form">
            <h4 className="text-primary text-center">
              <i
                className="fa fa-user-circle"
                style={{ fontSize: "110px" }}
              ></i>
            </h4>
            <div className="image">
              <img src={image} alt="user" style={{ width: "50px",height:"50px" }} />
            </div>
          </div>
          <div className="body-form">
            <form>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fa fa-user"></i>
                  </span>
                </div>
                <input
                  type="name"
                  className="form-control"
                  placeholder="Name"
                  value={name}
                  onChange={(text) => {
                    setName(text.target.value);
                  }}
                  
                />
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Surname"
                  onChange={(text) => {
                    setSurname(text.target.value);
                  }}
                />
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                  </span>
                </div>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  onChange={(text) => {
                    setEmail(text.target.value);
                  }}
                />
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                  </span>
                </div>
                <input
                  type="tel"
                  className="form-control"
                  placeholder="Contact number"
                  onChange={(text) => {
                    setContactNUmber(text.target.value);
                  }}
                />
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                  </span>
                </div>
                <input
                  type="file"
                  className="form-control"
                  accept='image/*'
                  onChange={
                    e => converImage(e)
                  }
                />
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                  </span>
                </div>
                <input
                  type="text"
                  autoComplete="true"
                  className="form-control"
                  placeholder="Password"
                  onChange={(text) => {
                    setPassword(text.target.value);
                  }}
                />
              </div>
              <button
                type="button"
                className="btn btn-secondary btn-block"
                onClick={register}
              >
                Sign Up
              </button>
              <div className="message"></div>
              <NavLink to="../Login" exact='true'>
                <span>
                  <i>Sign In</i>
                </span>
              </NavLink>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpAdmin;