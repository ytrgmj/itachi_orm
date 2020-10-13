"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SqlBuilder_1 = __importDefault(require("../SqlBuilder"));
const BaseCdt_1 = __importDefault(require("../../../query/cdt/BaseCdt"));
const sql_1 = require("../../../sql");
class UpdateSql extends SqlBuilder_1.default {
    /**
    拼凑del的sql
    */
    build(data, opts) {
        var array = new sql_1.Sql();
        this._buildFront(array, data);
        var cnt = 0;
        var ids = this._opt.acqIds();
        for (var id of ids) {
            if (cnt++ > 0) {
                this._pushSqlTxt(array, 'and');
            }
            this._pushSqlTxt(array, new sql_1.ColSql(id));
            this._pushSqlTxt(array, '=');
            this._pushSqlTxt(array, new sql_1.ValSql(data[id]));
        }
        if (opts) {
            this._pushSqlTxt(array, 'and');
            let cdt = BaseCdt_1.default.parse(opts);
            this._pushSqlTxt(array, cdt.toSql());
        }
        return array;
    }
    _buildFront(array, data) {
        var opt = this._opt;
        this._pushSqlTxt(array, 'delete from ');
        this._pushSqlTxt(array, opt.getTableName());
        this._pushSqlTxt(array, 'where');
    }
}
exports.default = UpdateSql;
