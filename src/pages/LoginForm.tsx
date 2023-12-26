import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../interfaces/props";
import { Form, Button } from "react-bootstrap";
import style from "./addFlight.module.css";
import { fetchUsers } from "../store/authSclice";
import { useEffect } from "react";
import { logInSchema } from "../util/validaionSchemas";

const LoginForm = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { loading } = useAppSelector((state) => state.flights);
	const { username, isAuthenticated } = useAppSelector((state) => state.auth);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(logInSchema),
	});

	const onSubmit = async (data: loginUser) => {
		try {
			await dispatch(fetchUsers(data.usernameInput));

			if (isAuthenticated && username === data.usernameInput) {
				navigate("/");
			} else {
				return;
			}
		} catch (error) {
			console.error("Error fetching users:", error);
		}
	};

	useEffect(() => {
		if (isAuthenticated) {
			navigate("/");
		}
	}, [isAuthenticated, navigate]);

	return (
		<Form onSubmit={handleSubmit(onSubmit)} className={style.form}>
			<Form.Group className="mb-3" controlId="username">
				<Form.Label>Username:</Form.Label>
				<Form.Control
					type="text"
					{...register("usernameInput")}
					placeholder="Enter username"
					isInvalid={!!errors.usernameInput}
				/>
				<Form.Control.Feedback type="invalid" className={style.errorMsg}>
					{errors.usernameInput?.message}
				</Form.Control.Feedback>
			</Form.Group>

			<Form.Group className="mb-3" controlId="password">
				<Form.Label>Password:</Form.Label>

				<Form.Control
					type="password"
					{...register("password")}
					placeholder="Enter password"
					isInvalid={!!errors.password}
				/>
				<Form.Control.Feedback type="invalid" className={style.errorMsg}>
					{errors.password?.message}
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
						Login
					</Button>
				)}
			</div>
			<p className={style.registerLink}>
				Don't have an account? <Link to="/register">Register</Link>
			</p>
		</Form>
	);
};

export default LoginForm;
