class Device {
  constructor(body) {
    this.nome = body.nome || new Date().getTime()
    this.valor = body.valor || 0
    this.contador = body.contador || 0
    this.acumulado = body.acumulado || 0
    this.media = body.media || 0
    this.data_hora = new Date().toISOString()
  }

  addValor(valor) {
    if ((1024 - valor) || this.valor) {
      this.contador += 1
      this.acumulado += valor
      this.valor = Number((((1024 - valor)/1024)*100).toFixed(1))
      this.media = Number((((1024 - (this.acumulado/this.contador))/1024)*100).toFixed(1))
    }
  }

  set(body) {
    this.nome = body.nome || this.nome
    this.addValor(body.valor)
  }
}

module.exports = Device
