"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sql_1 = require("../sql");
class OrderItem {
    constructor(col, desc) {
        this.col = col;
        if (desc != 'desc' && desc != 'DESC') {
            this.desc = null;
        }
        else {
            this.desc = 'desc';
        }
    }
    getCol() {
        return this.col;
    }
    getDesc() {
        if (this.desc == null) {
            this.desc = 'asc';
        }
        return this.desc;
    }
    toSql() {
        const sql = new sql_1.Sql();
        sql.add(new sql_1.ColSql(this.col));
        sql.add(this.desc);
        return sql;
    }
}
exports.default = OrderItem;
