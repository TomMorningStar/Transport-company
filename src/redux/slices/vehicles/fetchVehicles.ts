import { createAsyncThunk } from '@reduxjs/toolkit';
import { SOCKET_API, TIMEOUT_CONFIG } from '@root/socketApi';
import { IErrorResponse, IStatus } from '@root/types';
import { IVehicle, IVehicleUpdate } from './types';

import { RootState } from '@redux/store/store';
import { socket } from '../../../socket';

interface ISuccessResponse extends IStatus {
  data: {
    vehicles: IVehicle[];
  };
}

const OBJECT_NOT_FOUND = 'Объект не найден';

export const fetchVehicles = createAsyncThunk(
  `${SOCKET_API.VEHICLES}/fetch-${SOCKET_API.VEHICLES}`,

  async (_, { rejectWithValue, getState }) => {
    return new Promise<IVehicleUpdate[]>((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        reject(rejectWithValue(TIMEOUT_CONFIG.MESSAGE));
      }, TIMEOUT_CONFIG.TIME);

      const state = getState() as RootState;

      socket.emit(SOCKET_API.VEHICLES, (res: ISuccessResponse | IErrorResponse) => {
        clearTimeout(timeoutId);

        if (res.status === 200 && 'data' in res) {
          const currentObject = state.object.data;

          const updateVehicles = currentObject
            ? res.data.vehicles
                .map((vehicle) => ({
                  ...vehicle,
                  startPosition: currentObject?.boundary[0],
                  endPosition: currentObject?.boundary[0],
                }))
                .filter((vehicle) => vehicle.id !== currentObject?.id)
            : res.data.vehicles;

          if (currentObject) {
            resolve(updateVehicles as IVehicleUpdate[]);
          } else {
            reject(rejectWithValue(OBJECT_NOT_FOUND));
          }
        } else if (res.status !== 200 && 'message' in res) {
          reject(res.message);
        }
      });
    });
  }
);
