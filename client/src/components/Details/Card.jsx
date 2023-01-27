/** Import packages */
import React from "react";
import { Link } from "react-router-dom";
/** Import styles */
import css from "./Card.module.css";

const Card = ({ id, image, name, temperaments, weight_min, weight_max }) => {
	const weight = `${weight_min} - ${weight_max} Kg`;
	return (
		<div className={css.card}>
			<div className={css.top_card}>
				<div className={css.img}>
					<Link to={`/dogs/${id}`}>
						<img
							className={css.image}
							src={image}
							alt={`${name} img`}
							width="200px"
						/>
					</Link>
				</div>
				<h2 className={css.name}>
					<p
						style={{
							overflow: "hidden",
							display: "-webkit-box",
							WebkitLineClamp: "1",
							WebkitBoxOrient: "vertical",
							whiteSpace: "pre-wrap",
						}}>
						{name}
					</p>
				</h2>
			</div>

			<div className={css.bottom_card}>
				<div className={css.temperaments}>
					<p
						style={{
							overflow: "hidden",
							textOverflow: "ellipsis",
							display: "-webkit-box",
							WebkitLineClamp: "2",
							WebkitBoxOrient: "vertical",
							whiteSpace: "pre-wrap",
						}}>
						{!temperaments ? ["Temperaments not available"] : temperaments}
					</p>
				</div>
				<p className={css.weight}>{weight}</p>
			</div>
		</div>
	);
};

export default Card;
