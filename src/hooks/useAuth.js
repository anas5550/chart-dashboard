const useAuth = () => {
  const isAuthenticated = localStorage.getItem('token') !== null;
  return { isAuthenticated };
};

export default useAuth;
