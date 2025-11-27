const express = require('express')
const CategoryRepository = require('../repositories/category.repositories.js')
const CategoryService = require('../services/category.service.js')
const CategoryController = require('../controllers/category.controller.js')
const SubcategoryRepository = require('../repositories/subcategory.repositories.js')
const categoryValidator = require('../validators/category.validator.js')
const router = express.Router();

const categoryRepository = new CategoryRepository()
const subcategoryRepository = new SubcategoryRepository()
const categoryService = new CategoryService(categoryRepository, subcategoryRepository);
const categoryController = new CategoryController(categoryService);

router.post("/createCategory",categoryValidator.createCategory, categoryController.createCategory);
router.get("/category", categoryController.getAllCategory)
router.patch("/updateCategory",categoryValidator.updateCategory, categoryController.updateCategory)
router.delete("/deleteCategory", categoryController.deleteCategory)

module.exports = router;
