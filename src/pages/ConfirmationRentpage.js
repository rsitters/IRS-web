import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/style.css';
import logo from '../resources/images/logoADA1.svg';
import confirmation from '../resources/icons/confirmation.svg';

function ConfirmationRentpage() {

  return (
    <div className="page">
      <div className="header1">
        <img src={logo} className="logo" alt="logoADA" />
      </div>
      <div className='center-screen'>
        <h1 className="title center">
            'Programmeren voor dummies'<br></br>is uitgeleend voor 7 dag(en)
        </h1>
        <Link to="/rent">
        <div className='border-top-right'>
            <p className='center subtitle'>Nog een product lenen</p>
        </div>
        </Link>
      </div>
    </div>
  );
}

export default ConfirmationRentpage;
