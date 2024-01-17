import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/style.css';
import logo from '../resources/images/logoADA1.svg';
import useInactivityTimer from '../hooks/useInactivityTimer';
import useNavigation from '../hooks/useNavigation';

function ConfirmationReturnpage() {
    const [selectedItem, setSelectedItem] = useState(null);
    const { navigateToHomepage } = useNavigation();

    // Retrieve UID data from localStorage
    const UID = JSON.parse(localStorage.getItem('UID'));

    // Use the inactivity timer with the navigateToHomepage callback
    useInactivityTimer(navigateToHomepage);

    useEffect(() => {
        // Fetch item details when the component mounts
        fetchItem();
    }, [UID]);
    
    // Function to fetch details of the selected item from the server
    const fetchItem = async () => {
        try {
          const response = await fetch(`http://localhost:5000/db/get/item/${UID}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
    
          if (response.ok) {
            const item = await response.json();
    
            setSelectedItem(item);
          } else {
            console.error('No data found');
          }
        } catch (error) {
          console.error('Error fetching item:', error);
        }
    };

    return (
        <div className="page">
        <div className="header1">
            <img src={logo} className="logo" alt="logoADA" />
        </div>
        <div className='center-screen'>
            <h1 className="title center">
                {selectedItem && selectedItem.Title ? `'${selectedItem.Title}'` : 'Product'}<br></br>is succesvol geretourneerd
            </h1>
            <Link to="/return">
            <div className='border-top-right'>
                <p className='center subtitle'>Nog een product retourneren</p>
            </div>
            </Link>
        </div>
        </div>
    );
}

export default ConfirmationReturnpage;
