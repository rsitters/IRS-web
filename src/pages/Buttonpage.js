import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/style.css';
import logo from '../resources/images/logoADA1.svg';
import rentIcon from '../resources/icons/rentIcon.svg';
import returnIcon from '../resources/icons/returnIcon.svg';

function Buttonpage() {
  return (
    <div className="page">
      <div className="header">
        <Link to="/">
            <div className='border-top-left'>
                <p className='center subtitle'>Terug</p>
            </div>
        </Link>
        <img src={logo} className="logo" alt="logoADA" />
      </div>
      <div className='center-screen'>
        <h1 className="title center">
          Hallo Voornaam Achternaam
        </h1>
        <p className='subtitle'>Waar kan ik u vandaag mee helpen?</p>
        <div className="buttonLayout">
          <Link to="/rent">
            <div className='border-top-right'>
                <img src={rentIcon} alt="logoADA" />
                <p className='center subtitle'>Lenen</p>
            </div>
          </Link>
          <Link to="/return">
            <div className='border-top-left'>
                <img src={returnIcon} alt="logoADA" />
                <p className='center subtitle'>Retourneren</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Buttonpage;
