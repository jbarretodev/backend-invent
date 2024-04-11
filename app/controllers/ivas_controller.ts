import IvaService from '#services/iva_service'
import { ivaCreate } from '#validators/iva_create'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class IvasController {
  constructor(protected ivaService: IvaService) {}
  async getCurrentInfoIva(ctx: HttpContext) {
    const iva = await this.ivaService.getCurrentInfoIva()

    if (!iva) return ctx.response.notFound({ error: true, message: 'no iva' })

    return ctx.response.ok(iva)
  }

  async createNewValueIva(ctx: HttpContext) {
    const payload = await ctx.request.validateUsing(ivaCreate)

    const prevIva = await this.ivaService.getCurrentInfoIva()

    if (prevIva) this.ivaService.changeStatusIva(prevIva.id)

    const newIva = await this.ivaService.createNewValueIva(payload)

    return ctx.response.created(newIva)
  }
}
