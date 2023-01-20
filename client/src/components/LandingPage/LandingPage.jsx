/** Import package */
import React from "react";
import { Link } from "react-router-dom";
/** Import files */
/** Import styles */
// import css from './LandingPage.module.css';

/**
 * Pagina inicial: deben armar una landing page con:
 *   * Alguna imagen de fondo representativa al proyecto
 *   *Botón para ingresar al home (Ruta principal)
 */

const LandingPage = () => {
	return (
		<div>
			<h2>Landing Page</h2>
			<Link to="/dogs">
				<button type="button">Dogs</button>
			</Link>
		</div>
	);
};

export default LandingPage;
