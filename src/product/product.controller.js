// Layer untuk handle request, response
// Handle validasi body

const express = require("express");
const prisma = require("../db");

const {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProductById,
  editProductById,
} = require("./product.Service");

const router = express.Router();

//GET / SHOW ALL PRODUCTS
router.get("/", async (req, res) => {
  const products = await getAllProducts();

  res.send(products);
});

//GET / SHOW PRODUCT ID
router.get("/:id", async (req, res) => {
  try {
    const productId = +req.params.id; // + untuk parse String ke Int
    const product = await getProductById(+productId);

    res.send(product);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//CREATE NEW PRODUCT
router.post("/", async (req, res) => {
  try {
    const newProductData = req.body;

    const product = await createProduct(newProductData);
    res.send({
      data: product,
      message: "Create Product Success",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//DELETE PRODUCT
router.delete("/:id", async (req, res) => {
  try {
    const productId = req.params.id; //String

    await deleteProductById(+productId); // Int

    res.send("Product deleted");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//PUT METHOD / UPDATE
router.put("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const productData = req.body;

    if (
      !(
        productData.name &&
        productData.price &&
        productData.description &&
        productData.image
      )
    ) {
      return res.status(400).send("Some fields are missing");
    }

    const product = await editProductById(+productId, productData);

    res.send({
      data: product,
      message: "update product success",
    });
  } catch (error) {
    // Tangani error yang mungkin terjadi (misalnya, kirim pesan error ke client)
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// PATCH memperbarui hanya bagian tertentu dari sumber daya yang ada
router.patch("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const productData = req.body;

    const product = await editProductById(+productId, productData);
    res.send({
      data: product,
      message: "patch product success",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
