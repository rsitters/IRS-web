import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/style.css';
import logo from '../resources/images/logoADA1.svg';
import useInactivityTimer from '../hooks/useInactivityTimer';
import useNavigation from '../hooks/useNavigation';

function ConfirmationAddpage() {
    const { navigateToHomepage } = useNavigation();

    // Use the inactivity timer with the navigateToHomepage callback
    useInactivityTimer(navigateToHomepage);

    return (
        <div className="page">
        <div className="header">
            <h1 className="title">Admin</h1>
            <img src={logo} className="logo" alt="logoADA" />
        </div>
        <div className='center-screen'>
            <h1 className="title center">
                Product is succesvol toegevoegd
            </h1>
            <div className="buttonLayout">
            <Link to="/add">
                <div className='border-top-right'>
                    <p className='center subtitle'>Product toevoegen</p>
                </div>
            </Link>
            <Link to="/admin">
                <div className='border-top-left'>
                    <p className='center subtitle'>Voorraad inzien</p>
                </div>
            </Link>
            </div>
        </div>
        </div>
    );
}

export default ConfirmationAddpage;
