import React, {useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {  createUserWithEmailAndPassword  } from 'firebase/auth';
import { auth } from '../firebase/config';
 
const Signup = ({setAlert,setAlertClass}) => {
    const navigate = useNavigate();
 
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
 
    const onSubmit = async (e) => {
      e.preventDefault()
     
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            setAlert('Successful Registration')
            setAlertClass('alert__success')
            navigate("/login")
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setAlert(String(error.message))
            setAlertClass('alert__error')
            // ..
        });
        setTimeout(()=> {
            setAlert('')
            setAlertClass('')
        },2000)
   
    }
 
  return (
    <div className='sign' >        
        <div className='sign__block'>
                            
                    <div className='sign__title'> Sign Up</div>
                    <form className='sign__form'>
                        <div>
                            <label htmlFor="email-address" className='sign__label'>
                                Email address
                            </label>
                            <input
                                className='sign__input'
                                type="email"
                                label="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}  
                                required                                    
                                placeholder="Email address"                                
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className='sign__label'>
                                Password
                            </label>
                            <input
                                className='sign__input'
                                type="password"
                                label="Create password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} 
                                required                                 
                                placeholder="Password"              
                            />
                        </div>                                             
                        
                        <button
                            className='sign__button'
                            type="submit" 
                            onClick={onSubmit}                        
                        >  
                            Sign up                                
                        </button>
                                                                     
                    </form>
                   
                    <p>
                        Already have an account?{' '}
                        <NavLink to="/login" >
                            Sign in
                        </NavLink>
                    </p>                   
               
        </div>
    </div>
  )
}
 
export default Signup