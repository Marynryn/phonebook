import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { logOut, login, refreshUser, userPost } from './operations.js';

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  isLoading: false,
  error: null,
};

const myAuth = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(userPost.pending, (state, action) => {
        console.log(state, action);
        state.isLoading = true;
      })
      .addCase(userPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(userPost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(logOut.fulfilled, state => {
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(refreshUser.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, state => {
        state.isRefreshing = false;
      });
  },
});

const persistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

export const persistedReducer = persistReducer(persistConfig, myAuth.reducer);
//   {
//   "_id": {
//     "$oid": "65f74ab8d538f7c5850d6548"
//   },
//   "name": "Марина",
//   "password": "$2a$10$8c3EqZtI2zZNbsZloUWcrO9prH1btQduc5.CiIT84Ah.vdB4dQlre",
//   "email": "bonbuketkyiv@gmail.com",
//   "subscription": "starter",
//   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1Zjc0YWI4ZDUzOGY3YzU4NTBkNjU0OCIsImlhdCI6MTcxMDcwNTMzNiwiZXhwIjoxNzEwNzIzMzM2fQ.nuq7BY2zK4V-99aT3s6V-0275vbhhqS9hu4OMlJM1wE",
//   "verify": true,
//   "verificationToken": "",
//   "avatarURL": "https://www.gravatar.com/avatar/871799c4097403a87a8f13c3054427f4.jpeg?d=identicon"
// }
