import React from "react";
// import css from './Card.module.css';

const Card = ({ image, name, temperaments, weight_min, weight_max }) => {
	return (
		<div>
			<div>
				<img src={image} alt="---322---" width="200px" />
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
