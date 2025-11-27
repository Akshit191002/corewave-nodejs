const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
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

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
