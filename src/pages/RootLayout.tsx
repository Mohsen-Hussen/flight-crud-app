import { Outlet } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import Header from "../components/Header/Header";

const RootLayout = () => {
	return (
		<Container className="mt-5">
			<Header />
			<Row>
				<Col xs={{ span: 8, offset: 2 }}>
					<Outlet />
				</Col>
			</Row>
		</Container>
	);
};

export default RootLayout;
