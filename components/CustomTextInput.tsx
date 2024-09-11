import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";

interface CustomInputTextProps {
  title: string;
  isSecureText: boolean;
  handleOnChangeText: (text: string) => void;
  handleValue: string;
  handlePlaceHolder: string;
}

const CustomTextInput = ({
  title,
  isSecureText,
  handleOnChangeText,
  handleValue,
  handlePlaceHolder,
}: CustomInputTextProps) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputBoxText}>{title}</Text>
      <TextInput
        secureTextEntry={isSecureText}
        style={styles.textInputStyles}
        placeholder={handlePlaceHolder}
        value={handleValue}
        /**onChangeText için de birden fazla yapı tanımlayacak isek aşağıdaki gibi tanımlamamız gerekiyor */
        onChangeText={handleOnChangeText}
      />
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  inputContainer: {
    width: "80%",
  },
  inputBoxText: {
    fontWeight: "bold",
    alignSelf: "flex-start",
    color: "#fff",
  },

  textInputStyles: {
    borderBottomWidth: 0.5,
    borderColor: "#fff",
    width: "100%",
    height: 50,
    borderRadius: 10,
    marginVertical: 10,
    textAlign: "center",
    color: "blue",
    fontWeight: "bold",
  },
});
