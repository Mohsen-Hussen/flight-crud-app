import { useEffect } from "react";
import useFlightDetails from "../hooks/use-flight-details";
import { AppDispatch } from "../store";
import { useDispatch } from "react-redux";
import { cleanRecord } from "../store/flightsSlice";
import style from "./fightDetails.module.css";
import Loading from "../components/Loading/Loading";

const FlightDetails = () => {
	const { loading, error, flight } = useFlightDetails();
	const dispatch = useDispatch<AppDispatch>();
	useEffect(() => {
		return () => {
			dispatch(cleanRecord());
		};
	}, [dispatch]);
	return loading ? (
		<Loading />
	) : error ? (
		<div className={`alert alert-danger`}>
			<p>Somthing went wrong</p>
		</div>
	) : (
		<div className={style.flightCard}>
			<div
				className={`d-flex justify-content-between align-items-center ${style.fCode}`}
				style={{ color: "#fff" }}
			>
				<span>Flight Code</span>
				<span>{flight?.flightCode}</span>
			</div>
			<div
				className={`d-flex justify-content-between align-items-center ${style.fCapacity}`}
			>
				<span>Capacity</span>
				<span>{flight?.capacity}</span>
			</div>
			<div
				className={`d-flex justify-content-between align-items-center ${style.fDate}`}
			>
				<span>Date</span>
				<span>{flight?.date.toLocaleString()}</span>
			</div>
		</div>
	);
};

export default FlightDetails;
