import React, { createContext, useState } from 'react';

export const MyContext = createContext();

export const MyContextProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [Language, setLanguage] = useState('');
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [sayfa, setSayfa] = useState('');
  const [password, setPassword] = useState('');
  const [userinfo, setUserinfo] = useState('');
  const [tcno,setTcno] = useState('');
  const [hesapturadi,setHesapturadi] = useState('');
  const [hesapbakiye,setHesapbakiye] = useState('');

   //hesap ekle SAYFASI
   const [selectedOptiondoviz, setSelectedOptiondoviz] = useState('');
   const [selectedOptionhesap, setSelectedOptionhesap] = useState('');
   const [selectedOptionsube, setSelectedOptionsube] = useState('');
   const [selectedIBAN, setSelectedIBAN] = useState('');

   //genel password kontrolü için 
   const[checkpassword,setCheckpassword] = useState();
   const[checkpassword2,setCheckpassword2] = useState();

   const updateCheckpassword = (newCheckpassword ) => {
    setCheckpassword(newCheckpassword );
  };
  const updateCheckpassword2 = (newCheckpassword2 ) => {
    setCheckpassword2(newCheckpassword2 );
  };
   const updateSelectedIBAN = (newSelectedIBAN  ) => {
    setSelectedIBAN(newSelectedIBAN );
  };
   const updateSelectedOptiondoviz = (newSelectedOption) => {
    setSelectedOptiondoviz(newSelectedOption);
  };
  const updateSelectedOptionhesap = (newSelectedOption2) => {
    setSelectedOptionhesap(newSelectedOption2);
  };
  const updateSelectedOptionsube = (newSelectedOption3) => {
    setSelectedOptionsube(newSelectedOption3);
  };
//[{"fullname": "Kürşad Eren MADEN", "hesapbakiye": "100", "hesapno": "1000100", "hesapturadi": "Vadesiz", "id": 12, "telno": "05539777143", "userid": 73},


  const updateHesapturadi = (newHesapturadi) => {
    setHesapturadi(newHesapturadi);
  };
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
      //combodoviz
      selectedOptiondoviz,
      updateSelectedOptiondoviz,
      //combohesap
      selectedOptionhesap,
      updateSelectedOptionhesap,
      //combo sube
      selectedOptionsube,
      updateSelectedOptionsube,
      //iban
      selectedIBAN,
      updateSelectedIBAN,

      }}>
      {children}
    </MyContext.Provider>
  );
};

