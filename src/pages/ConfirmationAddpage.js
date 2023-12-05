import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/style.css';
import logo from '../resources/images/logoADA1.svg';
import confirmation from '../resources/icons/confirmation.svg';

function ConfirmationAddpage() {

  return (
    <div className="page">
      <div className="header">
        <h1 className="title">Admin</h1>
        <img src={logo} className="logo" alt="logoADA" />
      </div>
      <div className='center-screen'>
        <h1 className="title center">
            'Programmeren voor dummies'<br></br>is succesvol toegevoegd
        </h1>
        <Link to="/add">
        <div className='border-top-right'>
            <p className='center subtitle'>Nog een product toevoegen</p>
        </div>
        </Link>
      </div>
    </div>
  );
}

export default ConfirmationAddpage;
