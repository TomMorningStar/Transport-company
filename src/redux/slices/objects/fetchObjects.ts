import { createAsyncThunk } from '@reduxjs/toolkit';
import { SOCKET_API, TIMEOUT_CONFIG } from '@root/socketApi';
import { IErrorResponse, IObjectItem, IStatus } from '@root/types';

import { socket } from '../../../socket';

interface ISuccessResponse extends IStatus {
  data: {
    objects: IObjectItem[];
  };
}

export const fetchObjects = createAsyncThunk<IObjectItem[], void, { rejectValue: string }>(
  `${SOCKET_API.OBJECTS}/fetch-${SOCKET_API.OBJECTS}`,
  async (_, { rejectWithValue }) => {
    return new Promise<IObjectItem[]>((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        reject(rejectWithValue(TIMEOUT_CONFIG.MESSAGE));
      }, TIMEOUT_CONFIG.TIME);

      socket.emit(SOCKET_API.OBJECTS, (res: ISuccessResponse | IErrorResponse) => {
        clearTimeout(timeoutId);

        if (res.status === 200 && 'data' in res) {
          resolve(res.data.objects);
        } else if (res.status !== 200 && 'message' in res) {
          console.error(res.message);
          reject(rejectWithValue(res.message));
        }
      });
    });
  }
);
