import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const handleSignupResponse = (json) => {
    localStorage.setItem('user', JSON.stringify(json));
    dispatch({ type: 'LOGIN', payload: json });
  };

  const signup = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/user/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
      } else {
        handleSignupResponse(json);
      }
    } catch (error) {
      setError('An error occurred during signup.');
    } finally {
      setIsLoading(false);
    }
  };

  return { signup, isLoading, error };
};
