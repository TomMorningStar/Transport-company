import React from 'react';

import { Link } from 'react-router-dom';
import { IObjectItem } from '@root/types';

import s from './ObjectList.module.scss';
interface Props {
  className?: string;
  data: IObjectItem[];
  loading: boolean;
  error: string;
}

const LOADING = 'Загрузка...';

export const ObjectList: React.FC<Props> = (props) => {
  const { className, data, loading, error } = props;

  if (error) return <div>{error}</div>;
  if (loading) return <div>{LOADING}</div>;

  return (
    <ul className={`${className} ${s.list}`}>
      {data.map((object) => (
        <li key={object.id}>
          <Link className={s.item} to={`/detail/${object.id}`}>
            <h3>{object.name}</h3>
            <ul>
              {object.boundary.map((point, idx) => (
                <li key={idx}>
                  {point.lat}, {point.lng}
                </li>
              ))}
            </ul>
          </Link>
        </li>
      ))}
    </ul>
  );
};
