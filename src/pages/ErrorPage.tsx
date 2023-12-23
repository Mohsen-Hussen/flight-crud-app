import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate, useRouteError } from "react-router-dom";
import notFoundImage from "../assets/not-found.png";

const ErrorPage = () => {
	const error = useRouteError() as Error;
	const navigate = useNavigate();
	return (
		<Container>
			<Row>
				<Col xs={{ span: 8, offset: 2 }}>
					<div className="mt-5 text-center">
						<h1>Oops!</h1>
						<p>Sorry, an unexpected error has occurred.</p>
						<img
							src={notFoundImage}
							alt="not-found"
							style={{ maxWidth: "100%" }}
							width={600}
						/>
						<p>
							<i>{error.name || error.message}</i>
						</p>
						<Button
							variant="link"
							onClick={() => navigate("/", { replace: true })}
						>
							Home
						</Button>
					</div>
				</Col>
			</Row>
		</Container>
	);
};

export default ErrorPage;
