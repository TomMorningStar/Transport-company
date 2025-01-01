import React from 'react';

import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { selectObjectsState } from '@redux/slices/objects';
import { fetchObjects } from '@redux/slices/objects/fetchObjects';
import { ObjectList } from '@widgets/objects';

const TITLE = 'Список объектов';

export const Home = () => {
  const { data, error, loading } = useAppSelector(selectObjectsState);

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchObjects());
  }, [dispatch]);

  return (
    <main>
      <h1 style={{ margin: 0 }}>{TITLE}</h1>
      <ObjectList data={data} error={error} loading={loading} />
    </main>
  );
};
