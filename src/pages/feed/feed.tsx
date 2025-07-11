import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import {
  feedsItems,
  feedsListThunk,
  feedsIsLoading
} from '../../services/slices/feedsSlice';

export const Feed: FC = () => {
  const orders = useSelector(feedsItems);
  const ordersLoading = useSelector(feedsIsLoading);
  const dispatch = useDispatch();

  if (!orders.length || ordersLoading) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(feedsListThunk());
      }}
    />
  );
};
