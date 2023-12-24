import { Button } from "react-bootstrap";
import style from "./flightTicket.module.css";
import { Edit, Trash } from "iconsax-react";
import { FlightTicketProps } from "../../interfaces/props";
import { useNavigate } from "react-router-dom";

const FlightTicket = ({ flight }: FlightTicketProps) => {
	const navigate = useNavigate();
	return (
		<div
			className={style.flightCard}
			onClick={() => navigate(`flight/${flight.id}`)}
		>
			<div className="d-flex justify-content-between align-items-center mb-2">
				<Button className={style.editBtn}>
					<Edit size="20" color="#fff" />
				</Button>
				<Button className={style.deleteBtn}>
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
	);
};

export default FlightTicket;
