import { FC } from 'react';

import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';

import { useSelector } from '../../services/store';
import {
  feedsIsLoading,
  feedsError,
  feedsItems,
  feedsTotal,
  feedsTotalToday
} from '../../services/slices/feedsSlice';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const orders = useSelector(feedsItems);
  const total = useSelector(feedsTotal);
  const totalToday = useSelector(feedsTotalToday);
  const feed = {
    total,
    totalToday
  };

  const readyOrders = orders ? getOrders(orders, 'done') : [];

  const pendingOrders = orders ? getOrders(orders, 'pending') : [];

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
