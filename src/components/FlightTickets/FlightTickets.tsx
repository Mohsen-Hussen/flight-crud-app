import { Col, Row } from "react-bootstrap";
import FlightTicket from "../FlightTicket/FlightTicket";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { useEffect } from "react";
import { fetchFlights } from "../../store/flightsSlice";
import Loading from "../Loading/Loading";

const FlightTickets = () => {
	const dispatch = useAppDispatch();
	const { flights, loading, error } = useAppSelector((state) => state.flights);
	useEffect(() => {
		dispatch(fetchFlights());
	}, [dispatch]);

	return loading ? (
		<Loading />
	) : error ? (
		<div className={`alert alert-danger`}>
			<p>Somthing went wrong</p>
		</div>
	) : (
		<Row>
			{flights.map((flight) => (
				<Col sm={12} md={6} lg={4} key={flight.id}>
					<FlightTicket flight={flight} />
				</Col>
			))}
		</Row>
	);
};

export default FlightTickets;
