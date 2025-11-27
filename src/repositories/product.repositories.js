const ProductModel = require('../models/product.model');
class ProductRepository {
    async createProduct(req) {
        try {
            const insertQuery = await ProductModel.create({
                name: req.name,
                categoryId: req.categoryId,
                subCategoryId: req.subCategoryId,
                price: req.price,
                description: req.description
            });
            return insertQuery;
        } catch (error) {
            throw error;
        }
    }

    async getAll(req) {
        try {
            const page = req.page
            const limit = req.limit
            const skipIndex = (page - 1) * limit;
            const getQuery = await ProductModel.find({ isDeleted: false }).skip(skipIndex).limit(limit).exec();
            return getQuery
        } catch (err) {
            throw err
        }
    }

    async getTotalDocs() {
        try {
            const totalDoc = await ProductModel.countDocuments({ isDeleted: false })
            return totalDoc
        } catch (err) {
            throw err
        }
    }

    async updateProduct(query, updatedData) {
        try {
            const updateQuery = await ProductModel.findByIdAndUpdate(query, { $set: updatedData }, { new: true });
            return updateQuery;
        } catch (err) {
            throw err;
        }
    }

    async alreadyProduct(query) {
        try {
            const already = await ProductModel.findOne(query)
            return already
        } catch (err) {
            throw err
        }
    }
}

module.exports = ProductRepository;
