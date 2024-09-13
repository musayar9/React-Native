import Loading from "@/app/loading";

import { Image, StyleSheet, View, Text, Pressable } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import CustomTextInput from "../CustomTextInput";
import CustomButton from "../CustomButton";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { login, setEmail, setIsLoading, setPassword } from "@/redux/userSlice";

type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "Login">;
const LoginPage = ({ navigation }: Props) => {
  const { email, password, isLoading } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Login</Text>

      <Image
        source={require("../../assets/images/login.png")}
        style={styles.image}
      />

      <CustomTextInput
        title="Email"
        isSecureText={false}
        handleOnChangeText={(text) => dispatch(setEmail(text))}
        handleValue={email ?? ""}
        handlePlaceHolder={"Enter Your Email"}
      />

      <CustomTextInput
        title="Password"
        isSecureText={true}
        handleOnChangeText={(password) => dispatch(setPassword(password))}
        handleValue={password ?? ""}
        handlePlaceHolder={"Enter Your Password"}
      />

      <CustomButton
        buttonText="Login"
        handleOnPress={() =>
          dispatch(
            login({ username: email as string, password: password as string })
          )
        }
        buttonColor="#5fa2ea"
        pressedButtonColor="#007bff"
      />

      <Pressable onPress={() => navigation.navigate("SignUp")}>
        <Text style={styles.signText}>Sign Up</Text>
      </Pressable>

      {isLoading ? (
        <Loading changeIsLoading={() => dispatch(setIsLoading(false))} />
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
