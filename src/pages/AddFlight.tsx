import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addFlightSchema } from "../util/validaionSchemas";
import { insertFlight } from "../store/flightsSlice";
import { AddFlightFormData } from "../interfaces/props";
import { Button, Form } from "react-bootstrap";
import style from "./addFlight.module.css";

const AddFlight = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { flight, loading } = useAppSelector((state) => state.flights);
	// **Add a state variable to store the selected date as a string**
	const [selectedDateString, setSelectedDateString] = useState<string>(
		flight?.date?.toString().split("T")[0] || ""
	);
	const {
		control,
		setValue,
		register,
		handleSubmit,
		formState: { errors }, // Access errors from formState
	} = useForm({
		resolver: yupResolver(addFlightSchema), // Integrate Yup validation
	});

	const onSubmit = (data: AddFlightFormData) => {
		// Transform the date format to YYYY/MM/DD before submission
		const formattedDate = data.date.toISOString().slice(0, 10);
		const id = Math.floor(Math.random() * 500);
		dispatch(
			insertFlight({
				id,
				flightCode: data.flightCode,
				date: formattedDate,
				capacity: data.capacity,
			})
		)
			.unwrap()
			.then(() => {
				navigate("/");
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<Form onSubmit={handleSubmit(onSubmit)} className={style.form}>
			<Form.Group className="mb-3" controlId="flightCode">
				<Form.Label>Flight Code</Form.Label>
				<Form.Control
					type="text"
					{...register("flightCode")}
					isInvalid={!!errors.flightCode}
				/>
				<Form.Control.Feedback type="invalid" className={style.errorMsg}>
					{errors.flightCode?.message}
				</Form.Control.Feedback>
			</Form.Group>
			<Form.Group className="mb-3" controlId="capacity">
				<Form.Label>Capacity</Form.Label>
				<Form.Control
					type="number"
					{...register("capacity")}
					isInvalid={!!errors.capacity}
				/>
				<Form.Control.Feedback type="invalid" className={style.errorMsg}>
					{errors.capacity?.message}
				</Form.Control.Feedback>
			</Form.Group>
			<Form.Group className="mb-3" controlId="date">
				<Form.Label>Date</Form.Label>
				<Controller
					control={control}
					name="date"
					render={({ field, fieldState }) => (
						<Form.Control
							type="date"
							{...field}
							isInvalid={fieldState.invalid}
							value={selectedDateString}
							onChange={(e) => {
								setSelectedDateString(e.target.value); // Update the string state
								// **Parse the string to a Date object before setting the value**
								setValue("date", new Date(e.target.value), {
									shouldValidate: true,
								});
							}}
						/>
					)}
				/>
				<Form.Control.Feedback type="invalid" className={style.errorMsg}>
					{errors.date?.message}
				</Form.Control.Feedback>
			</Form.Group>
			<div className="d-flex justify-content-center align-item-center">
				{loading ? (
					<Button
						variant="primary"
						type="submit"
						size="lg"
						className={style.addBtn}
						disabled={true}
					>
						Loading ...
					</Button>
				) : (
					<Button
						variant="primary"
						type="submit"
						size="lg"
						className={style.addBtn}
					>
						Add Flight
					</Button>
				)}
			</div>
		</Form>
	);
};

export default AddFlight;
