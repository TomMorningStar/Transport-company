import { createSlice } from '@reduxjs/toolkit';
import { SOCKET_API } from '@root/socketApi';
import { fetchVehicles } from './fetchVehicles';
import { type IVehiclesState } from './types';

const initialState: IVehiclesState = {
  data: [],
  loading: false,
  error: '',
};

const vehiclesSlice = createSlice({
  name: SOCKET_API.VEHICLES,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVehicles.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchVehicles.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchVehicles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const selectVehiclesState = (state: { vehicles: IVehiclesState }) => state.vehicles;

export default vehiclesSlice.reducer;
