
class SubCategoryController {
    constructor(subCategoryService) {
        this.subCategoryService = subCategoryService;
    }

    createSubCategory = async (req, res) => {
        try {
            const { name } = req.body
            const { categoryName } = req.params
            await this.subCategoryService.createSubCategory({ name, categoryName });
            res.status(201).json({ success: true, message: "Sub category successfully created" });
        } catch (err) {
            const status = err.code;
            res.status(status).json({
                success: false,
                message: err.message
            });
        }
    };

    getAllSubCategory = async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1
            const limit = parseInt(req.query.limit) || 10
            const result = await this.subCategoryService.getAllSubCategory({ page, limit });
            res.status(200).json({ success: true, message: "Successfully fetch Sub category", result })
        } catch (err) {
            const status = err.code;
            res.status(status).json({
                success: false,
                message: err.message
            })
        }
    }

    updateSubCategory = async (req, res) => {
        try {
            const id = req.query.id
            const { name } = req.body
            const result = await this.subCategoryService.updateSubCategory({ id: id, name })
            res.status(200).json({ success: true, message: "Sub Category update successfully" });
        } catch (err) {
            const status = err.code;
            res.status(status).json({
                success: false,
                message: err.message
            })
        }
    }

    deleteSubCategory = async (req, res) => {
        try {
            const id = req.query.id
            const result = await this.subCategoryService.deleteSubCategory({ id })
            res.status(200).json({ success: true, message: "Sub Category Delete successfully" });
        } catch (err) {
            const status = err.code;
            res.status(status).json({
                success: false,
                message: err.message
            })
        }
    }

}
module.exports = SubCategoryController;