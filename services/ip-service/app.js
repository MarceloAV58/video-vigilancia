const app = require('./src/controller/controlador')

const PUERTO = 8101

app.listen(PUERTO, (req, res)=>{
    console.log(`Microservicio IP escuchando en puerto: ${PUERTO}`)
})
