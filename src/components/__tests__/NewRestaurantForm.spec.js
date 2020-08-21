import React from 'react';
import {NewRestaurantForm} from '../NewRestaurantForm';
import {render, cleanup, fireEvent, act} from '@testing-library/react';
import flushPromises from 'flush-promises';

describe('<NewRestaurantForm/>', () => {
  const restaurantName = 'Sushi Place';
  const requiredError = '名字不能忽略';
  const serverError = '当前餐馆名不能被保存，请重新尝试';

  let context;
  let createRestaurant;

  beforeEach(() => {
    createRestaurant = jest.fn().mockName('createRestaurant');
    context = render(<NewRestaurantForm createRestaurant={createRestaurant} />);
  });
  afterEach(cleanup);

  describe('初始化', () => {
    it('不应该显示验证错误信息', () => {
      const {queryByText} = context;
      expect(queryByText(requiredError)).toBeNull();
    });
    it('不应该显示网络验证错误', () => {
      const {queryByText} = context;
      expect(queryByText(serverError)).toBeNull();
    });
  });

  describe('当填充文本时', () => {
    beforeEach(() => {
      createRestaurant.mockResolvedValue();
      const {getByPlaceholderText, getByTestId} = context;
      fireEvent.change(getByPlaceholderText('Add Restaurant'), {
        target: {
          value: restaurantName,
        },
      });
      fireEvent.click(getByTestId('new-restaurant-submit-button'));
      return act(flushPromises);
    });

    it('调用 createRestaurant 包含餐馆名', () => {
      expect(createRestaurant).toHaveBeenCalledWith(restaurantName);
    });

    it('清空餐馆名', () => {
      const {getByPlaceholderText} = context;
      expect(getByPlaceholderText('Add Restaurant').value).toEqual('');
    });

    it('不应该显示验证错误', () => {
      const {queryByText} = context;
      expect(queryByText(requiredError)).toBeNull();
    });

    it('不应该显示网络错误', () => {
      const {queryByText} = context;
      expect(queryByText(serverError)).toBeNull();
    });
  });

  describe('当文本为空时', () => {
    beforeEach(() => {
      createRestaurant.mockResolvedValue();
      const {getByPlaceholderText, getByTestId} = context;
      fireEvent.change(getByPlaceholderText('Add Restaurant'), {
        target: {
          value: '',
        },
      });
      fireEvent.click(getByTestId('new-restaurant-submit-button'));
      return act(flushPromises);
    });

    it('显示验证错误', () => {
      const {queryByText} = context;
      expect(queryByText(requiredError)).not.toBeNull();
    });

    it('不调用 createRestaurant', () => {
      expect(createRestaurant).not.toHaveBeenCalled();
    });
  });

  describe('当纠正错误是验证error', () => {
    beforeEach(async () => {
      createRestaurant.mockResolvedValue();
      const {getByPlaceholderText, getByTestId} = context;
      fireEvent.change(getByPlaceholderText('Add Restaurant'), {
        target: {
          value: '',
        },
      });
      fireEvent.click(getByTestId('new-restaurant-submit-button'));

      await act(flushPromises);

      fireEvent.change(getByPlaceholderText('Add Restaurant'), {
        target: {
          value: restaurantName,
        },
      });
      fireEvent.click(getByTestId('new-restaurant-submit-button'));
      return act(flushPromises);
    });

    it('清楚验证错误信息', () => {
      const {queryByText} = context;
      expect(queryByText(requiredError)).toBeNull();
    });
  });

  describe('当 store action reject', () => {
    beforeEach(() => {
      createRestaurant.mockRejectedValue();
      const {getByPlaceholderText, getByTestId} = context;
      fireEvent.change(getByPlaceholderText('Add Restaurant'), {
        target: {
          value: restaurantName,
        },
      });
      fireEvent.click(getByTestId('new-restaurant-submit-button'));
      return act(flushPromises);
    });

    it('显示网络请求错误', () => {
      const {queryByText} = context;
      expect(queryByText(serverError)).not.toBeNull();
    });

    it('不会清空用户之前的数据', () => {
      const {getByPlaceholderText} = context;
      expect(getByPlaceholderText('Add Restaurant').value).toEqual(
        restaurantName,
      );
    });
  });

  describe('在网络请求后尝试', () => {
    beforeEach(async () => {
      createRestaurant.mockRejectedValueOnce().mockResolvedValueOnce();
      const {getByPlaceholderText, getByTestId} = context;
      fireEvent.change(getByPlaceholderText('Add Restaurant'), {
        target: {
          value: restaurantName,
        },
      });
      fireEvent.click(getByTestId('new-restaurant-submit-button'));
      await act(flushPromises);
      fireEvent.click(getByTestId('new-restaurant-submit-button'));
      return act(flushPromises);
    });

    it('清除网络请求错误', () => {
      const {queryByText} = context;
      expect(queryByText(serverError)).toBeNull();
    });
  });
});
