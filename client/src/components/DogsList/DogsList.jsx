/** Import package */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
/** Import files */
import { getAllDogs, getTemperaments } from "../../redux/actions";
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
 *  Botones/Opciones para filtrar por:
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
					<select>
						<option value="all">all</option>
						<option value="api">Api</option>
						<option value="db">DataBase</option>
					</select>
				</div>
				<div>
					<p>filter by temperament</p>
					<select>
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
			<div>Order</div>
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
