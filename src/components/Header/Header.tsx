import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import style from "./header.module.css";

const Header = () => {
	const location = useLocation();
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
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default Header;
