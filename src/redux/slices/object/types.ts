import { type IObjectItem, type IState } from '@root/types';

export interface IObjectState extends IState {
  data: IObjectItem | null;
}
