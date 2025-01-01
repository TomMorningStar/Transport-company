import React from 'react';

import { useAppDispatch } from '@redux/hooks';
import { setCurrentVehicle } from '@redux/slices/current-vehicle';
import { Link } from 'react-router-dom';

import s from './Header.module.scss';

interface Props {
  className?: string;
}

const TITLE = 'Детальная информация';
const BACK_BUTTON = 'Back';

export const Header: React.FC<Props> = ({ className }) => {
  const dispatch = useAppDispatch();

  return (
    <header className={`${s.header} ${className}`}>
      <h1 className={s.title}>{TITLE}</h1>
      <Link onClick={() => dispatch(setCurrentVehicle(null))} to={'/'} className={s.back}>
        {BACK_BUTTON}
      </Link>
    </header>
  );
};
