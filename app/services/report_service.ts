import Invoice from '#models/invoice'
import Product from '#models/product'
import db from '@adonisjs/lucid/services/db'

export default class ReportService {
  async reportSells(dateInit: string, dateEnd: string) {
    return await Invoice.query()
      .select('date', 'total_invoice')
      .whereBetween('date', [dateInit, dateEnd])
  }

  async reportBestSallingProduct(dateInit: string, dateEnd: string) {
    return await db
      .from('detail_invoices')
      .join('products', 'detail_invoices.product_id', '=', 'products.id')
      .join('invoices', 'detail_invoices.invoice_id', '=', 'invoices.id')
      .select('products.name as product_name')
      .select(db.raw('SUM(detail_invoices.quantity * detail_invoices.unit_price) as total_sales'))
      .whereBetween('invoices.date', [dateInit, dateEnd])
      .groupBy('products.name')
      .orderBy('total_sales', 'desc')
  }

  async reportInventory(dateInit: string, dateEnd: string) {
    const products = await Product.query()
      .select('name', 'quantity', 'created_at')
      .whereBetween('created_at', [dateInit, dateEnd])
      .orderBy('created_at', 'desc')

    return products.map((product) => ({
      name: product.name,
      value: product.quantity,
      date: product.createdAt,
    }))
  }
}
