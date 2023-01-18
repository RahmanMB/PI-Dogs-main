const { Router } = require("express");
// Importar todos los routers;
const dogs = require("./dogs.js");
const temperament = require("./temperaments.js");

const router = Router();

// Configurar los routers
router.use("/dogs", dogs);
router.use("/temperaments", temperament);

module.exports = router;
