/** Import packages */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
/** Import files */
import { createData, getTemperaments } from "../../redux/actions";
/** Import styles */
import css from "./Create.module.css";

const validate = (data) => {
	const errors = {};
	if (!data.name) errors.name = "You must enter a name";
	if (data.name.length < 4) errors.name = "Minimum 4 characters.";
	if (!data.height_min) errors.height_min = "You must enter a minimum height";
	if (!data.height_max) errors.height_max = "You must enter a maximum height";
	if (!data.weight_min) errors.weight_min = "You must enter a minimum weight";
	if (!data.weight_max) errors.weight_max = "You must enter a maximum weight";
	if (!data.life_span) errors.life_span = "You must enter a life span";
	if (data.weight_min > data.weight_max || data.weight_max < data.weight_min)
		errors.weight_min =
			"Minimum weight must be less or equal than maximum weight ";
	if (data.height_min > data.height_max || data.height_max < data.height_min)
		errors.height_min =
			"Minimum height must be less or equal than maximum height ";
	if (!data.temperaments) {
		errors.temperaments = "You must select a temperament or create a new one";
	}
	if (!data.image) {
		errors.image = "Insert a valid image";
	}
	return errors;
};

const Create = () => {
	const dispatch = useDispatch();
	const temperaments = useSelector((state) => state.temperaments);
	const [button, setButton] = useState(true);
	const [selectedValue, setSelectedValue] = useState("Temperaments");
	const [errors, setErrors] = useState({
		name: "",
		min_height: "",
		max_height: "",
		min_weight: "",
		max_weight: "",
		life_span: "",
		image: "",
	});
	const [form, setForm] = useState({
		name: "",
		height_min: "",
		height_max: "",
		weight_min: "",
		weight_max: "",
		life_span: "",
		image: "",
		temperaments: [],
	});

	const handleChange = (event) => {
		const { name, value } = event.target;
		setForm({
			...form,
			[name]: value,
		});
		const fieldErrors = validate({
			...form,
			[name]: value,
		});
		setErrors((prevErrors) => ({ ...prevErrors, [name]: fieldErrors[name] }));
	};

	const handleSelect = (event) => {
		const { value } = event.target;
		setSelectedValue(value);
		setForm({
			...form,
			temperaments: [...form.temperaments, value],
		});
	};

	const handleDelete = (item) => {
		setForm({
			...form,
			temperaments: form.temperaments.filter((temp) => temp !== item),
		});
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		dispatch(createData(form));
		alert("The new dog was added successfully");
		setForm({
			name: "",
			height_min: "",
			height_max: "",
			weight_min: "",
			weight_max: "",
			life_span: "",
			image: "",
			temperaments: [],
		});
	};

	useEffect(() => {
		dispatch(getTemperaments());
	}, [dispatch]);

	useEffect(() => {
		if (
			form.name.length > 0 &&
			form.height_min.length > 0 &&
			form.height_max.length > 0 &&
			form.weight_min.length > 0 &&
			form.weight_max.length > 0
		)
			setButton(false);
		else setButton(true);
	}, [form, setButton]);

	return (
		<form action="" id="form" onSubmit={handleSubmit} className={css.container}>
			<div className={css.left_container}>
				<div className={css.dog}></div>
				<div className={css.content}>
					<input
						type="text"
						value={form.name}
						name="name"
						required="required"
						onChange={(event) => handleChange(event)}
						autoComplete="off"
					/>
					<label htmlFor="name">Name:</label>
					{errors.name && <div className={css.err}>{errors.name}</div>}
				</div>

				<div className={css.content}>
					<input
						type="text"
						value={form.image}
						name="image"
						required="required"
						onChange={(event) => handleChange(event)}
						autoComplete="off"
					/>
					<label htmlFor="image">Image:</label>
					{errors.image && <div className={css.err}>{errors.image}</div>}
				</div>

				<div className={css.content}>
					<input
						type="text"
						autoComplete="off"
						name="life_span"
						required="required"
						value={form.life_span}
						onChange={(event) => handleChange(event)}
					/>
					<label htmlFor="life_span">Life: </label>
					{errors.life_span && (
						<div className={css.err}>{errors.life_span}</div>
					)}
				</div>
			</div>

			<div className={css.right_continer}>
				<div className={css.top_content}>
					<div className={css.left_top}>
						<div className={css.label_input}>
							<label htmlFor="height_min">Min Height </label>
							<input
								type="text"
								value={form.height_min}
								name="height_min"
								placeholder="Min height..."
								onChange={(event) => handleChange(event)}
							/>
							{errors.height_min && (
								<div className={css.err}>{errors.height_min}</div>
							)}
						</div>

						<div className={css.label_input}>
							<label htmlFor="weight_min">Min Weight </label>
							<input
								type="text"
								value={form.weight_min}
								name="weight_min"
								placeholder="Min weight..."
								onChange={(event) => handleChange(event)}
							/>
							{errors.weight_min && (
								<div className={css.err}>{errors.weight_min}</div>
							)}
						</div>
					</div>

					<div className={css.right_top}>
						<div className={css.label_input}>
							<label htmlFor="height_max">Max Height </label>
							<input
								type="text"
								value={form.height_max}
								name="height_max"
								placeholder="Max height..."
								onChange={(event) => handleChange(event)}
							/>
							{errors.height_max && (
								<div className={css.err}>{errors.height_max}</div>
							)}
						</div>

						<div className={css.label_input}>
							<label htmlFor="weight_max">Max Weight </label>
							<input
								type="text"
								value={form.weight_max}
								name="weight_max"
								placeholder="Max weight..."
								onChange={(event) => handleChange(event)}
							/>
							{errors.weight_max && (
								<div className={css.err}>{errors.weight_max}</div>
							)}
						</div>
					</div>
				</div>

				<div className={css.bottom_content}>
					<div className={css.temper}>
						<div className={css.select}>
							<p>
								Temperaments:
								<span style={{ color: "transparent" }}>_</span>
							</p>
							<select
								value={selectedValue}
								required
								onChange={(event) => handleSelect(event)}>
								<option disabled>Temperaments</option>
								{temperaments.map((d) => (
									<option value={d.name} key={d.name + Math.random()}>
										{d.name}
									</option>
								))}
							</select>
						</div>

						<div className={css.select_values}>
							{form.temperaments.map((el) => (
								<div
									className={css.selected_values}
									key={el}
									onClick={() => handleDelete(el)}>
									{`${el}`}
								</div>
							))}
							{errors.temperaments && (
								<div className={css.err}>{errors.temperaments}</div>
							)}
						</div>
					</div>
					<div className={css.cancel_create}>
						<Link to="/dogs">
							<button className={`${css.button_send} ${css.red}`}>
								<span>Cancel</span>
								<svg viewBox="0 0 13 10" height="10px" width="15px">
									<path d="M1,5 L11,5"></path>
									<polyline points="8 1 12 5 8 9"></polyline>
								</svg>
							</button>
						</Link>
						<button
							disabled={button}
							type="submit"
							form="form"
							className={`${css.button_send} ${css.blue}`}>
							<span>Create</span>
							<svg viewBox="0 0 13 10" height="10px" width="15px">
								<path d="M1,5 L11,5"></path>
								<polyline points="8 1 12 5 8 9"></polyline>
							</svg>
						</button>
					</div>
				</div>
			</div>
		</form>
	);
};

export default Create;
