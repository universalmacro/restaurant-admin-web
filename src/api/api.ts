import {
  RestaurantApi,
  BillApi,
  Configuration,
  ConfigurationParameters,
} from "@dparty/restaurant-ts-sdk";

const token = localStorage.getItem("token");
const restaurantBasePath = "https://uat.api.universalmacro.com/restaurant";

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
