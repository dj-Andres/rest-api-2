const express = require("express");
const VentaController = require("../controller/ventaController");
const router = express.Router();

router.post("/", VentaController.CreateVenta);

module.exports = router;
