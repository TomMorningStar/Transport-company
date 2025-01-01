import React from 'react';

import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { selectVehiclesState } from '@redux/slices/vehicles';
import { useParams } from 'react-router-dom';

import { selectCurrentVehicleState } from '@redux/slices/current-vehicle';
import { selectObjectState } from '@redux/slices/object';
import { fetchObject } from '@redux/slices/object/fetchObject';
import { fetchVehicles } from '@redux/slices/vehicles/fetchVehicles';
import { Header } from '@widgets/header';
import { Map } from '@widgets/map';
import { Vehicles } from '@widgets/vehicles';

const LOADING = 'Загрузка...';

export const Detail = () => {
  const { id } = useParams();

  const {
    data: object,
    loading: objectLoading,
    error: objectError,
  } = useAppSelector(selectObjectState);

  const {
    data: vehicles,
    loading: vehiclesLoading,
    error: vehiclesError,
  } = useAppSelector(selectVehiclesState);

  const currentVehicle = useAppSelector(selectCurrentVehicleState);

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchObject(Number(id)));
  }, [dispatch, id]);

  React.useEffect(() => {
    if (!object) return;
    dispatch(fetchVehicles());
  }, [dispatch, id, object]);

  if (objectError) return <h1>{objectError}</h1>;

  return (
    <main>
      <Header />
      <section>
        {object && (
          <Vehicles
            loading={vehiclesLoading}
            error={vehiclesError}
            currentVehicle={currentVehicle}
            vehicles={vehicles}
          />
        )}
        {objectLoading && <h1>{LOADING}</h1>}
        {!objectLoading && (
          <Map object={object} vehicles={vehicles} currentVehicle={currentVehicle} />
        )}
      </section>
    </main>
  );
};
