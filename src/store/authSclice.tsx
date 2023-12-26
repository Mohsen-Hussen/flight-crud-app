import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { iUser } from "../interfaces/reduxToolkit";

const baseUrl = "http://localhost:5000/users";

export const registerUser = createAsyncThunk(
	"users/insertUser",
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

export const fetchUsers = createAsyncThunk(
	"users/fetchUsers",
	async (enteredUsername: string, thunkAPI) => {
		const { rejectWithValue } = thunkAPI;
		try {
			const response = await axios.get(baseUrl);
			return { enteredUsername, users: response.data };
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const logoutUser = createAsyncThunk("users/logoutUser", async () => {
	// No need to make a server-side request in this case
	return {}; // Return an empty object to signal successful completion
});

const initialState: iUser = {
	isAuthenticated: false,
	id: null,
	username: null,
	password: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState: { ...initialState, loading: false },
	reducers: {},
	extraReducers: (builder) => {
		builder
			// register new user
			.addCase(fetchUsers.pending, (state) => {
				state.isAuthenticated = false;
				state.username = null;
			})
			.addCase(
				fetchUsers.fulfilled,
				(
					state,
					action: PayloadAction<{ enteredUsername: string; users: iUser[] }>
				) => {
					// Assuming the payload is an object with enteredUsername and users array
					state.isAuthenticated = true;

					// Find the matched user in the payload based on the entered username
					const matchedUser = action.payload.users.find(
						(u) => u.username === action.payload.enteredUsername
					);

					if (matchedUser) {
						// Update the state with the matched user data
						state.id = matchedUser.id;
						state.username = matchedUser.username;
						state.password = matchedUser.password;
					} else {
						console.log("User not found");
						window.alert("User not found");
						return;
					}
				}
			)
			.addCase(fetchUsers.rejected, (state) => {
				state.isAuthenticated = false;
				state.username = null;
			})
			// logout
			.addCase(logoutUser.fulfilled, (state) => {
				state.isAuthenticated = false;
				state.id = null;
				state.username = null;
				state.password = null;
			});
	},
});

export default authSlice.reducer;
