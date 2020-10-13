"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const orm_1 = require("../orm");
function default_1(opt) {
    if (opt == null) {
        opt = { addCol: 'sys_add_time', updateCol: 'sys_modify_time' };
    }
    return orm_1.DaoUtil.createAddAndUpdate({
        addCol: opt.addCol,
        updateCol: opt.updateCol,
        processFun: function () {
            return new Date();
        }
    });
}
exports.default = default_1;
