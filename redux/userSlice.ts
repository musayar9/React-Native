import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth"




interface initialStateType {
  email: null | string;
  password: null | string;
  isLoading: boolean;
  isAuth: boolean;
  users: {
    userEmail: string;
    userPassword: string;
  };
}

const initialState: initialStateType = {
  email: "",
  password: "",
  isLoading: false,
  isAuth: false,
  users: {
    userEmail: "test@test.com",
    userPassword: "123456",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setEmail: (state, action) => {
      const lowerCaseEmail = action.payload.toLowerCase();
      state.email = lowerCaseEmail;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setLogin: (state) => {
      if (
        (state.email = state.users.userEmail) &&
        state.password === state.users.userPassword
      ) {
      
      console.log(true)
      state.isAuth = true
      }else{
      console.log(false)
      }
    },
  },
});

export const { setEmail, setPassword, setIsLoading, setLogin } = userSlice.actions;

export default userSlice.reducer;
