import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../util/validaionSchemas";
import { addUser } from "../interfaces/props";
import { registerUser } from "../store/authSclice";
import { Form, Button } from "react-bootstrap";
import style from "./addFlight.module.css";

const RegisterForm = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { loading } = useAppSelector((state) => state.flights);

	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(registerSchema),
	});

	const onSubmit = async (data: addUser) => {
		const id = Math.floor(Math.random() * 500);
		dispatch(
			registerUser({
				id,
				username: data.username,
				password: data.password,
			})
		)
			.unwrap()
			.then(() => {
				navigate("/login");
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<Form onSubmit={handleSubmit(onSubmit)} className={style.form}>
			<Form.Group className="mb-3" controlId="username">
				<Form.Label>Username:</Form.Label>
				<Form.Control
					type="text"
					{...register("username")} // Use register for individual fields
					placeholder="Enter username"
					isInvalid={!!errors.username}
				/>
				<Form.Control.Feedback type="invalid" className={style.errorMsg}>
					{errors.username?.message}
				</Form.Control.Feedback>
			</Form.Group>
			<Form.Group className="mb-3" controlId="password">
				<Form.Label>Password:</Form.Label>
				<Form.Control
					type="password"
					{...register("password")} // Use register for individual fields
					placeholder="Enter password"
					isInvalid={!!errors.password}
				/>
				<Form.Control.Feedback type="invalid" className={style.errorMsg}>
					{errors.password?.message}
				</Form.Control.Feedback>
			</Form.Group>
			<Form.Group className="mb-3" controlId="confirmPassword">
				<Form.Label>Confirm Password:</Form.Label>
				<Form.Control
					type="password"
					{...register("confirmPassword")} // Use register for individual fields
					placeholder="Confirm password"
					isInvalid={!!errors.confirmPassword}
				/>
				<Form.Control.Feedback type="invalid" className={style.errorMsg}>
					{errors.confirmPassword?.message}
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
						Register
					</Button>
				)}
			</div>
		</Form>
	);
};

export default RegisterForm;
