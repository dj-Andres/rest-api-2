const Product = require("../models/product");
const validations = require('../libs/validations');
const Products = {};

Products.getProducts = async (req, res) => {
  await Product.getAllProducts((err, result) => {
    console.log("controller");
    if (err) res.send(err);
    console.log("res", result);
    res.status(200).json({
      succes: 1,
      data: result,
    });
  });
};

Products.getProductsById = async (req, res) => {
  await Product.getProductById(req.params.productsId, (err, producto) => {
    if (err) throw err;

    if (producto.length > 0) {
      res.status(200).json({
        succes: 1,
        data: producto,
      });
    } else {
      res.json({
        succes: 0,
        message: "No encontrado",
      });
    }
  });
};

Products.createProducts = async (req, res) => {
  const { nombre, categoria, precio, url } = req.body;
  const newProduct = await new Product({ nombre, categoria, precio ,url});

  const { error } = validations.SchemaCreateProducts.validate(req.body);

  if (error) {
    return res.status(404).json({
      error: error.details[0].message,
    });
  }else{
    await Product.createProducts(newProduct, (err, product) => {
        if (err) res.send(err);
        res.status(201).json({
          success: 1,
          message: "Product created",
          data: product,
        });
      });
  } 
};

Products.updateProducts = async (req, res) => {
  const { productsId } = req.params;

  await Product.upDate(productsId, new Product(req.body), (err, result) => {
    if (err) res.send(err);
    res.status(204).json(result);
  });
};

Products.deleteProducts = async (req, res) => {
  const { productsId } = req.params;
  await Product.remove(productsId, function (err, product) {
    if (err) res.send(err);
    res.status(204).json({
      message: "El producto fue eliminado exitosamente",
      result: product,
    });
  });
};

module.exports = Products;
