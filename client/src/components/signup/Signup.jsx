import React, { useState } from "react";
import { Link } from "react-router-dom";
import classes from "./signup.module.css";
import img from "../../assets/womaneating.jpg";
import { useDispatch } from "react-redux";
import { register } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeUsername = (e) => {
    setUsername(e);
  };

  const changeEmail = (e) => {
    setEmail(e);
  };

  const changePassword = (e) => {
    setPassword(e);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8000/auth/register", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ username, email, password }),
      });
      const data = await res.json();
      dispatch(register(data));
      navigate("/");
    } catch (error) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };

  return (
    <div className={classes.signUpContainer}>
      <div className={classes.signUpWrapper}>
        <div className={classes.signUpLeftSide}>
          <img src={img} className={classes.leftImg} />
        </div>
        <div className={classes.signUpRightSide}>
          <h2 className={classes.title}> Sign Up</h2>
          <form onSubmit={handleSignUp} className={classes.signUpForm}>
            <input
              type="text"
              placeholder="Type username"
              onChange={changeUsername}
            />
            <input
              type="email"
              placeholder="Type email"
              onChange={changeEmail}
            />
            <input
              type="password"
              placeholder="Type password"
              onChange={changePassword}
            />
            <button className={classes.submitBtn}>Sign Up</button>
            <p>
              {" "}
              Already have an account ? <Link to="/login">Login</Link>
            </p>
          </form>
          {error && (
            <div className={classes.errorMessage}>
              Wrong credentials! Try different ones.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Signup;
