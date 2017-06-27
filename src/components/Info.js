import React from 'react'
import moment from 'moment'
import {Col, Row, Hidden} from 'react-grid-system'
import Paper from 'material-ui/Paper'
import {paper, h3} from '../assets/style'

class Info extends React.Component {
  render() {
    return (!this.props.data.nome) ? null : (
      <div>
        <Paper className="text-center" style={paper}>
          <Row>
            <Col sm={6} md={4}>
              <Hidden xs>
                <span> Luminosidade Instantânea <br/>
                  <span style={h3}>{ this.props.data.valor } % </span>
                </span>
              </Hidden>
            </Col>
            <Col xs={12} sm={6} md={4}>
              <span> { moment(this.props.data.data_hora).format('DD-MM-YYYY') } <br/>
                <span style={h3}>{ this.props.data.nome }</span>
              </span>
            </Col>
            <Col md={4}>
              <Hidden xs sm>
                <span> Luminosidade Média <br/>
                  <span style={h3}>{ this.props.data.media } % </span>
                </span>
              </Hidden>
            </Col>
          </Row>
        </Paper>
        <Paper style={paper}>
          <p>
            Ideia de mudar o brilho da tela ao mudar o sensor variando o brilho de 0 a 100%. Se não, colocar um gradiente e fazer
            a média no meio e o instantâneo vareando no gradiente.
          </p>
        </Paper>
      </div>
    )
  }
}

export default Info
