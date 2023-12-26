export interface iFlight {
	id: number;
	flightCode: string;
	date: Date | string;
	capacity: number;
}

export interface iFlightState {
	flights: iFlight[];
	loading: boolean;
	error: null;
	flight: iFlight | null;
}

export interface iUser {
	id: number | null;
	username: string | null;
	password: string | null;
	isAuthenticated?: boolean;
}
