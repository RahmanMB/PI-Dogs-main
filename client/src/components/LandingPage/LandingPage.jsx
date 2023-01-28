/** Import package */
import React from "react";
import { Link } from "react-router-dom";
/** Import files */
/** Import styles */
import css from "./LandingPage.module.css";

const LandingPage = () => {
	return (
		<div className={css.container}>
			<div className={css.left_container}>
				<p className={css.title}>The Dog Hachiko</p>
				<p className={css.text}>
					The story of Hachiko, with his undying and heartbreaking loyalty, is a
					poignant reminder that dogs are noble and loving beings who love us
					unconditionally with a devotion rarely seen in humans, a true treasure
					in our lives.
				</p>
				<div className={css.bottom__container}>
					<Link to="/dogs">
						<div className={css.button__container}>
							<button className={css.learn_more}>
								<span className={css.circle} aria-hidden="true">
									<span className={`${css.icon} ${css.arrow}`}></span>
								</span>
								<span className={css.button_text}> Get Started</span>
							</button>
						</div>
					</Link>
				</div>
			</div>

			<div className={css.right_container}></div>
		</div>
	);
};

export default LandingPage;
