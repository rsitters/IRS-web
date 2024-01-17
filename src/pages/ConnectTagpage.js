import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import '../styles/style.css';
import logo from '../resources/images/logoADA1.svg';
import rfidTagScan from '../resources/icons/rfidTagScan.svg';
import arrowDown from '../resources/icons/arrowDown.svg';
import useInactivityTimer from '../hooks/useInactivityTimer';
import useNavigation from '../hooks/useNavigation';

function ConnectTagpage() {
    const navigate = useNavigate();

    const { navigateToHomepage } = useNavigation();

    // Use the inactivity timer with the navigateToHomepage callback
    useInactivityTimer(navigateToHomepage);

    useEffect(() => {
        const socket = io('http://localhost:5000');
    
        // Listen for 'USER' events from the server
        socket.on('INFO', () => {
            navigate('/confirmationadd');
        });
    
        return () => {
          // Cleanup when the component is unmounted
          socket.off('INFO');
          socket.disconnect();
        };
      }, [navigate]);

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
