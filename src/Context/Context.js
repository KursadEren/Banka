import React, { createContext, useState } from 'react';

export const MyContext = createContext();

export const MyContextProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [sayfa, setSayfa] = useState('');
  const [password, setPassword] = useState('');
  const [Language, setLanguage] = useState('');
  const [userinfo, setUserinfo] = useState('');
  const [tcno,setTcno] = useState('');

  const updateTcno = (newTcno) => {
    setTcno(newTcno);
  };
  const updateUserinfo = (newUserinfo) => {
    setUserinfo(newUserinfo);
  };
  const updateLanguage= (newLanguage) => {
    setLanguage(newLanguage);
  };


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
      Language,
      setLanguage,
      userinfo,
      updateUserinfo,
      tcno,
      updateTcno,


      }}>
      {children}
    </MyContext.Provider>
  );
};

