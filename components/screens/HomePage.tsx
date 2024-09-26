import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firebaseConfig";
import CustomButton from "../CustomButton";
import { TextInput } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/userSlice";
import { useAppDispatch } from "@/redux/hooks";

interface LessonData {
  id: string; // Belgenin ID'si
  first: string;
  last: string;
  lesson: number;
  content: string;
}
const HomePage = () => {
  const [data, setData] = useState<LessonData[]>([]);
  const [isSave, setIsSave] = useState(false);
  const [updateTheData, setUpdateTheData] = useState("");
  const dispatch = useAppDispatch();
  console.log(data);

  useEffect(() => {
    getData();
  }, [isSave]);

  // SEND DATA TO FIREBASE
  const sendData = async () => {
    try {
      const docRef = await addDoc(collection(db, "reactNativeLesson"), {
        first: "Learn React Native",
        last: "React Native tutorial for Beginner",
        lesson: 111,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  // GET DATA FROM FIREBASE
  const getData = async () => {
    const fetchedData: LessonData[] = []; // Geçici bir dizi oluştur
    try {
      const querySnapshot = await getDocs(collection(db, "reactNativeLesson"));

      querySnapshot.forEach((doc) => {
        fetchedData.push({ id: doc.id, ...doc.data() } as LessonData); // Diziyi doldur
        // setData([...data, doc.data()])
      });

      setData(fetchedData);
    } catch (error) {
      console.log("error", error);
    }
  };

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
  return (
    <View style={styles.container}>
      <TextInput
        value={updateTheData}
        onChangeText={setUpdateTheData}
        placeholder="Update th data"
        style={{
          borderWidth: 1,
          width: "50%",
          paddingVertical: 10,
          textAlign: "center",
          marginBottom: 30,
        }}
      />

      <Text style={styles.head}>HomePage Pagee</Text>
      {data.map((item) => (
        <Pressable
          onPress={() => {
            updateData(item.id), setIsSave(!isSave);
          }}
          style={styles.dataContainer}
          key={item.id}
        >
          <Text>{item?.id}</Text>
          <Text>{item?.first}</Text>
          <Text>{item?.lesson}</Text>
          <Text>{item?.last}</Text>
          <Text>{item?.content}</Text>
        </Pressable>
      ))}
      <CustomButton
        buttonText="Send Data"
        buttonColor="blue"
        pressedButtonColor="gray"
        handleOnPress={() => {
          sendData(), setIsSave(!isSave);
        }}
      />
      <CustomButton
        buttonText="Get Data"
        buttonColor="#007bff"
        pressedButtonColor="gray"
        handleOnPress={getData}
      />

      <CustomButton
        buttonText="Delete Data"
        buttonColor="red"
        pressedButtonColor="gray"
        handleOnPress={() => deleteData("2")}
      />

      <CustomButton
        buttonText="Update Data"
        buttonColor="#0022aa55"
        pressedButtonColor="gray"
        handleOnPress={() => updateData("2")}
      />

      <CustomButton
        buttonText="Logout"
        buttonColor="purple"
        pressedButtonColor="gray"
        handleOnPress={handleLogout}
      />
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4b0097",
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
});
