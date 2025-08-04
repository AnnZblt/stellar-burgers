import {
  mockIngredients,
  mockBunIngredient,
  mockMainIngredient,
  mockSauseIngredient
} from '../__mocks__/mockData';
import {
  initialState,
  setBun,
  addIngredient,
  removeIngredient,
  moveIngredient,
  resetEditor,
  burgerEditorSlice
} from '../slices/burgerEditorSlice';
import { v4 as uuidv4 } from 'uuid';

jest.mock('uuid');

describe('BURGER EDITOR SLICE: тесты редюсеров и изменения стора', () => {
  test('SET BUN: тест добавления булочки в конструктор', () => {
    const action = setBun(mockIngredients[0]);

    expect(action.payload).toEqual(mockBunIngredient);
  });

  test('ADD INGREDIENT: тест добавления ингредиента в конструктор и присваивания uuid в prepare', () => {
    (uuidv4 as jest.Mock).mockReturnValue('00');

    const action = addIngredient(mockIngredients[1]);

    expect(action.payload).toEqual(mockMainIngredient);
  });

  test('REMOVE INGREDIENT: проверяет удаление ингредиента из списка по uuid', () => {
    const constructorIngredients = [mockMainIngredient, mockSauseIngredient];

    const otherIngredientsState = {
      ...initialState,
      otherIngredients: constructorIngredients
    };

    const result = burgerEditorSlice.reducer(
      otherIngredientsState,
      removeIngredient({ id: '00' })
    );

    expect(result.otherIngredients).toHaveLength(1);
    expect(result.otherIngredients.find((i) => i.id === '00')).toBeUndefined();
  });

  test('MOVE INGREDIENT: перемещает ингредиент вверх', () => {
    const state = {
      ...initialState,
      otherIngredients: [mockMainIngredient, mockSauseIngredient]
    };

    const result = burgerEditorSlice.reducer(
      state,
      moveIngredient({ id: mockSauseIngredient.id, direction: 'up' })
    );

    expect(result.otherIngredients).toEqual([
      mockSauseIngredient,
      mockMainIngredient
    ]);
  });

  test('MOVE INGREDIENT: перемещает ингредиент вниз', () => {
    const state = {
      ...initialState,
      otherIngredients: [mockMainIngredient, mockSauseIngredient]
    };

    const result = burgerEditorSlice.reducer(
      state,
      moveIngredient({ id: mockMainIngredient.id, direction: 'down' })
    );

    expect(result.otherIngredients).toEqual([
      mockSauseIngredient,
      mockMainIngredient
    ]);
  });

  test('MOVE INGREDIENT: не меняет порядок, если элемент уже первый и перемещается вверх', () => {
    const state = {
      ...initialState,
      otherIngredients: [mockMainIngredient, mockSauseIngredient]
    };

    const result = burgerEditorSlice.reducer(
      state,
      moveIngredient({ id: mockMainIngredient.id, direction: 'up' })
    );

    expect(result.otherIngredients).toEqual(state.otherIngredients);
  });

  test('MOVE INGREDIENT: не меняет порядок, если элемент уже последний и перемещается вниз', () => {
    const state = {
      ...initialState,
      otherIngredients: [mockMainIngredient, mockSauseIngredient]
    };

    const result = burgerEditorSlice.reducer(
      state,
      moveIngredient({ id: mockSauseIngredient.id, direction: 'down' })
    );

    expect(result.otherIngredients).toEqual(state.otherIngredients);
  });

  test('RESET EDITOR: сбрасывает булку и ингредиенты', () => {
    const state = {
      ...initialState,
      buns: mockBunIngredient,
      otherIngredients: [mockMainIngredient, mockSauseIngredient]
    };

    const result = burgerEditorSlice.reducer(state, resetEditor());

    expect(result.buns).toBeNull();
    expect(result.otherIngredients).toEqual([]);
  });
});
