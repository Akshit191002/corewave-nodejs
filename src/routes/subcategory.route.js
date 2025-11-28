const express = require('express')
const SubCategoryRepository = require('../repositories/subcategory.repositories.js')
const SubCategoryService = require('../services/subcategory.service.js')
const SubCategoryController = require('../controllers/subcategory.controller.js');
const CategoryRepository = require('../repositories/category.repositories.js');
const ProductRepository = require('../repositories/product.repositories.js');
const subcategoryValidator = require('../validators/subCategory.validator.js')
const middleware = require('../middlewares/auth.middleware.js')
const router = express.Router();

const subCategoryRepository = new SubCategoryRepository()
const categoryRepository = new CategoryRepository
const productRepository = new ProductRepository()
const subCategoryService = new SubCategoryService(subCategoryRepository, categoryRepository, productRepository);
const subCategoryController = new SubCategoryController(subCategoryService);

router.post("/createSubCategory/:categoryName", middleware.authenticate, subcategoryValidator.createSubCategory, subCategoryController.createSubCategory);
router.get("/subcategory", middleware.authenticate, subCategoryController.getAllSubCategory)
router.patch("/updateSubCategory", middleware.authenticate, subcategoryValidator.updateSubCategory, subCategoryController.updateSubCategory)
router.delete("/deleteSubCategory", middleware.authenticate, subCategoryController.deleteSubCategory)


module.exports = router;
