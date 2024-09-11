import Loading from "@/app/loading";
import { useState } from "react";
import {
  Image,
  StyleSheet,
  Platform,
  View,
  Text,
  TextInput,
  Pressable,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import CustomTextInput from "../CustomTextInput";
import CustomButton from "../CustomButton";
// Stack Navigator için olası rota isimlerini tanımlıyoruz
type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "Login">;
const LoginPage = ({ navigation }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Login {result}</Text>

      <Image
        source={require("../../assets/images/login.png")}
        style={styles.image}
      />

      <CustomTextInput
        title="Email"
        isSecureText={false}
        handleOnChangeText={setEmail}
        handleValue={email}
        handlePlaceHolder={"Enter Your Email"}
      />

      <CustomTextInput
        title="Password"
        isSecureText={true}
        handleOnChangeText={setPassword}
        handleValue={password}
        handlePlaceHolder={"Enter Your Password"}
      />

      <CustomButton
        buttonText="Login"
        handleOnPress={() => setIsLoading(false)}
        buttonColor="#5fa2ea"
        pressedButtonColor="#007bff"
      />

      <Pressable onPress={() => navigation.navigate("SignUp")}>
        <Text style={styles.signText}>Sign Up</Text>
      </Pressable>

      {isLoading ? (
        <Loading changeIsLoading={() => setIsLoading(false)} />
      ) : null}
    </View>
  );
};

export default LoginPage;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "tomato",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    height: 150,
    width: 150,
  },

  welcome: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#fff",
  },
  signText: {
    marginTop: 15,
    color: "#fff",
    fontSize: 16,
    position: "absolute",
    left: 80,
  },
});
