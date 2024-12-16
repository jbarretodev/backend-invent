import Client from '#models/client';
export default class ClientService {
    async saveNewClient(client) {
        return await Client.create(client);
    }
    async getClienByIdentification(identification) {
        return await Client.query().where('identification', identification).preload('invoices').first();
    }
    async getAllClients() {
        return await Client.query().preload('invoices');
    }
    async getClientWithOutInvoice(identification) {
        const client = await Client.findBy('identification', identification);
        return client ? client : null;
    }
    async getClientInvoices(id) {
        return await Client.query().where('id', id).preload('invoices').first();
    }
    async getClientsWithOutInvoice() {
        return await Client.all();
    }
}
//# sourceMappingURL=client_service.js.map