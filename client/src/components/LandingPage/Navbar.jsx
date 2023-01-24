/** Import packages */
import React from "react";
import { NavLink } from "react-router-dom";
/** Import files */
import img_1 from "../../assets/images/Fannci_1.png";
import img_2 from "../../assets/images/Fannci_1.png";
/** Import styles */
import css from "./Navbar.module.css";

const Navbar = () => {
	return (
		<div className={css.navbarContainer}>
			<nav className={css.navbarContent}>
				<NavLink to="/dogs" className={css.navLink}>
					<img className={css.navbarLogo} src={img_1} alt="logo" />
				</NavLink>
				<NavLink className={css.navLink} to="/create">
					Create
				</NavLink>
				<NavLink className={css.navLink} to="/">
					<img className={css.navbarLogo} src={img_2} alt="logo" />
				</NavLink>
			</nav>
		</div>
	);
};

export default Navbar;
