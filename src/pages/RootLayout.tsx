import { Outlet } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import Header from "../components/Header/Header";

const RootLayout = () => {
	return (
		<Container className="mt-5">
			<Header />
			<Row className="justify-content-center align-items-center">
				<Col xs={{ span: 10 }}>
					<Outlet />
				</Col>
			</Row>
		</Container>
	);
};

export default RootLayout;
