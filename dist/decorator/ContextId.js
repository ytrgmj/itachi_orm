"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const orm_1 = require("../orm");
function default_1(opt) {
    if (opt == null) {
        opt = { col: 'context_id' };
    }
    return orm_1.DaoUtil.createAddAndUpdate({
        updateCol: opt.col,
        processFun: function (dao, data) {
            let context = dao.getContext();
            if (context != null) {
                return context.getId();
            }
        }
    });
}
exports.default = default_1;
