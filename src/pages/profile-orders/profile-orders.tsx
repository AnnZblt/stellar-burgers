import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';

import { useDispatch, useSelector } from '../../services/store';
import {
  ordersListThunk,
  ordersItems,
  ordersIsLoading
} from '../../services/slices/ordersSlice';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(ordersItems);
  const ordersLoading = useSelector(ordersIsLoading);

  useEffect(() => {
    dispatch(ordersListThunk());
  }, [dispatch]);

  if (ordersLoading) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
