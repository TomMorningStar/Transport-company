import { IVehicleUpdate } from '@redux/slices/vehicles/types';
import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { useAppDispatch } from '@redux/hooks';
import { setCurrentVehicle } from '@redux/slices/current-vehicle';
import { getMapIcon } from '@utils/map/getMapIcon';

interface Props {
  boundaryCoordinates: [number, number][];
  vehicle: IVehicleUpdate;
  currentVehicle: IVehicleUpdate | null;
}

const DETAIL_INFO = {
  id: 'Идентификатор транспорта',
  name: 'Название транспорта',
  objectId: 'Идентификатор объекта',
  startPosition: 'Начальная позиция',
};

export const VehiclesMarker: React.FC<Props> = (props) => {
  const { vehicle, boundaryCoordinates, currentVehicle } = props;

  const dispatch = useAppDispatch();

  return (
    <Marker
      position={currentVehicle?.startPosition || boundaryCoordinates[0]}
      icon={getMapIcon(vehicle.name)}
      eventHandlers={{
        click: () => dispatch(setCurrentVehicle(vehicle)),
      }}
    >
      <Popup>
        {DETAIL_INFO.id}: {vehicle.id} <br />
        {DETAIL_INFO.name}: {vehicle.name} <br />
        {DETAIL_INFO.objectId}: {vehicle.objectId} <br />
        {DETAIL_INFO.startPosition}: {vehicle.startPosition.lat} {vehicle.startPosition.lng} <br />
      </Popup>
    </Marker>
  );
};
