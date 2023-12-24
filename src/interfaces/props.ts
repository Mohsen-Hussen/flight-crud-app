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
