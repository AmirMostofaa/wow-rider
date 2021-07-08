import React from 'react';
import { Link } from 'react-router-dom';
import './Rider.css';


const Rider = (props) => {
    const {img, catagories, id} = props.rider;
    
    
    return (
        <div className="rider-component">
            <Link to={"/rider/"+id}>
                <div className="single-rider">
                    <img src={img} alt="" />
                    <h3>{catagories}</h3>
                </div>
            </Link>
        </div>
    );
};

export default Rider;