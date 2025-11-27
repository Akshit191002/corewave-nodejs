const express = require('express')
const dotenv = require('dotenv');
const {PORT} = require('./config/server.config');
const authRoutes = require('./routes/auth.route');
const errorHandler = require('./utils/errorHandler');
const categoryRoutes = require('./routes/category.route');
const subCategoryRoutes = require('./routes/subcategory.route')
const productRoutes = require('./routes/product.route')
dotenv.config()
require('./config/db.config')
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', authRoutes)
app.use('/api', categoryRoutes)
app.use('/api', subCategoryRoutes) 
app.use('/api', productRoutes)
app.use(errorHandler)

app.listen(process.env.PORT, () => {
    console.log(`*** Server running on http://localhost:${PORT} ***`)
})