import React from 'react'
import { Col, Visible } from 'react-grid-system'
import Slider from 'rc-slider/lib/Slider'
import Paper from 'material-ui/Paper'
import { paper, paperWithMarginLeft, h3, noPadding } from '../assets/style'
import 'rc-slider/assets/index.css'

class Grafico extends React.Component {
  render() {
    const style = {
      track: {
        backgroundColor: 'transparent',
      },
      rail: {
        backgroundColor: 'transparent',
      },
      handle: {
        height: 20,
        width: 20,
        marginLeft: -8,
        borderColor: '#985b00',
        backgroundColor: '#ffeb3b',
      },
      slider: {
        margin: '0 auto',
        background: 'linear-gradient(#f1d908, #040402)',
      },
      light: {
        height: 350,
        background: 'linear-gradient(#ffeb3b, #000)',
      },
      paper: {
        marginTop: 10,
        boxShadow: 'none',
      },
    }
    const marks = {
      30: {
        style: {
          color: 'white',
        },
        label: '30%',
      },
      60: {
        style: {
          color: 'green',
        },
        label: '60%',
      },
      90: {
        style: {
          color: 'red',
        },
        label: '90%',
      },
    }

    return (!this.props.data.media) ? null : (
      <div>
        <Col xs={6} style={noPadding}>
          <Visible xs>
            <Paper className="text-center" style={paper}>
              <span> Instantânea <br/>
                <span style={h3}>{this.props.data.valor} % </span>
              </span>
            </Paper>
          </Visible>
          <Paper style={style.paper}>
            <div style={style.light}>
              <Slider style={style.slider}
                marks={marks} vertical disabled
                min={0} max={100} defaultValue={50}
                value={this.props.data.valor}
                railStyle={style.rail}
                trackStyle={style.track}
                handleStyle={style.handle}
              />
            </div>
          </Paper>
        </Col>
        <Col xs={6} style={noPadding}>
          <Visible xs>
            <Paper className="text-center" style={paperWithMarginLeft}>
              <span> Parcial <br/>
                <span style={h3}>{this.props.data.media} % </span>
              </span>
            </Paper>
          </Visible>
          <Paper style={style.paper}>
            <div style={style.light}>
              <Slider style={style.slider}
                vertical disabled marks={marks}
                min={0} max={100} defaultValue={70}
                value={this.props.data.media}
                railStyle={style.rail}
                trackStyle={style.track}
                handleStyle={style.handle}
              />
            </div>
          </Paper>
        </Col>
      </div>
    )
  }
}

export default Grafico
