import React from "react";
import css from "./LoaderImg.module.css";

const LoaderImg = () => {
	return (
		<>
			<div className={css.loader}>
				<div className={css.dot}></div>
			</div>
			<div className={css.loader}>
				<div className={css.dot}></div>
			</div>
			<div className={css.loader}>
				<div className={css.dot}></div>
			</div>
			<div className={css.loader}>
				<div className={css.dot}></div>
			</div>
			<div className={css.loader}>
				<div className={css.dot}></div>
			</div>
			<div className={css.loader}>
				<div className={css.dot}></div>
			</div>
		</>
	);
};

export default LoaderImg;
