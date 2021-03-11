const Venta = require("../models/venta");
const Ventas = {};

Ventas.CreateVenta = async (req, res) => {
  const { producto, usuario, cantidad, precio } = req.body;

  const total = cantidad * precio;

  const newVenta = { total, usuario };

  await Venta.crearVenta(newVenta, (err, pedido) => {
    if (!err) {
      res.status(201).json({
        success: 1,
        data: pedido,
      });
    } else {
      res.status(404).json({
        success: 0,
        message: "falla en venta",
        data: err,
      });
    }

    const newDetalle = { producto, pedido, cantidad, precio };

    Venta.detalleVenta(newDetalle, (err, detalle) => {
      if (!err) {
        res.status(201).json({
          success: 1,
          data: detalle,
        });
      } else {
        res.status(404).json({
          success: 0,
          message: "falla en venta",
          data: err,
        });
      }
    });
    
  });
};

module.exports = Ventas;
