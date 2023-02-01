/** Import packages */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link, useParams } from "react-router-dom";
/** Import files */
import { getTemperaments, updateData } from "../../redux/actions";
import regexValidation from "../Create/RegexExpr";
/** Import styles */
import css from "./Put.module.css";

const Put = () => {
	const dispatch = useDispatch();
	const allDogs = useSelector((state) => state.dogs);
	const nameDogs = allDogs.map((obj) => obj.name.trim().toLowerCase());
	const temperaments = useSelector((state) => state.temperaments);
	const [button, setButton] = useState(true);
	const [selectedValue, setSelectedValue] = useState("Temperaments");
	const [imageUrl, setImageUrl] = useState("");
	const history = useHistory();

	const { id } = useParams();
	const filterData = allDogs.find((dog) => dog.id === Number(id));
	const [errors, setErrors] = useState({
		name: "",
		height_min: "",
		height_max: "",
		weight_min: "",
		weight_max: "",
		life_span: "",
		temperaments: "",
		image: "",
	});
	const [data, setData] = useState({
		name: filterData.name,
		height_min: filterData.height_min,
		height_max: filterData.height_max,
		weight_min: filterData.weight_min,
		weight_max: filterData.weight_max,
		life_span: filterData.life_span.split(" ").slice(0, 3).join(" "),
		temperaments: filterData.temperaments.split(",").map((el) => el.trim()),
		image: filterData.image,
	});

	const handleChange = (event) => {
		const { name, value } = event.target;
		setData({
			...data,
			[name]: value,
		});
	};

	const handleOnBlur = (event) => {
		const { name, value } = event.target;
		const fieldErrors = regexValidation(name, value, data, nameDogs);
		setErrors({
			...errors,
			[name]: fieldErrors,
		});
		if (name === "image") setImageUrl(value);
	};

	const handleSelect = (event) => {
		const { value } = event.target;
		setSelectedValue(value);
		setData({
			...data,
			temperaments: [...data.temperaments, value],
		});
	};

	const handleDelete = (item) => {
		setData({
			...data,
			temperaments: data.temperaments.filter((temp) => temp !== item),
		});
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		dispatch(
			updateData({
				...data,
				id,
				life_span: `${data.life_span} years`,
			})
		);
		alert("The dog was upload successfully");
		history.push("../");
		setData({});
	};

	useEffect(() => {
		dispatch(getTemperaments());
	}, [dispatch]);

	useEffect(() => {
		const result = Object.values(errors).every((val) => val === "");
		if (result) {
			setButton(false);
		} else setButton(true);
	}, [setButton, errors]);

	return (
		<form action='' id='form' onSubmit={handleSubmit} className={css.container}>
			<div className={css.left_container}>
				<div className={css.top_container}>{imageUrl && <img src={imageUrl} alt='load dog profile' />}</div>
				<div className={css.bottom_container}>
					<div className={css.la_in}>
						<label htmlFor='name'>Name:</label>
						<input
							type='text'
							value={data.name}
							name='name'
							required=''
							placeholder='Name, example (akita)....'
							onBlur={(event) => handleOnBlur(event)}
							onChange={(event) => handleChange(event)}
							autoComplete='off'
						/>
						{errors.name && <p className={css.err}>{errors.name}</p>}
					</div>
					<div className={css.la_in}>
						<label htmlFor='image'>Image:</label>
						<input
							type='text'
							value={data.image}
							name='image'
							required=''
							placeholder='Image....'
							onBlur={(event) => handleOnBlur(event)}
							onChange={(event) => handleChange(event)}
							autoComplete='off'
						/>
						{errors.image && <p className={css.err}>{errors.image}</p>}
					</div>
					<div className={css.la_in}>
						<label htmlFor='life_span'>Life: </label>
						<input
							type='text'
							autoComplete='off'
							name='life_span'
							required=''
							placeholder='Life, example (10 - 12)....'
							value={data.life_span}
							onBlur={(event) => handleOnBlur(event)}
							onChange={(event) => handleChange(event)}
						/>
						{errors.life_span && <p className={css.err}>{errors.life_span}</p>}
					</div>
				</div>
			</div>
			<div className={css.right_container}>
				<div className={css.top_content}>
					<div className={css.label_input}>
						<label htmlFor='height_min'>Min Height </label>
						<input
							type='text'
							autoComplete='off'
							value={data.height_min}
							name='height_min'
							placeholder='Min height...'
							onBlur={(event) => handleOnBlur(event)}
							onChange={(event) => handleChange(event)}
						/>
						{errors.height_min && <p className={css.err}>{errors.height_min}</p>}
					</div>
					<div className={css.label_input}>
						<label htmlFor='height_max'>Max Height </label>
						<input
							type='text'
							value={data.height_max}
							name='height_max'
							autoComplete='off'
							placeholder='Max height...'
							onBlur={(event) => handleOnBlur(event)}
							onChange={(event) => handleChange(event)}
						/>
						{errors.height_max && <p className={css.err}>{errors.height_max}</p>}
					</div>
					<div className={css.label_input}>
						<label htmlFor='weight_min'>Min Weight </label>
						<input
							type='text'
							value={data.weight_min}
							name='weight_min'
							autoComplete='off'
							placeholder='Min weight...'
							onBlur={(event) => handleOnBlur(event)}
							onChange={(event) => handleChange(event)}
						/>
						{errors.weight_min && <p className={css.err}>{errors.weight_min}</p>}
					</div>
					<div className={css.label_input}>
						<label htmlFor='weight_max'>Max Weight </label>
						<input
							type='text'
							value={data.weight_max}
							name='weight_max'
							autoComplete='off'
							placeholder='Max weight...'
							onBlur={(event) => handleOnBlur(event)}
							onChange={(event) => handleChange(event)}
						/>
						{errors.weight_max && <p className={css.err}>{errors.weight_max}</p>}
					</div>
				</div>

				<div className={css.mid_content}>
					<div className={css.select}>
						<p>Temperaments</p>
						<select value={selectedValue} required onChange={(event) => handleSelect(event)}>
							<option disabled>Temperaments</option>
							{temperaments.map((d) => (
								<option value={d.name} key={d.name + Math.random()}>
									{d.name}
								</option>
							))}
						</select>
					</div>
					<div className={css.select_values}>
						{data.temperaments[0].length !== 0 &&
							data.temperaments.map((el) => (
								<p className={css.selected_values} key={el} onClick={() => handleDelete(el)}>
									{`${el}`}
								</p>
							))}
					</div>
				</div>

				<div className={css.bottom_content}>
					<div className={css.cancel_create}>
						<Link to='/dogs'>
							<button className={`${css.button_send} ${css.red}`}>
								<span>Cancel</span>
								<svg viewBox='0 0 13 10' height='10px' width='15px'>
									<path d='M1,5 L11,5'></path>
									<polyline points='8 1 12 5 8 9'></polyline>
								</svg>
							</button>
						</Link>
						<button disabled={button} type='submit' form='form' className={`${css.button_send} ${css.blue}`}>
							<span>Update</span>
							<svg viewBox='0 0 13 10' height='10px' width='15px'>
								<path d='M1,5 L11,5'></path>
								<polyline points='8 1 12 5 8 9'></polyline>
							</svg>
						</button>
					</div>
				</div>
			</div>
		</form>
	);
};

export default Put;
