import InfoCommerce from "#models/info_commerce";

export default class InfoCommerceServide
{
  async getInfoCommerce ()
  {
    return await InfoCommerce.query().first()
  }
}