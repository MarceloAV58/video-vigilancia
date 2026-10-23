const express = require('express')
const sterenRouter = require('./controlador-steren')

const checkPort = require('../service/verificacion')
const app = express()

app.use('/steren', sterenRouter)

app.get('/', (req, res) => {
    const respuesta = {
        "mensaje": "Todo correcto en el servicio IP"
    }
    res.send(respuesta)
})


module.exports= app