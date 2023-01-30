const { Router } = require("express");
const { Dog, Temperament } = require("../db");
const { getAllDogs } = require("../utils/utils");

const router = Router();

// GET /dogs
router.get("/", async (req, res, next) => {
	const { name } = req.query;
	try {
		const allDogs = await getAllDogs();
		if (!name) {
			return res.status(200).json(allDogs);
		}
		const dogName = allDogs.filter((item) =>
			item.name.toLowerCase().includes(name.toLocaleLowerCase())
		);
		dogName.length
			? res.status(200).json(dogName)
			: res.status(404).json({
					message: `Ups, an error occurred when entering my ${name}'s name data.`,
			  });
	} catch (error) {
		next(error);
	}
});

// GET /dogs/:id
router.get("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const allDogs = await getAllDogs();
		const dog = allDogs.filter((el) => el.id === Number(id));
		dog.length
			? res.status(200).json(dog)
			: res.status(404).json({ message: "Dog not found in the Data" });
	} catch (error) {
		res.status(500).json({ message: error.message });
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
		const dogCreated = await Dog.create({
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
					const temper = await Temperament.findOrCreate({
						where: { name: temp },
					});
					dogCreated.addTemperament(temper[0]);
				} catch (error) {
					res.status(404).json({ message: error.message });
				}
			});
		}
		res.json({ message: "Successfully created" });
	} catch (error) {
		next(error);
	}
});

// PUT /dogs/:id
router.put("/:id", async (req, res, next) => {
	const { id } = req.params;
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
		const dog = await Dog.findByPk(id);
		if (!dog) {
			return res.status(404).json({ message: `No dog found with id ${id}` });
		}
		await dog.setTemperaments([]);
		temperaments.map(async (temp) => {
			try {
				const temperament = await Temperament.findOrCreate({
					where: { name: temp },
				});
				dog.addTemperament(temperament[0]);
			} catch (error) {
				res.status(404).json({ message: error.message });
			}
		});
		const updatedDog = await dog.update({
			name,
			height_min,
			height_max,
			weight_min,
			weight_max,
			life_span,
			image,
		});
		res.status(200).json({
			message: `Dog with id ${id} updated successfully`,
		});
	} catch (error) {
		next(error);
	}
});

// DELETE /dogs/:id
router.delete("/:id", async (req, res, next) => {
	const { id } = req.params;
	try {
		const deletedDog = await Dog.destroy({
			where: {
				id: id,
			},
		});

		deletedDog
			? res.status(200).json({
					message: `Dog with id ${id} deleted successfully`,
			  })
			: res.status(404).json({
					message: `No dog found with id ${id}`,
			  });
	} catch (error) {
		next(error);
	}
});
module.exports = router;
