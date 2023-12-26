import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { store } from "./store";
import RootLayout from "./pages/RootLayout";
import ErrorPage from "./pages/ErrorPage";
import Index from "./pages/Index";
import AddFlight from "./pages/AddFlight";
import FlightDetails from "./pages/FlightDetails";
import EditFlight from "./pages/EditFlight";
import RegisterForm from "./pages/RegisterForm";
import LoginForm from "./pages/LoginForm";

const router = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout />,
		errorElement: <ErrorPage />,
		children: [
			{ index: true, element: <Index /> },
			{ path: "flight", element: <Index /> },
			{ path: "flight/add", element: <AddFlight /> },
			{ path: "flight/:id", element: <FlightDetails /> },
			{ path: "flight/:id/edit", element: <EditFlight /> },
			{ path: "/register", element: <RegisterForm /> },
			{ path: "/login", element: <LoginForm /> },
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
);
