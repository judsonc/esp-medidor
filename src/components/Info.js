import React from 'react'
import moment from 'moment'
import { Col, Row, Hidden } from 'react-grid-system'
import Paper from 'material-ui/Paper'
import { paper, h3 } from '../assets/style'

class Info extends React.Component {
  render() {
    return (!this.props.data.nome) ? null : (
      <Paper className="text-center" style={paper}>
        <Row>
          <Hidden xs>
            <Col sm={6} md={4}>
              <span> Instantânea <br/>
                <span style={h3}>{this.props.data.valor} % </span>
              </span>
            </Col>
          </Hidden>
          <Hidden sm>
            <Col xs={12} md={4}>
              <span> {moment(this.props.data.data_hora).format('DD-MM-YYYY')} <br/>
                <span style={h3}>{this.props.data.nome}</span>
              </span>
            </Col>
          </Hidden>
          <Hidden xs>
            <Col sm={6} md={4}>
              <span> Parcial <br/>
                <span style={h3}>{this.props.data.media} % </span>
              </span>
            </Col>
          </Hidden>
        </Row>
      </Paper>
    )
  }
}

export default Info
