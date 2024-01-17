// useNavigation.js
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';

const useNavigation = () => {
  const navigate = useNavigate();

  const navigateToHomepage = async () => {
    try {
      // Make an API call to deactivate the user
      const response = await fetch('http://localhost:5000/user/deactivate', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // User deactivated successfully, navigate back to the homepage
        const socket = io('http://localhost:5000');
        socket.emit('NFC', 'connected');
        navigate('/');
      } else {
        // Handle unsuccessful user deactivation
        console.error('User deactivation failed');
      }
    } catch (error) {
      console.error('Error during user deactivation:', error);
    }
  };

  return { navigateToHomepage };
};

export default useNavigation;
