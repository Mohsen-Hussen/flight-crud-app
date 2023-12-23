import { Col, Row } from "react-bootstrap";
import FlightTicket from "../FlightTicket/FlightTicket";

const FlightTickets = () => {
	return (
		<Row>
			<Col sm={12} md={6} lg={4}>
				<FlightTicket />
			</Col>
			<Col sm={12} md={6} lg={4}>
				<FlightTicket />
			</Col>
			<Col sm={12} md={6} lg={4}>
				<FlightTicket />
			</Col>
			<Col sm={12} md={6} lg={4}>
				<FlightTicket />
			</Col>
		</Row>
	);
};

export default FlightTickets;
