import React from 'react'
import Paper from 'material-ui/Paper'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentSearch from 'material-ui/svg-icons/action/search'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import {paper, btnSearch, controle} from '../assets/style'

class Controle extends React.Component {
  render() {
    const devices = this.props.devices.map((name, i) => <MenuItem key={i} value={i} primaryText={name} />)
    return (
      <Paper style={paper}>
        <div style={controle}>
          <SelectField
            floatingLabelText="Dispositivos"
            floatingLabelFixed={true}
            value={this.props.selectedDevice}
            onChange={this.props.handleChangeDevices}
            autoWidth={true}
          >
            {devices}
          </SelectField>
        </div>
        <FloatingActionButton style={btnSearch} onTouchTap={this.props.handleSearch}>
          <ContentSearch />
        </FloatingActionButton>
      </Paper>
    )
  }
}

export default Controle
