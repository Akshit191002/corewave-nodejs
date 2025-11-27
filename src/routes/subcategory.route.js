const express = require('express')
const SubCategoryRepository = require('../repositories/subcategory.repositories.js')
const SubCategoryService = require('../services/subcategory.service.js')
const SubCategoryController = require('../controllers/subcategory.controller.js');
const CategoryRepository = require('../repositories/category.repositories.js');
const ProductRepository = require('../repositories/product.repositories.js');
const subcategoryValidator = require('../validators/subCategory.validator.js')
const router = express.Router();

const subCategoryRepository = new SubCategoryRepository()
const categoryRepository = new CategoryRepository
const productRepository = new ProductRepository()
const subCategoryService = new SubCategoryService(subCategoryRepository, categoryRepository, productRepository);
const subCategoryController = new SubCategoryController(subCategoryService);

router.post("/createSubCategory/:categoryName", subcategoryValidator.createSubCategory, subCategoryController.createSubCategory);
router.get("/subcategory", subCategoryController.getAllSubCategory)
router.patch("/updateSubCategory", subcategoryValidator.updateSubCategory, subCategoryController.updateSubCategory)
router.delete("/deleteSubCategory", subCategoryController.deleteSubCategory)


module.exports = router;
