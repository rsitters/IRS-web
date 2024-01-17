import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { io } from 'socket.io-client';
import '../styles/style.css';
import logo from '../resources/images/logoADA1.svg';
import useInactivityTimer from '../hooks/useInactivityTimer';
import useNavigation from '../hooks/useNavigation';

function Returnpage() {
    const [tableData, setTableData] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null);

    const { navigateToHomepage } = useNavigation();

    // Use the inactivity timer with the navigateToHomepage callback
    useInactivityTimer(navigateToHomepage);
    
    const storedUserData = JSON.parse(localStorage.getItem('activeUserData'));

    useEffect(() => {
        // Doe de API-call wanneer de component mount
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
        
              // Filter items waarbij 'Lent' gelijk is aan false
              const studentItems = jsonData.filter(item => item.Rented_by === storedUserData.id);

                          // Bepaal de categorie op basis van het aanwezig zijn van 'ISBN'
              const categorizedItems = studentItems.map(item => ({
                ...item,
                Category: item.ISBN ? 'Boek' : 'Kit',
              }));

              setTableData(categorizedItems); // Stel de gefilterde data in voor de tabel
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

        const sentReturnEmit = () => {
            const socket = io('http://localhost:5000');
            socket.emit('return', 'start_returning');
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
          Geleende producten
        </h1>
        <div className="table-container">
          <table className="data-table">
          <thead>
              <tr>
                <th>Soort product</th>
                <th>Titel</th>
                <th>Retourneerdatum</th>
              </tr>
            </thead>
            <tbody>
            {tableData.map((item) => (
                <tr
                    key={item.ID}  // Gebruik een unieke sleutel op basis van ISBN of ID
                    onClick={() => handleRowClick(item.ID)}
                    className={selectedRow === (item.ID) ? 'selected-row' : ''}
                >
                    <td>{item.Category}</td>
                    <td>{item.Title}</td>
                    <td>{item.Rented_till}</td>
                    {/* Andere kolommen toevoegen indien nodig */}
                </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="buttonLayout1">
          <Link to="/scanproduct" onClick={sentReturnEmit}>
            <div className='border-top-right'>
                <p className='center subtitle'>Retourneren</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Returnpage;
