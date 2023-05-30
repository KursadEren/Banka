import React, { createContext, useState } from 'react';

export const MyContext = createContext();

export const MyContextProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [sayfa, setSayfa] = useState('');
  const [password, setPassword] = useState('');
  
  const updatePassword = (newPassword) => {
    setPassword(newPassword);
  };

  const updateSayfa = (newSayfa) => {
    setSayfa(newSayfa);
  };
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
      sayfa,
      updateSayfa,
      password,
      updatePassword,
      }}>
      {children}
    </MyContext.Provider>
  );
};

