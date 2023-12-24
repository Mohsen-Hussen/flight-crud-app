import { Button, Modal } from "react-bootstrap";
import { DeleteConfirmationModalProps } from "../../interfaces/props";

const ConfirmModal = ({
	show,
	fCode,
	onHide,
	onConfirmDelete,
}: DeleteConfirmationModalProps) => {
	return (
		<Modal show={show} onHide={onHide}>
			<Modal.Header closeButton>
				<Modal.Title>Confirm to delete {fCode}</Modal.Title>
			</Modal.Header>
			<Modal.Body>Are you sure you want to delete {fCode} flight?</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={onHide}>
					Cancel
				</Button>
				<Button variant="danger" onClick={onConfirmDelete}>
					Delete
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default ConfirmModal;
