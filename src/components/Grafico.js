import React from 'react'
import RC2 from 'react-chartjs-2'
import Paper from 'material-ui/Paper'
import Info from './Info'
import {paper} from '../assets/style'


class Grafico extends React.Component {
  render() {
    const dados = {
      labels: this.props.dados.x,
      datasets: [
        {
          label: this.props.dados.labely,
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(1,87,155,0.8)',
          borderColor: 'rgba(1,87,155,0.8)',
          hoverBackgroundColor: 'rgba(1,87,155,0.6)',
          hoverBorderColor: 'rgba(1,87,155,0.6)',
          borderWidth: 0,
          data: this.props.dados.y,
        },
      ],
    }
    return (!dados.labels.length) ? null : (
      <div>
        <Info dados={this.props.dados} />
        <Paper style={paper}>
          <RC2 data={dados} type="bar" />
        </Paper>
      </div>
    )
  }
}

export default Grafico
