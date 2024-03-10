export default class Util {
  static generateRandomHash(): string {
    const caracteresPermitidos = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const longitudHash = 8

    let hash = ''
    for (let i = 0; i < longitudHash; i++) {
      const indiceAleatorio = Math.floor(Math.random() * caracteresPermitidos.length)
      hash += caracteresPermitidos[indiceAleatorio]
    }

    return hash
  }
}
