import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SOCKET_API } from '@root/socketApi';
import { type IObjectItem } from '@root/types';
import { fetchObjects } from './fetchObjects';
import { IObjectsState } from './types';

const initialState: IObjectsState = {
  data: [],
  loading: false,
  error: '',
};

const objectsSlice = createSlice({
  name: SOCKET_API.OBJECTS,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchObjects.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchObjects.fulfilled, (state, action: PayloadAction<IObjectItem[]>) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchObjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch objects';
      });
  },
});

export const selectObjectsState = (state: { objects: IObjectsState }) => state.objects;

export default objectsSlice.reducer;
