import { AppDispatch, RootState } from '@redux/store/store';
import { useDispatch, useSelector } from 'react-redux';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: <TSelected>(selector: (state: RootState) => TSelected) => TSelected =
  useSelector;
