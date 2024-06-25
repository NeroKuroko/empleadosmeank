const express = require('express')
const empleadoRouter = express.Router()

// declaramos un objeto en nuestro modelo 
let empleado = require('../models/empleado')

//Agregar empleado nuevo 
empleadoRouter.route('/agregar').post((req, res) => {
    empleado.create(req.body)
.then((data) =>{
    console.log('Se inserto un empleado')
    res.send(data)
})
.catch((error) => {
    console.error(error)
})
})

//Obtener todos los empleados de la base de datos 
empleadoRouter.route('/empleados').get((req, res) => {
    empleado.find()
    .then((data) => {
        res.send(data)
    })
    .catch((error) =>{
        console.error(error)
    })
})

//Obtener un sólo empleado por su ID 
empleadoRouter.route('/empleado/:id').get((req, res) => {
    empleado.findById(req.params.id)
    .then((data) => {
        res.send(data)
    })
    .catch((error) =>{
        console.error(error)
    })
})

//Actualizar un empleado
empleadoRouter.route('/actualizar/:id').put((req, res) => {
    empleado.findByIdAndUpdate(req.params.id,{
        $set :req.body
    })
    .then((data) => {
        console.log('Se actualizo el empleado')
        res.send(data)
    })
    .catch((error) =>{
        console.error(error)
    })
})

//Eliminar un empleado 
empleadoRouter.route('/delete/:id').delete((req,res) =>{
    empleado.findByIdAndDelete(req.params.id)
    .then((data) => {
        console.log('Se elimino el empleado')
        res.send(data)
    })
    .catch((error) =>{
        console.error(error)
    })
})

module.exports = empleadoRouter;