import { Outlet } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import Header from "../components/Header/Header";
import { useAppSelector } from "../hooks/reduxHooks";

const RootLayout = () => {
	const { isAuthenticated } = useAppSelector((state) => state.auth);
	return (
		<Container className="mt-5">
			{isAuthenticated && <Header />}
			<Row className="justify-content-center align-items-center">
				<Col xs={{ span: 10 }}>
					<Outlet />
				</Col>
			</Row>
		</Container>
	);
};

export default RootLayout;
