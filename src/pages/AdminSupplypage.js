import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/style.css';
import logo from '../resources/images/logoADA1.svg';
import useInactivityTimer from '../hooks/useInactivityTimer';
import useNavigation from '../hooks/useNavigation';

function AdminSupplypage() {
    const [tableData, setTableData] = useState([]);
    const [studentData, setStudentData] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null);
    const { navigateToHomepage } = useNavigation();

    // Use the inactivity timer with the navigateToHomepage callback
    useInactivityTimer(navigateToHomepage);

    useEffect(() => {
        // Fetch items and students data when the component mounts
        fetchItems();
        fetchStudents();
    }, []);
    
    // Function to fetch items from the server
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
        
                // Categorize items based on the presence of 'ISBN'
                const categorizedItems = jsonData.map(item => ({
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

    // Function to fetch students from the server
    const fetchStudents = async () => {
        try {
            const response = await fetch('http://localhost:5000/user/get/all', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (response.ok) {
                const studentList = await response.json();
    
                // Check if studentList has the expected properties
                if (studentList.year_01 && studentList.year_02) {
                    // Combine the arrays from year_01 and year_02
                    const combinedStudentData = studentList.year_01.concat(studentList.year_02);
    
                    setStudentData(combinedStudentData);
                } else {
                    console.error('Invalid data structure for studentList');
                }
            } else {
                console.error('No data found');
            }
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };
        
    // Function to get student name by ID    
    const getStudentNameById = (studentId) => {
        const foundStudent = studentData.find((student) => parseInt(student.id) === parseInt(studentId));
    
        // Check if foundStudent is not undefined
        if (foundStudent) {
            return foundStudent.firstname + ' ' + foundStudent.lastname;
        } else {
            return 'Unknown';
        }
    };
        
    // Handle click on a table row
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
                    <th>Soort product</th>
                    <th>Titel</th>
                    <th>Uitgeleend?</th>
                    <th>Student</th>
                    <th>Retourneerdatum</th>
                </tr>
                </thead>
                <tbody>
                {tableData.map((item) => (
                    <tr
                    key={item.ID}
                    onClick={() => handleRowClick(item.ID)}
                    className={selectedRow === item.ID ? 'selected-row' : ''}
                >
                    <td>{item.Category}</td>
                    <td>{item.Title}</td>
                    <td>{item.Rented ? 'Ja' : 'Nee'}</td>
                    <td>{item.Rented ? getStudentNameById(item.Rented_by) : ''}</td>
                    <td>{item.Rented ? item.Rented_till : ''}</td>
                </tr>
                ))}
                </tbody>
            </table>
            </div>
            <div className="buttonLayoutAdmin">
            <Link to="/add">
                <div className='border-top-right'>
                    <p className='center subtitle'>Product toevoegen</p>
                </div>
            </Link>
            <Link onClick={navigateToHomepage}>
                <div className='border-top-left'>
                    <p className='center subtitle'>Uitloggen</p>
                </div>
            </Link>
            </div>
        </div>
        </div>
    );
}

export default AdminSupplypage;
