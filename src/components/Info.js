import React from 'react'
import Paper from 'material-ui/Paper'
import {paper, h3, fontRed} from '../assets/style'

class Info extends React.Component {
  render() {
    const acumulado = this.props.dados.pulso_acumulado.toString()
    return (
      <Paper className="text-center" style={paper}>
        <span> Acumulado ({this.props.dados.labely}) <br/>
          <span style={h3}>{ acumulado.substring(0, acumulado.length-3) }
            <span style={fontRed}>{ acumulado.substring(acumulado.length-3, acumulado.length) }</span>
          </span>
        </span>
      </Paper>
    )
  }
}

export default Info
