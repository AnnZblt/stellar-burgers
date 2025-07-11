import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient } from '../../utils/types';
import { getIngredientsApi } from '@api';

//Получаем список ингредиентов
export const ingredientsListThunk = createAsyncThunk<
  TIngredient[],
  void,
  { rejectValue: string }
>(
  'ingredients/getIngredients', // имя санки
  async (_, { rejectWithValue }) => {
    try {
      const ingredientsData = await getIngredientsApi();
      return ingredientsData;
    } catch (err) {
      return rejectWithValue('Ошибка загрузки ингредиентов');
    }
  }
);

export interface ingredientsState {
  isLoading: boolean;
  ingredients: TIngredient[] | [];
  error: string | null;
}

const initialState: ingredientsState = {
  isLoading: false,
  ingredients: [],
  error: null
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  selectors: {
    ingredientsItems: (state) => state.ingredients,
    ingredientsIsLoading: (state) => state.isLoading,
    ingredientsError: (state) => state.error
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(ingredientsListThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(ingredientsListThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload ?? 'Error undefined';
    });
    builder.addCase(ingredientsListThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.ingredients = action.payload;
    });
  }
});

export const { ingredientsItems, ingredientsIsLoading, ingredientsError } =
  ingredientsSlice.selectors;
