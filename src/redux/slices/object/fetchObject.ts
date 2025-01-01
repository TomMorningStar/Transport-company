import { createAsyncThunk } from '@reduxjs/toolkit';
import { SOCKET_API, TIMEOUT_CONFIG } from '@root/socketApi';
import { IErrorResponse, IObjectItem, IStatus } from '@root/types';

import { socket } from '../../../socket';

interface ISuccessResponse extends IStatus {
  data: {
    object: IObjectItem;
  };
}

export const fetchObject = createAsyncThunk(
  `${SOCKET_API.OBJECT}/fetch-${SOCKET_API.OBJECT}`,
  async (id: number, { rejectWithValue }) => {
    return new Promise<IObjectItem>((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        reject(rejectWithValue(TIMEOUT_CONFIG.MESSAGE));
      }, TIMEOUT_CONFIG.TIME);

      socket.emit(SOCKET_API.OBJECT, { id }, (res: ISuccessResponse | IErrorResponse) => {
        clearTimeout(timeoutId);

        if (res.status === 200 && 'data' in res) {
          resolve(res.data.object);
        } else if (res.status !== 200 && 'message' in res) {
          reject(rejectWithValue(res.message));
        }
      });
    });
  }
);
