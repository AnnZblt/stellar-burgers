import {
  mockOrder,
  mockOrders,
  newOrder,
  mockOrderResponse,
  mockNewOrderResponse
} from '../__mocks__/mockData';
import {
  ordersListThunk,
  makeOrderThunk,
  getOrderByNumberThunk,
  initialState,
  ordersSlice
} from '../slices/ordersSlice';

const reducer = ordersSlice.reducer;
describe('ORDERS SLICE: тесты редюсера на реакцию слайса на разные состояния санки и изменение стора', () => {
  describe('ORDERS LIST: получение заказов пользователя', () => {
    test('PENDING: устанавливает isLoading = true', () => {
      const state = reducer(
        initialState,
        ordersListThunk.pending('', undefined)
      );

      expect(state.ordersList.isLoading).toBe(true);
    });

    test('FULFILLED: сохраняет полученные заказы пользователя и устанавливает isLoading = false', () => {
      const state = reducer(
        initialState,
        ordersListThunk.fulfilled(mockOrders, '', undefined)
      );

      expect(state.ordersList.isLoading).toBe(false);
      expect(state.ordersList.orders).toEqual(mockOrders);
    });

    test('REJECTED: устанавливает fallback ошибку, если payload отсутствует и устанавливает isLoading = false', () => {
      const state = reducer(
        initialState,
        ordersListThunk.rejected(null, '', undefined)
      );

      expect(state.ordersList.isLoading).toBe(false);
      expect(state.ordersList.error).toBe('Getting error undefined');
    });
  });

  describe('CREATE ORDER: отправка заказа пользователя', () => {
    test('PENDING: устанавливает isLoading = true', () => {
      const state = reducer(initialState, makeOrderThunk.pending('', newOrder));

      expect(state.createdOrder.isLoading).toBe(true);
    });

    test('FULFILLED: отправляет заказ, сохраняет ответ сервера и устанавливает isLoading = false', () => {
      const state = reducer(
        initialState,
        makeOrderThunk.fulfilled(mockNewOrderResponse, '', newOrder)
      );

      expect(state.createdOrder.isLoading).toBe(false);
      expect(state.createdOrder.orderData).toEqual(mockOrder);
    });

    test('REJECTED: устанавливает fallback ошибку, если payload отсутствует и устанавливает isLoading = false', () => {
      const state = reducer(
        initialState,
        makeOrderThunk.rejected(null, '', newOrder)
      );

      expect(state.createdOrder.isLoading).toBe(false);
      expect(state.createdOrder.error).toBe('Creating error undefined');
    });
  });

  describe('GET ORDER BY NUMBER: получение одного заказа пользователя', () => {
    test('PENDING: устанавливает isLoading = true', () => {
      const state = reducer(
        initialState,
        getOrderByNumberThunk.pending('', mockOrder.number)
      );

      expect(state.receivedOrder.isLoading).toBe(true);
    });

    test('FULFILLED: сохраняет полученный заказ и устанавливает isLoading = false', () => {
      const state = reducer(
        initialState,
        getOrderByNumberThunk.fulfilled(mockOrderResponse, '', mockOrder.number)
      );

      expect(state.receivedOrder.isLoading).toBe(false);
      expect(state.receivedOrder.data).toEqual(mockOrders);
    });

    test('REJECTED: устанавливает fallback ошибку, если payload отсутствует и устанавливает isLoading = false', () => {
      const state = reducer(
        initialState,
        getOrderByNumberThunk.rejected(null, '', mockOrder.number)
      );

      expect(state.receivedOrder.isLoading).toBe(false);
      expect(state.receivedOrder.error).toBe('Receiving order error undefined');
    });
  });
});
