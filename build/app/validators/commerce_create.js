import vine from '@vinejs/vine';
export const commerceCreate = vine.compile(vine.object({
    name: vine.string(),
    address: vine.string(),
    phone: vine.string(),
    identification: vine.string(),
}));
//# sourceMappingURL=commerce_create.js.map