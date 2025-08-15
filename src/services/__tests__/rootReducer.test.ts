import store from '../store';
import { initialState as userInitState } from '../slices/userSlice';
import { initialState as feedsInitState } from '../slices/feedsSlice';
import { initialState as ingredientsInitState } from '../slices/ingredientsSlice';
import { initialState as ordersInitState } from '../slices/ordersSlice';
import { initialState as burgerEditorInitState } from '../slices/burgerEditorSlice';

describe('rootReducer test', () => {
  test('возвращает начальное состояние при нераспознанном экшене', () => {
    store.dispatch({ type: 'UNKNOWN_ACTION' });

    const state = store.getState();

    expect(state).toEqual({
      ingredients: ingredientsInitState,
      feeds: feedsInitState,
      orders: ordersInitState,
      user: userInitState,
      editor: burgerEditorInitState
    });
  });
});
