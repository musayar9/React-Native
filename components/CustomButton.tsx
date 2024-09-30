import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import Animated, { FadeIn } from "react-native-reanimated";
interface CustomButtonProps {
  buttonText: string;
  handleOnPress: () => void;
  buttonColor: string;
  pressedButtonColor: string;
  flexValue:number
}

const CustomButton = ({
  buttonText,
  handleOnPress,
  buttonColor,
  pressedButtonColor,
  flexValue,
}: CustomButtonProps) => {
  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
  return (
    // <AnimatedPressable exiting={FadeIn}
    //   onPress={handleOnPress}
    //   style={({ pressed }) => [
    //     { backgroundColor: pressed ? pressedButtonColor : buttonColor },
    //     styles.button,
    //   ]}
    // >
    //   <Text style={styles.buttonText}>{buttonText}</Text>
    // </AnimatedPressable>

    <Pressable
      onPress={handleOnPress}
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? pressedButtonColor : buttonColor,
          flex: flexValue,
        },
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
   
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
