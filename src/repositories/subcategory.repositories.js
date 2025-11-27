const SubCategoryModel = require('../models/subcategory.model');
class SubCategoryRepository {
    async createSubCategory(req) {
        try {
            const insertQuery = await SubCategoryModel.create({
                name: req.name,
                categoryId: req.categoryId
            });
            return insertQuery;
        } catch (error) {
            throw error;
        }
    }

    async alreadyExistsSubCategory(req) {
        try {
            const checkQuery = await SubCategoryModel.findOne(req)
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
            const getQuery = await SubCategoryModel.find({ isDeleted: false }).skip(skipIndex).limit(limit).exec();
            return getQuery
        } catch (err) {
            throw err
        }
    }

    async getTotalDocs() {
        try {
            const totalDoc = await SubCategoryModel.countDocuments({ isDeleted: false })
            return totalDoc
        } catch (err) {
            throw err
        }
    }

    async updateSubCategory(query, updatedData) {
        try {
            const updateQuery = await SubCategoryModel.findByIdAndUpdate(query, updatedData, { new: true });
            return updateQuery;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = SubCategoryRepository;
