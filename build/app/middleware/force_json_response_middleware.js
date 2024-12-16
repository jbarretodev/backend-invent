export default class ForceJsonResponseMiddleware {
    async handle({ request }, next) {
        const headers = request.headers();
        headers.accept = 'application/json';
        return next();
    }
}
//# sourceMappingURL=force_json_response_middleware.js.map