import React from 'react';
import { useParams } from 'react-router-dom';
import './Destination.css';
import fakeData from '../../fakeData/wowRider';
import peopleIcon from '../../img/peopleicon.png';

const mapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4341.413216503745!2d90.40287193414909!3d23.79444921881077!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c70e664c9bb5%3A0xb38578d3519a529c!2sAwal%20Centre!5e0!3m2!1sen!2sbd!4v1625694485581!5m2!1sen!2sbd`;

const Destination = () => {


    const {riderId} = useParams();
    const newRider = fakeData.find(ride => ride.id.toString() === riderId);
    

    const {img, catagories, capacity, price} = newRider;



    

    return (
        <div>
            

            <div className="container">
                <div className="row">

                    <div className="col-md-4 mb-5">
                        
                        <div className="search-destination">
                            <form action="">
                                <div className="form-group">
                                    <label htmlFor="pickFrom"> Pick From</label>
                                    <select className="form-control" name="" id="pickFrom">
                                        <option value="">Mirpur 1</option>
                                        <option value="">Dhanmondi</option>
                                        <option value="">Basundhara</option>
                                        <option value="">Mirpur 2</option>

                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="pickTo"> Pick To</label>
                                    <select className="form-control" name="" id="pickTo">
                                        <option value="">Basundhara</option>
                                        <option value="">Dhanmondi</option>
                                        <option value="">Mirpur 2</option>
                                        <option value="">Mirpur 1</option>
                                    </select>
                                </div>
                                
                                <button className="btn btn-danger">Search</button>
                            </form>
                        </div>

                        
                        <div className="destination-cart">
                           <div className="timeline-content">
                                <ul className="timeline">
                                    <li>Mirpur 1</li>
                                    <li>Basundhara</li>
                                </ul>
                           </div>

                           <div className="cart-content">
                               <div className="ride">
                                   <img src={img} alt="" />
                                   <p>{catagories}</p>
                               </div>
                               <div className="capacity">
                                   <img src={peopleIcon} alt="" />
                                   <p>{capacity}</p>
                               </div>
                               <div className="price">
                                   <h6>${price}</h6>
                               </div>
                           </div>
                        </div>



                    </div>
                    <div className="col-md-8">
                        <div className="map">
                            <iframe src={mapUrl} title={'This is Map'}  style={{width:"100%", height:"80%", borderRadius:'10px'}} ></iframe>
                        </div>
                    </div>
                </div>
            </div> 
            
        </div>
    );
};

export default Destination;