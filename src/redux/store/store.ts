import { configureStore } from '@reduxjs/toolkit';
import objectReducer from '../slices/object';
import currentVehicleSlice from '../slices/current-vehicle';
import objectsReducer from '../slices/objects';
import vehiclesSlice from '../slices/vehicles';

export const store = configureStore({
  reducer: {
    objects: objectsReducer,
    object: objectReducer,
    vehicles: vehiclesSlice,
    currentVehicle: currentVehicleSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
