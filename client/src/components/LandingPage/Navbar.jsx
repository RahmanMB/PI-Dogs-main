/** Import packages */
import React from "react";
import { NavLink } from "react-router-dom";
/** Import files */
/** Import styles */
// import css from 'Navbar.module.css';

const Navbar = () => {
	return (
		<div>
			<nav>
				<div>
					<NavLink exact to="/dogs" activeClassName="active">
						Dogs
					</NavLink>
					<NavLink exact to="/create" activeClassName="active">
						Create
					</NavLink>
					<NavLink exact to="/" activeClassName="active">
						Landoing Page
					</NavLink>
				</div>
			</nav>
		</div>
	);
};

export default Navbar;
