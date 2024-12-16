import InfoCommerce from '#models/info_commerce';
export default class InfoCommerceServide {
    async getInfoCommerce() {
        return await InfoCommerce.query().first();
    }
    async updateInfoCommerce(data) {
        return await InfoCommerce.updateOrCreate({ identification: data.identification }, data);
    }
}
//# sourceMappingURL=info_commerce_service.js.map