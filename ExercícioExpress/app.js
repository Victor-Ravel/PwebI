const express = require('express')
const app = express()
const port = 3000

app.use((req, res, next) => {
  console.log('Acessou:', req.method, req.url)
  next()
})

app.get('/', (req, res) => {
  res.send('Página /')
})

// about
app.get('/about', (req, res) => {
  res.send('Página /about')
})

// data
app.post('/data', (req, res) => {
  res.send('Página /data (POST)')
})

// users
app.get('/users', (req, res) => {
  res.send('Página /users')
})

// signin
app.get('/users/signin', (req, res) => {
  res.send('Página /users/signin')
})

// signup
app.get('/users/signup', (req, res) => {
  res.send('Página /users/signup')
})

app.get('/users/:userid', (req, res) => {
  const userid = req.params.userid

  if (!userid) {
    res.redirect('/users/signup')
  } else {
    res.send('Bem vindo ' + userid)
  }
})

// pagina 404

app.use((req, res) => {
  res.status(404).send('Erro 404. Página não encontrada, ir para /')
})

app.listen(port, () => {
  console.log('rodando em http://localhost:3000')
})