import { mockIngredients } from '../__mocks__/mockData';
import {
  initialState,
  ingredientsListThunk,
  ingredientsSlice
} from '../slices/ingredientsSlice';

const reducer = ingredientsSlice.reducer;

describe('INGREDIENTS: тест редюсера на реакцию слайса на разные состояния санки и изменение стора', () => {
  test('PENDING: устанавливает isLoading = true', () => {
    const state = reducer(
      initialState,
      ingredientsListThunk.pending('', undefined)
    );

    expect(state.isLoading).toBe(true);
  });

  test('FULFILLED: сохраняет полученные ингредиенты и устанавливает isLoading = false', () => {
    const state = reducer(
      initialState,
      ingredientsListThunk.fulfilled(mockIngredients, '', undefined)
    );

    expect(state.isLoading).toBe(false);
    expect(state.ingredients).toEqual(mockIngredients);
  });

  test('REJECTED: устанавливает fallback ошибку, если payload отсутствует и устанавливает isLoading = false', () => {
    const state = reducer(
      initialState,
      ingredientsListThunk.rejected(null, '', undefined)
    );

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Error undefined');
  });
});
