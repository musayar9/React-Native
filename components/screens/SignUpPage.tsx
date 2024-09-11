import { StyleSheet, Text, View, SafeAreaView, Image, Pressable } from "react-native";
import React, { useState } from "react";
import CustomTextInput from "../CustomTextInput";
import CustomButton from "../CustomButton";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "SignUp">;
const SignUpPage = ({navigation}:Props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.title}>
        <Image
          source={require("../../assets/images/signUp.png")}
          style={styles.image}
        />
        <Text style={styles.sighUp}>Sign Up</Text>
      </View>
      <View style={styles.textInputContainer}>
        <CustomTextInput
          title="Name"
          handlePlaceHolder="Enter a name"
          handleValue={name}
          handleOnChangeText={setName}
          isSecureText={false}
        />
        <CustomTextInput
          title="Email"
          handlePlaceHolder="Enter a email address"
          handleValue={email}
          handleOnChangeText={setEmail}
          isSecureText={false}
        />

        <CustomTextInput
          title="Create Password"
          handlePlaceHolder="Create Your Password"
          handleValue={password}
          handleOnChangeText={setPassword}
          isSecureText={true}
        />
      </View>

      <View style={styles.signUpOptions}>
        <CustomButton
          buttonText="Sign Up"
          buttonColor="#5fa2ea"
          pressedButtonColor="#007bff"
          handleOnPress={() => console.log(name, " ", email, " ", password)}
        />
        
        
        <Pressable onPress={()=>navigation.navigate("Login")}>
        <Text>Alreadt have an account? Login</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default SignUpPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "tomato",
  },
  sighUp: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#fff",
  },
  textInputContainer: {
    flex: 2,
    // borderWidth:1,
    width: "100%",
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    flex: 2,
    // paddingTop: 20,
    width:"100%",
    alignItems:"center",
    justifyContent:"center"
  },
  signUpOptions: {
    flex: 2,
    width: "100%",
    alignItems: "center",
    marginVertical: 10,
    justifyContent:"space-between"
    
  },

  image: {
    height: 100,
    width: 100,
    marginBottom:20
  },
});
