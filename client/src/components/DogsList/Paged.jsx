/** Import packages */
import React, { useState } from "react";
/** Import files */
// ! --------------------------------
/** Import styles */
import css from "./Paged.module.css";

const Paged = ({ pagina, setPagina, maximo }) => {
	const [input, setInput] = useState(1);

	const nextPage = () => {
		setInput(parseInt(input) + 1);
		setPagina(parseInt(pagina) + 1);
	};

	const previousPage = () => {
		setInput(parseInt(input) - 1);
		setPagina(parseInt(pagina) - 1);
	};

	const onKeyDown = (event) => {
		const { keyCode } = event;
		const { value } = event.target;
		if (keyCode === 13) {
			setPagina(parseInt(value));
			if (
				parseInt(value) < 1 ||
				parseInt(value) > maximo ||
				isNaN(parseInt(value))
			) {
				setPagina(1);
				setInput(1);
			} else {
				setPagina(parseInt(value));
			}
		}
	};

	const onChange = (event) => {
		const { value } = event.target;
		setInput(value);
	};

	return (
		<div className={css.container}>
			<button
				className={css.container__button}
				disabled={pagina === 1 || pagina < 1}
				onClick={previousPage}>
				&lt;
			</button>
			<input
				onChange={(event) => onChange(event)}
				onKeyDown={(event) => onKeyDown(event)}
				name="page"
				autoComplete="off"
				value={input}
			/>
			<p>de {maximo}</p>
			<button
				className={css.container__button}
				disabled={pagina === maximo || pagina > maximo}
				onClick={nextPage}>
				&gt;
			</button>
		</div>
	);
};

export default Paged;
