import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '../../utils/types';
import {
  getOrdersApi,
  orderBurgerApi,
  getOrderByNumberApi,
  TNewOrderResponse,
  TOrderResponse
} from '@api';

//Получаем список заказов пользователя по токену accessToken
export const ordersListThunk = createAsyncThunk<
  TOrder[],
  void,
  { rejectValue: string }
>(
  'orders/getOrders', // имя санки
  async (_, { rejectWithValue }) => {
    try {
      const ordersData = await getOrdersApi();
      return ordersData;
    } catch (err) {
      return rejectWithValue('Ошибка загрузки заказов пользователя');
    }
  }
);

//Отправляем заказ и получаем отбивку типа TNewOrderResponse
export const makeOrderThunk = createAsyncThunk<
  TNewOrderResponse,
  string[],
  { rejectValue: string }
>('orders/makeOrder', async (orderData, { rejectWithValue }) => {
  try {
    const newOrder = await orderBurgerApi(orderData);
    return newOrder;
  } catch (err) {
    return rejectWithValue('Ошибка при создании заказа');
  }
});

// Получаем все заказы пользователя по номеру
// в ответе массив типа TOrderResponse
export const getOrderByNumberThunk = createAsyncThunk<
  TOrderResponse,
  number,
  { rejectValue: string }
>('orders/getByNumber', async (orderNumber: number, { rejectWithValue }) => {
  try {
    const receivedOrder = await getOrderByNumberApi(orderNumber);
    return receivedOrder;
  } catch (err) {
    return rejectWithValue('Ошибка получения заказа');
  }
});

export interface ordersState {
  ordersList: {
    isLoading: boolean;
    orders: TOrder[];
    error: string | null;
  };
  createdOrder: {
    order: TNewOrderResponse | null;
    orderData: TOrder | null;
    isLoading: boolean;
    error: string | null;
  };
  receivedOrder: {
    data: TOrder[] | null;
    isLoading: boolean;
    error: string | null;
  };
}

export const initialState: ordersState = {
  ordersList: {
    isLoading: false,
    orders: [],
    error: null
  },
  createdOrder: {
    order: null,
    orderData: null,
    isLoading: false,
    error: null
  },
  receivedOrder: {
    data: null,
    isLoading: false,
    error: null
  }
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  selectors: {
    ordersItems: (state) => state.ordersList.orders,
    ordersIsLoading: (state) => state.ordersList.isLoading,
    ordersError: (state) => state.ordersList.error,

    orderPending: (state) => state.createdOrder.isLoading,
    orderReject: (state) => state.createdOrder.error,
    orderResponce: (state) => state.createdOrder.order,
    orderContent: (state) => state.createdOrder.orderData,

    orderData: (state) => state.receivedOrder.data,
    orderGetting: (state) => state.receivedOrder.isLoading,
    orderGettingError: (state) => state.receivedOrder.error
  },
  reducers: {
    clearOrderModalData: (state) => {
      state.createdOrder.order = null;
      state.createdOrder.orderData = null;
      state.createdOrder.isLoading = false;
    }
  },
  extraReducers: (builder) => {
    // Orders list
    builder
      .addCase(ordersListThunk.pending, (state) => {
        state.ordersList.isLoading = true;
      })
      .addCase(ordersListThunk.rejected, (state, action) => {
        state.ordersList.isLoading = false;
        state.ordersList.error = action.payload ?? 'Getting error undefined';
      })
      .addCase(ordersListThunk.fulfilled, (state, action) => {
        state.ordersList.isLoading = false;
        state.ordersList.orders = action.payload;
      });

    // Creating order
    builder
      .addCase(makeOrderThunk.pending, (state) => {
        state.createdOrder.isLoading = true;
      })
      .addCase(makeOrderThunk.rejected, (state, action) => {
        state.createdOrder.isLoading = false;
        state.createdOrder.error = action.payload ?? 'Creating error undefined';
      })
      .addCase(makeOrderThunk.fulfilled, (state, action) => {
        state.createdOrder.isLoading = false;
        state.createdOrder.order = action.payload;
        state.createdOrder.orderData = action.payload.order;
      });

    // Receiving order
    builder
      .addCase(getOrderByNumberThunk.pending, (state) => {
        state.receivedOrder.isLoading = true;
      })
      .addCase(getOrderByNumberThunk.rejected, (state, action) => {
        state.receivedOrder.isLoading = false;
        state.receivedOrder.error =
          action.payload ?? 'Receiving order error undefined';
      })
      .addCase(getOrderByNumberThunk.fulfilled, (state, action) => {
        state.receivedOrder.isLoading = false;
        state.receivedOrder.data = action.payload.orders;
      });
  }
});

export const {
  ordersItems, // все заказы пользователя по токену
  ordersIsLoading, // запрос отправляется
  ordersError, // не получилось получить заказы
  orderPending, // отправляем заказ
  orderReject, // не получилось отправить заказ
  orderResponce, // ответ от сервера, если заказ отправлен успешно
  orderContent, // сожержимое отправленного заказа
  orderData, // полученные заказы по номеру
  orderGetting, // получение в процессе
  orderGettingError // получение не получилось
} = ordersSlice.selectors;

export const { clearOrderModalData } = ordersSlice.actions;
