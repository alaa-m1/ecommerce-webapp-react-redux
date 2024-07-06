import { useEffect, useState } from "react";

const useAppVisibility = () => {
    const [isForeground, setIsForeground] = useState(true);
    useEffect(() => {
      const handleVisibilityChange = () => {
        setIsForeground(document.visibilityState === 'visible');
      };
      document.addEventListener('visibilitychange', handleVisibilityChange);
      return () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      };
    }, []);
    return isForeground;
  };
  export default useAppVisibility;