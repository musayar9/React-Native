import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthStack";
import UserStack from "./UserStack";
import { useAppSelector } from "@/redux/hooks";
import app from "@/firebaseConfig";

const RootNavigation = () => {

const {isAuth} = useAppSelector((state)=>state.user)
  // const isAuth = false;

  return (
    <NavigationContainer independent={true}>
      {!isAuth ? <AuthStack /> : <UserStack />}
    </NavigationContainer>
  );
};

export default RootNavigation;

const styles = StyleSheet.create({});
