import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient, TConstructorIngredient } from '@utils-types';
import { v4 as uuidv4 } from 'uuid';

interface editorState {
  isLoading: boolean;
  error: string | null;
  buns: TIngredient | null;
  otherIngredients: TConstructorIngredient[];
}

const initialState: editorState = {
  isLoading: false,
  error: null,
  buns: null,
  otherIngredients: []
};

export const burgerEditorSlice = createSlice({
  name: 'editor',
  initialState,
  selectors: {
    editorIsLoading: (state) => state.isLoading,
    editorError: (state) => state.error,
    editorBuns: (state) => state.buns,
    editorIntredients: (state) => state.otherIngredients
  },
  reducers: {
    setBun: (state, action: PayloadAction<TIngredient>) => {
      state.buns = action.payload;
    },

    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        state.otherIngredients.push(action.payload);
      },
      prepare: (ingredient: TIngredient) => ({
        payload: {
          ...ingredient,
          id: uuidv4()
        }
      })
    },

    removeIngredient: (state, action) => {
      // удаление по uuid
      state.otherIngredients = state.otherIngredients.filter(
        (item) => item.id !== action.payload.id
      );
    },

    moveIngredient: (
      state,
      action: PayloadAction<{
        id: string;
        direction: 'up' | 'down';
      }>
    ) => {
      const index = state.otherIngredients.findIndex(
        (item) => item.id === action.payload.id
      );

      if (index === -1) return;

      const isUp = action.payload.direction === 'up';
      const newPosition = isUp ? index - 1 : index + 1;

      if (newPosition < 0 || newPosition >= state.otherIngredients.length)
        return;

      const exchangePosition = state.otherIngredients[index]; // сохранила элемент, кот надо поменять позицию
      state.otherIngredients[index] = state.otherIngredients[newPosition]; // присвоила новый индекс эл-ту, кот надо свапнуть
      state.otherIngredients[newPosition] = exchangePosition; // меняю индекс эл-ту, с которым свапались
    },

    resetEditor: (state) => {
      state.buns = null;
      state.otherIngredients = [];
    }
  }
});

export const { editorIsLoading, editorError, editorBuns, editorIntredients } =
  burgerEditorSlice.selectors;

export const {
  setBun,
  addIngredient,
  removeIngredient,
  moveIngredient,
  resetEditor
} = burgerEditorSlice.actions;
