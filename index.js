const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

//Conexión con la base de datos 
mongoose
    .connect('mongodb+srv://nero:1234@projectonero.adiv1du.mongodb.net/empleados?retryWrites=true&w=majority&appName=ProjectoNero')
    .then((x) => {
        console.log(`Conectado exitosamente a la base ${x.connections[0].name}`)
    })
    .catch((error) =>{
        console.log('Error de conexión: ',error.reason)
    })


//Configuración del servidor web 
const empleadoRouter = require('./routes/empleado.routes')
const app = express()

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended : false
    })
)

app.use(cors())

app.use('/api',empleadoRouter)

//Habilirar el puerto 
const port = process.env.PORT || 4000
const server = app.listen(port, () => {
    console.log('Escuchando en el puerto '+port)
})

//Manejar posibles errores 404
app.use((req, res, next) =>{
    next(createError(404))
})

// Manejar errores
app.use(function(err, req, res, next){
    console.log(err.message)
    if(!err.statusCode) err.statusCode = 500
    res.statud(err.statusCode).send(err.message)
})