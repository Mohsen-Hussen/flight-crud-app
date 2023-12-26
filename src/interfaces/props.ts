import { iFlight } from "./reduxToolkit";

export interface FlightTicketProps {
	flight: iFlight;
}

export interface DeleteConfirmationModalProps {
	show: boolean;
	fCode: string;
	onHide: () => void;
	onConfirmDelete: () => void;
}

export interface AddFlightFormData {
	flightCode: string;
	date: Date;
	capacity: number;
}

export interface addUser {
	username: string;
	password: string;
	confirmPassword: string;
}
