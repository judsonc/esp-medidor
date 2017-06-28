import React from 'react'
import { Container, Row } from 'react-grid-system'
import injectTapEventPlugin from 'react-tap-event-plugin'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import AppBar from 'material-ui/AppBar'
import Historico from './components/Historico'
import ModalAbertura from './components/ModalAbertura'
import {
  yellow300, yellow400, yellow500,
  grey200, grey300, grey400, grey500, grey900,
} from 'material-ui/styles/colors'

const muiTheme = getMuiTheme(darkBaseTheme, {
  fontFamily: 'Roboto, sans-serif',
  appBar: {
    textColor: '#353535',
    color: yellow500,
  },
  palette: {
    primary1Color: yellow500,
    primary2Color: yellow400,
    primary3Color: grey400,
    accent1Color: yellow300,
    accent2Color: grey200,
    accent3Color: grey500,
    textColor: grey300,
    borderColor: grey300,
    shadowColor: grey900,
    pickerHeaderColor: yellow300,
  },
})

injectTapEventPlugin()

class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <AppBar
            showMenuIconButton={false}
            title="LuminoSD"
          />
          <Container>
            <Row>
              <Historico />
            </Row>
          </Container>
          <ModalAbertura />
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App
