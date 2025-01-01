import { IVehicleUpdate } from '@redux/slices/vehicles/types';
import { Dispatch, UnknownAction } from '@reduxjs/toolkit';
import { LatLng } from 'leaflet';
import { setCompleteVehiclePath } from '../redux/slices/current-vehicle';
import { socket } from '../socket';

export const startNavigate = (
  currentVehicle: IVehicleUpdate,
  dispatch: Dispatch<UnknownAction>
) => {
  if (
    currentVehicle.startPosition.lat === currentVehicle.endPosition.lat &&
    currentVehicle.startPosition.lng === currentVehicle.endPosition.lng
  )
    return;

  socket.emit(
    'start_navigate',
    { id: currentVehicle.id, path: [currentVehicle.startPosition, currentVehicle.endPosition] },
    (data: { status: number; text: string }) => {
      console.log(data);
    }
  );

  socket.off('online');

  socket.on('online', (data: { vehicleId: number; location: LatLng }) => {
    console.log(data);
    dispatch(setCompleteVehiclePath(data.location));
  });
};
