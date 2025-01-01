import { IState } from '@root/types';

export interface SerializableLatLng {
  lat: number;
  lng: number;
}

export interface IVehicle {
  id: number;
  name: string;
  objectId: number;
}

export interface IVehicleUpdate extends IVehicle {
  startPosition: SerializableLatLng;
  endPosition: SerializableLatLng;
}

export interface IVehiclesState extends IState {
  data: IVehicleUpdate[];
}
