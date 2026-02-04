import { setCookie, getCookie, deleteCookie } from './cookie';
import { TIngredient, TOrder, TOrdersData, TUser } from './types';
import user from '../../mocks/user.json';
import ingredients from '../../mocks/ingredients.json';
import ordersAll from '../../mocks/orders-all.json';
import ordersUser from '../../mocks/orders-user.json';
import orderData from '../../mocks/order-data.json';
import orderResponse from '../../mocks/order-response.json';

/*
const URL = process.env.BURGER_API_URL;
*/
const checkResponse = <T>(res: Response): Promise<T> =>
  res.ok ? res.json() : res.json().then((err) => Promise.reject(err));

type TServerResponse<T> = {
  success: boolean;
} & T;

type TRefreshResponse = TServerResponse<{
  refreshToken: string;
  accessToken: string;
}>;

/*
export const refreshToken = (): Promise<TRefreshResponse> =>
  fetch(`${URL}/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken')
    })
  })
    .then((res) => checkResponse<TRefreshResponse>(res))
    .then((refreshData) => {
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem('refreshToken', refreshData.refreshToken);
      setCookie('accessToken', refreshData.accessToken);
      return refreshData;
    });
*/

export const refreshToken = (): Promise<TRefreshResponse> =>
  new Promise((resolve) => {
    setTimeout(() => {
      const mockResponse: TRefreshResponse = {
        success: true,
        accessToken: 'new-mock-access-token',
        refreshToken: 'new-mock-refresh-token'
      };
      resolve(mockResponse);
    }, 300);
  });

/*
export const fetchWithRefresh = async <T>(
  url: RequestInfo,
  options: RequestInit
) => {
  try {
    const res = await fetch(url, options);
    return await checkResponse<T>(res);
  } catch (err) {
    if ((err as { message: string }).message === 'jwt expired') {
      const refreshData = await refreshToken();
      if (options.headers) {
        (options.headers as { [key: string]: string }).authorization =
          refreshData.accessToken;
      }
      const res = await fetch(url, options);
      return await checkResponse<T>(res);
    } else {
      return Promise.reject(err);
    }
  }
};
*/

export const fetchWithRefresh = <T>(
  url: RequestInfo,
  options: RequestInit
): Promise<T> =>
  new Promise<T>((resolve, reject) => {
    setTimeout(() => {
      const urlStr = url.toString();
      // Обработка разных эндпоинтов с правильной типизацией
      const handleRequest = async () => {
        try {
          if (urlStr.includes('/auth/user') && options.method === 'GET') {
            const result = await getUserApi();
            return result as T;
          } else if (
            urlStr.includes('/auth/user') &&
            options.method === 'PATCH'
          ) {
            const body = options.body ? JSON.parse(options.body as string) : {};
            const result = await updateUserApi(body);
            return result as T;
          } else if (urlStr.includes('/orders') && !options.method) {
            const result = await getOrdersApi();
            // Приводим тип, так как getOrdersApi возвращает TOrder[], а не TFeedsResponse
            return { success: true, orders: result } as T;
          } else if (urlStr.includes('/orders') && options.method === 'POST') {
            const body = options.body ? JSON.parse(options.body as string) : {};
            const result = await orderBurgerApi(body.ingredients);
            return result as T;
          } else {
            throw new Error('Мок не реализован для этого эндпоинта');
          }
        } catch (error) {
          throw error;
        }
      };

      handleRequest().then(resolve).catch(reject);
    }, 300);
  });

type TIngredientsResponse = TServerResponse<{
  data: TIngredient[];
}>;

export type TFeedsResponse = TServerResponse<{
  orders: TOrder[];
  total: number;
  totalToday: number;
}>;

type TOrdersResponse = TServerResponse<{
  data: TOrder[];
}>;

/*
export const getIngredientsApi = () =>
  fetch(`${URL}/ingredients`)
    .then((res) => checkResponse<TIngredientsResponse>(res))
    .then((data) => {
      if (data?.success) return data.data;
      return Promise.reject(data);
    });
*/

export const getIngredientsApi = (): Promise<TIngredient[]> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (ingredients && ingredients.data) {
        resolve(ingredients.data);
      } else {
        reject(new Error('Не удалось загрузить ингредиенты'));
      }
    }, 300);
  });

/*
export const getFeedsApi = () =>
  fetch(`${URL}/orders/all`)
    .then((res) => checkResponse<TFeedsResponse>(res))
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });
*/

export const getFeedsApi = (): Promise<TFeedsResponse> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (ordersAll && ordersAll.success) {
        resolve(ordersAll);
      } else {
        reject(new Error('Не удалось загрузить ленту заказов'));
      }
    }, 300);
  });

/*
export const getOrdersApi = () =>
  fetchWithRefresh<TFeedsResponse>(`${URL}/orders`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      authorization: getCookie('accessToken')
    } as HeadersInit
  }).then((data) => {
    if (data?.success) return data.orders;
    return Promise.reject(data);
  });
*/

export const getOrdersApi = (): Promise<TOrder[]> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (ordersUser && ordersUser.success && ordersUser.orders) {
        resolve(ordersUser.orders);
      } else {
        reject(new Error('Не удалось загрузить заказы пользователя'));
      }
    }, 300);
  });

export type TNewOrderResponse = TServerResponse<{
  order: TOrder;
  name: string;
}>;

