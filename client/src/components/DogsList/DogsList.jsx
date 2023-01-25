/** Import package */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
/** Import files */
import {
	getAllDogs,
	getTemperaments,
	getFilterData,
	getFilterTemp,
	orderName,
	orderWeight,
} from "../../redux/actions";
import SearchEngine from "./SearchEngine";
import Card from "../Details/Card";
import Paged from "./Paged";
import image from "../../assets/images/Fannci_2.png";
/** Import styles */
import css from "./Dogs.module.css";

const DogsList = () => {
	const dispatch = useDispatch();
	const allData = useSelector((state) => state.dogs);
	const allTemperaments = useSelector((state) => state.temperaments);
	const [pagina, setPagina] = useState(1);
	// eslint-disable-next-line no-unused-vars
	const [porPagina, setPorPagina] = useState(8);
	const maximo = Math.ceil(allData.length / porPagina);

	const hanldeRestartClick = () => {
		dispatch(getAllDogs());
	};

	const handleFilterDataChange = (event) => {
		const { value } = event.target;
		value === "all" ? dispatch(getAllDogs()) : dispatch(getFilterData(value));
	};

	const hanldeFilterTempChange = (event) => {
		const { value } = event.target;
		dispatch(getFilterTemp(value));
	};

	const handleOrderNameChange = (event) => {
		const { value } = event.target;
		dispatch(orderName(value));
	};

	const handleOrderWeightChange = (event) => {
		const { value } = event.target;
		dispatch(orderWeight(value));
	};

	const currentDogs = allData.slice(
		(pagina - 1) * porPagina,
		pagina * porPagina
	);

	useEffect(() => {
		dispatch(getAllDogs());
		dispatch(getTemperaments());
	}, [dispatch]);

	return (
		<div className={css.container}>
			<div className={css.left}>
				<div className={css.image_border}>
					<img
						src={image}
						alt="Profile Dog"
						className={css.image}
						onClick={hanldeRestartClick}
					/>
				</div>

				<SearchEngine />

				<div className={css.content}>
					<p>Filter</p>
					<div className={css.content_inf}>
						<p>data</p>
						<select onChange={(event) => handleFilterDataChange(event)}>
							<option value="all">all</option>
							<option value="false">Api</option>
							<option value="true">DataBase</option>
						</select>
						<p>temperament</p>
						<select onChange={(event) => hanldeFilterTempChange(event)}>
							{allTemperaments.map(({ id, name }) => (
								<option value={name} key={id}>
									{name}
								</option>
							))}
						</select>
					</div>
				</div>

				<div className={css.content}>
					<p>Order</p>
					<div className={css.content_inf}>
						<p>name</p>
						<select onChange={(event) => handleOrderNameChange(event)}>
							<option value="asc">Asc</option>
							<option value="desc">Desc</option>
						</select>
						<p>weight</p>
						<select onChange={(event) => handleOrderWeightChange(event)}>
							<option value="min">menor - mayor</option>
							<option value="max">mayor - menor</option>
						</select>
					</div>
				</div>

				<Paged pagina={pagina} setPagina={setPagina} maximo={maximo} />
			</div>

			<div className={css.right}>
				{currentDogs?.map(
					({ id, name, image, temperaments, weight_min, weight_max }) => (
						<Card
							key={id}
							id={id}
							name={name}
							image={image}
							temperaments={temperaments}
							weight_min={weight_min}
							weight_max={weight_max}
						/>
					)
				)}
			</div>
		</div>
	);
};

export default DogsList;
