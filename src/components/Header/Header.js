import React, { useContext } from 'react';
import './Header.css';
import logo from '../../img/logo2.svg'
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';


const Header = () => {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    
    return (
        <div className="header">
            <div className="container">
                <div className="logo-menu">
                    <Link to="/">
                        <div className="logo">
                            <img src={logo} alt="" />
                            <h2>Wow Rider</h2>
                        </div>
                    </Link>

                    <div className="menu">
                        
                        <Link to="/home">Home</Link>
                        <Link to="/rider/:riderId">Destination</Link>
                        <Link to="/blog">Blog</Link>
                        <Link to="/contact">Contact</Link>
                        {
                            <span>{loggedInUser.name}</span>
                        }
                        
                        <Link to="/login">
                            <button className="btn btn-danger">Login</button>
                        </Link>

                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;