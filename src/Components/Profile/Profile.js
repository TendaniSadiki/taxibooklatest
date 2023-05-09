import { useState, useEffect } from "react";
import { auth, db } from "../../firebase-config";
import { collection } from "firebase/firestore";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUserEmail(user.email);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const querySnapshot = await db
          .collection("users")
          .where("email", "==", userEmail)
          .get();

        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          setUser({ ...userDoc.data(), id: userDoc.id });
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }

      setLoading(false);
    };

    if (userEmail) {
      fetchUser();
    }

    return () => {
      setLoading(true);
      setUser(null);
    };
  }, [userEmail]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <p>No user found</p>;
  }

  return (
    <div>
      <p>Profile page</p>
      <ul>
        <li>
          <div>
            <span>Name: {user.username}</span>
            <span>UID: {user.uid}</span>
            <span>Email: {user.email}</span>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Profile;
