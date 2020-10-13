"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SqlBuilder_1 = __importDefault(require("../SqlBuilder"));
const sql_1 = require("../../../sql");
class FindByIdSql extends SqlBuilder_1.default {
    build(data, opts) {
        var opt = this._opt;
        let sql = new sql_1.Sql();
        this._pushSqlTxt(sql, 'select * from');
        this._pushSqlTxt(sql, opt.getTableName());
        this._pushSqlTxt(sql, 'where');
        var ids = opt.acqIds();
        if (ids.length == 1) {
            this._pushSqlTxt(sql, new sql_1.ColSql(ids[0]));
            this._pushSqlTxt(sql, '=');
            this._pushSqlTxt(sql, new sql_1.ValSql(typeof data === 'object' ? data[ids[0]] : data));
        }
        else if (typeof data === 'object') {
            for (let i = 0; i < ids.length; i++) {
                if (i > 0)
                    this._pushSqlTxt(sql, 'and');
                const name = ids[i];
                this._pushSqlTxt(sql, new sql_1.ColSql(name));
                this._pushSqlTxt(sql, '=');
                this._pushSqlTxt(sql, new sql_1.ValSql(data[name]));
            }
        }
        return sql;
    }
}
exports.default = FindByIdSql;
