import {
  RestaurantApi,
  BillApi,
  Configuration,
  ConfigurationParameters,
} from "@dparty/restaurant-ts-sdk";
import axios from "axios";
const token = localStorage.getItem("userToken");
export const restaurantBasePath = "https://uat.api.universalmacro.com/restaurant";

export const restaurantApi = new RestaurantApi(
  new Configuration({
    basePath: restaurantBasePath,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  } as ConfigurationParameters)
);


export const billApi = new BillApi(
  new Configuration({
    basePath: restaurantBasePath,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  } as ConfigurationParameters)
);


export const getRestaurant = async (params: any) => {
  const res = await axios.get(`${restaurantBasePath}/restaurants`, params);
  return res.data;
};


export const getBillList = async (params: any) => {
  const res = await axios.get(`${restaurantBasePath}/bills`, params);
  return res.data;
};

export const getPrinters = async (id: string, config: any) => {
  const res = await axios.get(`${restaurantBasePath}/restaurants/${id}/printers`, config);
  return res.data;
};

export const getDiscounts = async (id: string, config: any) => {
  const res = await axios.get(`${restaurantBasePath}/restaurants/${id}/discounts`, config);
  return res.data;
};

export const createTable = async (id: string, data: any, config: any) => {
  const res = await axios.post(`${restaurantBasePath}/restaurants/${id}/tables`, data, config);
  return res.data;
};

export const deleteTable = async (id: string, config: any) => {
  const res = await axios.delete(`${restaurantBasePath}/tables/${id}`, config);
  return res.data;
};