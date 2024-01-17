import React, {useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import '../styles/style.css';
import logo from '../resources/images/logoADA1.svg';
import rfidScanProduct from '../resources/icons/rfidScanProduct.svg';
import arrowDown from '../resources/icons/arrowDown.svg';
import useInactivityTimer from '../hooks/useInactivityTimer';
import useNavigation from '../hooks/useNavigation';

function Productscanpage() {
    const { navigateToHomepage } = useNavigation();

    // Use the inactivity timer with the navigateToHomepage callback
    useInactivityTimer(navigateToHomepage);

    const navigate = useNavigate();

    useEffect(() => {
      const socket = io('http://localhost:5000');
  
      // Listen for 'USER' events from the server
      socket.on('scannedID', (msg) => {

        const rentOrReturn = msg[0];
        const UID = msg[1];

        if (rentOrReturn === 'renting'){
            navigate('/confirmationrent');
        } if (rentOrReturn === 'returning') {
            navigate('/confirmationreturn');
        } if (rentOrReturn === 'error'){
            window.alert('Dit product is niet in uw bezit. Probeer een ander product!');
            navigate('/return');
        }

        // Store the user data in localStorage
        localStorage.setItem('UID', JSON.stringify(UID));
      });
  
      return () => {
        // Cleanup when the component is unmounted
        socket.off('scannedID');
        socket.disconnect();
      };
    }, [navigate]);

  return (
    <div className="page">
      <div className="header">
        <Link to="/button">
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
