import { Button } from "react-bootstrap";
import style from "./flightTicket.module.css";
import { Edit, Trash } from "iconsax-react";

const FlightTicket = () => {
	return (
		<div className={style.flightCard}>
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
				<span>FL001</span>
			</div>
			<div
				className={`d-flex justify-content-between align-items-center ${style.fCapacity}`}
			>
				<span>Capacity</span>
				<span>20</span>
			</div>
			<div>date</div>
		</div>
	);
};

export default FlightTicket;
