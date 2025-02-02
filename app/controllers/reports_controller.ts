import ReportService from '#services/report_service'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import dayjs from 'dayjs'
import { ReportBestSelling } from '#types/index'

@inject()
export default class ReportsController {
  constructor(protected reportService: ReportService) {}
  async getReportSell(ctx: HttpContext) {
    let { dateInit, dateEnd } = ctx.request.qs()

    if (!dateInit || !dateEnd) {
      dateInit = dayjs().format('YYYY-MM-DD')
      dateEnd = dayjs().subtract(7, 'days').format('YYYY-MM-DD')
    }

    const rsServiceReport = await this.reportService.reportSells(dateInit, dateEnd)

    return ctx.response.ok(rsServiceReport)
  }

  async getReportBestSellingProduct(ctx: HttpContext) {
    let { dateInit, dateEnd } = ctx.request.qs()

    if (!dateInit || !dateEnd) {
      dateInit = dayjs().format('YYYY-MM-DD')
      dateEnd = dayjs().subtract(7, 'days').format('YYYY-MM-DD')
    }

    const rsServiceReport = await this.reportService.reportBestSallingProduct(dateInit, dateEnd)

    const transformedData: ReportBestSelling[] = rsServiceReport.map((item) => ({
      name: item.product_name,
      value: parseFloat(item.total_sales),
    }))

    return ctx.response.ok(transformedData)
  }

  async getReportInventory(ctx: HttpContext) {
    let { dateInit, dateEnd } = ctx.request.qs()

    if (!dateInit || !dateEnd) {
      dateInit = dayjs().format('YYYY-MM-DD')
      dateEnd = dayjs().subtract(7, 'days').format('YYYY-MM-DD')
    }

    const rsServiceReport = await this.reportService.reportInventory(dateInit, dateEnd)

    return ctx.response.ok(rsServiceReport)
  }
}
