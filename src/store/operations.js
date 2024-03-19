// import * as contactsApi from '../services/api';

import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const api = axios.create({
  baseURL: 'https://goit-node-rest-api-vj6j.onrender.com/api/',
  // baseURL: 'https://localhost:3005/api',
});
// axios.defaults.baseURL = 'http://localhost:3000/api';

const setAuthHeader = token => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  api.defaults.headers.common.Authorization = '';
};

export const userPost = createAsyncThunk(
  'users/register',
  async (credentials, thunkAPI) => {
    try {
      const res = await api.post('users/register', credentials);
      // console.log(res.data);
      // setAuthHeader(res.data.token);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk('users/login', async (user, thunkAPI) => {
  try {
    const res = await api.post('users/login', user);
    // After successful login, add the token to the HTTP header
    setAuthHeader(res.data.token);
    console.log(res.data);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const logOut = createAsyncThunk('users/logout', async (_, thunkAPI) => {
  try {
    const { data } = await api.post('users/logout');

    clearAuthHeader();
    return data;
  } catch (error) {
    console.log('gfhffjf');
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }

    try {
      setAuthHeader(persistedToken);

      const res = await api.get('users/current');
      console.log(res);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAllContacts',
  async (_, thunkAPI) => {
    try {
      const contacts = await api.get('/contacts/');

      return contacts.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const postContact = createAsyncThunk(
  'contacts/postContacts',
  async newContact => {
    try {
      const contact = await api.post('/contacts/', newContact);

      return contact.data;
    } catch (error) {}
  }
);
export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async id => {
    try {
      await api.delete(`/contacts/${id}`);
      console.log(id);
      return id;
    } catch (error) {}
  }
);
