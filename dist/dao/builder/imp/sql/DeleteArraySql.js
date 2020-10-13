"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SqlBuilder_1 = __importDefault(require("../SqlBuilder"));
const sql_1 = require("../../../sql");
const BaseCdt_1 = __importDefault(require("../../../query/cdt/BaseCdt"));
class AddSql extends SqlBuilder_1.default {
    build(arr, opts) {
        const opt = this._opt;
        let idCol = opt.acqFirstId();
        const ids = arr.map(_data => (typeof _data === 'object' && _data) ? _data[idCol] : _data).filter(item => item);
        const sql = new sql_1.Sql();
        this._pushSqlTxt(sql, 'delete from ');
        this._pushSqlTxt(sql, opt.getTableName());
        this._pushSqlTxt(sql, 'where ');
        const idNames = opt.acqIds();
        this._pushSqlTxt(sql, new sql_1.ColSql(idNames[0]));
        this._pushSqlTxt(sql, ' in');
        this._pushSqlTxt(sql, new sql_1.ValSql(ids));
        if (opts) {
            this._pushSqlTxt(sql, 'and');
            let cdt = BaseCdt_1.default.parse(opts);
            this._pushSqlTxt(sql, cdt.toSql());
        }
        return sql;
    }
}
exports.default = AddSql;
