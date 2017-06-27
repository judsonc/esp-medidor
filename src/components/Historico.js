import React from 'react'
import {Col} from 'react-grid-system'
import Controle from './Controle'
import Info from './Info'
import io from 'socket.io-client'

const socket = io(`http://${location.hostname}:3001`)
socket.on('connect', () => console.log('Conectado!'))

class Historico extends React.Component {
  state = {
    devices: [],
    selectedDevice: 0,
    infoDevice: {},
  }

  componentDidMount() {
    socket.on('getAllNameDevices', this.handleLoadDevices)
    socket.on('getOneDevice', this.handleInfoDevice)
  }

  handleLoadDevices = (devices) => this.setState({ devices })

  handleInfoDevice = (infoDevice) => this.setState({ infoDevice })

  handleChangeDevices = (event, index) => this.setState({ selectedDevice: index })

  handleSearch = () => socket.emit('/get/device/', { nome: this.state.devices[this.state.selectedDevice] })

  render() {
    return (
      <Col xs={12}>
        <Controle
          devices={this.state.devices}
          handleSearch={this.handleSearch}
          handleChangeDevices={this.handleChangeDevices}
          handleInfoDevice={this.state.handleInfoDevice}
          selectedDevice={this.state.selectedDevice}
        />
        <Info data={this.state.infoDevice} />
      </Col>
    )
  }
}

export default Historico
