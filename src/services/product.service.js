const BadRequestError = require("../errors/badRequest.error");
const ConflictError = require("../errors/conflict.error");
const NotFoundError = require("../errors/notFound.error");

class ProductService {
    constructor(productRepository, categoryRepository, subCategoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.subCategoryRepository = subCategoryRepository;
    }

    async createProduct(productData) {
        try {
            if (!productData.categoryName || !productData.subCategoryName || !productData.name || !productData.price || !productData.description) throw BadRequestError("missing field")
            const name = productData.name.toLowerCase()
            const categoryName = productData.categoryName
            const subCategoryName = productData.subCategoryName
            const category = await this.categoryRepository.alreadyExistsCategory({ name: categoryName })
            if (!category) throw new NotFoundError("This category not found")
            const categoryId = category._id
            const subCategory = await this.subCategoryRepository.alreadyExistsSubCategory({ name: subCategoryName, categoryId: categoryId })
            if (!subCategory) throw new NotFoundError("This sub category not found")
            const subCategoryId = subCategory._id
            const product = await this.productRepository.createProduct({ name, categoryId: categoryId, subCategoryId: subCategoryId, price: productData.price, description: productData.description });
            return product
        } catch (err) {
            throw err
        }
    }

    async getAllProduct(paginationData) {
        try {
            const page = paginationData.page;
            const limit = paginationData.limit;
            const data = await this.productRepository.getAll({ page: page, limit: limit });
            const totalDocs = await this.productRepository.getTotalDocs();
            const totalPages = Math.ceil(totalDocs / limit)
            return { page, limit, totalPages, totalData: totalDocs, data }
        } catch (err) {
            throw err
        }
    }

    async updateProduct(updatedData) {
        try {
            const id = updatedData.id
            const name = updatedData.name
            const description = updatedData.description
            const price = updatedData.price
            if (!id) throw new BadRequestError("please enter id")
            const update = {
                ...(name && { name }),
                ...(description && { description }),
                ...(price && { price }),
                updatedDate: new Date()
            }
            const result = await this.productRepository.updateProduct({ _id: id }, update)
            return result
        } catch (err) {
            throw err
        }
    }

    async deleteProduct(productId) {
        try {
            const id = productId.id
            const exists = await this.productRepository.alreadyProduct({ _id: id, isDeleted: false })
            if (!exists) throw new NotFoundError("this product not found")
            const markedDeleted = await this.productRepository.updateProduct({ _id: id }, { isDeleted: true })
        } catch (err) {
            throw err
        }
    }
}
module.exports = ProductService;