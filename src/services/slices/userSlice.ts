import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TUser } from '../../utils/types';
import {
  registerUserApi,
  loginUserApi,
  TRegisterData,
  getUserApi,
  updateUserApi,
  forgotPasswordApi,
  resetPasswordApi,
  logoutApi
} from '../../utils/burger-api';
import { setCookie, deleteCookie } from '../../utils/cookie';

// Логиним пользователя и устанавливаем в хранилищах токены
export const loginUserThunk = createAsyncThunk<
  TUser, // какого типа вернет значение
  Omit<TRegisterData, 'name'>, // какой аргумент ждет
  { rejectValue: string } // что вернется в ошибку
>(
  'user/loginUser', // имя санки
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const data = await loginUserApi({ email, password });
      setCookie('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      return data.user;
    } catch (err) {
      return rejectWithValue('Ошибка данных пользователя');
    }
  }
);

// Получаем пользователя/проверяем есть ли он в системе
export const getUserThunk = createAsyncThunk<
  TUser,
  void,
  { rejectValue: string }
>('user/getUser', async (_, { rejectWithValue }) => {
  try {
    const data = await getUserApi(); // data: TUserResponse
    return data.user;
  } catch (err) {
    return rejectWithValue('Не удалось получить пользователя');
  }
});

// регистрируем пользователя и устанавливаем токены
export const registerUserThunk = createAsyncThunk<
  TUser,
  TRegisterData,
  { rejectValue: string }
>('user/registerUser', async (registerData, { rejectWithValue }) => {
  try {
    const data = await registerUserApi(registerData);
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.user;
  } catch (err) {
    return rejectWithValue('Ошибка регистрации');
  }
});

// восстановление пароля
export const forgotPasswordThunk = createAsyncThunk<
  void,
  { email: string },
  { rejectValue: string }
>('user/forgotPassword', async ({ email }, { rejectWithValue }) => {
  try {
    await forgotPasswordApi({ email });
  } catch (err) {
    return rejectWithValue('Ошибка восстановления пароля');
  }
});

// сброс пароля
export const resetPasswordThunk = createAsyncThunk<
  void,
  { password: string; token: string },
  { rejectValue: string }
>('user/resetPassword', async (data, { rejectWithValue }) => {
  try {
    await resetPasswordApi(data);
  } catch (err) {
    return rejectWithValue('Ошибка сброса пароля');
  }
});

// обновление данных профиля
export const updateUserDataThunk = createAsyncThunk<
  TUser,
  Partial<TRegisterData>,
  { rejectValue: string }
>('user/updateUser', async (userData, { rejectWithValue }) => {
  try {
    const newData = await updateUserApi(userData);
    return newData.user;
  } catch (err) {
    return rejectWithValue('Ошибка обновления данных');
  }
});

// выход из учетки
export const logoutUserThunk = createAsyncThunk<
  void,
  void,
  { rejectValue: string }
>('user/logoutUser', async (_, { rejectWithValue }) => {
  try {
    await logoutApi();
    localStorage.removeItem('refreshToken');
    deleteCookie('accessToken');
  } catch (err) {
    return rejectWithValue('Ошибка выхода из системы');
  }
});

export interface UserState {
  isInit: boolean;
  isLoading: boolean;
  user: TUser | null;
  error: string | null;
}

export const initialState: UserState = {
  isInit: false,
  isLoading: false,
  user: null,
  error: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  selectors: {
    getUser: (state) => state.user,
    userIsLoading: (state) => state.isLoading,
    userError: (state) => state.error
  },
  reducers: {
    init: (state) => {
      state.isInit = true;
    },
    logout: (state) => {
      state.isInit = false;
    }
  },
  extraReducers: (builder) => {
    // логин юзера
    builder
      .addCase(loginUserThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? 'Error undefined';
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      });

    // получение юзера
    builder
      .addCase(getUserThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? 'Error undefined';
        state.isInit = true;
      })
      .addCase(getUserThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = payload;
        state.isInit = true;
      });

    // регистрация юзера
    builder
      .addCase(registerUserThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? 'Error undefined';
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isInit = true;
        state.user = action.payload;
      });

    //забыли пароль
    builder
      .addCase(forgotPasswordThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgotPasswordThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? 'Error undefined';
      })
      .addCase(forgotPasswordThunk.fulfilled, (state) => {
        state.isLoading = false;
      });

    // сбрасываем пароль
    builder
      .addCase(resetPasswordThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPasswordThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? 'Error undefined';
      })
      .addCase(resetPasswordThunk.fulfilled, (state) => {
        state.isLoading = false;
      });

    //обновляем данные
    builder
      .addCase(updateUserDataThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserDataThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? 'Error undefined';
      })
      .addCase(updateUserDataThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      });

    //выход из учетки
    builder
      .addCase(logoutUserThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? 'Error undefined';
      })
      .addCase(logoutUserThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.isInit = false;
        state.user = null;
      });
  }
});

export const { getUser, userIsLoading, userError } = userSlice.selectors;

export const { init, logout } = userSlice.actions;
