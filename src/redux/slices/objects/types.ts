import { type IState, type IObjectItem } from '@root/types';

export interface IObjectsState extends IState {
  data: IObjectItem[];
}
