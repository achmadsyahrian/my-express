require('dotenv').config() //panggil dotenv
const PORT = process.env.PORT //diambil dari .env menggunakan node dotenv

const express = require('express')
const app = express()

const indexRouter = require('./routes/index')
const authRouter = require('./routes/auth/v1.route.js')
const adminRouter = require('./routes/admin/v1.route.js')

app.use(express.json()) //untuk menerima inputan json seperti input data body
app.use('/', indexRouter)
app.use('/v1', authRouter)
app.use('/admin/v1', adminRouter)

app.listen(PORT, () => {
   console.log(`SERVER SUCCESS RUNNING IN ${PORT}`)
})