import React, { useState } from 'react';
import { TextInput } from 'react-native-paper';

const TextInputC = ({ label, onChangeText }) => {
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
    onChangeText(text);
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
