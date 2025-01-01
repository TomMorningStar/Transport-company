import React from 'react';

import { useAppDispatch } from '@redux/hooks';
import { setCurrentVehicle } from '@redux/slices/current-vehicle';
import { IVehicleUpdate } from '@redux/slices/vehicles/types';

import s from './VehicleItem.module.scss';

interface Props {
  className?: string;
  vehicle: IVehicleUpdate;
}

const DETAIL_INFO = {
  id: 'Идентификатор',
  name: 'Название',
  objectId: 'Идентификатор объекта',
  startPosition: 'Начальная позиция',
  endPosition: 'Конечная позиция',
};

export const VehicleItem: React.FC<Props> = (props) => {
  const { className, vehicle } = props;

  const dispatch = useAppDispatch();

  return (
    <li
      onClick={() => dispatch(setCurrentVehicle(vehicle))}
      className={`${className} ${s.item}`}
      key={vehicle.id}
    >
      <p className={s.paragraph}>
        {DETAIL_INFO.id} - <b>{vehicle.id}</b>
      </p>
      <p className={s.paragraph}>
        {DETAIL_INFO.name} - <b>{vehicle.name}</b>
      </p>
      <p className={s.paragraph}>
        {DETAIL_INFO.objectId} - <b>{vehicle.objectId}</b>
      </p>
      <p className={s.paragraph}>
        {DETAIL_INFO.startPosition} -{' '}
        <b>
          {vehicle.startPosition.lat} {vehicle.startPosition.lng}
        </b>
      </p>
    </li>
  );
};
