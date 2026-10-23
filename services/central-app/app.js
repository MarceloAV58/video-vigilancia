const app = require('./src/controller/controlador-app')
const PUERTO = 8100

app.listen(PUERTO, () => {
    console.log(`Servidor corriendo en el puerto: ${PUERTO}`)
})
