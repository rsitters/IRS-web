import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/style.css';
import logo from '../resources/images/logoADA1.svg';

function AddArticlepage() {
  const [bookISBN, setBookISBN] = useState('');
  const [kitTitle, setKitTitle] = useState('');
  const [kitDescription, setKitDescription] = useState('');
  const navigate = useNavigate();

  const isValidISBN = (isbn) => {
    // Controleer of het ISBN 10 of 13 cijfers bevat
    const isbnRegex = /^(?:\d{10}|\d{13})$/;
    return isbnRegex.test(isbn);
  };

  const handleBookSubmit = (e) => {
    e.preventDefault();

    if (isValidISBN(bookISBN)) {
      // Voer de gewenste actie uit als het ISBN geldig is
      console.log('Geldig boek ISBN ingediend:', bookISBN);
      // Voeg hier de logica toe om het boek toe te voegen
      navigate('/connectTag'); // Navigeer naar de volgende pagina
    } else {
      // Toon een foutbericht als het ISBN ongeldig is
      console.error('Ongeldig boek ISBN ingediend:', bookISBN);
      // Toon een alertvenster met een foutmelding
      window.alert('Ongeldig ISBN. Voer een ISBN in met 10 of 13 cijfers.');
    }
  };

  return (
    <div className="page">
      <div className="header">
        <h1 className="title">Admin</h1>
        <img src={logo} className="logo" alt="logoADA" />
      </div>
      <div className='center-screen'>
        <h1 className="title center">
          Toevoegen product
        </h1>
        <div className='border-top-right'>
          <p className='subtitle'>Instructies</p>
          <p className='text'>1. Plak een RFID tag op het boek.<br></br>2. Vul het ISBN in en klik op 'Voeg boek toe'.<br></br>3. Er verschijnt een scanpagina. Scan de tag om het boek te koppelen.<br></br>4. Plaats het boek in de kast.</p>
        </div>
        <div className='width'>
          <p className='subtitle'>Boeken</p>
          <form onSubmit={handleBookSubmit}>
            <label>
              ISBN:
              <input type="text" value={bookISBN} onChange={(e) => setBookISBN(e.target.value)} />
            </label>
            <div className='flex-end'>
              <button type="submit">Voeg boek toe</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddArticlepage;
