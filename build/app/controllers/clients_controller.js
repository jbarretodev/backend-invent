var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import ClientService from '#services/client_service';
import { inject } from '@adonisjs/core';
let ClientsController = class ClientsController {
    clientService;
    constructor(clientService) {
        this.clientService = clientService;
    }
    async getAllClients(ctx) {
        const clients = await this.clientService.getAllClients();
        return ctx.response.ok(clients);
    }
    async getClient(ctx) {
        const client = await this.clientService.getClienByIdentification(ctx.request.param('identification'));
        return client
            ? ctx.response.ok(client)
            : ctx.response.notFound({ error: true, message: 'client not found' });
    }
    async getClientWithOutInvoice(ctx) {
        const client = await this.clientService.getClientWithOutInvoice(ctx.request.param('identification'));
        return client
            ? ctx.response.ok(client)
            : ctx.response.notFound({ error: true, message: 'client not found' });
    }
    async getClientsWithOutInvoice(ctx) {
        return ctx.response.ok(await this.clientService.getClientsWithOutInvoice());
    }
    async getClientInvoices(ctx) {
        const client = await this.clientService.getClientInvoices(ctx.request.param('id'));
        return client
            ? ctx.response.ok(client)
            : ctx.response.notFound({ error: true, message: 'client not found' });
    }
};
ClientsController = __decorate([
    inject(),
    __metadata("design:paramtypes", [ClientService])
], ClientsController);
export default ClientsController;
//# sourceMappingURL=clients_controller.js.map