const express = require('express')
const app = express()
const sequelize = require('./config/database');
const User = require('./models/User');
const Movies = require('./models/Movies');
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/movies', (req, res) => {
    res.send('Movies List')
})

app.post('/movies', (req, res) => {
    res.send('Add a Movie')
})

app.put('/movies/:id', (req, res) => {
    res.send(`Update Movie with ID ${req.params.id}`)
})

app.delete('/movies/:id', (req, res) => {
    res.send(`Delete Movie with ID ${req.params.id}`)
})

 sequelize.sync({alter: true}).then(()=>{
    app.listen(port,()=> console.log(`Database connected successfully and app listening on port ${port}`))
  })
  .catch((error)=>{
    console.log(error.message)
  });