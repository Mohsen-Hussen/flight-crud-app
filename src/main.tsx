import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import RootLayout from "./pages/RootLayout";
import ErrorPage from "./pages/ErrorPage";
import Index from "./pages/Index";
import AddFlight from "./pages/AddFlight";
import FlightDetails from "./pages/FlightDetails";
import EditFlight from "./pages/EditFlight";

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
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
