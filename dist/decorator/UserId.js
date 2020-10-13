"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const orm_1 = require("../orm");
function default_1(opt) {
    if (opt == null) {
        opt = { add_col: 'add_user', update_col: 'modify_user' };
    }
    return orm_1.DaoUtil.createAddAndUpdate({
        addCol: opt.add_col,
        updateCol: opt.update_col,
        processFun: function (dao, data) {
            let context = dao.getContext();
            if (context != null) {
                let token = context.getData('token');
                if (token) {
                    return token.user_id;
                }
            }
        }
    });
}
exports.default = default_1;
