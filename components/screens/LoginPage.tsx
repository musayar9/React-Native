import Loading from "@/app/loading";

import { Image, StyleSheet, View, Text, Pressable } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import CustomTextInput from "../CustomTextInput";
import CustomButton from "../CustomButton";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { autoLogin, login, setIsLoading } from "@/redux/userSlice";
import { useEffect, useState } from "react";

type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "Login">;
const LoginPage = ({ navigation }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isLoading, error } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  //kullanıcı daha once giriş yaptıysa kontrol et ve otomatik giriş yap
  useEffect(() => {
    dispatch(autoLogin());
  }, []);
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
        handleOnChangeText={(text) => setEmail(text.toLowerCase())}
        handleValue={email ?? ""}
        handlePlaceHolder={"Enter Your Email"}
      />

      <CustomTextInput
        title="Password"
        isSecureText={true}
        handleOnChangeText={(password) => setPassword(password)}
        handleValue={password ?? ""}
        handlePlaceHolder={"Enter Your Password"}
      />
      <Text>
        {typeof error === "string" ? error : ""}
      </Text>
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
    height: 100,
    width: 100,
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
