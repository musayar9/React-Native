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
// Stack Navigator için olası rota isimlerini tanımlıyoruz
type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "Login">;
const LoginPage = ({ navigation }:Props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  console.log(firstName);
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/login.png")}
        style={styles.image}
      />

      <Text style={styles.welcome}>Login {result}</Text>

      <Text>Email</Text>
      <TextInput
        inputMode="email"
        style={styles.textInputStyles}
        placeholder="Enter Your Email"
        value={firstName}
        /**onChangeText için de birden fazla yapı tanımlayacak isek aşağıdaki gibi tanımlamamız gerekiyor */
        onChangeText={(value) => setFirstName(value)}
      />
      <Text>Password</Text>
      <TextInput
        secureTextEntry={true}
        style={styles.textInputStyles}
        placeholder="Enter Your Password"
        value={lastName}
        /**onChnageText içinde sadece bir yapı var ise sadece ismini yazmamız yeterli */
        onChangeText={setLastName}
      />

      <Pressable
        onPress={() => setIsLoading(true)}
        style={({ pressed }) => [
          { backgroundColor: pressed ? "#007bff" : "lightblue" },
          styles.button,
        ]}
      >
        <Text style={styles.buttonText}>Save</Text>
      </Pressable>

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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  textInputStyles: {
    borderWidth: 1,
    width: "80%",
    height: 50,
    borderRadius: 10,
    marginVertical: 10,
    textAlign: "center",
  },

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
  image: {
    height: 150,
    width: 150,
  },

  welcome: {
    fontSize: 22,
    fontWeight: "bold",
  },
  signText: {
    marginTop: 5,
    color: "#007bff",
    fontSize: 16,
    position: "absolute",
    left: 80,
  },
});
