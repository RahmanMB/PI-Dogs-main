/** Import packages */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
/** Import files */
import { detailTarget } from "../../redux/actions";
/** Import styles */
// import css from 'DetailCard.module.css';

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

	return (
		<div>
			<div>
				<Link to={`/dogs`}>
					<button>Back</button>
				</Link>
			</div>
			<hr />
			<div>
				<h2>Card Detail</h2>
				<div>
					<p>Image</p>
					<img src={image} alt={name} />
				</div>
				<div>
					<div>
						<p>Name {name}</p>
					</div>
					<p>
						Height <span>{height_min}</span> - <span>{height_max}</span>
					</p>
					<p>
						Weight <span>{weight_min}</span> - <span>{weight_max}</span>
					</p>
					<p>Temperaments: {temperaments}</p>
					<p>Life span: {life_span}</p>
				</div>
			</div>
		</div>
	);
};

export default DetailCard;
