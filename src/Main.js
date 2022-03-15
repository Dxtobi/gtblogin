
import React from 'react';

import './App.css';
import { AiOutlineArrowRight, } from 'react-icons/ai';
import { Link } from 'react-router-dom';



const Main = () => {


  
  //console.log(od)
  
  return (
    <div className='register-and-login'>
    


      <div className='img-writeup'>
        <img className="img-brand-img" src='gtbgirl.jpeg' alt="img" />
        <div className='write-up'>
          <h2 className='header-text-loan'>
            ABOUT THE LOAN
          </h2>
          <p className='loan-p'>
            This Loans are for Federal State, Local Government workers, Students and Self-Employed.<br />
            Disbursement is within 24/48hrs after submitting complete Documents.
          </p>
        </div>
        <Link style={{
           textDecoration:"none"
         }} to="/loan/form" ><button className='get-loan'><div>Get Loan</div> <AiOutlineArrowRight/></button></Link>
      </div>
    </div>
    
  );
};


export default Main