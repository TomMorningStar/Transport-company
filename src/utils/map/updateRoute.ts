import { IVehicleUpdate } from '@redux/slices/vehicles/types';
import L from 'leaflet';

const PATH_COLOR = '#33a7ff';
const PATH_WIDTH = 3;

export const updateRoute = (
  mapRef: React.MutableRefObject<L.Map | null>,
  routingMachineRef: React.MutableRefObject<L.Routing.Control | null>,
  currentVehicle: IVehicleUpdate
) => {
  if (!mapRef.current || !currentVehicle?.startPosition || !currentVehicle?.endPosition) return;

  if (routingMachineRef.current) {
    mapRef.current.removeControl(routingMachineRef.current);
  }

  routingMachineRef.current = L.Routing.control({
    waypoints: [
      L.latLng(currentVehicle.startPosition.lat, currentVehicle.startPosition.lng),
      L.latLng(currentVehicle.endPosition.lat, currentVehicle.endPosition.lng),
    ],
    routeWhileDragging: true,
    lineOptions: {
      styles: [{ color: PATH_COLOR, weight: PATH_WIDTH }],
      extendToWaypoints: true,
      missingRouteTolerance: 0,
    },
  }).addTo(mapRef.current);
};
