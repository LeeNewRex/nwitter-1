import React, { useState } from "react";
import { authService, firebasedb } from "fbase";
import md5 from 'md5';


const inputStyles = {};

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");
  
  
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    
    try {
      let data;
      

      if (newAccount) {
        data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
        
      } else {
        data = await authService.signInWithEmailAndPassword(email, password);
        
      }
      console.log('data', data);

    await data.user.updateProfile({
      displayName: data.name,
      photoURL: `http://gravatar.com/avatar/${md5(data.user.email)}?d=identicon`
    })

    await firebasedb.ref("users").child(data.user.uid).set({
      name: data.user.displayName,
      image: data.user.photoURL
    })

    } catch (error) {
      setError(error.message);
    }
  };
  const toggleAccount = () => setNewAccount((prev) => !prev);
  return (
    <>
      <form onSubmit={onSubmit} className="container">
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
          className="authInput"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          className="authInput"
          onChange={onChange}
        />
        <input
          type="submit"
          className="authInput authSubmit"
          value={newAccount ? "Create Account" : "Sign In"}
        />
        {error && <span className="authError">{error}</span>}
      </form>
      <span onClick={toggleAccount} className="authSwitch">
        {newAccount ? "Sign In" : "Create Account"}
      </span>
    </>
  );
};
export default AuthForm;
