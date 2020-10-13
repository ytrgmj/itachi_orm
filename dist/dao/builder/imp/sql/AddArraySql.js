"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SqlBuilder_1 = __importDefault(require("../SqlBuilder"));
const sql_1 = require("../../../sql");
class AddArraySql extends SqlBuilder_1.default {
    build(arr, opts) {
        const opt = this._opt;
        let sql = new sql_1.Sql();
        this._pushSqlTxt(sql, 'insert into ');
        this._pushSqlTxt(sql, opt.getTableName());
        this._pushSqlTxt(sql, '(');
        const cols = this._findCols(arr);
        this._pushSqlTxt(sql, new sql_1.ColSql(cols));
        this._pushSqlTxt(sql, ')values');
        for (var i = 0; i < arr.length; i++) {
            var data = arr[i];
            if (i > 0) {
                this._pushSqlTxt(sql, ',');
            }
            const val = [];
            for (var t = 0; t < cols.length; t++) {
                val.push(data[cols[t]]);
            }
            this._pushSqlTxt(sql, new sql_1.ValSql(val));
        }
        this._pushSqlTxt(sql, new sql_1.ReturnSql(opt.acqIds()));
        return sql;
    }
    _need(name) {
        const ret = super._need(name);
        if (!ret)
            return false;
        if (!this._opt.isIncrement())
            return true;
        return !this._opt.isId(name);
    }
}
exports.default = AddArraySql;
