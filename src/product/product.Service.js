// Handle logic bussiness
// Reusable function = clean code

const prisma = require("../db");
const {
  findProducts,
  findProductById,
  insertProduct,
  deleteProduct,
  editProduct,
} = require("./product.repository");

const getAllProducts = async () => {
  const products = await findProducts();

  return products;
};

const getProductById = async (id) => {
  const product = await findProductById();

  if (!product) {
    throw Error("Product not found");
  }
  return product;
};

const createProduct = async (newProductData) => {
  const product = await insertProduct(newProductData);

  return product;
};

const deleteProductById = async (id) => {
  await getAllProducts(id);
  await deleteProduct(id);
};

const editProductById = async (id, productData) => {
  await getProductById(id);

  const product = await editProduct(id, productData);

  return product;
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProductById,
  editProductById,
};
