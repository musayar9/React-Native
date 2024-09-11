import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginPage, SignUpPage } from "@/components/screens";
type HomeScreenProps = {
  Login: undefined;
  SignUp: undefined;
};

const Stack = createNativeStackNavigator<HomeScreenProps>();
const HomeScreen = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="SignUp" component={SignUpPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default HomeScreen;
