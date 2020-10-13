"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SqlBuilder_1 = __importDefault(require("../SqlBuilder"));
const sql_1 = require("../../../sql");
class AddSql extends SqlBuilder_1.default {
    build(obj, opts) {
        var opt = this._opt;
        let array = new sql_1.Sql();
        this._pushSqlTxt(array, 'insert into ');
        this._pushSqlTxt(array, opt.getTableName());
        this._pushSqlTxt(array, '(');
        var cnt = 0;
        for (let e in obj) {
            if (this._isValidCol(e)) {
                if (cnt++ > 0) {
                    this._pushSqlTxt(array, ',');
                }
                this._pushSqlTxt(array, new sql_1.ColSql(e));
            }
        }
        this._pushSqlTxt(array, ')values(');
        cnt = 0;
        for (var e in obj) {
            if (this._isValidCol(e)) {
                if (cnt++ > 0) {
                    this._pushSqlTxt(array, ',');
                }
                this._pushSqlTxt(array, new sql_1.ValSql(obj[e]));
            }
        }
        this._pushSqlTxt(array, ')');
        this._pushSqlTxt(array, new sql_1.ReturnSql(opt.acqIds()));
        return array;
    }
}
exports.default = AddSql;
