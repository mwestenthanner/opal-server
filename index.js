const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const routes = require('./routes/api/notes')
const path = require('path')
require('dotenv').config();

app.use(cors())
app.use(bodyParser.json())

mongoose.set('strictQuery', true);

mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,

    })
    .then(() => console.log('MongoDB database connected...'))
    .catch((err) => console.log(err))

app.use('/api/notes', routes)

app.listen(process.env.PORT, () => console.log(`App listening at http://localhost:${process.env.PORT}`))