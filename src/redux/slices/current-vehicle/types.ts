import { IVehicleUpdate } from '@redux/slices/vehicles/types';

export interface ICurrentVehicleState {
  currentVehicle: IVehicleUpdate | null;
}
