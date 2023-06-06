import React, { useState, useContext } from 'react';
import { TextInput } from 'react-native-paper';
import { MyContext } from '../Context/Context';

const TextInputC = ({ label }) => {
  const context = useContext(MyContext);
  const {updatesetDogumtarih,tcno, updateTcno, email, updateEmail,updatePassword,password,telno,updatesetTelno,   fullname,updateFullname, } = context;
  const [text, setText] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleTextChange = (text) => {
    setText(text);
  if (label === "TC No") {
    updateTcno(text);
  } else if (label === "Password") {
    updatePassword(text);
  }else if(label === "email")
   {
    updateEmail(text);
   }else if(label === "telno")
   {
    updatesetTelno(text);
   }
   else if(label ==="fullname")
   {
    updateFullname(text);
   }
   else if(label === "dogumtarih")
   {
    updatesetDogumtarih(text);
   }
  };

  return (
    <TextInput
      label={label}
      value={text}
      mode="outlined"
      onBlur={handleBlur}
      style={isFocused ? { borderColor: 'blue' } : null}
      onChangeText={handleTextChange}
    />
  );
};

export default TextInputC;
