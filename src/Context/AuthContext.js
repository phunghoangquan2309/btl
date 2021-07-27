import React from 'react';

const AuthContext = React.createContext({ user: null });
export const useAuth = () => React.useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);

  const logOut = () => {
    localStorage.setItem('login', null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
