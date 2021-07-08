import React, { useState } from 'react';
import fakeData from '../../fakeData/wowRider';
import Rider from '../../components/Rider/Rider'
import './Home.css';

const Home = () => {
    const [riders, setRiders] = useState(fakeData)


    
    return (
        <div className="home">
           <div className="container">
               <div className="heading text-center">
                   <h1>Choose Your Ride!</h1>
               </div>
               <div className="rider">
                   {
                       riders.map(rider => <Rider key={rider.key} rider={rider}></Rider>)
                   }
               </div>
           </div>
        </div>
    );
};

export default Home;