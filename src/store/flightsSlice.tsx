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
			});
	},
});

export const { cleanRecord } = flightsSlice.actions;

export default flightsSlice.reducer;
