import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, postContact, deleteContact } from './operations';

const mySlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: {
      items: [],
      isLoading: false,
      error: null,
    },
    filter: '',
  },
  reducers: {
    addFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, (state, action) => {
        state.contacts.isLoading = true;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        state.error = null;
        state.contacts.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.contacts.isLoading = false;
        state.error = action.payload;
      })
      .addCase(postContact.pending, (state, action) => {
        state.contacts.isLoading = true;
      })
      .addCase(postContact.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        state.error = null;
        state.contacts.items.push(action.payload);
      })
      .addCase(postContact.rejected, (state, action) => {
        state.contacts.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteContact.pending, (state, action) => {
        state.contacts.isLoading = true;
      })
      .addCase(deleteContact.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.contacts.isLoading = false;
        state.error = null;
        state.contacts.items = state.contacts.items.filter(
          el => el._id !== payload
        );
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const contactsReducer = mySlice.reducer;
export const { addFilter } = mySlice.actions;
