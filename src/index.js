const express = require('express')
// const app = express()
const port = 3000
// import app from './app'
var app = require("./app")

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))