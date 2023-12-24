import { iFlight } from "./reduxToolkit";

export interface FlightTicketProps {
	flight: iFlight;
}

export interface DeleteConfirmationModalProps {
	show: boolean;
	onHide: () => void;
	onConfirmDelete: () => void;
}
