import { useNavigate } from 'react-router-dom';

const useLogout = () => {
  const navigate = useNavigate();
  // we can write our logout logic here
  const logout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return logout;
};

export default useLogout;
