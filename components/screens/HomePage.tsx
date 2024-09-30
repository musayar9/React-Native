import {
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import Animated, {
  BounceIn,
  BounceOut,
  PinwheelIn,
  useSharedValue,
} from "react-native-reanimated";
import { db } from "@/firebaseConfig";
import CustomButton from "../CustomButton";
import { TextInput } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Entypo from "@expo/vector-icons/Entypo";
import {
  getAllData,
  LessonData,
  setUserInput,
  saveData,
} from "@/redux/dataSlice";

const HomePage = () => {
  const { data, isLoading, userInput, isSaved } = useAppSelector((state) => state.data);
  // const [data, setData] = useState<LessonData[]>([]);
  const [isSave, setIsSave] = useState(false);
  const [updateTheData, setUpdateTheData] = useState("");
  const dispatch = useAppDispatch();
  console.log(data);

  // useEffect(() => {
  //   getData();
  // }, [isSave]);

  useEffect(() => {
    dispatch(getAllData());
  }, [isSaved]);

  // SEND DATA TO FIREBASE

  // GET DATA FROM FIREBASE

  // delete data from database
  const deleteData = async (value: string) => {
    try {
      await deleteDoc(doc(db, "reactNativeLesson", value));
      console.log("delete successfully");
    } catch (error) {
      console.log("delete error", error);
    }
  };

  // update data from fırebase

  const updateData = async (value: string) => {
    try {
      const lessonData = doc(db, "reactNativeLesson", value);

      // Set the "capital" field of the city 'DC'
      await updateDoc(lessonData, {
        content: updateTheData,
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleLogout = () => {
    dispatch(logout);
  };
  
  
  

  const renderItem = ({ item, index }: { item: LessonData; index: number }) => {
    return (
      <Animated.View
        entering={BounceIn.duration(400).delay(100 * (index + 1))}
        exiting={BounceOut}
        style={styles.flatListContainer}
      >
        <Pressable
          style={styles.iconContainer}
          onPress={() => deleteData(item.id)}
        >
          <MaterialIcons name="check-circle" size={24} color="black" />
          <Entypo name="circle" size={24} color="black" />
        </Pressable>

        <View style={styles.itemContainer}>
          <Text>{item.content}</Text>
        </View>
      </Animated.View>
    );
  };

  // const sharedData = useSharedValue<LessonData[]>(data || []);
  if (isLoading) return <View style={styles.loadingContainer}>
  <Text>Loading</Text>
  </View>
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.head}>TODO List</Text>

      <Animated.FlatList
        entering={PinwheelIn}
        data={data || []}
        style={styles.flatList}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />

      {/* <CustomButton
        buttonText="Get Data"
        buttonColor="#007bff"
        pressedButtonColor="gray"
        handleOnPress={getData}
      /> */}
      <View style={styles.userInputContainer}>
        <TextInput
          value={userInput}
          onChangeText={(text) => dispatch(setUserInput(text))}
          placeholder="App Todo"
          style={styles.textInput}
          placeholderTextColor={"white"}
        />
        <CustomButton
          buttonText="Save"
          buttonColor="#007bff"
          pressedButtonColor="gray"
          handleOnPress={() => dispatch(saveData({userInput}))}
          flexValue={1}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4b0097",
    paddingVertical: 10,
  },
  head: {
    color: "#fff",
  },
  dataContainer: {
    gap: 5,
    borderWidth: 1,
    borderColor: "#fff",
    borderStyle: "solid",
    padding: 10,
    borderRadius: 5,
    margin: 5,
  },

  flatListContainer: {
    borderBottomWidth: 0.3,
    borderColor: "#fff",
    borderRadius: 8,
    marginVertical: 5,
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },

  flatList: {
    width: "90%",

    borderRadius: 12,
    padding: 10,
  },

  itemContainer: {
    flex: 5,
    marginLeft: 10,
  },
  itemTitle: {
    fontWeight: "bold",
  },
  iconContainer: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 4,
  },

  textInput: {
    borderWidth: 0.3,
    flex: 3,
    paddingVertical: 10,
    textAlign: "center",
    marginVertical: 10,
    borderRadius: 10,
    borderColor: "#fff",
    color: "#fff",
    marginRight: 5,
  },
  userInputContainer: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingContainer:{
  alignContent:"center",
  justifyContent:"center"
  
  }
});
