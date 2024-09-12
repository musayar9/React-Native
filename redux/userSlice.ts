import { createSlice } from "@reduxjs/toolkit";

interface initialStateType {
  email: null | string;
  password: null | string;
  isLoading: boolean;
}

const initialState: initialStateType = {
  email: null,
  password: null,
  isLoading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const {setEmail, setPassword, setIsLoading} = userSlice.actions;

export default userSlice.reducer;
