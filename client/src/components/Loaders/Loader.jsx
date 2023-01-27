import React from "react";
import css from "./Loader.module.css";

const Loader = () => {
	return (
		<div className={css.spinner}>
			<div className={css.spinner1}></div>
		</div>
	);
};

export default Loader;
