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
        title="Gerencie seu consumo"
        actions={actions}
        modal={false}
        open={this.state.open}
        onRequestClose={this.handleClose}
      >
        Escolha um dia para ver o comportamento do consumo energético variando no tempo naquele dispositivo escolhido.
      </Dialog>
    )
  }
}

export default ModalAbertura
