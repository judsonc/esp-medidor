import React from 'react'
import moment from 'moment'
import {Col} from 'react-grid-system'
import Controle from './Controle'
import Grafico from './Grafico'
import {dispositivos} from '../dados'
import io from 'socket.io-client'

const socket = io(`http://${location.hostname}:3001/cliente`)
socket.on('connect', () => console.log('Conectado!'))

class Historico extends React.Component {
  state = {
    listaDispositivos: dispositivos,
    valorDispositivo: 0,
    historico: {
      x: [],
      y: [],
      uuid_dispositivo: null,
      data_hora: null,
      pulso_acumulado: 0,
    },
    data: new Date(),
  }

  componentDidMount() {
    socket.on('action', (action) => {
      console.log('action -- ', action)
      if (action.type === 'getOneLogHistoricoAcumulado')
        this.handleHistoricoAcumulado(action.data)
      if (action.type === 'getOneLogHistorico')
        this.handleHistorico(action.data)
      if (action.type === 'getOneLogHistoricoNow')
        this.handleHistoricoNow(action.data)
    })
  }

  handleHistoricoAcumulado = (valor) => {
    this.setState({
      historico: Object.assign({}, this.state.historico, valor),
    })
  }

  handleHistorico = (valor) => {
    this.setState({
      historico: Object.assign({}, this.state.historico, valor),
    })
  }

  handleHistoricoNow = (valor) => {
    const newLog = {
      pulso_acumulado: this.state.historico.pulso_acumulado + valor.pulso_acumulado,
      y: valor.y.map((item,i) => this.state.historico.y[i] ? item + this.state.historico.y[i] : item),
      x: valor.x,
      uuid_dispositivo: valor.uuid_dispositivo,
      data_hora: valor.data_hora,
    }
    this.setState({
      historico: Object.assign({}, this.state.historico, newLog)
    })
  }

  handleChangeDispositivo = (event, index) => {
    this.setState({
      valorDispositivo: index,
    })
  }

  handleChangeData = (event, data) => {
    this.setState({
      data,
    })
  }

  handleBuscar = () => {
    const msg = {
      type: '/history/get/filter/',
      data: {
        uuid_dispositivo: this.state.listaDispositivos[this.state.valorDispositivo].uuid,
        data_hora: moment(this.state.data).format('YYYY-MM-DD'),
      },
    }
    socket.emit('action', msg)
  }

  render() {
    return (
      <Col xs={12}>
        <Controle
          handleBuscar={this.handleBuscar}
          handleChangeDispositivo={this.handleChangeDispositivo}
          valorDispositivo={this.state.valorDispositivo}
          listaDispositivos={this.state.listaDispositivos}
          data={this.state.data}
          handleChangeData={this.handleChangeData}
        />
        <Grafico dados={this.state.historico} />
      </Col>
    )
  }
}

export default Historico
