import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SOCKET_API } from '@root/socketApi';
import { fetchObject } from './fetchObject';

import { type IObjectItem } from '@root/types';
import { type IObjectState } from './types';

const initialState: IObjectState = {
  data: null,
  loading: false,
  error: '',
};

const objectSlice = createSlice({
  name: SOCKET_API.OBJECT,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchObject.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchObject.fulfilled, (state, action: PayloadAction<IObjectItem>) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchObject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const selectObjectState = (state: { object: IObjectState }) => state.object;

export default objectSlice.reducer;
