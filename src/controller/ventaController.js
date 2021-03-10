const sql = require("../database");
const Venta = require("../models/venta");
const Ventas = {};

Ventas.CreateVenta = async (req, res) => {
  const body = req.body;

  await Venta.crearVenta(body, (err, venta) => {
    if(!err){
        res.status(201).json({
            success: 1,
            message: "Venta created",
            data: venta,
        });
    }else{
        res.status(404).json({
            success: 0,
            message: "falla en venta",
            data: err,
        });
    }
    
    try {
        sql.beginTransaction((err) => {
          if (err) throw err;
          sql.query(
            `INSERT INTO detalle__venta SET producto = ${req.body.producto},pedido = ${venta},cantidad = ${req.body.cantidad},precio = ${req.body.precio}`,
            (err, results) => {
              if (err) {
                sql.rollback(() => {
                  throw err;
                });
              } else {
                res.status(201).json({
                  success: 1,
                  message: "Compra realizada",
                  data: results,
                });
              }
              console.log("Compra realizada");
              sql.end();
            }
          );
        });
      } catch (error) {
        return res
          .status(401)
          .json({ succes: 0, message: "Fallo en la ejecución" });
      }
  });
};

module.exports = Ventas;
