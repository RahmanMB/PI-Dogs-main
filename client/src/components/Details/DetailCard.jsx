/** Import packages */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
/** Import files */
import { detailTarget, deleteData } from "../../redux/actions";
/** Import styles */
import css from "./DetailCard.module.css";
import LoaderImg from "../Loaders/LoaderImg";

const DetailCard = () => {
	const dispatch = useDispatch();
	const target = useSelector((state) => state.target);
	const [loading, setLoading] = useState(false);

	const { id } = useParams();

	const handleDeleteClick = () => {
		deleteData(id)(dispatch);
		alert("Has been successfully eliminated.");
	};

	useEffect(() => {
		setLoading(true);
		dispatch(detailTarget(id))
			.then(() => {
				setLoading(false);
			})
			.catch((error) => {
				console.error(error);
				setLoading(false);
			});
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
		<>
			{loading ? (
				<LoaderImg />
			) : (
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
						{322 > Number(id) ? (
							<div></div>
						) : (
							<div className={css.put__delete}>
								<Link to={`/dogs/update/${id}`}>
									<button
										className={`${css.put__delete_button} ${css.red__btn}`}>
										<span>Put</span>
									</button>
								</Link>
								<Link to="/dogs">
									<button
										className={`${css.put__delete_button} ${css.blue_btn}`}
										onClick={() => handleDeleteClick()}>
										<span style={{ color: "#920949d2" }}>Delete</span>
									</button>
								</Link>
							</div>
						)}
					</div>

					<div className={css.right_detail}>
						<img src={image} alt={`${name} dog`} className={css.image} />
						<Link to="/dogs">
							<button type="">X</button>
						</Link>
					</div>
				</div>
			)}
		</>
	);
};

export default DetailCard;
