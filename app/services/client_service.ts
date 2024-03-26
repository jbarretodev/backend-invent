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
}
