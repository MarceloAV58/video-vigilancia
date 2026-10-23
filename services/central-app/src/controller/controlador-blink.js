const express = require('express')

const router = express.Router()

const apiPuerto = 8102
const api = `http://localhost:${apiPuerto}`

//Consulta a la API segun URL y metodo
const middleware = async (req, res, next) => {
    const URL = req.url
    const endpoint = api.concat(URL)

    console.log(`Se esta haciendo una consulta al endpoint: ${endpoint}`)

    try {
        const response = await fetch(endpoint, { method: req.method });
        const data = await response.json()

        req.respuesta = data
        next()
    } catch (err) {
        const error = new Error("No se pudo establecer comunicacion con el servicio de Blink")
        error.statusCode = 503
        next(error)
    }
}

//Indice del modulo de camaras Blink/Inicio de sesion y verificacion de dos pasos
router.get('/', middleware, (req, res) => {
    const respuestaApi = req.respuesta
    res.send("Usted ha accedido al modulo blink")
})

//Recupera todas las camaras Blink
router.get('/camaras', middleware, (req, res) => {
    const respuestaApi = req.respuesta
    res.send("Usted ha consultado las camaras disponibles de blink")
})

//Recupera una camara en especifico
router.get('/camaras/:id', (req, res) => {
    const id = req.params.id
    res.send(`Has consultado la camara: ${id}`)
})

//Recupera las grabaciones disponibles
router.get('/grabaciones', (req, res) => {
    res.send("Usted ha consultado las grabaciones de las camaras")
})

//Recupera una grabacion en especifico
router.get('/grabaciones/:id', (req, res) => {
    const id = req.params.id
    res.send(`Has consultado las grabaciones de la camara: ${id}`)
})

router.use((err, req, res, next) => {
    console.error(err.stack); // Registra el error en consola
    const statusCode = err.statusCode || 500; // Define el código de estado
    res.status(statusCode).json({
        status: 'error',
        message: err.message || 'Ocurrió un error en el servidor',
    });
});

module.exports = router
