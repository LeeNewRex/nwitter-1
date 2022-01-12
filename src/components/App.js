import React, { useState, useEffect } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";
import { useDispatch, useSelector } from "react-redux";
import {
  setUser,
  clearUser
} from "../redux/action/user_action";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  let dispatch = useDispatch();
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          photoURL: user.photoURL,
          updateProfile: (args) => user.updateProfile(args),
        });
        dispatch(setUser(user))
        console.log(user)
      } else {
        setUserObj(null);
        dispatch(clearUser())
      }
      setInit(true);
    });
  }, []);  
  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      photoURL: user.photoURL,
      updateProfile: (args) => user.updateProfile(args),
    });
  };
  return (
    <>
      {init ? (
        <AppRouter
          refreshUser={refreshUser}
          isLoggedIn={Boolean(userObj)}
          userObj={userObj}
        />
      ) : (
        "Initializing..."
      )}
    </>
  );
}

export default App;
