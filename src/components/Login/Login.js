import React, { useContext, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';
import { getGoogleAuth, getSignedOut, getSignInWithEmail, initializeLogInFramework } from '../Auth/LoginManager';
import './Login.css';

const Login = () => {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    let history = useHistory();
    let location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };

    // State for  form input
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignIn: false,
        name: '',
        email: '',
        password: ''
    });

    //Initializing Firebase
    initializeLogInFramework();

    // google Sign In
    const handleGoogleSignIn = () => {
        //console.log('Google Sign in clicked!');
        getGoogleAuth()
        .then(res => {
            setUser(res);
            setLoggedInUser(res);
            history.replace(from)
        })
    }

    // Signed Out
    const handleSignOut = () => {
        getSignedOut()
        .then(res => {
            setUser(res);
            setLoggedInUser(res)
        })
    }


   




    // handling input Blur
     const handleOnBlur = (e) => {
        console.log(e.target.name, e.target.value);
        let isFormValid = true;

        if(e.target.name === 'email'){
            isFormValid =  /\S+@\S+\.\S+/.test(e.target.value);
        }
        if(e.target.name === 'password'){
            const isPasswordValid = e.target.value.length > 6;
            const passwordHasNumber =  /\d{1}/.test(e.target.value);
            isFormValid = isPasswordValid && passwordHasNumber;
        }
        if(isFormValid){
            const newUserInfo = {...user};
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo)

        }

    }

    // Handling Submit from "form onSubmit"
    const handleSubmit = (e) => {
        
            getSignInWithEmail(user.email, user.password)
            .then(res => {
                console.log('this is login', res)
            setUser(res);
            setLoggedInUser(res);
            history.replace(from)
        })
        
        

        e.preventDefault()
    }






    return (
        <div>
            
            <div className="container ">
                <div className="authenticate">
                    <div className="login">
                        <h4>Login</h4>
                        <form action="" onSubmit={handleSubmit}>
                            <div className="from-group">
                                <label htmlFor="email"></label>
                                <input onBlur={handleOnBlur} className="form-control" type="email" name="email" id="email" placeholder="Email" required/>
                            </div>
                            <div className="from-group">
                                <label htmlFor="password"></label>
                                <input  onBlur={handleOnBlur}  className="form-control" type="password" name="password" id="password" placeholder="Password" required/>
                            </div>
                            <div className="from-check d-flex justify-content-between pt-2 pb-4">
                                <p>
                                    <input className="form-check-input" type="checkbox" name="" id="rememberMe" />
                                    <label htmlFor="checkbox">Remember me</label>
                                </p>
                                <p className=""><Link>Forgot Password</Link></p>
                            </div>
                            <input type="submit" className="btn btn-danger" value="Sign In" />
                            <p className="text-center pt-3">Don't have an account? <Link to="/signUp">Create an account</Link></p>
                        </form>
                    </div>

                    <p className="text-center mt-4 mb-4 or">or</p>
                    
                    <button className="btn btn-light" onClick={handleGoogleSignIn}>Continue with Google</button>
                </div>
            </div>
        </div>
    );
};

export default Login;