import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Pressable,
} from "react-native";


interface LoadingProps {
  changeIsLoading: () => void;
}

const Loading:React.FC<LoadingProps> = (props) => {

  return (
    <View style={styles.container}>
      <Pressable onPress={()=>props.changeIsLoading()} style={styles.closeButtonContainer}>
        <Text style={styles.close}>X</Text>
      </Pressable>
      <ActivityIndicator size={"large"} color={"blue"} />
      <Text style={styles.loginText}>Loading...</Text>
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "tomato",
    alignItems: "center",
    justifyContent: "center",
  },

  loginText: {
    fontWeight: "bold",
    color: "white",
    fontSize: 16,
  },
  closeButtonContainer: {
    backgroundColor: "black",
    width: 50,
    height: 50,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 50,
    right: 30,
    cursor:"pointer"
  },

  close: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
