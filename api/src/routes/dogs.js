const { Router } = require("express");
const { Dog, Temperament } = require("../db");
const { getAllDogs } = require("../utils/utils");

const router = Router();

// GET /dogs
router.get("/", async (req, res, next) => {
	const name = req.query.name;
	try {
		const allDogs = await getAllDogs();
		if (name) {
			let dogName = await allDogs.filter((item) =>
				item.name.toLowerCase().includes(name.toLocaleLowerCase())
			);
			dogName.length
				? res.status(200).json(dogName)
				: res.status(404).json({
						message: `Ups, an error occurred when entering my ${name}'s name data.`,
				  });
		} else {
			res.status(200).json(allDogs);
		}
	} catch (error) {
		next(error);
	}
});

// GET /dogs/:idRaza
router.get("/:idRaza", async (req, res) => {
	const { idRaza } = req.params;
	const allDogs = await getAllDogs();
	const dog = allDogs.filter((el) => el.id == idRaza);
	if (dog.length) {
		res.status(200).json(dog);
	} else {
		res.status(404).json({ message: "Dog not found in the Data" });
	}
});

// POST /dogs
router.post("/", async (req, res, next) => {
	const {
		name,
		height_min,
		height_max,
		weight_min,
		weight_max,
		life_span,
		image,
		temperaments,
	} = req.body;
	try {
		let dogCreated = await Dog.create({
			name,
			height_min,
			height_max,
			weight_min,
			weight_max,
			life_span,
			image,
		});
		if (temperaments.length) {
			temperaments.map(async (temp) => {
				try {
					let temper = await Temperament.findOrCreate({
						where: { name: temp },
					});
					dogCreated.addTemperament(temper[0]);
				} catch (error) {
					res.status(404).json({ message: error.message });
				}
			});
		}
		res.json(dogCreated);
	} catch (error) {
		next(error);
	}
});

// PUT /dogs/:id

// DELETE /dogs/:id
router.delete("/:id", async (req, res, next) => {
	const { id } = req.params;
	try {
		await Dog.destroy({ where: { id: Number(id) } });
		res.status(200).json({ message: "Delete dog successfully" });
	} catch (error) {
		next(error);
	}
});

module.exports = router;
