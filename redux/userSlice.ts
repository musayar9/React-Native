import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { create } from "react-test-renderer";

interface FirebaseUserWithToken extends User {
  stsTokenManager: {
    accessToken: string;
  };
}

export const login = createAsyncThunk(
  "user/login",
  async ({ username, password }: { username: string; password: string }) => {
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

      await AsyncStorage.setItem("userToken", token);

      return userData;
    } catch (error) {
      console.log("user slice 21 line", error);
      throw error;
    }
  }
);

// kullanıcı otomatik giriş işlemleri

export const autoLogin = createAsyncThunk("user/autoLogin", async () => {
  try {
    const token = await AsyncStorage.getItem("userToken");
    console.log("tokne", token);
    if (token) {
      return token;
    } else {
      throw new Error("User Not Found");
    }
  } catch (error) {
    throw error;
  }
});

//kullanıcı çıkış işlemleri

export const logout = createAsyncThunk("user/logout", async () => {
  try {
    const auth = getAuth();
    await signOut(auth);
    await AsyncStorage.removeItem("userToken");
    return null;
  } catch (error) {
    throw error;
  }
});

export const register = createAsyncThunk(
  "user/register",
  async ({ email, password }: { email: string; password: string }) => {
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      console.log("user", user)
       const token = (user as any).stsTokenManager.accessToken; // Hata ile başa çıkmak için 'any' tipi

      await sendEmailVerification(user);
      await AsyncStorage.setItem("userToken", token);

      return token;
    } catch (error) {
      throw error;
    }
  }
);

interface initialStateType {
  isLoading: boolean;
  isAuth: boolean;
  token: null | string;
  user: null | User;
  error: null | string | undefined | unknown;
}

const initialState: initialStateType = {
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
    // setEmail: (state, action) => {
    //   const lowerCaseEmail = action.payload.toLowerCase();
    //   state.email = lowerCaseEmail;
    // },
    // setPassword: (state, action) => {
    //   state.password = action.payload;
    // },
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
      })
      .addCase(autoLogin.pending, (state) => {
        state.isLoading = true;
        state.isAuth = false;
      })
      .addCase(autoLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuth = true;
        state.token = action.payload;
      })
      .addCase(autoLogin.rejected, (state, action) => {
        (state.isLoading = false), (state.isAuth = false);
        state.token = null;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuth = false;
        state.token = null;
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        (state.isLoading = false), (state.error = action.payload);
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.isAuth = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuth = true;
        state.token = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = "Invalid Email Or Password";
      });
  },
});

export const { setIsLoading } = userSlice.actions;

export default userSlice.reducer;
