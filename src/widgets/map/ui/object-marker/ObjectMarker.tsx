import React from 'react';
import { Marker, Popup } from 'react-leaflet';

interface Props {
  boundaryCoordinates: [number, number][];
  name: string;
}

export const OBJECT_NAME = 'Объект';

export const ObjectMarker: React.FC<Props> = ({ boundaryCoordinates, name }) => {
  return (
    <Marker position={boundaryCoordinates[0]}>
      <Popup>
        {OBJECT_NAME} - {name}
        <br />
        {boundaryCoordinates.map(
          ([lat, lng], idx) =>
            `(${lat}, ${lng})${idx !== boundaryCoordinates.length - 1 ? ', ' : ''}`
        )}
      </Popup>
    </Marker>
  );
};
