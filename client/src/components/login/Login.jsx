import React, { useState } from 'react';
import classes from "./login.module.css";
import {Link} from "react-router-dom";
import img from "../../assets/womaneating2.jpg";
import { useNavigate } from 'react-router-dom';
import { login } from '../../redux/authSlice';
import {useDispatch} from "react-redux";

function Login() {

  const[error, setError] = useState(false);
  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onEmail= async(event)=>{
     await setEmail(event.target.value);
  }

  const onPassword=async(event)=>{
    await setPassword(event.target.value);
  }

  const handleSubmit= async(event)=>{
    event.preventDefault();
    try{
      const res= await fetch('http://localhost:8000/auth/login', {
        headers:{
          'Content-Type' : 'application/json'
        },
        method:'POST',
        body: JSON.stringify({email, password})
      })

      const data = await res.json()
      dispatch(login(data))
      navigate("/")

    } catch(error){
      setError(true)
      setTimeout(()=>{
        setError(false)
      }, 3000)
    }
  }

  return (
    <div className = {classes.loginContainer}>
      <div className={classes.loginWrapper}>
        <div className={classes.loginLeftSide}>
          <img src={img} className={classes.leftImg}/>
        </div>
        <div className={classes.loginRightSide}>
          <h2 className={classes.title}>Login</h2>
          <form onSubmit={handleSubmit} className={classes.loginForm}>
            <input type="email" placeholder= "Type email" onChange={onEmail}/>
            <input type="password" placeholder= "Type password" onChange={onPassword}/>
            <button className={classes.submitBtn}>Login</button>
            <p>Don't have an account ? <Link to="/signup">Sign Up</Link></p>
          </form>
          {
            error && <div className={classes.errorMessage}>
               Wrong credentials ! Try different ones.
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default Login;
