import React, { useState, createContext } from 'react';

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const onLogin = (email, password) => {
    setIsLoading(true);
    setError(null);
    const url = 'https://boozeup.herokuapp.com/login?'
        fetch(url, {
            method: 'POST',
            headers: {    
                Accept: 'application/json',
                'Content-Type': 'application/json; charset=utf-8'
              },  
            body: JSON.stringify({
                    email : email,
                    password : password
                })
        }).then(response => response.json())
        .then(data => {
          console.log(data);
          if(data.constructor == Array){
            setError(data);
          } else {
            setUser(data);
          }
        })
        .then(token => console.log(token))
        .catch(error => console.log(error))
        .finally(() => setIsLoading(false));
      
  };

  const onRegister = (username,number,email,password) => {
    setIsLoading(true);
    setError(null);
    const url = 'https://boozeup.herokuapp.com/signup?'
        fetch(url, {
            method: 'POST',
            headers: {    
                Accept: 'application/json',
                'Content-Type': 'application/json; charset=utf-8'
              },  
            body: JSON.stringify({
                    username : username,
                    phone_number : number,
                    email : email,
                    password : password
                })
        }).then(response => response.json())
        .then(data => {
          console.log(data);
          if(data.constructor == Array){
            setError(data);
          } else {
            setUser(data);
          }
        })
        .then(token => console.log(token))
        .catch(error => console.log(error))
        .finally(() => setIsLoading(false));
      
  };

  const onLogout = () => {
    setUser(null);
  };

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated: !!user,
        isLoading,
        user,
        error,
        onLogin,
        onRegister,
        onLogout,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};