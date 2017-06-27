const low = require('lowdb')
const fileAsync = require('lowdb/lib/storages/file-async')
const db = low('../db.json', { storage: fileAsync })
const express = require('express') // Módulo do Express para servidor de arquivos
const app = express()
const port = process.env.PORT || 3001
const server = app.listen(port, () => console.log('Servidor iniciado! Na porta %s.', port))
const io = require('socket.io')(server)
const Device = require('./model/Device')

db.defaults({ devices: [] }).write().then(() => console.log('DB ready'))
app.use('/', express.static(__dirname + '/static')) // Disponibiliza os arquivos da pasta "static" no link raiz

io.on('connection', (socket) => { // Função executada quando um novo usuário se conecta
  console.log('\nRequisição - ', Date(), socket.id)
  sendAllNameDevices(socket)
  socket.on('/post/log/', (msg) => postLog(msg, socket)) // Evento executado quando o sensor envia os dados
  socket.on('/get/device/', (msg) => sendOneDevice(msg, socket)) // Evento executado quando usuário aperta no botão pesquisar
  socket.on('disconnect', () => console.log('\nDesconectou - ', Date(), socket.id))
})

const postLog = (body, socket) => {
  socket.join(body.nome)
  const dados = db.get('devices').find({ nome: body.nome }).value()
  if (dados) {
    const device = new Device(dados)
    device.addValor(body.valor)
    db.get('devices')
      .find({ nome: body.nome })
      .assign(device)
      .write()
      .then(res => (res.valor) ? sendOneDevice({ nome: res.nome }, socket.to(res.nome)) : null)
  } else {
    const device = new Device()
    device.set(body)
    db.get('devices')
      .push(device)
      .write()
      .then(res => (res.valor) ? sendOneDevice({ nome: res.nome }, socket.to(res.nome)) : null)
  }
}

const sendOneDevice = (body, socket) => {
  socket.join(body.nome)
  leaveAllRooms(socket, body.nome)
  const device = db.get('devices').find(body).value()
  socket.emit('getOneDevice', device)
  console.log('getOneDevice - ', device)
}

const sendAllNameDevices = (socket) => socket.emit('getAllNameDevices', db.get('devices').map('nome').value())

const leaveAllRooms = (socket, stayRoom) => {
  for (let room in socket.rooms) {
    if (room !== socket.id && room !== stayRoom)
      socket.leave(room)
  }
}
