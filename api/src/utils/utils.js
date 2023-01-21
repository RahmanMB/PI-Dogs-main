const axios = require("axios");
const { Dog, Temperament } = require("../db");
const { API_KEY } = process.env;
const URL = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`;

const getApiInfo = async () => {
	const apiUrl = await axios.get(URL);
	const apiInfo = await apiUrl.data.map(
		({ weight, height, id, name, life_span, image, temperament }) => {
			const [weight_min, weight_max] = weight.metric
				.split("-")
				.map((val) => val.trim());
			const [height_min, height_max] = height.metric
				.split("-")
				.map((val) => val.trim());
			return {
				id,
				name,
				height_min,
				height_max,
				weight_min,
				weight_max,
				life_span,
				image: image.url,
				createdInDb: false,
				temperaments: temperament,
			};
		}
	);
	return apiInfo;
};
const getDbInfo = async () => {
	const dbFormat = await Dog.findAll({
		include: {
			model: Temperament,
			atributes: ["name"],
			through: { attributes: [] },
		},
	});
	return dbFormat.map((el) => {
		return {
			id: el.id,
			name: el.name,
			height_min: el.height_min,
			height_max: el.height_max,
			weight_min: el.weight_min,
			weight_max: el.weight_max,
			life_span: el.life_span,
			image: el.image,
			createdInDb: true,
			temperaments: el.temperaments.map((i) => i.name).join(", "),
		};
	});
};
const getAllDogs = async () => {
	const apiInfo = await getApiInfo();
	const dbInfo = await getDbInfo();
	return apiInfo
		.map((dog) => {
			if (dog.id === 183) {
				dog.weight_min = "3";
				dog.weight_max = "6";
			}
			if (dog.id === 128) {
				dog.weight_min = "5";
				dog.weight_max = "8";
			}
			if (dog.id === 113) {
				dog.weight_min = "9";
				dog.weight_max = "13";
			}
			if (dog.id === 232) {
				dog.weight_min = "6";
				dog.weight_max = "8";
			}
			if (dog.id === 179) {
				dog.weight_min = "22";
				dog.weight_max = "30";
			}
			return dog;
		})
		.concat(dbInfo);
};

module.exports = { getAllDogs };
