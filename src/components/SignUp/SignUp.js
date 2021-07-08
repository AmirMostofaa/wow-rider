import React, { useContext, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import './SignUp.css';
import { getCreateAccountWithEmail, getGoogleAuth, initializeLogInFramework } from '../Auth/LoginManager';
import { UserContext } from '../../App';



const SignUp = () => {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
        let history = useHistory();
        let location = useLocation();

    let { from } = location.state || { from: { pathname: "/" } };

    // State for new Account
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignIn: false,
        name: '',
        email: '',
        password: ''
    });

    //Initializing Firebase
    initializeLogInFramework();

    // Google Sign In
    const handleGoogleSignIn = () => {
        //console.log('Google Sign in clicked!');
        getGoogleAuth()
        .then(res => {
            setUser(res);
            setLoggedInUser(res);
            history.replace(from)
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


    // Handling Create account
    const handleSingUpSubmit = (e) => {
        console.log('outside')
        
            getCreateAccountWithEmail(user.name, user.email, user.password)
            .then(res => {
                
            setUser(res);
            setLoggedInUser(res);
            history.replace(from)
            })
        
        e.preventDefault();
    }


    return (
        <div className="custom-sign-up">
            <div className="container ">
                <div className="authenticate">
                    <div className="signUp">
                        <h4>Create an account</h4>

                        

                        <form onSubmit={handleSingUpSubmit}>
                            <div className="from-group">
                                <label htmlFor="name"></label>
                                <input onBlur={handleOnBlur} className="form-control" type="name" name="name" id="name" placeholder="Name" required/>
                            </div>
                            <div className="from-group">
                                <label htmlFor="email"></label>
                                <input onBlur={handleOnBlur}  className="form-control" type="email" name="email" id="email" placeholder="Username or Email" required/>
                            </div>
                            <div className="from-group">
                                <label htmlFor="password1"></label>
                                <input onBlur={handleOnBlur}  className="form-control" type="password" name="password" id="password1" placeholder="Password" required/>
                            </div>
                            {/* <div className="from-group">
                                <label htmlFor="password2"></label>
                                <input onBlur={handleOnBlur}  className="form-control" type="password" name="confirmPassword" id="password2" placeholder="Confirm Password" required/>
                            </div> */}
                            
                            <input type="submit" className="btn btn-danger mt-4" value="Create an account"/>

                            <p className="text-center pt-3">Already have an account? <Link to="/login">Login</Link></p>

                            { user.success && <p style={{color: 'red'}}>Account Created Successfully</p>}
                        </form>
                    </div>

                    <p className="text-center mt-4 mb-4 or">or</p>

                    <button onClick={handleGoogleSignIn} className="btn btn-light">Continue with Google</button>
                </div>
            </div>
        </div>
    );
};

export default SignUp;