import React from 'react';

import { useAppDispatch } from '@redux/hooks';
import { startNavigate } from '@services/startNavigate';

import { IVehicleUpdate } from '@redux/slices/vehicles/types';

import s from './CurrentVehicle.module.scss';

interface Props {
  className?: string;
  currentVehicle: IVehicleUpdate;
}

const DETAIL_INFO = {
  id: 'Идентификатор транспорта',
  name: 'Название транспорта',
  objectId: 'Идентификатор объекта',
  startPosition: 'Начальная позиция',
  endPosition: 'Конечная позиция',
};

const CURRENT_VEHICLE = 'Текущий транспорт';
const START_NAVIGATE = 'В путь!';

export const CurrentVehicle: React.FC<Props> = (props) => {
  const { className, currentVehicle } = props;

  const dispatch = useAppDispatch();

  return (
    <div className={`${className} ${s.currentItem}`}>
      <p className={s.title}>{CURRENT_VEHICLE}</p>
      <div className={s.wrapper}>
        <p className={s.paragraph}>
          {DETAIL_INFO.id} - <b>{currentVehicle.id}</b>
        </p>
        <p className={s.paragraph}>
          {DETAIL_INFO.name} - <b>{currentVehicle.name}</b>
        </p>
        <p className={s.paragraph}>
          {DETAIL_INFO.objectId} - <b>{currentVehicle.objectId}</b>
        </p>
        <p className={s.paragraph}>
          {DETAIL_INFO.startPosition} -{' '}
          <b>
            {currentVehicle.startPosition.lat} {currentVehicle.startPosition.lng}
          </b>
        </p>

        <p className={s.paragraph}>
          {DETAIL_INFO.endPosition} -{' '}
          <b>
            {currentVehicle.endPosition.lat} {currentVehicle.endPosition.lng}
          </b>
        </p>
        <button onClick={() => startNavigate(currentVehicle, dispatch)} className={s.button}>
          <b>{START_NAVIGATE}</b>
        </button>
      </div>
    </div>
  );
};
