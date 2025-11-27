const CategoryModel = require('../models/category.model');
class CategoryRepository {
    async createCategory(req) {
        try {
            const insertQuery = await CategoryModel.create({
                name: req.name
            });
            return insertQuery;
        } catch (err) {
            throw err;
        }
    }

    async alreadyExistsCategory(req) {
        try {
            const checkQuery = await CategoryModel.findOne(req)
            if (checkQuery) {
                return checkQuery;
            }
            return false;
        } catch (err) {
            throw err
        }
    }

    async getAll(req) {
        try {
            const page = req.page
            const limit = req.limit
            const skipIndex = (page - 1) * limit;
            const getQuery = await CategoryModel.find({ isDeleted: false }).skip(skipIndex).limit(limit).exec();
            return getQuery
        } catch (err) {
            throw err
        }
    }

    async getTotalDocs() {
        try {
            const totalDoc = await CategoryModel.countDocuments({ isDeleted: false })
            return totalDoc
        } catch (err) {
            throw err
        }
    }

    async updateCategory(query, updatedData) {
        try {
            const updateQuery = await CategoryModel.findByIdAndUpdate(query, updatedData, { new: true });
            return updateQuery;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = CategoryRepository;
