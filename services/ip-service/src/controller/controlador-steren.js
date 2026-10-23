const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
    const respuesta = {
        "mensaje": "Todo correcto en el servicio IP/Steren"
    }
    res.send(respuesta)
})

module.exports = router