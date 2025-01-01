import { LatLng } from 'leaflet';

export type IObjectItem = { id: number; name: string; boundary: LatLng[] };

export interface IState {
  loading: boolean;
  error: string;
}

export interface IStatus {
  status: number;
}

export interface IErrorResponse extends IStatus {
  message: string;
}
