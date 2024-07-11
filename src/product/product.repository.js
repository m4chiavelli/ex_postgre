// Komunikasi dengan db
// boleh RAW, ORM

const prisma = require("../db");

const findProducts = async () => {
  const product = prisma.product.findMany();

  return product;
};

const findProductById = async (id) => {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!product) {
      throw new Error("Produk tidak ditemukan");
    }

    return product;
  } catch (error) {
    console.error("Error finding product:", error);
    throw error; // Re-throw the error so it can be handled further up the stack
  }
};

const insertProduct = async (productData) => {
  const product = await prisma.product.create({
    data: {
      name: productData.name,
      price: productData.price,
      description: productData.description,
      image: productData.image,
    },
  });
  return product;
};

const deleteProduct = async (id) => {
  await prisma.product.delete({
    where: {
      id,
    },
  });
};

const editProduct = async (id, productData) => {
  const product = await prisma.product.update({
    where: {
      id: parseInt(id), //PARSE TO INTEGER
    },
    data: {
      name: productData.name,
      price: productData.price,
      description: productData.description,
      image: productData.image,
    },
  });

  return product;
};

module.exports = {
  findProducts,
  findProductById,
  insertProduct,
  deleteProduct,
  editProduct,
};
