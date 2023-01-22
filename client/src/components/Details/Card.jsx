/** Import packages */
import React from "react";
import { Link } from "react-router-dom";
/** Import styles */
// import css from './Card.module.css';

const Card = ({ id, image, name, temperaments, weight_min, weight_max }) => {
	return (
		<div>
			<div>
				<Link to={`/dogs/${id}`}>
					<img src={image} alt="---322---" width="200px" />
				</Link>
			</div>
			<div>
				<p>
					<b>Name: </b>
					<span>{name}</span>
				</p>
			</div>
			<div>
				<p>
					<b>Temperaments: </b>
					{temperaments}
				</p>
			</div>
			<div>
				<p>
					<b>weight: </b>
					<span>
						{weight_min} - {weight_max}
					</span>
				</p>
			</div>
		</div>
	);
};

export default Card;
