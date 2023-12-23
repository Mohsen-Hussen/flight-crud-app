export interface iFlight {
	id: number;
	flightCode: string;
	date: Date;
	capacity: number;
}

export interface iFlightState {
	flights: iFlight[];
	loading: boolean;
	error: null;
	flight: iFlight | null;
}
