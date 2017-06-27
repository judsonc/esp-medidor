class Device {
  constructor(body) {
    this.nome = body.nome
    this.valor = body.valor
    this.contador = body.contador
    this.acumulado = body.acumulado
    this.media = body.media
    this.data_hora = body.data_hora
  }

  addValor(valor) {
    if (1024 - valor) {
      this.contador += 1
      this.acumulado += valor
      this.data_hora = new Date().toISOString()
      this.valor = Number((((1024 - valor)/1024)*100).toFixed(1))
      this.media = Number((((1024 - (this.acumulado/this.contador))/1024)*100).toFixed(1))
    }
  }

  set(body) {
    this.nome = body.nome || 'None'
    this.addValor(body.valor)
  }
}

module.exports = Device
