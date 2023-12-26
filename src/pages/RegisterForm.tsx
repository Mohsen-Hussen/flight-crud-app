import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form, Button } from "react-bootstrap";
import { addUser } from "../interfaces/props";
import { useAppDispatch } from "../hooks/reduxHooks";
import { registerUser } from "../store/authSclice";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
	username: Yup.string().required("Username is required"),
	password: Yup.string()
		.required("Password is required")
		.min(8, "Password must be at least 8 characters"),
	confirmPassword: Yup.string()
		.required("Confirm password is required")
		.oneOf([Yup.ref("password")], "Passwords must match"),
});

const RegisterForm = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(validationSchema),
	});

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
				navigate("/");
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<Form.Group className="mb-3" controlId="username">
				<Form.Label>Username:</Form.Label>
				<Form.Control
					type="text"
					{...register("username")} // Use register for individual fields
					placeholder="Enter username"
					isInvalid={!!errors.username}
				/>
				<Form.Control.Feedback type="invalid">
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
				<Form.Control.Feedback type="invalid">
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
				<Form.Control.Feedback type="invalid">
					{errors.confirmPassword?.message}
				</Form.Control.Feedback>
			</Form.Group>
			<Button variant="primary" type="submit">
				Register
			</Button>
		</Form>
	);
};

export default RegisterForm;
