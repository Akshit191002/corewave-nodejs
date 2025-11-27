const BadRequestError = require("../errors/badRequest.error");
const ConflictError = require("../errors/conflict.error");
const NotFoundError = require("../errors/notFound.error");

class SubCategoryService {
    constructor(subCategoryRepository, categoryRepository, productRepository) {
        this.subCategoryRepository = subCategoryRepository;
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository
    }

    async createSubCategory(subCategoryData) {
        try {
            if (!subCategoryData.categoryName || !subCategoryData.name) throw BadRequestError("missing name or category name")
            const name = subCategoryData.name.toLowerCase()
            const categoryName = subCategoryData.categoryName
            const result = await this.categoryRepository.alreadyExistsCategory({ name: categoryName })
            if (!result) throw new NotFoundError("This category not found")
            const categoryId = result._id
            const existingSubCategory = await this.subCategoryRepository.alreadyExistsSubCategory({ name: name, categoryId: categoryId });
            if (existingSubCategory) throw new ConflictError("This sub category already exists");
            const subCategory = await this.subCategoryRepository.createSubCategory({ name, categoryId: categoryId });
            return subCategory
        } catch (err) {
            throw err
        }
    }

    async getAllSubCategory(paginationData) {
        try {
            const page = paginationData.page;
            const limit = paginationData.limit;
            const data = await this.subCategoryRepository.getAll({ page: page, limit: limit });
            const totalDocs = await this.subCategoryRepository.getTotalDocs();
            const totalPages = Math.ceil(totalDocs / limit)
            return { page, limit, totalPages, totalData: totalDocs, data }
        } catch (err) {
            throw err
        }
    }

    async updateSubCategory(updatedData) {
        try {
            const id = updatedData.id
            const name = updatedData.name
            const alreadyExists = await this.subCategoryRepository.alreadyExistsSubCategory({ name: name, isDeleted: false })
            console.log(id, name)
            if (alreadyExists) throw new ConflictError("this name already exists")
            if (!id) throw new BadRequestError("please enter id")
            const updatedDate = new Date()
            const update = await this.subCategoryRepository.updateSubCategory({ _id: id }, { name: name, updatedDate: updatedDate })
            return update
        } catch (err) {
            throw err
        }
    }

    async deleteSubCategory(subCategoryID) {
        try {
            const id = subCategoryID.id
            const exists = await this.subCategoryRepository.alreadyExistsSubCategory({ _id: id, isDeleted: false })
            if (!exists) throw new NotFoundError("this Sub category not found")
            const productActive = await this.productRepository.alreadyProduct({ subCategoryId: id, isDeleted: false })
            if (productActive) throw new BadRequestError("product active in this sub category")
            const markedDeleted = await this.subCategoryRepository.updateSubCategory({ _id: id }, { isDeleted: true })
        } catch (err) {
            throw err
        }
    }
}
module.exports = SubCategoryService;