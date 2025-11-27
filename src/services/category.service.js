const BadRequestError = require("../errors/badRequest.error");
const ConflictError = require("../errors/conflict.error");
const NotFoundError = require("../errors/notFound.error")

class CategoryService {
    constructor(categoryRepository, subcategoryRepository) {
        this.categoryRepository = categoryRepository;
        this.subcategoryRepository = subcategoryRepository
    }

    async createCategory(categoryData) {
        try {
            const name = categoryData.name.toLowerCase()
            const existingCategory = await this.categoryRepository.alreadyExistsCategory({ name: name, isDeleted: false });
            if (existingCategory) throw new ConflictError("This Category already exists");
            const category = await this.categoryRepository.createCategory({ name });
            return { _id: category._id }
        } catch (err) {
            throw err
        }
    }

    async getAllCategory(paginationData) {
        try {
            const page = paginationData.page;
            const limit = paginationData.limit;
            const data = await this.categoryRepository.getAll({ page: page, limit: limit });
            const totalDocs = await this.categoryRepository.getTotalDocs();
            const totalPages = Math.ceil(totalDocs / limit)
            return { page, limit, totalPages, totalData: totalDocs, data }
        } catch (err) {
            throw err
        }
    }

    async updateCategory(updatedData) {
        try {
            const id = updatedData.id
            const name = updatedData.name
            const alreadyExists = await this.categoryRepository.alreadyExistsCategory({ name: name, isDeleted: false })
            if (alreadyExists) throw new ConflictError("this name already exists")
            if (!id) throw new BadRequestError("please enter id")
            const updatedDate = new Date()
            const update = await this.categoryRepository.updateCategory({ _id: id }, { name: name, updatedDate: updatedDate })
            return update
        } catch (err) {
            throw err
        }
    }

    async deleteCategory(categoryId) {
        try {
            const id = categoryId.id
            const exists = await this.categoryRepository.alreadyExistsCategory({ _id: id, isDeleted: false })
            if (!exists) throw new NotFoundError("this category not found")
            const subCategoryActive = await this.subcategoryRepository.alreadyExistsSubCategory({ categoryId: id, isDeleted: false })
            if (subCategoryActive) throw new BadRequestError("sub category active in this category")
            const markedDeleted = await this.categoryRepository.updateCategory({ _id: id }, { isDeleted: true })
        } catch (err) {
            throw err
        }
    }

}
module.exports = CategoryService;