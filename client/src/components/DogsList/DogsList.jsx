/** Import package */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
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
/** Import styles */
// import css from './Dogs.module.css';

/**
 * 	!Input de búsqueda para encontrar razas de perros por nombre
 * 	!Área donde se verá el listado de razas de perros. Deberá mostrar su:
 * 		* Imagen
 * 		* Nombre
 *    * Temperamento
 *    * Peso
 *  !Botones/Opciones para filtrar por:
 * 		* Temperamento
 *  	* Raza existente (es decir las que vienen de la API) o agregada por nosotros (creadas mediante el form)
 *  Botones/Opciones para ordenar tanto ascendentemente como descendentemente las razas de perro por:
 *  	* Orden alfabético
 *  	* Peso
 *  !Paginado para ir buscando y mostrando las siguientes razas, mostrando 8 razas por página.
 */

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
		<div>
			<h2>The dog </h2>
			{/** Search Engine */}
			<div>
				<SearchEngine />
			</div>
			<hr />
			{/** Reload */}
			<div>
				<button type="button" onClick={hanldeRestartClick}>
					Reload
				</button>
			</div>
			<hr />
			{/** Filters */}
			<div>
				<p>Filter</p>
				<div>
					<p>Filter by data (api | db)</p>
					<select onChange={(event) => handleFilterDataChange(event)}>
						<option value="all">all</option>
						<option value="false">Api</option>
						<option value="true">DataBase</option>
					</select>
				</div>
				<div>
					<p>filter by temperament</p>
					<select onChange={(event) => hanldeFilterTempChange(event)}>
						{allTemperaments.map(({ id, name }) => (
							<option value={name} key={id}>
								{name}
							</option>
						))}
					</select>
				</div>
			</div>
			<hr />
			{/** Orders */}
			<div>
				<p>order by name</p>
				<select onChange={(event) => handleOrderNameChange(event)}>
					<option value="asc">Asc</option>
					<option value="desc">Desc</option>
				</select>
				<p>order by nweight</p>
				<select onChange={(event) => handleOrderWeightChange(event)}>
					<option value="min">menor - mayor</option>
					<option value="max">mayor - menor</option>
				</select>
			</div>
			<hr />
			{/** Card */}
			<div>
				{currentDogs?.map(
					({ id, name, image, temperaments, weight_min, weight_max }) => (
						<Link to={`/details/${id}`} key={id}>
							<Card
								name={name}
								image={image}
								temperaments={temperaments}
								weight_min={weight_min}
								weight_max={weight_max}
							/>
						</Link>
					)
				)}
			</div>
			{/** Paginado */}
			<div>
				<Paged pagina={pagina} setPagina={setPagina} maximo={maximo} />
			</div>
		</div>
	);
};

export default DogsList;
