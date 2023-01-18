const { Router } = require("express");
const axios = require("axios");
const { Temperament } = require("../db");
const { API_KEY } = process.env;
const URL = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`;

const router = Router();

router.get("/", async (req, res, next) => {
	try {
		// Me traigo los Dogs de la api
		const dogsApi = await axios.get(URL);

		const listTemperaments = dogsApi.data.map((dog) => {
			if (!dog.temperament) return (dog.temperament = undefined);
			return dog.temperament.split(", ");
		});

		const uniqueValues = new Set(listTemperaments.flat().filter(Boolean));
		const finalResult = [...uniqueValues];

		finalResult.forEach((dog) =>
			Temperament.findOrCreate({
				where: {
					name: dog,
				},
			})
		);

		// Me traigo todos los temperamentos de la base de datos
		const resultado2 = await Temperament.findAll();
		res.send(resultado2);
	} catch (error) {
		next(error);
	}
});
module.exports = router;
