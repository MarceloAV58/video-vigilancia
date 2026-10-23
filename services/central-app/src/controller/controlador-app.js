const express = require('express')
const path = require('node:path')

const app = express()

//Directorio padre al directorio actual
const sourcePath = path.dirname(__dirname)
const publicPath = path.join(sourcePath, 'public')
const templatesPath = path.join(sourcePath, 'templates')

//Ruta a los archivos js que exportan el Router para cada servicio
const blinkRouter = require('./controlador-blink')
const ipRouter = require('./controlador-ip')

app.use(express.static(publicPath))
app.use(express.static(templatesPath))

app.use('/blink', blinkRouter)
app.use('/ip', ipRouter)

app.get('/', (req, res) => {
    res.send('index.html')
})

module.exports = app