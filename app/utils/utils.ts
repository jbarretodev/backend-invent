import { InvoicePDF } from '../@types/index.js'
import path from 'path'

const generateHr = (doc: PDFKit.PDFDocument, y: number) => {
  doc.strokeColor('#aaaaaa').lineWidth(1).moveTo(50, y).lineTo(550, y).stroke()
}

export const generateHeaderPDF = (invoiceData: InvoicePDF, doc: PDFKit.PDFDocument) => {
  doc
    .image(path.resolve('app/files/storage/image/inventory and sales.png'), 50, 45, { width: 50 })
    .fillColor('#444444')
    .fontSize(20)
    .text('Invent', 110, 57)
    .fontSize(10)
    .text(invoiceData.emitted.location ?? 'NO TIENE', 200, 65, { align: 'right' })
    .text('cumaná, Estado Sucre, 6101', 200, 80, { align: 'right' })
    .moveDown()
}

export const generateFooterPDF = (doc: PDFKit.PDFDocument) => {
  doc.fontSize(10).text('Payment is due within 15 days. Thank you for your business.', 50, 780, {
    align: 'center',
    width: 500,
  })
}

export const generateCustomerInformationPDF = (doc: PDFKit.PDFDocument, invoice: InvoicePDF) => {
  doc.fillColor('#444444').fontSize(20).text('FACTURA', 50, 160)

  generateHr(doc, 185)

  const customerInformationTop = 200

  doc
    .fontSize(10)
    .text('Numero de Factura:', 50, customerInformationTop)
    .font('Helvetica-Bold')
    .text(invoice.id_invoice.toString(), 150, customerInformationTop)
    .font('Helvetica')
    .text('Fecha de la Factura:', 50, customerInformationTop + 15)
    .text(invoice.date.toString(), 150, customerInformationTop + 15)
    .text('Saldo Adeudado:', 50, customerInformationTop + 30)
    .text(invoice.total.toString(), 150, customerInformationTop + 30)

    .font('Helvetica-Bold')
    .text(invoice.recepter.name, 300, customerInformationTop)
    .font('Helvetica')
    .text(invoice.recepter.location ?? 'NO TIENE', 300, customerInformationTop + 15)
    .text(
      invoice.recepter.identification + ', ' + 'Estado Sucre' + ', ' + 'Venezuela',
      300,
      customerInformationTop + 30
    )
    .moveDown()

  generateHr(doc, 252)
}

export const generateTableRow = (
  doc: PDFKit.PDFDocument,
  y: number,
  item: string,
  description: string,
  unitCost: string,
  quantity: string,
  lineTotal: string
) => {
  doc
    .fontSize(10)
    .text(item, 50, y)
    .text(description, 150, y)
    .text(unitCost, 280, y, { width: 90, align: 'right' })
    .text(quantity, 370, y, { width: 90, align: 'right' })
    .text(lineTotal, 0, y, { align: 'right' })
}

export const generateInvoiceTablePDF = (doc:PDFKit.PDFDocument, invoice:InvoicePDF) => {
  let i;
  const invoiceTableTop = 330;

  doc.font("Helvetica-Bold");
  
  generateTableRow(
    doc,
    invoiceTableTop,
    "Codigo",
    "Nombre",
    "Costo Unitario",
    "Cantidad",
    "Total"
  );
  
  generateHr( doc, invoiceTableTop + 20 );
  doc.font("Helvetica");

  for (i = 0; i < invoice.products.length; i++) {
    const item = invoice.products[i];
    const position = invoiceTableTop + (i + 1) * 30;
    generateTableRow(
      doc,
      position,
      item.code,
      item.description,
      item.unit_price.toString(),
      item.quantity.toString(),
      item.amount.toString()
    );

    generateHr(doc, position + 20);
  }

  const subtotalPosition = invoiceTableTop + (i + 1) * 30;
  generateTableRow(
    doc,
    subtotalPosition,
    "",
    "",
    "Subtotal",
    "",
    invoice.subtotal.toString()
  );

  const paidToDatePosition = subtotalPosition + 20;
  generateTableRow(
    doc,
    paidToDatePosition,
    "",
    "",
    "Pagado Hasta la Fecha",
    "",
    invoice.total.toString()
  );

  const duePosition = paidToDatePosition + 25;
  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    duePosition,
    "",
    "",
    "Balance Adeudar",
    "",
    invoice.total.toString()
  );
  doc.font("Helvetica");

}
