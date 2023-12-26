import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import style from "./header.module.css";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { logoutUser } from "../../store/authSclice";

const Header = () => {
	const location = useLocation();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleLogout = async (e: { preventDefault: () => void }) => {
		e.preventDefault(); // Prevent default link behavior
		await dispatch(logoutUser()); // Await logout completion
		navigate("/login");
	};
	return (
		<Navbar expand="lg" className={style.header}>
			<Container>
				<Navbar.Brand as={Link} to="/" className={style.whiteColor}>
					Flight Crud App
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav" className={style.linksAlign}>
					<Nav>
						<Nav.Link
							as={Link}
							to="/"
							className={`${style.navLink} ${
								location.pathname === "/" ? style.active : ""
							}`}
						>
							Home
						</Nav.Link>
						<Nav.Link
							as={Link}
							to="/flight/add"
							className={`${style.navLink} ${
								location.pathname === "/flight/add" ? style.active : ""
							}`}
						>
							Add
						</Nav.Link>
						<Nav.Link
							as={Link}
							to="/login"
							className={`${style.navLink} ${
								location.pathname === "/login" ? style.active : ""
							}`}
							onClick={handleLogout}
						>
							Logout
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default Header;
