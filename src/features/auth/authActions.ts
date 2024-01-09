import axios from 'axios';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { basePath } from "../../utils/constant";


export const userLogin = createAsyncThunk(
	'auth/login',
	async ({ userName, password }: any, { rejectWithValue }) => {
		try {
			const { data } = await axios.post(`${basePath}/sessions`, {
				'email': userName,
				'password': password,
			});
			// store user's token in local storage
			localStorage.setItem('userToken', data.token);
			return data;
		} catch (error: any) {
			// return custom error message from API if any
			if (error.response && error.response.data.message) {
				return rejectWithValue(error.response.data.message);
			} else {
				return rejectWithValue(error.message);
			}
		}
	}
);