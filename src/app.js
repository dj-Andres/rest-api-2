const { json } = require("express");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const pkg = require("../package.json");
const ProductsRoutes = require("./routes/products.routes");
const AuthRoutes = require("./routes/auth.routes");
const config = require("./config");

const app = express();

app.set("pkg", pkg);

app.set("SECRET", config.SECRET);

app.use(morgan("dev"));

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({
    name: app.get("pkg").name,
    auhor: app.get("pkg").author,
    description: app.get("pkg").description,
    version: app.get("pkg").version,
  });
});

app.use("/api/products", ProductsRoutes);
app.use("/api/auth", AuthRoutes);

app.use((req, res) => {
  res.status(404).json({
    message: "Pagina no encontrada",
  });
});

module.exports = app;
