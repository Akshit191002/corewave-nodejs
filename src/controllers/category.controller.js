const BadRequestError = require("../errors/badRequest.error");

class CategoryController {
  constructor(categoryService) {
    this.categoryService = categoryService;
  }

  createCategory = async (req, res) => {
    try {
      const { name } = req.body
      const result = await this.categoryService.createCategory({ name });
      res.status(201).json({ success: true, message: "Category successfully created", CategoryID: result });
    } catch (err) {
      const status = err.code;
      res.status(status).json({
        success: false,
        message: err.message
      });
    }
  };

  getAllCategory = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1
      const limit = parseInt(req.query.limit) || 10
      const result = await this.categoryService.getAllCategory({ page, limit });
      res.status(200).json({ success: true, message: "Successfully fetch category", result })
    } catch (err) {
      const status = err.code;
      res.status(status).json({
        success: false,
        message: err.message
      })
    }
  }

  updateCategory = async (req, res) => {
    try {
      const id = req.query.id
      const { name } = req.body
      const result = await this.categoryService.updateCategory({ id: id, name })
      res.status(200).json({ success: true, message: "Category update successfully" });
    } catch (err) {
      const status = err.code;
      res.status(status).json({
        success: false,
        message: err.message
      })
    }
  }

  deleteCategory = async (req, res) => {
    try {
      const id = req.query.id
      const result = await this.categoryService.deleteCategory({ id: id })
      res.status(200).json({ success: true, message: "Category Delete successfully" });
    } catch (err) {
      const status = err.code;
      res.status(status).json({
        success: false,
        message: err.message
      })
    }
  }

}
module.exports = CategoryController;