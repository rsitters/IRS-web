import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/style.css';
import logo from '../resources/images/logoADA1.svg';

function Returnpage() {

    const tableData = [
        { id: '1', itemName: 'Arduino kit 1', itemDescription: 'Arduino kit met ....'},
        { id: '2', itemName: 'Raspberry kit 1', itemDescription: 'Raspberry Pi kit met....'},
        { id: '3', itemName: 'Programmeren voor dummies 1', itemDescription: 'Boek geschreven door ....'},
        { id: '4', itemName: 'Arduino kit 2', itemDescription: 'Arduino kit met ....'}
        ];

        const [selectedRow, setSelectedRow] = useState(null);
        const navigate = useNavigate();
      
        const handleRowClick = (itemId) => {
          setSelectedRow(itemId);
        };

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
                <th>Korte beschrijving</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((item) => (
                <tr
                key={item.itemName}
                onClick={() => handleRowClick(item.itemName)}
                className={selectedRow === item.itemName ? 'selected-row' : ''}
              >
                <td>{item.id}</td>
                <td>{item.itemName}</td>
                <td>{item.itemDescription}</td>
              </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="buttonLayout1">
          <Link to="/scanproduct">
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
