import React, { useState, useEffect  } from 'react';
import { Link } from 'react-router-dom';
import { io } from 'socket.io-client';
import '../styles/style.css';
import logo from '../resources/images/logoADA1.svg';
import useInactivityTimer from '../hooks/useInactivityTimer';
import useNavigation from '../hooks/useNavigation';

function Rentpage() {
    const [tableData, setTableData] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null);
    const { navigateToHomepage } = useNavigation();

    // Use the inactivity timer with the navigateToHomepage callback
    useInactivityTimer(navigateToHomepage);
  
    useEffect(() => {
      // API-call when component mounts
      fetchItems();
    }, []);
  
    const fetchItems = async () => {
        try {
            const response = await fetch('http://localhost:5000/db/get/items', {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                },
            });
      
            if (response.ok) {
                const jsonData = await response.json();
        
                // Filter items where 'Rented' is false
                const notLentItems = jsonData.filter(item => !item.Rented);
        
                // Determine the category based on the presence of 'ISBN'
                const categorizedItems = notLentItems.map(item => ({
                ...item,
                Category: item.ISBN ? 'Boek' : 'Kit',
                }));

                // Set the filtered data for the table
                setTableData(categorizedItems); 
            } else {
                console.error('No data found');
            }
        } catch (error) {
          console.error('Error fetching items:', error);
        }
    };
      
    const handleRowClick = (itemId) => {
      setSelectedRow(itemId);
    };

    // Sends emit to start scanner for renting
    const sentRentEmit = () => {
        const socket = io('http://localhost:5000');
        socket.emit('rent', 'start_renting');
    }

    return (
        <div className="page">
        <div className="header">
            <Link to="/button">
                <div className='border-top-left'>
                    <p className='center subtitle'>Terug</p>
                </div>
            </Link>
            <img src={logo} className="logo" alt="logoADA" />
        </div>
        <div className='center-screen'>
            <h1 className="title center">
            Beschikbare voorraad
            </h1>
            <div className="table-container">
            <table className="data-table">
                <thead>
                <tr>
                    <th>Soort product</th>
                    <th>Titel</th>
                    <th>Beschrijving</th>
                </tr>
                </thead>
                <tbody>
                {tableData.map((item) => (
                    <tr
                        key={item.ID} 
                        onClick={() => handleRowClick(item.ID)}
                        className={selectedRow === (item.ID) ? 'selected-row' : ''}
                    >
                        <td>{item.Category}</td>
                        <td>{item.Title}</td>
                        <td>{item.Description}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
            </div>
            <div className="buttonLayout1">
            <Link to="/scanproduct" onClick={sentRentEmit}>
                <div className='border-top-right'>
                    <p className='center subtitle'>Lenen</p>
                </div>
            </Link>
            </div>
        </div>
        </div>
    );
}

export default Rentpage;
