import PDFDocument from 'pdfkit'
import fs from 'fs'
import { InvoicePDF } from '../@types/index.js'
import path from 'path'
import {
  generateCustomerInformationPDF,
  generateFooterPDF,
  generateHeaderPDF,
  generateInvoiceTablePDF,
} from './utils.js'
//import Table  from 'pdfkit-table'

export default class Util {
  static generateRandomHash(): string {
    const caracteresPermitidos = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const longitudHash = 8

    let hash = ''
    for (let i = 0; i < longitudHash; i++) {
      const indiceAleatorio = Math.floor(Math.random() * caracteresPermitidos.length)
      hash += caracteresPermitidos[indiceAleatorio]
    }

    return hash
  }

  static async generateInvoicePdf(invoiceData: InvoicePDF, filePath: string) {
    const doc = new PDFDocument({ size: 'A4', margin: 50 })

    const folderPath = path.dirname(filePath)

    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true })
    }

    generateHeaderPDF(invoiceData, doc)
    generateCustomerInformationPDF(doc, invoiceData)
    generateInvoiceTablePDF(doc, invoiceData)
    generateFooterPDF(doc)

    doc.end()
    doc.pipe(fs.createWriteStream(filePath))

    return true
  }
}
