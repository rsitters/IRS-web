import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/style.css';
import logo from '../resources/images/logoADA1.svg';

function AdminSupplypage() {

    const tableData = [
        { id: '1', itemSort: 'Boek', itemTitle: 'Programmeren voor beginners', itemLent: 'Ja', itemStudentNumber: 'ABC123', itemPeriod: 'Lente 2023' },
        { id: '2', itemSort: 'Kit', itemTitle: 'Raspberry Pi Starter Kit', itemLent: 'Nee', itemStudentNumber: '', itemPeriod: '' },
        { id: '3', itemSort: 'Boek', itemTitle: 'Machine Learning in de Praktijk', itemLent: 'Nee', itemStudentNumber: '', itemPeriod: '' },
        { id: '4', itemSort: 'Kit', itemTitle: 'Arduino Uno Starter Kit', itemLent: 'Ja', itemStudentNumber: 'XYZ789', itemPeriod: 'Herfst 2022' },
        { id: '5', itemSort: 'Boek', itemTitle: 'Webdesign Essentials', itemLent: 'Nee', itemStudentNumber: '', itemPeriod: '' },
        { id: '6', itemSort: 'Kit', itemTitle: '3D Printer Starter Kit', itemLent: 'Ja', itemStudentNumber: 'DEF456', itemPeriod: 'Zomer 2023' },
        { id: '7', itemSort: 'Boek', itemTitle: 'Data Science Fundamentals', itemLent: 'Nee', itemStudentNumber: '', itemPeriod: '' },
        { id: '8', itemSort: 'Kit', itemTitle: 'Smart Home Automation Kit', itemLent: 'Ja', itemStudentNumber: 'GHI789', itemPeriod: 'Lente 2023' },
        { id: '9', itemSort: 'Boek', itemTitle: 'Cybersecurity Basics', itemLent: 'Nee', itemStudentNumber: '', itemPeriod: '' },
        { id: '10', itemSort: 'Kit', itemTitle: 'Robotica Bouwpakket', itemLent: 'Ja', itemStudentNumber: 'JKL012', itemPeriod: 'Herfst 2022' },
      ];

        const [selectedRow, setSelectedRow] = useState(null);
        const navigate = useNavigate();
      
        const handleRowClick = (itemId) => {
          setSelectedRow(itemId);
        };

  return (
    <div className="page">
      <div className="header">
        <h1 className="title">Admin</h1>
        <img src={logo} className="logo" alt="logoADA" />
      </div>
      <div className='center-screen'>
        <h1 className="title center">
          Voorraad
        </h1>
        <div className="table-container-admin">
          <table className="data-table">
            <thead>
              <tr>
                <th>Artikelnummer</th>
                <th>Soort product</th>
                <th>Titel</th>
                <th>Uitgeleend?</th>
                <th>Studentnummer</th>
                <th>Periode</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((item) => (
                <tr
                key={item.id}
                onClick={() => handleRowClick(item.id)}
                className={selectedRow === item.id ? 'selected-row' : ''}
              >
                <td>{item.id}</td>
                <td>{item.itemSort}</td>
                <td>{item.itemTitle}</td>
                <td>{item.itemLent}</td>
                <td>{item.itemStudentNumber}</td>
                <td>{item.itemPeriod}</td>
              </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="buttonLayout-admin">
          <Link to="/add">
            <div className='border-top-right'>
                <p className='center subtitle'>Product toevoegen</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminSupplypage;
