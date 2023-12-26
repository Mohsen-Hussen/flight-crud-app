import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { iUser } from "../interfaces/reduxToolkit";

const baseUrl = "http://localhost:5000/users";

export const registerUser = createAsyncThunk(
	"posts/insertPost",
	async (item: iUser, thunkAPI) => {
		const { rejectWithValue } = thunkAPI;
		try {
			const response = await axios.post(baseUrl, item, {
				headers: {
					"Content-type": "application/json; charset=UTF-8",
				},
			});
			return response.data;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

const initialState: iUser = {
	isAuthenticated: false,
	id: null,
	username: null,
	password: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(registerUser.pending, (state) => {
				state.isAuthenticated = false;
				state.id = null;
				state.username = null;
				state.password = null;
			})
			.addCase(
				registerUser.fulfilled,
				(state, action: PayloadAction<iUser>) => {
					state.isAuthenticated = true;
					state.id = action.payload.id;
					state.username = action.payload.username;
					state.password = action.payload.password;
				}
			)
			.addCase(registerUser.rejected, (state) => {
				state.isAuthenticated = false;
				state.id = null;
				state.username = null;
				state.password = null;
			});
	},
});

export default authSlice.reducer;
