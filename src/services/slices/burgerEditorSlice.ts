import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

interface editorState {
  isLoading: boolean;
  error: string | null;
  buns: TIngredient | null;
  otherIngredients: TIngredient[];
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
    addIngredient: (state, action: PayloadAction<TIngredient>) => {
      state.otherIngredients.push(action.payload);
    },
    removeIngredient: (state, action) => {
      // удаление по индексу
      state.otherIngredients.splice(action.payload.index, 1);
    },
    resetEditor: (state) => {
      state.buns = null;
      state.otherIngredients = [];
    }
  }
});

export const { editorIsLoading, editorError, editorBuns, editorIntredients } =
  burgerEditorSlice.selectors;

export const { setBun, addIngredient, removeIngredient, resetEditor } =
  burgerEditorSlice.actions;
