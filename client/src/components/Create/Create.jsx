/** Import packages */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
/** Import files */
import { createData, getTemperaments } from "../../redux/actions";
/** Import styles */
// import css from './Create.module.css';

const validate = (form) => {
	const errors = {};
	if (!form.name) {
		errors.name = "Name is required, it should not contain numbers";
	}
	if (!form.height_min || !form.height_max) {
		errors.height = "Height is required";
	}
	if (!form.weight_min || !form.weight_max) {
		errors.weight = "Weight is required";
	}
	if (!form.life_span) {
		errors.life_span =
			"Lifespan is required, type only numbers separated by a dash (-)";
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
		height_min: "",
		height_max: "",
		weight_min: "",
		weight_max: "",
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

	const handleChange = (event) => {
		const { name, value } = event.target;
		setForm({
			...form,
			[name]: value,
		});
		setErrors(
			validate({
				...form,
				[name]: value,
			})
		);
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
	return (
		<div>
			<div>
				<Link to="/home">
					<button>Go home</button>
				</Link>
				<form action="" id="form" onSubmit={handleSubmit}>
					<div>
						<input
							type="text"
							value={form.name}
							name="name"
							onChange={(event) => handleChange(event)}
							autoComplete="off"
							placeholder="Name..."
						/>
					</div>
					<div>{errors.name && <p>{errors.name}</p>}</div>{" "}
					{/*mesaje ed error de nombre*/}
					<div>
						<div>
							<label htmlFor="height_min">Min Height </label>
							<input
								type="text"
								value={form.height_min}
								name="height_min"
								placeholder="Min height..."
								onChange={(event) => handleChange(event)}
							/>
						</div>

						<div>
							<label htmlFor="height_max">Max Height </label>
							<input
								type="text"
								value={form.height_max}
								name="height_max"
								placeholder="Max height..."
								onChange={(event) => handleChange(event)}
							/>
						</div>
					</div>
					<div>{errors.height && <p>{errors.height}</p>}</div>
					{/* espacio para agregar error */}
					<div>
						<div>
							<label htmlFor="weight_min">Min Weight </label>
							<input
								type="text"
								value={form.weight_min}
								name="weight_min"
								placeholder="Min weight..."
								onChange={(event) => handleChange(event)}
							/>
						</div>

						<div>
							<label htmlFor="weight_max">Max Weight </label>
							<input
								type="text"
								value={form.weight_max}
								name="weight_max"
								placeholder="Max weight..."
								onChange={(event) => handleChange(event)}
							/>
						</div>
					</div>
					<div>{errors.weight && <p>{errors.weight}</p>}</div>
					{/* espacio para agregar error */}
					<div>
						<label htmlFor="life_span">life_span </label>
						<input
							type="text"
							autoComplete="off"
							name="life_span"
							value={form.life_span}
							placeholder="lifespan exam: 10 - 12"
							onChange={(event) => handleChange(event)}
						/>
					</div>
					<div>{errors.life_span && <p>{errors.life_span}</p>}</div>
					{/* espacio para agregar error */}
					<div className="image-container">
						<input
							type="text"
							autoComplete="off"
							value={form.image}
							name="image"
							placeholder="Image URL..."
							onChange={(event) => handleChange(event)}
						/>
					</div>
					<div>
						<h3>Select Temperaments</h3>
					</div>
					<div>
						<select
							value={selectedValue}
							onChange={(event) => handleSelect(event)}>
							<option disabled>Temperaments</option>
							{temperaments.map((d) => (
								<option value={d.name} key={d.name + Math.random()}>
									{d.name}
								</option>
							))}
						</select>
					</div>
					<div>
						<button disabled={button} type="submit" form="form">
							Create Dog
						</button>
					</div>
				</form>

				<div className="">
					<div className="">
						<h2>Temperaments</h2>
					</div>

					<div>
						{form.temperaments.map((el) => (
							<div key={el} onClick={() => handleDelete(el)}>
								<p>{`${el}`}</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Create;
