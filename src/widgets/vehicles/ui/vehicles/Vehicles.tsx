import React from 'react';

import { CurrentVehicle } from '../curren-vehicle/CurrentVehicle';
import { VehicleItem } from '../vehicle-item/VehicleItem';

import { IVehicleUpdate } from '@redux/slices/vehicles/types';

import s from './Vehicles.module.scss';

interface Props {
  className?: string;
  vehicles: IVehicleUpdate[];
  currentVehicle: IVehicleUpdate | null;
  loading: boolean;
  error: string;
}

const VEHICLE_LIST_TITLE =
  'Список всех доступных транспортных средств. Выберите нужное транспортное средство из списка или по клику на карте кликнув на иконку с нужным транспортным средством';

const LOADING = 'Загрузка...';

export const Vehicles: React.FC<Props> = (props) => {
  const { className, vehicles, currentVehicle, loading, error } = props;

  return (
    <section className={className}>
      <h3>{VEHICLE_LIST_TITLE}</h3>

      {loading && <h1>{LOADING}</h1>}

      {error && <h1>{error}</h1>}

      {!error && (
        <div className={s.wrapper}>
          {currentVehicle && <CurrentVehicle currentVehicle={currentVehicle} />}

          <ul className={s.list}>
            {vehicles.map((vehicle) => (
              <VehicleItem key={vehicle.id} vehicle={vehicle} />
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};
