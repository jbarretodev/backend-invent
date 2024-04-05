import ClientService from '#services/client_service'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class ClientsController {
  constructor(protected clientService: ClientService) {}
  async getAllClients(ctx: HttpContext) {
    const clients = await this.clientService.getAllClients()
    return ctx.response.ok(clients)
  }

  async getClient(ctx: HttpContext) {
    const client = await this.clientService.getClienByIdentification(
      ctx.request.param('identification')
    )

    return client
      ? ctx.response.ok(client)
      : ctx.response.notFound({ error: true, message: 'client not found' })
  }

  async getClientWithOutInvoice(ctx: HttpContext) {
    const client = await this.clientService.getClientWithOutInvoice(
      ctx.request.param('identification')
    )

    return client
      ? ctx.response.ok(client)
      : ctx.response.notFound({ error: true, message: 'client not found' })
  }

  async getClientsWithOutInvoice(ctx: HttpContext) {
    return ctx.response.ok(await this.clientService.getClientsWithOutInvoice())
  }

  async getClientInvoices(ctx: HttpContext) {
    const client = await this.clientService.getClientInvoices(ctx.request.param('id'))
    return client
      ? ctx.response.ok(client)
      : ctx.response.notFound({ error: true, message: 'client not found' })
  }
}
