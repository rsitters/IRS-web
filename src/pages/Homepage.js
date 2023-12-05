import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/style.css';
import logo from '../resources/images/logoADA1.svg';
import arrowDown from '../resources/icons/arrowDown.svg';
import rfid from '../resources/icons/rfidScan.svg';

function Homepage() {
  return (
    <div className="page">
      <div className="header">
        <p className="subtitle">Voor studenten<br />Door studenten</p>
        <img src={logo} className="logo" alt="logoADA" />
      </div>
      <div className="center-screen">
        <h1 className="title">Scan uw pas</h1>
        <img src={rfid} className="rfidIcon border-top-right" alt="rfidIcon" />
        <img src={arrowDown} className="arrowIcon border-bottom-left" alt="arrowIcon" />
      </div>
    </div>
  );
}

export default Homepage;
