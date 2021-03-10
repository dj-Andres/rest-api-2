const sql = require("../database");

const Venta = function (venta) {
  this.usuario = venta.categoria;
  this.total = venta.precio;
};

Venta.crearVenta = (newVenta, result) => {
  sql.query("INSERT INTO venta SET ?", newVenta, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};

Venta.lastVenta = (result) => {
  sql.query("SELECT MAX(id_venta) as ultima_venta FROM venta", (err, res) => {
    if (err) {
      console.log("error:", err);
      result(err, null);
    } else {
      console.log("data:", res);
      result(null, res);
    }
  });
};

module.exports = Venta;
