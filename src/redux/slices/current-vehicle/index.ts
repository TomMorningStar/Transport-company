import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IVehicleUpdate, SerializableLatLng } from '../vehicles/types';
import { type ICurrentVehicleState } from './types';

const initialState: ICurrentVehicleState = {
  currentVehicle: null,
};

const SLICE_NAME = 'current-vehicle';

const currentVehicleSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    setCurrentVehicle(state, action: PayloadAction<IVehicleUpdate | null>) {
      if (action.payload === null) {
        state.currentVehicle = null;
      } else {
        state.currentVehicle = action.payload;
      }
    },
    setEndPosition(state, action: PayloadAction<SerializableLatLng>) {
      if (state.currentVehicle) {
        state.currentVehicle = { ...state.currentVehicle, endPosition: action.payload };
      }
    },
    setCompleteVehiclePath(state, action: PayloadAction<SerializableLatLng>) {
      if (state.currentVehicle) {
        state.currentVehicle = {
          ...state.currentVehicle,
          startPosition: action.payload,
        };
      }
    },
  },
});

export const { setCurrentVehicle, setEndPosition, setCompleteVehiclePath } =
  currentVehicleSlice.actions;

export const selectCurrentVehicleState = (state: { currentVehicle: ICurrentVehicleState }) =>
  state.currentVehicle.currentVehicle;

export default currentVehicleSlice.reducer;
