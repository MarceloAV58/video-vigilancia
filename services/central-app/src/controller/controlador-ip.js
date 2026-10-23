const express = require('express')

const router = express.Router()

const apiPuerto = 8101
const api = `http://localhost:${apiPuerto}`

//Marcas compatibles y disponibles para ip
const marcas  = ['steren']

//Consulta a la API segun URL y metodo
const middleware = async (req, res, next) => {
    const URL = req.url
    //Hacer una verificacion de marca de camaras para saber si se puede continuar
    if(req.params.marca){
        console.log(`Marca: ${req.params.marca}`)
    }

    const endpoint = api.concat(URL)

    console.log(`Se esta haciendo una consulta al endpoint: ${endpoint}`)

    try {
        const response = await fetch(endpoint, { method: req.method });
        const data = await response.json()

        req.respuesta = data
        next()
    } catch (err) {
        const error = new Error("No se pudo establecer comunicacion con el servicio de IP")
        error.statusCode = 503
        next(error)
    }
}

router.get('/', middleware, (req, res) => {
    const respuesta = req.respuesta

    res.send(respuesta.mensaje)
})

router.get('/:marca', middleware, (req, res) => {
    const respuesta = req.respuesta
    res.send(respuesta)
})

router.get('/:marca/camaras', (req, res) => {
    res.send("Usted ha consultado las camaras disponibles de ip")
})

router.get('/:marca/camaras/:id', (req, res) => {
    const id = req.params.id
    res.send(`Has consultado la camara: ${id}`)
})

router.get('/:marca/grabaciones', (req, res) => {
    res.send("Usted ha consultado las grabaciones de las camaras")
})

router.get('/:marca/grabaciones/:id', (req, res) => {
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
