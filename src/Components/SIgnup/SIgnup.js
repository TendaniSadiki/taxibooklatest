import React, { useState } from "react";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db, auth } from "../../firebase-config";
import { NavLink } from "react-router-dom";
import './signup.css';
import Loader from "../Loader/Loader";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [verificationSent, setVerificationSent] = useState(false);

  const handleSignup = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await sendEmailVerification(userCredential.user);
      setError("");
      setIsLoading(false);
      setVerificationSent(true);
  
      // Save user to the 'users' collection
      const usersRef = collection(db, "users");
      const userData = { email: email };
      await addDoc(usersRef, userData);
  
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };
  
  let pageContent;

  if (isLoading) {
    pageContent = <Loader />;
  } else if (verificationSent) {
    pageContent = <p>Please verify your email to continue</p>;
  } else {
    pageContent = (
      <form onSubmit={handleSignup}>
        <h2>Sign up</h2>
        <label>Email</label>
        <input type="email" onChange={(event) => setEmail(event.target.value)} />
        <label>Password</label>
        <input type="password" onChange={(event) => setPassword(event.target.value)} />
        <button type="submit">Sign up</button>
        {error && <p className="error">{error}</p>}
      </form>
    );
  }

  return (
    <div className="signup-container">
      {pageContent}
      <NavLink to="/login">Already have an account? Log in</NavLink>
      {verificationSent && (
        <p>
          A verification email has been sent to your email address. Please click the link in the email to verify your account.
        </p>
      )}
    </div>
  );
};

export default Signup;
