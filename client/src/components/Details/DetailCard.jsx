/** Import packages */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
/** Import files */
import { detailTarget } from "../../redux/actions";
/** Import styles */
import css from "./DetailCard.module.css";

const DetailCard = () => {
	const dispatch = useDispatch();
	const target = useSelector((state) => state.target);

	let { id } = useParams();

	useEffect(() => {
		dispatch(detailTarget(id));
	}, [dispatch, id]);

	const {
		image,
		name,
		height_min,
		height_max,
		weight_min,
		weight_max,
		temperaments,
		life_span,
	} = target;

	const weight = `${weight_max} - ${weight_min} Kg`;
	const height = `${height_max} - ${height_min} cm`;

	const temp = !temperaments
		? ["Temperaments not available"]
		: temperaments.split(",").map((item) => item.trim());

	return (
		<div className={css.container}>
			<div className={css.left_detail}>
				<h2 className={css.name_detail}>{name}</h2>
				<div className={css.text_detail}>
					<p>
						Height: <span>{height}</span>
					</p>
					<p>
						Weight: <span>{weight}</span>
					</p>
				</div>
				<div className={css.temp_detail}>
					<h4>Temperaments</h4>
					<ul>
						{temp.map((temperament, index) => (
							<li key={index}>{temperament}</li>
						))}
					</ul>
				</div>
				<div className={css.text_detail}>
					<p>
						Life: <span>{life_span}</span>
					</p>
				</div>
			</div>

			<div className={css.right_detail}>
				<img src={image} alt={`${name} dog`} className={css.image} />
				<Link to="/dogs">
					<button type="">X</button>
				</Link>
			</div>
		</div>
	);
};

export default DetailCard;
