import React from 'react'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import DatePicker from 'material-ui/DatePicker'
import {paper, botaoControle} from '../assets/style'

class Controle extends React.Component {
  render() {
    let listaDispositivos = this.props.listaDispositivos.map((dispositivo, i) =>
      <MenuItem key={i} value={i} primaryText={dispositivo.nome} />
    )
    return (
      <Paper style={paper}>
        <div className="controle-xs controle-sm">
          <DatePicker
            className="input-xs datepicker"
            container="inline"
            cancelLabel="Fechar"
            floatingLabelText="Calendário"
            floatingLabelFixed={true}
            autoOk={true}
            maxDate={new Date()}
            onChange={this.props.handleChangeData}
            value={this.props.data}
          />
          <SelectField
            className="input-xs"
            floatingLabelText="Dispositivos"
            floatingLabelFixed={true}
            value={this.props.valorDispositivo}
            onChange={this.props.handleChangeDispositivo}
            autoWidth={true}
          >
            {listaDispositivos}
          </SelectField>
        </div>
        <div style={botaoControle}>
          <RaisedButton onTouchTap={this.props.handleBuscar} primary={true} label="Buscar" />
        </div>
      </Paper>
    )
  }
}

export default Controle
