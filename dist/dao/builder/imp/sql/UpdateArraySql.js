"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SqlBuilder_1 = __importDefault(require("../SqlBuilder"));
const sql_1 = require("../../../sql");
const BaseCdt_1 = __importDefault(require("../../../query/cdt/BaseCdt"));
class UpdateArraySql extends SqlBuilder_1.default {
    // TODO: 支持多条件, 多 id, 改造 sql 拼接, 这样拼太长了
    /**
    拼凑modify的sql
    */
    build(data, opts) {
        let other = null;
        let whereObj = null;
        if (opts != null) {
            other = opts.other;
            whereObj = opts.whereObj;
        }
        let sql = new sql_1.Sql();
        let opt = this._opt;
        this._pushSqlTxt(sql, 'update ');
        this._pushSqlTxt(sql, opt.getTableName());
        this._pushSqlTxt(sql, ' set');
        const cols = this._findCols(data);
        this._buildBulkUpdate(sql, data, cols);
        if (other) {
            var index = cols.length;
            for (var e in other) {
                if (index > 0) {
                    this._pushSqlTxt(sql, ',');
                }
                if (other[e] && other[e].getSql) {
                    this._pushSqlTxt(sql, other[e].getSql());
                }
                else {
                    this._pushSqlTxt(sql, new sql_1.ColSql(e));
                    this._pushSqlTxt(sql, '=');
                    this._pushSqlTxt(sql, new sql_1.ValSql(other[e]));
                }
                index++;
            }
        }
        let idCol = opt.acqFirstId();
        const ids = data.map(_obj => _obj[idCol]);
        this._pushSqlTxt(sql, 'where');
        this._pushSqlTxt(sql, new sql_1.ColSql(idCol));
        this._pushSqlTxt(sql, 'in');
        this._pushSqlTxt(sql, new sql_1.ValSql(ids));
        if (whereObj != null) {
            this._pushSqlTxt(sql, 'and');
            let cdt = BaseCdt_1.default.parse(whereObj);
            this._pushSqlTxt(sql, cdt.toSql());
        }
        return sql;
    }
    _buildBulkUpdate(sql, data, cols) {
        let cnt = 0;
        let opt = this._opt;
        let idCol = opt.acqFirstId();
        for (let t = 0; t < cols.length; t++) {
            const col = cols[t];
            if (!this._need(col)) {
                continue;
            }
            if (cnt++ > 0) {
                this._pushSqlTxt(sql, ',');
            }
            this._pushSqlTxt(sql, new sql_1.ColSql(col));
            this._pushSqlTxt(sql, '= CASE ');
            this._pushSqlTxt(sql, new sql_1.ColSql(idCol));
            for (var i = 0; i < data.length; i++) {
                const _data = data[i];
                this._pushSqlTxt(sql, 'WHEN');
                this._pushSqlTxt(sql, new sql_1.ValSql(_data[idCol]));
                this._pushSqlTxt(sql, 'THEN');
                if (_data[col] && _data[col].getSql) {
                    this._pushSqlTxt(sql, _data[col].getSql());
                }
                else {
                    this._pushSqlTxt(sql, this._caseValue(_data[col]));
                }
            }
            this._pushSqlTxt(sql, 'end');
        }
    }
    _need(name) {
        const ret = super._need(name);
        if (!ret)
            return false;
        return !this._opt.isId(name);
    }
    _caseValue(val) {
        return new sql_1.ValSql(val);
    }
}
exports.default = UpdateArraySql;
