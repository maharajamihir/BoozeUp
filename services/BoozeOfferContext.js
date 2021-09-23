import React, { useState, createContext } from 'react';

export const BoozeOfferContext = createContext();

export const BoozeOfferContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
const [userOffers, setUserOffers] = useState(null);
const [userData, setUserData] = useState(null);
const [error, setError] = useState(null);

const fetchUserData = (token) => {
  console.log("Fetching Data!!")
  console.log(token)
  setIsLoading(true);
  setError(null);
  const url = 'http://localhost:5000/user-data?';
  //const url = 'https://boozeup.herokuapp.com/user-data?'
      fetch(url, {
          method: 'POST',
          headers: {    
              Accept: 'application/json',
              'Content-Type': 'application/json; charset=utf-8'
            },  
          body: JSON.stringify({
                  token : token
              })
      }).then(response => response.json())
      .then(data => {
        console.log(data);
        if(data.constructor == Array){
          setError(data);
        } else {
          setUserData(data[0]);
        }
      })
      .then(userdata => console.log(userdata[0]))
      .catch(error => console.log(error))
      .finally(() => setIsLoading(false));
    
};



const uploadOffer = (token, booze, price, location) => {
  setIsLoading(true);
  setError(null);
  const url = 'http://localhost:5000/make-offer?'
  //const url = 'https://boozeup.herokuapp.com/make-offer?'
      fetch(url, {
          method: 'POST',
          headers: {    
              Accept: 'application/json',
              'Content-Type': 'application/json; charset=utf-8'
            },  
          body: JSON.stringify({
                  token : token,
                  "booze-type" : booze,
                  location : location,
                  price : price
              })
      }).then(response => response.json())
      .then(data => {
        console.log(data);
        if(data.constructor == Array){
          setError(data);
        } else {
          setUserOffers(data);
        }
      })
      .then(offers => console.log(offers))
      .catch(error => console.log(error))
      .finally(() => setIsLoading(false));
    
};

  return (
    <BoozeOfferContext.Provider
      value={{
        isLoading,
        userOffers,
        userData,
        error,
        fetchUserData,
        uploadOffer
      }}
    >
      {children}
    </BoozeOfferContext.Provider>
  );
};