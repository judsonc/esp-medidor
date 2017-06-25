import React from 'react'
import Paper from 'material-ui/Paper'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentSearch from 'material-ui/svg-icons/action/search'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import DatePicker from 'material-ui/DatePicker'
import {paper, btnSearch} from '../assets/style'

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
        <FloatingActionButton style={btnSearch} onTouchTap={this.props.handleBuscar}>
          <ContentSearch />
        </FloatingActionButton>
      </Paper>
    )
  }
}

export default Controle
