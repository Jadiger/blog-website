import React, {useState} from 'react';
import {  signInWithEmailAndPassword   } from 'firebase/auth';
import { auth } from '../firebase/config';
import { NavLink, useNavigate } from 'react-router-dom'
 
const Login = ({setUserActive,setAlert,setAlertClass}) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
       
    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            setAlert('Login Successful!')
            setAlertClass('alert__success')
            navigate("/")
            console.log(user);
            window.localStorage.setItem('useruid',user.uid)
            setUserActive(window.localStorage.getItem('useruid'))
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setAlert(String(error.message))
            setAlertClass('alert__error')
        });
        
        setTimeout(()=> {
            setAlert('')
            setAlertClass('')
        },2000)
    }
 
    return(
        <>
            <div className='sign' >
                <div className="sign__block">
                    <div className="sign__title">
                            LOGIN
                        </div>                                     
                        <form className='sign__form'>                                              
                            <div>
                                <label className='sign__label' htmlFor="email-address">
                                    Email
                                </label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"                                                                                 
                                    placeholder="Email address"
                                    className='sign__input'
                                    onChange={(e)=>setEmail(e.target.value)}
                                />
                            </div>

                            <div>
                                <label htmlFor="password"
                                className='sign__label'>
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"                                    
                                    className='sign__input'                                                
                                    placeholder="Password"
                                    onChange={(e)=>setPassword(e.target.value)}
                                />
                            </div>
                                                
                            <div>
                                <button  
                                    className='sign__button'                                  
                                    onClick={onLogin}                                        
                                >      
                                    Login                                                                  
                                </button>
                            </div>                               
                        </form>
                       
                        <p className="sign__go">
                            No account yet? {' '}
                            <NavLink to="/signup">
                                Sign up
                            </NavLink>
                        </p>
                </div>
            </div>
        </>
    )
}
 
export default Login