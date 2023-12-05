import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/style.css';
import logo from '../resources/images/logoADA1.svg';
import rfidScanProduct from '../resources/icons/rfidScanProduct.svg';
import arrowDown from '../resources/icons/arrowDown.svg';

function Productscanpage() {

  return (
    <div className="page">
      <div className="header">
        <Link to="/">
            <div className='border-top-left'>
                <p className='center subtitle'>Annuleren</p>
            </div>
        </Link>
        <img src={logo} className="logo" alt="logoADA" />
      </div>
      <div className='center-screen'>
        <h1 className="title center">
            Scan uw product
        </h1>
        <img src={rfidScanProduct} className="rfidIcon border-top-right" alt="rfidIcon" />
        <img src={arrowDown} className="arrowIcon border-bottom-left" alt="arrowIcon" />
      </div>
    </div>
  );
}

export default Productscanpage;
