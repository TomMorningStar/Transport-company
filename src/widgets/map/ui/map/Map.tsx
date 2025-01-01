import React from 'react';

import { MapContainer, Rectangle, TileLayer } from 'react-leaflet';

import { IVehicleUpdate } from '@redux/slices/vehicles/types';
import { updateRoute } from '@utils/map/updateRoute';

import { LocationMarker } from '../locationMarker/LocationMarker';
import { ObjectMarker } from '../object-marker/ObjectMarker';
import { VehiclesMarker } from '../vehicles-marker/VehiclesMarker';

import L from 'leaflet';

import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

import { IObjectItem } from '@root/types';

import s from './Map.module.scss';
interface Props {
  className?: string;
  vehicles: IVehicleUpdate[];
  currentVehicle: IVehicleUpdate | null;
  object: IObjectItem | null;
}

const OBJECT_NAME = 'Название объекта';
const OBJECT_NOT_FOUND = 'Объект не найден';

const RECTANGLE_COLOR = '#2c2c2c';
const RECTANGLE_WIDTH = 1;

export const Map: React.FC<Props> = (props) => {
  const { className, vehicles, object, currentVehicle } = props;

  const mapRef = React.useRef<L.Map | null>(null);
  const routingMachineRef = React.useRef<L.Routing.Control | null>(null);

  const boundaryCoordinates = React.useMemo(() => {
    if (!object) return [];
    return object.boundary.map(({ lat, lng }) => [lat, lng] as [number, number]);
  }, [object]);

  React.useEffect(() => {
    if (!mapRef.current || !currentVehicle?.startPosition || !currentVehicle?.endPosition) return;
    updateRoute(mapRef, routingMachineRef, currentVehicle);
  }, [currentVehicle]);

  return (
    <React.Fragment>
      <div>
        <h2 className={s.title}>
          {OBJECT_NAME} - {(object && object.name) || OBJECT_NOT_FOUND}
        </h2>
      </div>
      <div className={`${className} ${s.map}`}>
        <MapContainer
          style={{ height: '100%', width: '100%' }}
          center={boundaryCoordinates[0] || [55.655334, 37.726278]}
          zoom={14}
          scrollWheelZoom={false}
          // @ts-expect-error next-line
          whenReady={(mapInstance: { target: L.Map | null }) =>
            (mapRef.current = mapInstance.target)
          }
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {object && (
            <>
              {boundaryCoordinates[0] && object && (
                <ObjectMarker boundaryCoordinates={boundaryCoordinates || []} name={object.name} />
              )}

              <Rectangle
                bounds={boundaryCoordinates || []}
                pathOptions={{ color: RECTANGLE_COLOR, weight: RECTANGLE_WIDTH }}
              />

              {vehicles.map((vehicle) => {
                return (
                  <VehiclesMarker
                    key={vehicle.id}
                    vehicle={vehicle}
                    boundaryCoordinates={boundaryCoordinates}
                    currentVehicle={currentVehicle}
                  />
                );
              })}
              <LocationMarker
                currentVehicle={currentVehicle}
                boundaryCoordinates={object.boundary}
              />
            </>
          )}
        </MapContainer>
      </div>
    </React.Fragment>
  );
};
