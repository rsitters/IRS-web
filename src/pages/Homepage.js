import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import '../styles/style.css';
import logo from '../resources/images/logoADA1.svg';
import arrowDown from '../resources/icons/arrowDown.svg';
import rfid from '../resources/icons/rfidScan.svg';


function Homepage() {
    const navigate = useNavigate();

    useEffect(() => {
      const socket = io('http://localhost:5000');

      //socket.emit('NFC', 'connected');
  
      // Listen for 'USER' events from the server
      socket.on('USER', (user) => {

        // Store the user data in localStorage
        localStorage.setItem('activeUserData', JSON.stringify(user));

        // Check if the user has a class
        if (user.class) {
        // If class exists, navigate to the Buttonpage
            navigate('/button', { state: { activeUserData: user } });
        } else {
        // If class doesn't exist, navigate to the Admin page
            navigate('/admin', { state: { activeUserData: user } });
        }
        // Use navigate function to navigate to the Buttonpage
        // navigate('/button', { state: { activeUserData: user } });
      });
  
      return () => {
        // Cleanup when the component is unmounted
        socket.off('USER');
        socket.disconnect();
      };
    }, [navigate]);

  return (
    <div className="page">
      <div className="header">
        <p className="subtitle">Voor studenten<br />Door studenten</p>
        <img src={logo} className="logo" alt="logoADA" />
      </div>
      <div className="center-screen">
        <h1 className="title">Scan uw pas</h1>
        <img id="rfidIcon" src={rfid} className="rfidIcon border-top-right" alt="rfidIcon" />
        <img src={arrowDown} className="arrowIcon border-bottom-left" alt="arrowIcon" />
      </div>
    </div>
  );
}

export default Homepage;
