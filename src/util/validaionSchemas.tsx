import * as Yup from "yup";

export const addFlightSchema = Yup.object().shape({
	flightCode: Yup.string()
		.required("Flight code is required")
		.min(2, "Flight code must be at least 2 characters long")
		.max(10, "Flight code must be at most 10 characters long")
		.matches(/^FL/, "Flight code must start with 'FL'"),
	date: Yup.date()
		.required("Date is required")
		.min(new Date(), "Date must be in the future"),
	capacity: Yup.number()
		.required("Capacity is required")
		.min(10, "Capacity must be at least 10")
		.max(300, "Capacity must be at most 300")
		.typeError("Capacity must be a number"),
});

export const registerSchema = Yup.object({
	username: Yup.string().required("Username is required"),
	password: Yup.string()
		.required("Password is required")
		.min(8, "Password must be at least 8 characters"),
	confirmPassword: Yup.string()
		.required("Confirm password is required")
		.oneOf([Yup.ref("password")], "Passwords must match"),
});

export const logInSchema = Yup.object({
	usernameInput: Yup.string().required("Username is required"),
	password: Yup.string()
		.required("Password is required")
		.min(8, "Password must be at least 8 characters"),
});
