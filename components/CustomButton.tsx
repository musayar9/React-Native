import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

interface CustomButtonProps {
  buttonText: string;
  handleOnPress: () => void;
  buttonColor: string;
  pressedButtonColor: string;
}

const CustomButton = ({
  buttonText,
  handleOnPress,
  buttonColor,
  pressedButtonColor,
}: CustomButtonProps) => {
  return (
    <Pressable
      onPress={handleOnPress}
      style={({ pressed }) => [
        { backgroundColor: pressed ? pressedButtonColor : buttonColor },
        styles.button,
      ]}
    >
      <Text style={styles.buttonText}>{buttonText}</Text>
    </Pressable>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    width: "80%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
