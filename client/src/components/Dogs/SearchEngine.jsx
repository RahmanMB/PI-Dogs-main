/** import packages */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
/** Import files */
import { getName } from "../../redux/actions";
/** Import styles */
// import css from './SearchEngine.module.css'

const SearchEngine = () => {
	const dispatch = useDispatch();
	const [search, setSearch] = useState("");

	const handleInput = (event) => {
		event.preventDefault();
		const { name, value } = event.target;
		console.log(name, value);
		setSearch(value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		dispatch(getName(search));
	};

	const onKeyDown = (event) => {
		const { keyCode } = event;
		const { value } = event.target;
		if (keyCode === 13) {
			handleSubmit(event);
			setSearch("");
		} else {
			setSearch(value);
		}
	};

	return (
		<div>
			<input
				type="text"
				name="search"
				placeholder="Search..."
				autoComplete="off"
				value={search}
				onKeyDown={(event) => onKeyDown(event)}
				onChange={(event) => handleInput(event)}
			/>
			<button type="submit" onClick={(event) => handleSubmit(event)}>
				search
			</button>
		</div>
	);
};

export default SearchEngine;
