import React, { useState, useEffect } from "react";
import { createUserWithEmailAndPassword, sendEmailVerification, onAuthStateChanged } from "firebase/auth";
import { addDoc, collection} from "firebase/firestore";
import { ref, uploadBytes,  getDownloadURL } from "firebase/storage";
import { db, auth, storage } from "../../firebase-config";
import { NavLink } from "react-router-dom";
import './signup.css';
import Loader from "../Loader/Loader";

const Signup = ({switchModal}) => {
const [username, setUsername] = useState("");
const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [verificationSent, setVerificationSent] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    // Listen for authentication state changes
    onAuthStateChanged(auth, (user) => {
      if (user && user.emailVerified) {
        // If the user is signed in and their email is verified, reload the page
        window.location.reload();
      }
    });
  }, []);

  const [errors, setErrors] = useState({
    username: '',
    phoneNumber: '',
    email: '',
    password: '',
  });
  
  const handleSignup = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    
    // Validate input values
    const validationErrors = {};
    if (!username.trim()) {
      validationErrors.username = 'Username is required';
    }
    if (!phoneNumber.trim()) {
      validationErrors.phoneNumber = 'Phone number is required';
    }
    if (!email.trim()) {
      validationErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      validationErrors.email = 'Email is invalid';
    }
    if (!password.trim()) {
      validationErrors.password = 'Password is required';
    } else if (password.length < 6) {
      validationErrors.password = 'Password must be at least 6 characters long';
    }
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsLoading(false);
      return;
    }
    
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
  
      // Save user to the 'users' collection with uid
      const usersRef = collection(db, "users");
      const userData = {
        email: email,
        image: imagePreview,
        username: username,
        phoneNumber: phoneNumber,
        uid: userCredential.user.uid // add uid property
      };
      await addDoc(usersRef, userData);
  
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };
  
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
  
    // Convert the file to a Blob object
    const imageBlob = new Blob([file], { type: file.type });
  
    // Generate a unique filename for the image
    const filename = Date.now() + "-" + file.name;
  
    // Upload the image to Firebase Storage
    const storageRef = ref(storage, "images/" + filename);
    await uploadBytes(storageRef, imageBlob);
  
    // Get the download URL of the uploaded image
    const downloadURL = await getDownloadURL(storageRef);
  
    // Set imagePreview to the download URL
    setImagePreview(downloadURL);
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
        <div className="signUpImage">
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {imagePreview  && <img src={imagePreview}   alt="Profile Preview" />}
        </div>
      <label>Username</label>
      <input type="text" onChange={(event) => setUsername(event.target.value)} />
      {errors.username && <p className="error">{errors.username}</p>}
      <label>Phone Number</label>
      <input type="tel" onChange={(event) => setPhoneNumber(event.target.value)} />
      {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}

        <label>Email</label>
        <input type="email" onChange={(event) => setEmail(event.target.value)} />
        {errors.email && <p className="error">{errors.email}</p>}

        <label>Password</label>
        <input type="password" onChange={(event) => setPassword(event.target.value)} />
        {errors.password && <p className="error">{errors.password}</p>}

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
