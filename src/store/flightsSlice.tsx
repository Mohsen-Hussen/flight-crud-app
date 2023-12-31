import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { iFlight, iFlightState } from "../interfaces/reduxToolkit";

const baseUrl = "http://localhost:5000/flights";

export const fetchFlights = createAsyncThunk(
	"flights/fetchFlights",
	async (_, thunkAPI) => {
		const { rejectWithValue } = thunkAPI;
		try {
			const response = await axios.get(baseUrl);
			return response.data;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const fetchFlight = createAsyncThunk(
	"flights/fetchFlight",
	async (id: number, thunkAPI) => {
		const { rejectWithValue } = thunkAPI;

		try {
			const response = await axios.get(`${baseUrl}/${id}`);
			return response.data;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const deleteFlight = createAsyncThunk(
	"posts/deletePost",
	async (id: number, thunkAPI) => {
		const { rejectWithValue } = thunkAPI;
		try {
			await axios.delete(`${baseUrl}/${id}`);
			return id;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const insertFlight = createAsyncThunk(
	"posts/insertPost",
	async (item: iFlight, thunkAPI) => {
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

export const editFlight = createAsyncThunk(
	"posts/editPost",
	async (item: iFlight, thunkAPI) => {
		const { rejectWithValue } = thunkAPI;
		try {
			const response = await axios.patch(`${baseUrl}/${item?.id}`, item, {
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

const initialState: iFlightState = {
	flights: [],
	loading: false,
	error: null,
	flight: null,
};

const flightsSlice = createSlice({
	name: "flights",
	initialState,
	reducers: {
		cleanRecord: (state) => {
			state.flight = null;
		},
	},
	extraReducers: (builder) => {
		builder
			// fetch flights
			.addCase(fetchFlights.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(
				fetchFlights.fulfilled,
				(state, action: PayloadAction<iFlight[]>) => {
					state.loading = false;
					state.flights = action.payload;
				}
			)
			.addCase(fetchFlights.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as null;
			})
			// fetch flight
			.addCase(fetchFlight.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(
				fetchFlight.fulfilled,
				(state, action: PayloadAction<iFlight>) => {
					state.loading = false;
					state.flight = action.payload;
				}
			)
			.addCase(fetchFlight.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as null;
			})
			// delete flight
			.addCase(deleteFlight.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(
				deleteFlight.fulfilled,
				(state, action: PayloadAction<number>) => {
					state.loading = false;
					state.flights = state.flights.filter(
						(el) => el.id !== action.payload
					);
				}
			)
			.addCase(deleteFlight.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as null;
			})
			//create flight
			.addCase(insertFlight.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(
				insertFlight.fulfilled,
				(state, action: PayloadAction<iFlight>) => {
					state.loading = false;
					state.flights.push(action.payload);
				}
			)
			.addCase(insertFlight.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as null;
			}) // edit flight
			.addCase(editFlight.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(
				editFlight.fulfilled,
				(state, action: PayloadAction<iFlight>) => {
					state.loading = false;
					state.flight = action.payload;
				}
			)
			.addCase(editFlight.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as null;
			});
	},
});

export const { cleanRecord } = flightsSlice.actions;

export default flightsSlice.reducer;
