import React from 'react'
import { Col } from 'react-grid-system'
import Controle from './Controle'
import Info from './Info'
import Grafico from './Grafico'
import io from 'socket.io-client'
import { Element, scroller } from 'react-scroll'

const socket = io(`http://${location.host}`)
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

  handleSearch = () => {
    socket.emit('/get/device/', { nome: this.state.devices[this.state.selectedDevice] })
    setTimeout(() => {
      document.getElementsByTagName('body')[0].style.background = 'linear-gradient(#282828, #000)'
      scroller.scrollTo('grafico', {
        duration: 700,
        smooth: true,
      })
    }, 200)
  }

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
        <Element name="grafico">
          <Grafico data={this.state.infoDevice} />
        </Element>
      </Col>
    )
  }
}

export default Historico
