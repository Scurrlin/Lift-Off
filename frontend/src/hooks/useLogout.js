import { useAuthContext } from './useAuthContext';
import { useWorkoutsContext } from './useWorkoutsContext';

export const useLogout = () => {
  const { dispatch: dispatchAuth } = useAuthContext();
  const { dispatch: dispatchWorkouts } = useWorkoutsContext();

  const logout = () => {
    localStorage.removeItem('user');

    dispatchAuth({ type: 'LOGOUT' });
    dispatchWorkouts({ type: 'SET_WORKOUTS', payload: null });
  };

  return { logout };
};
