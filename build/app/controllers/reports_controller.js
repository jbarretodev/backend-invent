var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import ReportService from '#services/report_service';
import { inject } from '@adonisjs/core';
import dayjs from 'dayjs';
let ReportsController = class ReportsController {
    reportService;
    constructor(reportService) {
        this.reportService = reportService;
    }
    async getReportSell(ctx) {
        let { dateInit, dateEnd } = ctx.request.qs();
        if (!dateInit || !dateEnd) {
            dateInit = dayjs().format('YYYY-MM-DD');
            dateEnd = dayjs().subtract(7, 'days').format('YYYY-MM-DD');
        }
        const rsServiceReport = await this.reportService.reportSells(dateInit, dateEnd);
        return ctx.response.ok(rsServiceReport);
    }
    async getReportBestSellingProduct(ctx) {
        let { dateInit, dateEnd } = ctx.request.qs();
        if (!dateInit || !dateEnd) {
            dateInit = dayjs().format('YYYY-MM-DD');
            dateEnd = dayjs().subtract(7, 'days').format('YYYY-MM-DD');
        }
        const rsServiceReport = await this.reportService.reportBestSallingProduct(dateInit, dateEnd);
        return ctx.response.ok(rsServiceReport);
    }
};
ReportsController = __decorate([
    inject(),
    __metadata("design:paramtypes", [ReportService])
], ReportsController);
export default ReportsController;
//# sourceMappingURL=reports_controller.js.map