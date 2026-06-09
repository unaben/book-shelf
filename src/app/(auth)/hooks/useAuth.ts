import { useAuthData } from '@/context/AuthContext';
import { useState } from 'react';

const useAuth = () => {
    const { login,  register } = useAuthData();
    const [loading, setLoading] = useState(false);

    const handleRegisterSubmit = async (
        email: string,
        password: string,
        name = ""
      ) => {
        setLoading(true);
        try {
          await register(email, password, name);
        } finally {
          setLoading(false);
        }
      };
  
    const handleLoginSubmit = async (email: string, password: string) => {
      setLoading(true);
      try {
        await login(email, password);
      } finally {
        setLoading(false);
      }
    };
    
  return {handleLoginSubmit, handleRegisterSubmit, loading}
}

export default useAuth