import Client from '#models/client'
import { ClientCreate } from '../@types/index.js'
export default class ClientService {
  async saveNewClient(client: ClientCreate) {
    return await Client.create(client)
  }

  async getClienByIdentification(identification: string) {
    return await Client.query().where('identification', identification).preload('invoices').first()
  }

  async getAllClients() {
    return await Client.query().preload('invoices')
  }

  async getClientWithOutInvoice(identification: string) {
    const client = await Client.findBy('identification', identification)

    return client ? client : null
  }

  async getClientInvoices(id: number) {
    return await Client.query().where('id', id).preload('invoices').first()
  }

  async getClientsWithOutInvoice() {
    return await Client.all()
  }
}
