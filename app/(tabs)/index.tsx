import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import RootNavigation from "@/navigation/RootNavigation";
import  "@/firebaseConfig";
type HomeScreenProps = {
  Login: undefined;
  SignUp: undefined;
};

const Stack = createNativeStackNavigator<HomeScreenProps>();
const HomeScreen = () => {
  return (
    <GestureHandlerRootView>
      <Provider store={store}>
        {/* <NavigationContainer independent={true}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginPage} />
          <Stack.Screen name="SignUp" component={SignUpPage} />
        </Stack.Navigator>
      </NavigationContainer> */}
        <RootNavigation />
      </Provider>
    </GestureHandlerRootView>
  );
};

export default HomeScreen;
