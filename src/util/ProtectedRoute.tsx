/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ComponentType, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface ProtectedRouteProps {
	component: ComponentType<any>;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
	component: Component,
	...rest
}): any => {
	const isAuthenticated = useSelector(
		(state: any) => state.auth.isAuthenticated
	);

	const navigate = useNavigate();

	useEffect(() => {
		if (!isAuthenticated) {
			navigate("/login");
			return;
		}
	}, [isAuthenticated, navigate]);

	return <Component {...rest} />;
};

export default ProtectedRoute;
