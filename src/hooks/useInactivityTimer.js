// useInactivityTimer.js
import { useEffect, useRef } from 'react';

const useInactivityTimer = (callback, duration = 60000) => {
  const timerRef = useRef(null);

  useEffect(() => {
    const resetTimer = () => {
      clearTimeout(timerRef.current);
      const newTimer = setTimeout(callback, duration);
      timerRef.current = newTimer;
    };

    document.addEventListener('mousemove', resetTimer);
    document.addEventListener('keydown', resetTimer);

    const initialTimer = setTimeout(callback, duration);
    timerRef.current = initialTimer;

    return () => {
      document.removeEventListener('mousemove', resetTimer);
      document.removeEventListener('keydown', resetTimer);
      clearTimeout(timerRef.current);
    };
  }, [callback, duration]);
};

export default useInactivityTimer;
