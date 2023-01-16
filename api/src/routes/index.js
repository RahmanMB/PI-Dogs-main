const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require("axios");
const { Dog, Temperament } = require("../db");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getApiInfo = async () => {
	const apiUrl = await axios.get("https://api.thedogapi.com/v1/breeds");
	const apiInfo = await apiUrl.data.map(
		({ weight, height, id, name, life_span, image, temperament }) => {
			return {
				name,
				weight: weight.metric,
				height: height.metric,
				id,
				life_span,
				image: image.url,
				temperaments: temperament,
			};
		}
	);
	return apiInfo;
};

const getDbInfo = async () => {
	return await Dog.findAll({
		include: {
			model: Temperament,
			atributes: ["name"],
			through: { attributes: [] },
		},
	});
};
const getAllDogs = async () => {
	const apiInfo = await getApiInfo();
	const dbInfo = await getDbInfo();
	const allDogs = apiInfo.concat(dbInfo);
	return allDogs;
};

router.get("/dogs", async (req, res) => {
	const name = req.query.name;
	const allDogs = await getAllDogs();
	if (name) {
		let dogName = await allDogs.filter((item) =>
			item.name.toLowerCase().includes(name.toLocaleLowerCase())
		);
		dogName.length
			? res.status(200).send(dogName)
			: res.status(404).send({ message: "No esta el perro, Sorry!" });
	} else {
		res.status(200).send(allDogs);
	}
});

router.get("/dogs/:idRaza", async (req, res) => {
	const { idRaza } = req.params;
	const allDogs = await getAllDogs();
	const dog = allDogs.filter((el) => el.id == idRaza);
	if (dog.length) {
		res.status(200).json(dog);
	} else {
		res.status(404).send("Dog no found in the Data");
	}
});

router.get("/temperaments", async (req, res) => {
	const temperamentApi = await axios.get("https://api.thedogapi.com/v1/breeds");
	const temperaments = await temperamentApi.data.map(
		(element) => element.temperament
	);
	const temps = temperaments.toString().split(",");
	temps.forEach((element) => {
		let i = element.trim();
		Temperament.findOrCreate({
			where: { name: i },
		});
	});
	const allTemperaments = await Temperament.findAll();
	res.send(allTemperaments);
});

router.post("/dogs", async (req, res) => {
	const { name, weight, height, life_span, image, temperaments, createdInDb } =
		req.body;
	const dogCreated = await Dog.create({
		name,
		weight,
		height,
		life_span,
		image,
		createdInDb,
	});
	for (const temp of temperaments) {
		let temperamentDb = await Temperament.findOne({
			where: { name: temp.trim() },
		});
		if (!temperamentDb) {
			temperamentDb = await Temperament.create({
				name: temp.trim(),
			});
		}
		dogCreated.addTemperament(temperamentDb);
	}
	res.send("Dog agregado con exito");
});

module.exports = router;
