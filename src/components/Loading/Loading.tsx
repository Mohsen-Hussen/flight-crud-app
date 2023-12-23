import { Spinner } from "react-bootstrap";
import style from "./loading.module.css";

const Loading = () => {
	return (
		<div className={style.spinnerLoader}>
			<Spinner animation="grow" variant="primary" />
			<Spinner animation="grow" variant="secondary" />
			<Spinner animation="grow" variant="success" />
			<Spinner animation="grow" variant="danger" />
			<Spinner animation="grow" variant="warning" />
			<Spinner animation="grow" variant="info" />
			<Spinner animation="grow" variant="dark" />
		</div>
	);
};

export default Loading;
