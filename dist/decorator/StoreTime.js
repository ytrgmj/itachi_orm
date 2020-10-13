"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const orm_1 = require("../orm");
function default_1(opt) {
    if (opt == null) {
        opt = { addCol: 'add_time' };
    }
    return orm_1.DaoUtil.createAddAndUpdate({
        addCol: opt.addCol,
        updateCol: opt.updateCol,
        processFun: function (dao, data) {
            let context = dao.getContext();
            if (context != null) {
                let timezoneServer = context.get('timezoneServer');
                if (timezoneServer) {
                    return timezoneServer.getDate();
                }
            }
        }
    });
}
exports.default = default_1;
