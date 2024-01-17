import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import '../styles/style.css';
import logo from '../resources/images/logoADA1.svg';
import useInactivityTimer from '../hooks/useInactivityTimer';
import useNavigation from '../hooks/useNavigation';

function AddArticlepage() {
    const { navigateToHomepage } = useNavigation();

    // Use the inactivity timer with the navigateToHomepage callback
    useInactivityTimer(navigateToHomepage);

    const [bookISBN, setBookISBN] = useState('');
    const [kitTitle, setKitTitle] = useState('');
    const [kitDescription, setKitDescription] = useState('');
    const navigate = useNavigate();

    // Function to check if ISBN is valid (either 10 or 13 digits)
    const isValidISBN = (isbn) => {
        const isbnRegex = /^(?:\d{10}|\d{13})$/;
        return isbnRegex.test(isbn);
    };

     // Handle book submission form
    const handleBookSubmit = (e) => {
        e.preventDefault();

        // If ISBN is valid, perform the desired action
        if (isValidISBN(bookISBN)) {
            // Initialize socket connection and emit 'addBook' event
            const socket = io('http://localhost:5000');
            socket.emit('addBook', bookISBN);

            // Navigate to the next page
            navigate('/connectTag'); 
        } else {
            // If ISBN is invalid, show an alert with an error message
            window.alert('Ongeldig ISBN. Voer een ISBN in met 10 of 13 cijfers.');
        }
    };

    // Handle kit submission form
    const handleKitSubmit = (e) => {
        e.preventDefault();

        // Initialize socket connection and emit 'addKit' event
        const socket = io('http://localhost:5000');
        socket.emit('addKit',  [kitTitle, kitDescription]);

        // Navigate to next page
        navigate('/connectTag');
     }

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
            <p className='text'>1. Plak een NFC tag op het product.<br></br>2. Vul de gegevens in en klik op 'Voeg boek/kit toe'.<br></br>3. Er verschijnt een scanpagina. Scan de tag om het product te koppelen.<br></br>4. Plaats het product in de kast.</p>
            </div>
            <div className='width'>
            <p className='subtitle'>Boeken</p>
            <form onSubmit={handleBookSubmit}>
                <label>
                ISBN:
                <input type="text" value={bookISBN} onChange={(e) => setBookISBN(e.target.value)} pattern="[0-9]+" title="Vul alleen nummers in"/>
                </label>
                <div className='flex-end'>
                <button type="submit">Voeg boek toe</button>
                </div>
            </form>
            </div>
            <div className='width'>
            <p className='subtitle'>Kits</p>
            <form onSubmit={handleKitSubmit}>
                <label>
                Titel:
                <input type="text" value={kitTitle} onChange={(e) => setKitTitle(e.target.value)} pattern="[A-Za-z0-9]+" title="Vul alleen nummers en letters in"/>
                </label>
                <label>
                Beschrijving:
                <input type="text" value={kitDescription} onChange={(e) => setKitDescription(e.target.value)} pattern="[A-Za-z0-9]+" title="Vul alleen nummers en letters in"/>
                </label>
                <div className='flex-end'>
                <button type="submit">Voeg kit toe</button>
                </div>
            </form>
            </div>
        </div>
        </div>
    );
}

export default AddArticlepage;
