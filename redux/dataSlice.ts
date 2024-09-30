import { db } from "@/firebaseConfig";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDoc, collection, getDocs } from "firebase/firestore";
export interface LessonData {
  id: string;
  content: string;

}
export const getAllData = createAsyncThunk("data/getData", async () => {
  const fetchedData: LessonData[] = []; // Geçici bir dizi oluştur
  try {
    const querySnapshot = await getDocs(collection(db, "todoList"));

    querySnapshot.forEach((doc) => {
      fetchedData.push({ id: doc.id, ...doc.data() } as LessonData); // Diziyi doldur
    });

    return fetchedData;
  } catch (error) {
    throw error;
  }
});

export const saveData = createAsyncThunk(
  "data/saveData",
  async ({ userInput }: { userInput: string | undefined }) => {
    try {
      const docRef = await addDoc(collection(db, "todoList"), {
        content: userInput,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
      throw e;
    }
  }
);

type DataInitialState = {
  data: LessonData[] | null;
  isLoading: boolean;
  error: null | unknown;
  userInput: undefined | string;
  isSaved:boolean
};

const initialState: DataInitialState = {
  data: [],
  isLoading: false,
  error: null,
  userInput: "",
  isSaved:false
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setUserInput: (state, action) => {
      state.userInput = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllData.fulfilled, (state, action) => {
        (state.isLoading = false), (state.data = action.payload);
      })
      .addCase(getAllData.rejected, (state, action) => {
        (state.isLoading = false), (state.error = action.payload);
      })
      .addCase(saveData.pending, (state)=>{
      
      state.isLoading=false
      })
      .addCase(saveData.fulfilled, (state)=>{
        state.isLoading=false,
        state.isSaved=!state.isSaved
        state.userInput=""
      })
      .addCase(saveData.rejected, (state,action)=>{
        state.isLoading = false
        state.error= action.payload
      })
  },
});
export const { setUserInput } = dataSlice.actions;
export default dataSlice.reducer;
