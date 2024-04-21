import InfoCommerce from "#models/info_commerce";
import { CommerceCreate } from "../@types/index.js";

export default class InfoCommerceServide
{
  async getInfoCommerce ()
  {
    return await InfoCommerce.query().first()
  }

  async updateInfoCommerce ( data: CommerceCreate )
  {
    return await InfoCommerce.updateOrCreate({identification:data.identification},data)
  }
}