/*
export const orderBurgerApi = (data: string[]) =>
  fetchWithRefresh<TNewOrderResponse>(`${URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      authorization: getCookie('accessToken')
    } as HeadersInit,
    body: JSON.stringify({
      ingredients: data
    })
  }).then((data) => {
    if (data?.success) return data;
    return Promise.reject(data);
  });
*/

export const orderBurgerApi = (data: string[]): Promise<TNewOrderResponse> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (orderResponse && orderResponse.success) {
        resolve(orderResponse);
      } else {
        reject(new Error('Не удалось создать заказ'));
      }
    }, 500);
  });

export type TOrderResponse = TServerResponse<{
  orders: TOrder[];
}>;

/*
export const getOrderByNumberApi = (number: number) =>
  fetch(`${URL}/orders/${number}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((res) => checkResponse<TOrderResponse>(res));
*/

export const getOrderByNumberApi = (number: number): Promise<TOrderResponse> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const allOrders = ordersAll.orders || [];
      const userOrders = ordersUser.orders || [];
      const foundOrder = [...allOrders, ...userOrders].find(
        (order) => order.number === number
      );
      if (foundOrder) {
        resolve({
          success: true,
          orders: [foundOrder]
        });
      } else {
        reject(new Error(`Заказ с номером ${number} не найден`));
      }
    }, 300);
  });

export type TRegisterData = {
  email: string;
  name: string;
  password: string;
};

export type TAuthResponse = TServerResponse<{
  refreshToken: string;
  accessToken: string;
  user: TUser;
}>;

/*
export const registerUserApi = (data: TRegisterData) =>
  fetch(`${URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  })
    .then((res) => checkResponse<TAuthResponse>(res))
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });
*/

export const registerUserApi = (data: TRegisterData): Promise<TAuthResponse> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      // Имитация успешной регистрации
      const mockResponse: TAuthResponse = {
        success: true,
        user: {
          email: data.email,
          name: data.name
        },
        accessToken: 'mock-access-token',
        refreshToken: 'mock-refresh-token'
      };
      resolve(mockResponse);
    }, 400);
  });

export type TLoginData = {
  email: string;
  password: string;
};

/*
export const loginUserApi = (data: TLoginData) =>
  fetch(`${URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  })
    .then((res) => checkResponse<TAuthResponse>(res))
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });
*/

export const loginUserApi = (data: TLoginData): Promise<TAuthResponse> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      // Имитация успешного входа
      if (data.email && data.password) {
        const mockResponse: TAuthResponse = {
          success: true,
          user: {
            email: data.email,
            name: 'Mock User'
          },
          accessToken: 'mock-access-token',
          refreshToken: 'mock-refresh-token'
        };
        resolve(mockResponse);
      } else {
        reject(new Error('Неверные учетные данные'));
      }
    }, 400);
  });

/*
export const forgotPasswordApi = (data: { email: string }) =>
  fetch(`${URL}/password-reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  })
    .then((res) => checkResponse<TServerResponse<{}>>(res))
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });
*/

export const forgotPasswordApi = (data: {
  email: string;
}): Promise<TServerResponse<{}>> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data.email) {
        resolve({ success: true });
      } else {
        reject(new Error('Не указан email'));
      }
    }, 300);
  });

/*
export const resetPasswordApi = (data: { password: string; token: string }) =>
  fetch(`${URL}/password-reset/reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  })
    .then((res) => checkResponse<TServerResponse<{}>>(res))
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });
*/

export const resetPasswordApi = (data: {
  password: string;
  token: string;
}): Promise<TServerResponse<{}>> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data.password && data.token) {
        resolve({ success: true });
      } else {
        reject(new Error('Не указаны данные для сброса пароля'));
      }
    }, 300);
  });

type TUserResponse = TServerResponse<{ user: TUser }>;

/*
export const getUserApi = () =>
  fetchWithRefresh<TUserResponse>(`${URL}/auth/user`, {
    headers: {
      authorization: getCookie('accessToken')
    } as HeadersInit
  });
*/

export const getUserApi = (): Promise<TUserResponse> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const token = getCookie('accessToken');
      if (token) {
        const mockResponse: TUserResponse = {
          success: true,
          user: {
            email: 'mock@user.com',
            name: 'Mock User'
          }
        };
        resolve(mockResponse);
      } else {
        reject(new Error('Пользователь не авторизован'));
      }
    }, 300);
  });

/*
export const updateUserApi = (user: Partial<TRegisterData>) =>
  fetchWithRefresh<TUserResponse>(`${URL}/auth/user`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      authorization: getCookie('accessToken')
    } as HeadersInit,
    body: JSON.stringify(user)
  });
*/

export const updateUserApi = (
  user: Partial<TRegisterData>
): Promise<TUserResponse> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const token = getCookie('accessToken');
      if (token) {
        const mockResponse: TUserResponse = {
          success: true,
          user: {
            email: user.email || 'mock@user.com',
            name: user.name || 'Mock User'
          }
        };
        resolve(mockResponse);
      } else {
        reject(new Error('Пользователь не авторизован'));
      }
    }, 300);
  });

/*
export const logoutApi = () =>
  fetch(`${URL}/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken')
    })
  }).then((res) => checkResponse<TServerResponse<{}>>(res));
*/

export const logoutApi = (): Promise<TServerResponse<{}>> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
      deleteCookie('accessToken');
      localStorage.removeItem('refreshToken');
    }, 300);
  });
