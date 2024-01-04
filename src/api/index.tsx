import {
  AccountApi,
  Configuration,
  ConfigurationParameters,
} from "@universalmacro/auth-ts-sdk";

const token = localStorage.getItem("token");
const basePath = "https://uat.api.universalmacro.com";

export const accountApi = new AccountApi(
  new Configuration({
    basePath: basePath,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  } as ConfigurationParameters)
);
