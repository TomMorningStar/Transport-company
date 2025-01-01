import React from 'react';

import { useAppDispatch } from '@redux/hooks';
import { setEndPosition } from '@redux/slices/current-vehicle';
import { IVehicleUpdate, SerializableLatLng } from '@redux/slices/vehicles/types';
import { LatLng, latLngBounds } from 'leaflet';
import { Marker, Popup, useMapEvents } from 'react-leaflet';

interface Props {
  boundaryCoordinates: LatLng[];
  currentVehicle: IVehicleUpdate | null;
}

const PATH_ERROR = {
  NOT_FOUND_VEHICLE: 'Не выбрана техника',
  BOUNDARY_ERROR: 'Координаты вне границ или не выбрана техника',
};

export const LocationMarker: React.FC<Props> = (props) => {
  const { boundaryCoordinates, currentVehicle } = props;

  const [position, setPosition] = React.useState<null | SerializableLatLng>(null);
  const bounds = latLngBounds(boundaryCoordinates);

  const dispatch = useAppDispatch();

  useMapEvents({
    click(e) {
      if (!currentVehicle) {
        console.log(PATH_ERROR.NOT_FOUND_VEHICLE);
        return;
      } else if (!bounds.contains(e.latlng)) {
        console.log(PATH_ERROR.BOUNDARY_ERROR);
        return;
      } else {
        setPosition(e.latlng);
      }
    },
  });

  React.useEffect(() => {
    if (position) dispatch(setEndPosition({ lat: position.lat, lng: position.lng }));
  }, [dispatch, position]);

  return position === null ? null : (
    <Marker position={position}>
      <Popup>
        <div>
          <p>Latitude: {position.lat}</p>
          <p>Longitude: {position.lng}</p>
        </div>
      </Popup>
    </Marker>
  );
};
