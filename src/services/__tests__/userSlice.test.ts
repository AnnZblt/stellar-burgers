import {
  mockUser,
  mockRegisterData,
  mockUpdatedUser,
  mockAuthResponse,
  mockUserResponse
} from '../__mocks__/mockData';
import {
  loginUserThunk,
  getUserThunk,
  registerUserThunk,
  forgotPasswordThunk,
  resetPasswordThunk,
  updateUserDataThunk,
  logoutUserThunk,
  initialState,
  userSlice
} from '../slices/userSlice';

const reducer = userSlice.reducer;

describe('USER SLICE: тесты редюсера на реакцию слайса на разные состояния санки и изменение стора', () => {
  describe('LOGIN USER: логин юзера', () => {
    test('PENDING: устанавливает isLoading = true', () => {
      const state = reducer(
        initialState,
        loginUserThunk.pending('', mockRegisterData)
      );

      expect(state.isLoading).toBe(true);
    });

    test('FULFILLED: сохраняет полученные токены пользователя и устанавливает isLoading = false', () => {
      const state = reducer(
        initialState,
        loginUserThunk.fulfilled(mockUser, '', mockRegisterData)
      );

      expect(state.isLoading).toBe(false);
      expect(state.user).toEqual(mockUser);
    });

    test('REJECTED: устанавливает fallback ошибку, если payload отсутствует и устанавливает isLoading = false', () => {
      const state = reducer(
        initialState,
        loginUserThunk.rejected(null, '', mockRegisterData)
      );

      expect(state.isLoading).toBe(false);
      expect(state.error).toBe('Error undefined');
    });
  });

  describe('REGISTER USER: регистрация пользователя и выдача токенов', () => {
    test('PENDING: устанавливает isLoading = true', () => {
      const state = reducer(
        initialState,
        registerUserThunk.pending('', mockRegisterData)
      );

      expect(state.isLoading).toBe(true);
    });

    test('FULFILLED: сохраняет полученные токены пользователя и устанавливает isLoading = false', () => {
      const state = reducer(
        initialState,
        registerUserThunk.fulfilled(mockUser, '', mockRegisterData)
      );

      expect(state.isLoading).toBe(false);
      expect(state.user).toEqual(mockUser);
    });

    test('REJECTED: устанавливает fallback ошибку, если payload отсутствует и устанавливает isLoading = false', () => {
      const state = reducer(
        initialState,
        registerUserThunk.rejected(null, '', mockRegisterData)
      );

      expect(state.isLoading).toBe(false);
      expect(state.error).toBe('Error undefined');
    });
  });

  describe('GET USER: проверка авторизации пользователя', () => {
    test('PENDING: устанавливает isLoading = true', () => {
      const state = reducer(initialState, getUserThunk.pending('', undefined));

      expect(state.isLoading).toBe(true);
    });

    test('FULFILLED: сохраняет пользователя, устанавливает isLoading=false, isInit=true', () => {
      const state = reducer(
        initialState,
        getUserThunk.fulfilled(mockUser, '', undefined)
      );

      expect(state.isLoading).toBe(false);
      expect(state.isInit).toBe(true);
      expect(state.user).toEqual(mockUser);
    });

    test('REJECTED: устанавливает fallback ошибку, если payload отсутствует, устанавливает isLoading = false и isInit=true', () => {
      const state = reducer(
        initialState,
        getUserThunk.rejected(null, '', undefined)
      );

      expect(state.isLoading).toBe(false);
      expect(state.isInit).toBe(true);
      expect(state.error).toBe('Error undefined');
    });
  });

  describe('UPDATE USER DATA: обновляет данны пользователя(имя, имейл, пароль)', () => {
    test('PENDING: устанавливает isLoading = true', () => {
      const state = reducer(
        initialState,
        updateUserDataThunk.pending('', mockRegisterData)
      );

      expect(state.isLoading).toBe(true);
    });

    test('FULFILLED: обновляет данные пользователя и устанавливает isLoading=false', () => {
      const state = reducer(
        initialState,
        updateUserDataThunk.fulfilled(mockUpdatedUser, '', mockUpdatedUser)
      );

      expect(state.isLoading).toBe(false);
      expect(state.user).toEqual(mockUpdatedUser);
    });

    test('REJECTED: устанавливает fallback ошибку, если payload отсутствует и устанавливает isLoading = false', () => {
      const state = reducer(
        initialState,
        updateUserDataThunk.rejected(null, '', mockUpdatedUser)
      );

      expect(state.isLoading).toBe(false);
      expect(state.error).toBe('Error undefined');
    });
  });

  describe('LOGOUT USER: удаляет токены пользователя из хранилища', () => {
    test('PENDING: устанавливает isLoading = true', () => {
      const state = reducer(
        initialState,
        logoutUserThunk.pending('', undefined)
      );

      expect(state.isLoading).toBe(true);
    });

    test('FULFILLED: очищает user, устанавливает isLoading=false, isInit=false ', () => {
      const state = reducer(
        {
          ...initialState,
          user: mockUser,
          isInit: true
        },
        logoutUserThunk.fulfilled(undefined, '', undefined)
      );

      expect(state.isLoading).toBe(false);
      expect(state.user).toBeNull();
      expect(state.isInit).toBe(false);
    });

    test('REJECTED: устанавливает fallback ошибку, если payload отсутствует и устанавливает isLoading = false', () => {
      const state = reducer(
        initialState,
        logoutUserThunk.rejected(null, '', undefined)
      );

      expect(state.isLoading).toBe(false);
      expect(state.error).toBe('Error undefined');
    });
  });

  describe('FORGOT PASSWORD: запрос со сбросом пароля', () => {
    test('PENDING: isLoading = true', () => {
      const state = reducer(
        initialState,
        forgotPasswordThunk.pending('', {
          email: 'test@test.com'
        })
      );

      expect(state.isLoading).toBe(true);
    });

    test('FULFILLED: isLoading = false, user не обновляется', () => {
      const state = reducer(
        initialState,
        forgotPasswordThunk.fulfilled(undefined, '', {
          email: 'test@test.com'
        })
      );

      expect(state.isLoading).toBe(false);
      expect(state.user).toBeNull();
    });

    test('REJECTED: устанавливает fallback ошибку, если payload отсутствует и устанавливает isLoading = false', () => {
      const state = reducer(
        initialState,
        forgotPasswordThunk.rejected(null, '', {
          email: 'test@test.com'
        })
      );

      expect(state.isLoading).toBe(false);
      expect(state.error).toBe('Error undefined');
    });
  });

  describe('RESET PASSWORD: сброс пароля пользователя', () => {
    test('PENDING: isLoading = true', () => {
      const state = reducer(
        initialState,
        resetPasswordThunk.pending('', {
          password: '123',
          token: 'Access Token'
        })
      );

      expect(state.isLoading).toBe(true);
    });

    test('FULFILLED: isLoading = false', () => {
      const state = reducer(
        initialState,
        resetPasswordThunk.fulfilled(undefined, '', {
          password: '123',
          token: 'Access Token'
        })
      );

      expect(state.isLoading).toBe(false);
    });

    test('REJECTED: устанавливает fallback ошибку, если payload отсутствует и устанавливает isLoading = false', () => {
      const state = reducer(
        initialState,
        resetPasswordThunk.rejected(null, '', {
          password: '123',
          token: 'Access Token'
        })
      );

      expect(state.isLoading).toBe(false);
      expect(state.error).toBe('Error undefined');
    });
  });
});
