import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../store";
import { fetchFlight } from "../store/flightsSlice";

const useFlightDetails = () => {
	const { id } = useParams();
	const parsedId = id ? parseInt(id, 10) : undefined; // Convert id to number or undefined
	const dispatch = useDispatch<AppDispatch>();
	const { loading, error, flight } = useSelector(
		(state: RootState) => state.flights
	);
	useEffect(() => {
		if (parsedId !== undefined) {
			dispatch(fetchFlight(parsedId));
		}
	}, [dispatch, parsedId]);

	return { loading, error, flight };
};

export default useFlightDetails;
