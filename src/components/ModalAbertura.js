import React from 'react'
import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'

class ModalAbertura extends React.Component {
  state = {
    open: true,
  }

  handleClose = () => this.setState({open: false})

  render() {
    const actions = [
      <RaisedButton
        label="Ok"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />,
    ]

    return (
      <Dialog
        title="LuminoSD"
        actions={actions}
        modal={false}
        open={this.state.open}
        onRequestClose={this.handleClose}
      >
        Escolha um dispositivo para ver a luminosidade do ambiente monitorado em tempo real.
      </Dialog>
    )
  }
}

export default ModalAbertura
