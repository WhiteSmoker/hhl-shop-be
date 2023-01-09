const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const bodyParser = require('body-parser')
const { connectDB } = require('./utils/mongo.connect')
const environments = require('./constants/environment')

const app = express()

const authRoute = require('./routes/auth.route')
const userRoute = require('./routes/user.route')
const productRoute = require('./routes/product.route')
const categoryRoute = require('./routes/category.route')
const orderRoute = require('./routes/order.route')
const profileRoute = require('./routes/profile.route')
const blogRoute = require('./routes/blog.route')
const homeRoute = require('./routes/home.route')

app.use(helmet())
app.use(morgan('tiny'))
app.use(cors())
app.use(express.json({ limit: '50mb' }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }))

app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)
app.use('/api/products', productRoute)
app.use('/api/categories', categoryRoute)
app.use('/api/orders', orderRoute)
app.use('/api/profiles', profileRoute)
app.use('/api/blogs', blogRoute)
app.use('/api/home', homeRoute)

connectDB()

app.listen(environments.PORT, () => {
  console.log(`Server listening on port ${environments.PORT}`)
})
