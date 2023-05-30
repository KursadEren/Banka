import React, { createContext, useState } from 'react';

export const MyContext = createContext();

export const MyContextProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');


  
  const updateTheme = (newTheme) => {
    setTheme(newTheme);
  };

  const updateFullname = (newFullname) => {
    setFullname(newFullname);
  };

  const updateEmail = (newEmail) => {
    setEmail(newEmail);
  };

  // Yeni verileri eklemek için bir fonksiyon tanımlayabilirsiniz


  return (
    <MyContext.Provider value={{ theme,
      updateTheme,
      fullname,
      updateFullname,
      email,
      updateEmail, 
      }}>
      {children}
    </MyContext.Provider>
  );
};

