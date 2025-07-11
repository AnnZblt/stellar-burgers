import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';

import { useSelector, useDispatch } from '../../services/store';
import {
  makeOrderThunk,
  orderPending,
  orderReject,
  orderResponce,
  orderContent,
  clearOrderModalData
} from '../../services/slices/ordersSlice';
import {
  editorBuns,
  editorIntredients,
  resetEditor
} from '../../services/slices/burgerEditorSlice';
import { getUser } from '../../services/slices/userSlice';
import { useNavigate, useLocation } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector(getUser);
  const bun = useSelector(editorBuns);
  const ingredients = useSelector(editorIntredients);
  const constructorItems = {
    bun,
    ingredients
  };

  const orderRequest = useSelector(orderPending);
  const orderCreatingError = useSelector(orderReject);
  const orderModalData = useSelector(orderContent);

  const onOrderClick = () => {
    if (!user) {
      navigate('/login', { state: { from: 'location.pathname' } });
      return;
    }
    if (!constructorItems.bun || orderRequest) return;
    const newOrderIds = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((item) => item._id),
      constructorItems.bun._id
    ];
    dispatch(makeOrderThunk(newOrderIds));
  };

  const closeOrderModal = () => {
    dispatch(resetEditor());
    dispatch(clearOrderModalData());
  };

  const price = useMemo(
    () =>
      (bun ? bun.price * 2 : 0) +
      ingredients.reduce((sum, item) => sum + item.price, 0),
    [bun, ingredients]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
