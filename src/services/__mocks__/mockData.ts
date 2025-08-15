import {
  TIngredient,
  TConstructorIngredient,
  TOrder,
  TOrdersData,
  TUser
} from '@utils-types';
import {
  TOrderResponse,
  TNewOrderResponse,
  TRegisterData,
  TAuthResponse
} from '@api';

// пример данных с ингредиентами
export const mockIngredients: TIngredient[] = [
  {
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
  },
  {
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
  },
  {
    _id: '643d69a5c3f7b9001cfa0945',
    name: 'Соус с шипами Антарианского плоскоходца',
    type: 'sauce',
    proteins: 101,
    fat: 99,
    carbohydrates: 100,
    calories: 100,
    price: 88,
    image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png'
  }
];

// мок булочки
export const mockBunIngredient: TIngredient = {
  _id: '643d69a5c3f7b9001cfa093c',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
};

// мок с основным ингредиентом и uuid
export const mockMainIngredient: TConstructorIngredient = {
  _id: '643d69a5c3f7b9001cfa0941',
  name: 'Биокотлета из марсианской Магнолии',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: 'https://code.s3.yandex.net/react/code/meat-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
  id: '00'
};

// мок с ингредиентом соуса и uuid
export const mockSauseIngredient: TConstructorIngredient = {
  _id: '643d69a5c3f7b9001cfa0945',
  name: 'Соус с шипами Антарианского плоскоходца',
  type: 'sauce',
  proteins: 101,
  fat: 99,
  carbohydrates: 100,
  calories: 100,
  price: 88,
  image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png',
  id: '01'
};

// пример смены позиции начинок внутри бургера
export const sortedIngredients = [
  {
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
  },
  {
    _id: '643d69a5c3f7b9001cfa0945',
    name: 'Соус с шипами Антарианского плоскоходца',
    type: 'sauce',
    proteins: 101,
    fat: 99,
    carbohydrates: 100,
    calories: 100,
    price: 88,
    image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png'
  },
  {
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
  }
];

// пример удаления ингредиента из списка
export const filteredIngredients = [
  {
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
  },
  {
    _id: '643d69a5c3f7b9001cfa0945',
    name: 'Соус с шипами Антарианского плоскоходца',
    type: 'sauce',
    proteins: 101,
    fat: 99,
    carbohydrates: 100,
    calories: 100,
    price: 88,
    image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png'
  }
];

// данные о заказе
export const mockOrder: TOrder = {
  _id: '688cd379d5ca30001cffcf82',
  ingredients: [
    '643d69a5c3f7b9001cfa093c',
    '643d69a5c3f7b9001cfa0941',
    '643d69a5c3f7b9001cfa0945',
    '643d69a5c3f7b9001cfa093c'
  ],
  status: 'done',
  name: 'Краторный био-марсианский антарианский бургер',
  createdAt: '2025-08-01T14:47:21.256Z',
  updatedAt: '2025-08-01T14:47:21.979Z',
  number: 85579
};

// данные о заказах пользователя
export const mockOrders: TOrder[] = [mockOrder];

// новый заказ собирает список id ингредиентов
export const newOrder: string[] = [
  '643d69a5c3f7b9001cfa093c',
  '643d69a5c3f7b9001cfa0941',
  '643d69a5c3f7b9001cfa0945',
  '643d69a5c3f7b9001cfa093c'
];

// история заказов пользователя
export const mockOrderResponse: TOrderResponse = {
  success: true,
  orders: mockOrders
};

// ответ от сервера о новом заказе
export const mockNewOrderResponse: TNewOrderResponse = {
  success: true,
  order: mockOrder,
  name: mockOrder.name
};

// заказы для ленты
export const mockFeedsResponse = {
  success: true,
  orders: mockOrders,
  total: 10,
  totalToday: 2
};

// данные пользователя
export const mockUser: TUser = {
  email: 'test@test.ru',
  name: 'Test User'
};

// данные для регистрации
export const mockRegisterData: TRegisterData = {
  email: 'test@test.ru',
  password: '123456',
  name: 'Test User'
};

// обновление данных профиля
export const mockUpdatedUser: TRegisterData = {
  email: 'update@update.ru',
  password: '654321',
  name: 'User Test'
};

// данные для авторизации
export const mockAuthResponse: TAuthResponse = {
  success: true,
  accessToken: 'Bearer access token',
  refreshToken: 'Refresh token',
  user: mockUser
};

export const mockUserResponse = { user: mockUser };
