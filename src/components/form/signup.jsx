import {  useState } from "react"
import {  useNavigate } from "react-router-dom"
import { auth } from "../../firebase.js";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";



export const Signup = () =>{
    const navigate = useNavigate()
    const [email,setEmail] = useState()
    const [password,setPassword] = useState()
    const [fullname,setFullname] = useState()
    const [error,setError] = useState("")

    const handleFormsubmit = (e) =>{
      e.preventDefault()
       createUserWithEmailAndPassword(auth,email,password).then((userCredential)=>{
        const user = userCredential.user;
        console.log(user);
        console.log( "current user",auth.currentUser);           
          updateProfile(auth.currentUser,{
            displayName:fullname,
           
          })   

        
          
          
          navigate('/')

       }).catch((err)=>{
        console.log(err); 
        setError(err.message)
             
       })
    }
      
      
    return(
      <div className="signup-container">
        <div className="login-form-wrapper">
          {/* Signup Form Container */}
          <div className="login-form-container">
            <form onSubmit={handleFormsubmit}>
              <h4 className="signH4" style={{ textAlign: "center", marginBottom: "2rem" }}>SIGN UP </h4>
              {/* Email Input */}
              <div className="form-group">
                <input name="userEmail"

                onChange={(e)=>setEmail(e.target.value)}                
                  type="email"
                  placeholder="Email ID"
                  className="form-sign-input"
                  required
                />  
                 <p style={{color:"red"}}>{error ? error + " use Other email or  login" : ""} </p>              
              </div>  
              {/* Password Input */}
              <div className="form-group">
                <input name="userPassword"
                onChange={(e)=>setPassword(e.target.value)}                    
                  type="password"
                  placeholder="Password"
                  className="form-sign-input"
                  required
                />               
              </div>  
              {/* Confirm Password Input */}
              <div className="form-group">
                <input
                onChange={(e)=>setFullname(e.target.value)}  
                  name="fullName"                  
                  type="text"
                  placeholder="Full Name"
                  className="form-sign-input"
                  required
                />
                
              </div>
  
              {/* Signup Button */}
              <button type="submit" className="btn-signup">SIGNUP</button>
              <p className="para-sign">
                Already a Member? <a onClick={() => navigate("/signin")}> Please Login </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    )
}