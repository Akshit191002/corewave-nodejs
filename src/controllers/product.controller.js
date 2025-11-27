
class ProductController {
    constructor(productService) {
        this.productService = productService;
    }

    createProduct = async (req, res) => {
        try {
            const { name, price, description } = req.body
            const { categoryName, subCategoryName } = req.params

            await this.productService.createProduct({ name, categoryName, subCategoryName, price, description });
            res.status(201).json({ success: true, message: "Product successfully created" });
        } catch (err) {
            const status = err.code;
            res.status(status).json({
                success: false,
                message: err.message
            });
        }
    }

    getAllProduct = async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1
            const limit = parseInt(req.query.limit) || 10
            const result = await this.productService.getAllProduct({ page, limit });
            res.status(200).json({ success: true, message: "Successfully fetch Product", result })
        } catch (err) {
            const status = err.code;
            res.status(status).json({
                success: false,
                message: err.message
            })
        }
    }

    updateProduct = async (req, res) => {
        try {
            const id = req.query.id
            const { name, price, description } = req.body
            const result = await this.productService.updateProduct({ id, name, price, description })
            res.status(200).json({ success: true, message: "Product update successfully" });
        } catch (err) {
            const status = err.code;
            res.status(status).json({
                success: false,
                message: err.message
            })
        }
    }

    deleteProduct = async (req, res) => {
        try {
            const id = req.query.id
            const result = await this.productService.deleteProduct({ id })
            res.status(200).json({ success: true, message: "Product delete successfully" });

        } catch (err) {
            const status = err.code;
            res.status(status).json({
                success: false,
                message: err.message
            })
        }
    }

}
module.exports = ProductController;