import Iva from '#models/iva'
import { inject } from '@adonisjs/core'
import { IvaCreate } from '../@types/index.js'

@inject()
export default class IvaService {
  async getCurrentInfoIva() {
    const iva = await Iva.query().where('active', true).first()

    if (!iva) return undefined

    return iva.serialize()
  }

  async changeStatusIva(id: number) {
    const iva = await Iva.query().where('id', id).first()

    if (!iva) return undefined

    iva.active = !iva.active

    return iva.save()
  }

  async createNewValueIva(dataIva: IvaCreate) {
    return (await Iva.create(dataIva)).serialize()
  }
}
