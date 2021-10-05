import React, { useState, createContext } from 'react';

export const BoozeOfferContext = createContext();

export const BoozeOfferContextProvider = ({ children }) => {
const [isLoading, setIsLoading] = useState(false);
const [userOffers, setUserOffers] = useState(null);
const [userData, setUserData] = useState(null);
const [error, setError] = useState(null);
const [uploaded, setUploaded] = useState(false);

const fetchUserData = (token) => {
  console.log("Fetching Data!!")
  console.log(token)
  setIsLoading(true);
  setError(null);
  //const url = 'http://localhost:5000/user-data?';
  const url = 'https://boozeup.herokuapp.com/user-data?'
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
        if(data.constructor == Array && data[1] == 404){
          console.log("An error occured!")
          setError(data);
        } else {
          setUserData(data);
        }
      })
      .then(userdata => console.log(userdata[0]))
      .catch(error => console.log(error))
      .finally(() => setIsLoading(false));
    
};



const uploadOffer = (token, booze, price, location, name, description) => {
  setIsLoading(true);
  setError(null);
  //const url = 'http://localhost:5000/make-offer?'
  const url = 'https://boozeup.herokuapp.com/make-offer?'
      fetch(url, {
          method: 'POST',
          headers: {    
              Accept: 'application/json',
              'Content-Type': 'application/json; charset=utf-8'
            },  
          body: JSON.stringify({
                  token : token,
                  "booze-type" : booze,
                  latitude : location.coords.latitude,
                  longitude : location.coords.longitude,
                  price : price,
                  name : name,
                  description : description
              })
      }).then(response => response.json())
      .then(data => {
        console.log(data);
        if(data.constructor == Array && data[1] == 404){
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
        uploaded,
        error,
        fetchUserData,
        uploadOffer
      }}
    >
      {children}
    </BoozeOfferContext.Provider>
  );
};