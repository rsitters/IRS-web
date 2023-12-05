import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/style.css';
import logo from '../resources/images/logoADA1.svg';
import rfidTagScan from '../resources/icons/rfidTagScan.svg';
import arrowDown from '../resources/icons/arrowDown.svg';

function ConnectTagpage() {

  return (
    <div className="page">
      <div className="header">
        <h1 className="title">Admin</h1>
        <img src={logo} className="logo" alt="logoADA" />
      </div>
      <div className='center-screen'>
        <h1 className="title center">
            Scan de tag
        </h1>
        <img src={rfidTagScan} className="rfidIcon border-top-right" alt="rfidIcon" />
        <img src={arrowDown} className="arrowIcon border-bottom-left" alt="arrowIcon" />
      </div>
    </div>
  );
}

export default ConnectTagpage;
