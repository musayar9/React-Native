import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
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
interface LessonData {
  id: string; // Belgenin ID'si
  first: string;
  last: string;
  lesson: number;
}
const HomePage = () => {
  const [data, setData] = useState<LessonData[]>([]);
  console.log(data);
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
  const deleteData = async () => {
    await deleteDoc(doc(db, "reactNativeLesson", "1pEYPe9TKhYJjk2mrCkk"));
  };

  // update data from fırebase

  const updateData = async () => {
    try {
      const lessonData = doc(db, "reactNativeLesson", "EKUTmti6L3bIadq1M51b");

      // Set the "capital" field of the city 'DC'
      await updateDoc(lessonData, {
        lesson: 145,
      });
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.head}>HomePage Page</Text>
      {data.map((item) => (
        <View key={item.id}>
          <Text>{item?.first}</Text>
          <Text>{item?.lesson}</Text>
          <Text>{item?.last}</Text>
        </View>
      ))}
      <CustomButton
        buttonText="Send Data"
        buttonColor="blue"
        pressedButtonColor="gray"
        handleOnPress={sendData}
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
        handleOnPress={deleteData}
      />

      <CustomButton
        buttonText="Update Data"
        buttonColor="#0022aa55"
        pressedButtonColor="gray"
        handleOnPress={updateData}
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
});
