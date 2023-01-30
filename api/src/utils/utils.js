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
	return dbInfo.concat(
		apiInfo.map((dog) => {
			if (
				(!dog.weight_min && !dog.weight_max) ||
				(isNaN(dog.weight_min) && isNaN(dog.weight_max))
			) {
				dog.weight_min = "6.44";
				dog.weight_max = "9.66";
			}
			if (
				!dog.weight_min ||
				!dog.weight_max ||
				isNaN(dog.weight_min) ||
				isNaN(dog.weight_max)
			) {
				if (!dog.weight_min || isNaN(dog.weight_min)) {
					dog.weight_min = (Number(dog.weight_max) - 3.22).toString();
				} else {
					dog.weight_max = (Number(dog.weight_min) + 3.22).toString();
				}
			}
			if (
				(!dog.height_min && !dog.height_max) ||
				(isNaN(dog.height_min) && isNaN(dog.height_max))
			) {
				dog.height_min = "32.2";
				dog.height_max = "38.64";
			}
			if (
				!dog.height_min ||
				!dog.height_max ||
				isNaN(dog.height_min) ||
				isNaN(dog.height_max)
			) {
				if (!dog.height_min || isNaN(dog.height_min)) {
					dog.height_min = (Number(dog.height_max) - 3.22).toString();
				} else {
					dog.height_max = (Number(dog.height_min) + 3.22).toString();
				}
			}
			return dog;
		})
	);
};

module.exports = { getAllDogs };
