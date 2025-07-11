import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '../../utils/types';
import { getFeedsApi, TFeedsResponse } from '@api';

//Получаем списка заказов (лента заказов)
export const feedsListThunk = createAsyncThunk<
  TFeedsResponse,
  void,
  { rejectValue: string }
>(
  'feeds/getFeeds', // имя санки
  async (_, { rejectWithValue }) => {
    try {
      const feedsData = await getFeedsApi();
      return feedsData;
    } catch (err) {
      return rejectWithValue('Ошибка загрузки ленты заказов');
    }
  }
);

export interface feedsState {
  isLoading: boolean;
  error: string | null;
  orders: TOrder[];
  total: number;
  totalToday: number;
}

const initialState: feedsState = {
  isLoading: false,
  error: null,
  orders: [],
  total: 0,
  totalToday: 0
};

/* При ф5 идет повторный запрос на сервер с обновлением истории заказов(ленты) */
/* В компоненте нашлась кнопка, которой нет в макете, по клику на которую происходит повторный запрос заказов */

export const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  selectors: {
    feedsIsLoading: (state) => state.isLoading,
    feedsError: (state) => state.error,
    feedsItems: (state) => state.orders,
    feedsTotal: (state) => state.total,
    feedsTotalToday: (state) => state.totalToday
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(feedsListThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(feedsListThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload ?? 'Error undefined';
    });
    builder.addCase(feedsListThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    });
  }
});

export const {
  feedsIsLoading,
  feedsError,
  feedsItems,
  feedsTotal,
  feedsTotalToday
} = feedsSlice.selectors;
