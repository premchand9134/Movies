import { useState } from "react"
import {  useNavigate } from "react-router-dom"
import { auth } from "../../firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";


export const SignIn = () =>{
    const [email,setEmail] = useState()
    const [password,setPassword] = useState()
    const navigate = useNavigate()

    const handleFormsubmit = (e) =>{
        e.preventDefault()
        signInWithEmailAndPassword(auth,email,password).then((userCredential)=>{
          const user = userCredential.user;
          console.log(user);
          navigate('/')         
          
        }).catch((err)=>{
          console.log(err);
          
        })
    }
    return(
        <div className="login-container">
        <div className="login-form-wrapper">  
          {/* Login Form Container */}
          <div className="login-form-container">          
            <form onSubmit={handleFormsubmit}>
              <h4 style={{color:"black",textAlign:"center",marginBottom:"2rem"}}>LOGIN  </h4>
              {/* Email Input */}
              <div className="form-group">
                <input onChange={(e)=>setEmail(e.target.value)} type="email"   name='userEmail' placeholder="Email ID" className="form-input"  required/>
              </div>
  
              {/* Password Input */}
              <div className="form-group">              
                <input type="password" onChange={(e)=>setPassword(e.target.value)} name='userPassword' placeholder="Password" className="form-input"  required />
              </div>          
  
              {/* Login Button */}
              <button type="submit" className="btn-login">LOGIN </button>
              <p className='para'>New Here?   <a onClick={()=>navigate('/signup')}> Sign Up </a></p>
            </form>
          </div>
        </div>
      </div>
    )
}