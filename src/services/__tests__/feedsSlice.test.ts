import { mockFeedsResponse } from '../__mocks__/mockData';
import { initialState, feedsListThunk, feedsSlice } from '../slices/feedsSlice';

const reducer = feedsSlice.reducer;

describe('FEEDS: тест редюсера на реакцию слайса на разные состояния санки и изменение стора', () => {
  test('PENDING: устанавливает isLoading = true', () => {
    const state = reducer(initialState, feedsListThunk.pending('', undefined));

    expect(state.isLoading).toBe(true);
  });

  test('FULFILLED: сохраняет полученные заказы и устанавливает isLoading = false', () => {
    const state = reducer(
      initialState,
      feedsListThunk.fulfilled(mockFeedsResponse, '', undefined)
    );

    expect(state.isLoading).toBe(false);
    expect(state.orders).toEqual(mockFeedsResponse.orders);
    expect(state.total).toBe(mockFeedsResponse.total);
    expect(state.totalToday).toBe(mockFeedsResponse.totalToday);
  });

  test('REJECTED: устанавливает fallback ошибку, если payload отсутствует и устанавливает isLoading = false', () => {
    const state = reducer(
      initialState,
      feedsListThunk.rejected(null, '', undefined)
    );

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Error undefined');
  });
});
