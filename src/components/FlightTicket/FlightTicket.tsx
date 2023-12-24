import { Button } from "react-bootstrap";
import style from "./flightTicket.module.css";
import { Barcode, Edit, Trash } from "iconsax-react";
import { FlightTicketProps } from "../../interfaces/props";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { useState } from "react";
import ConfirmModal from "../Modal/ConfirmModal";
import { deleteFlight } from "../../store/flightsSlice";

const FlightTicket = ({ flight }: FlightTicketProps) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [showModal, setShowModal] = useState<boolean>(false);
	const [selectedFlightId, setSelectedFlightId] = useState<number | null>(null);
	const handleDelete = async () => {
		if (selectedFlightId !== null) {
			try {
				await dispatch(deleteFlight(selectedFlightId));
				handleCloseModal();
			} catch (error) {
				console.error("Error deleting post:", error);
				handleCloseModal();
			}
		}
	};

	const handleShowModal = (id: number) => {
		setSelectedFlightId(id);
		setShowModal(true);
	};

	const handleCloseModal = () => {
		setSelectedFlightId(null);
		setShowModal(false);
	};
	return (
		<>
			<div className={style.flightCard}>
				<div className="d-flex justify-content-between align-items-center mb-2">
					<Button className={style.editBtn}>
						<Edit size="20" color="#fff" />
					</Button>
					<Button
						className={style.detailsBtn}
						onClick={() => navigate(`flight/${flight.id}`)}
					>
						<Barcode size="20" color="#fff" />
					</Button>
					<Button
						className={style.deleteBtn}
						onClick={() => handleShowModal(flight.id)}
					>
						<Trash size="20" color="#D43232" />
					</Button>
				</div>
				<div
					className={`d-flex justify-content-between align-items-center ${style.fCode}`}
				>
					<span>Flight Code</span>
					<span>{flight.flightCode}</span>
				</div>
				<div
					className={`d-flex justify-content-between align-items-center ${style.fCapacity}`}
				>
					<span>Capacity</span>
					<span>{flight.capacity}</span>
				</div>
				<div
					className={`d-flex justify-content-between align-items-center ${style.fDate}`}
				>
					<span>Date</span>
					<span>{flight.date.toLocaleString()}</span>
				</div>
			</div>
			<ConfirmModal
				show={showModal}
				onHide={handleCloseModal}
				onConfirmDelete={handleDelete}
				fCode={flight.flightCode}
			/>
		</>
	);
};

export default FlightTicket;
