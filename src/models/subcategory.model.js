const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    addedDate: {
        type: Date,
        default: new Date()
    },
    updatedDate: {
        type: Date,
        default: new Date()
    },
});

const SubCategory = mongoose.model('SubCategory', subCategorySchema);
module.exports = SubCategory;
