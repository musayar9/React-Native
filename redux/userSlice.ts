import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAuth, signInWithEmailAndPassword, User } from "firebase/auth";


interface FirebaseUserWithToken extends User {
  stsTokenManager: {
    accessToken: string;
  };
}

 export const login = createAsyncThunk(
  "user/login",
  async ({ username, password }: { username: string; password: string  }) => {
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        username,
        password
      );

       const user = userCredential.user as FirebaseUserWithToken;
       const token = user.stsTokenManager.accessToken;

      const userData = {
        token,
        user: user,
      };

      return userData;
    } catch (error) {
      console.log("user slice 21 line", error);
      throw error;
    }
  }
);

interface initialStateType {
  email: null | string;
  password: null | string;
  isLoading: boolean;
  isAuth: boolean;
  token: null | string;
  user: null | User;
  error: null | string | undefined;
}

const initialState: initialStateType = {
  email: "",
  password: "",
  isLoading: false,
  isAuth: false,
  token: null,
  user: null,
  error: null,
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
    
  },

  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isAuth = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        (state.isLoading = false), (state.isAuth = true);
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        (state.isAuth = false), (state.isLoading = false);
        state.error = action.error.message;
      });
  },
});

export const { setEmail, setPassword, setIsLoading } =
  userSlice.actions;

export default userSlice.reducer;
