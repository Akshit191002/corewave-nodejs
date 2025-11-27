const express = require('express')
const ProductRepository = require('../repositories/product.repositories.js')
const ProductService = require('../services/product.service.js')
const ProductController = require('../controllers/product.controller.js');
const CategoryRepository = require('../repositories/category.repositories.js');
const SubCategoryRepository = require('../repositories/subcategory.repositories.js')
const productValidator = require('../validators/product.validator.js')
const router = express.Router();

const productRepository = new ProductRepository()
const categoryRepository = new CategoryRepository()
const subCategoryRepository = new SubCategoryRepository()
const productService = new ProductService(productRepository, categoryRepository, subCategoryRepository);
const productController = new ProductController(productService);

router.post("/createProduct/:categoryName/:subCategoryName", productValidator.createProduct, productController.createProduct);
router.get("/product", productController.getAllProduct)
router.patch("/productUpdate", productValidator.updateProduct, productController.updateProduct)
router.delete("/productDelete", productController.deleteProduct)

module.exports = router;