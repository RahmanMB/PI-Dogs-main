/** Import package */
import React from "react";
import { NavLink } from "react-router-dom";
/** Import files */
import img_1 from "../../assets/images/Fannci_18.png";
import icon_1 from "../../assets/icons/arrow-narrow-right.png";
/** Import styles */
import css from "./LandingPage.module.css";

const LandingPage = () => {
	return (
		<div className={css.container}>
			<div className={css.left_container}>
				<p className={css.hachiko}>
					The story of Hachiko, with his undying and heartbreaking loyalty, is a
					poignant reminder that dogs are noble and loving beings who love us
					unconditionally with a devotion rarely seen in humans, a true treasure
					in our lives.
				</p>
			</div>
			<div className={css.right_container}>
				<img src={img_1} alt="Hachiko geomtry art" className={css.image} />
				<span className={css.text}>The Dog</span>
				<h2 className={css.text}>Hachiko</h2>
				<NavLink to="/dogs">
					<button className={css.button}>
						start <img src={icon_1} alt="" className={css.icon} />
					</button>
				</NavLink>
			</div>
		</div>
	);
};

export default LandingPage;
