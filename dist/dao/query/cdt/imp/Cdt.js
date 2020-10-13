"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 查询条件，
 * 支持sql 、monggo、es
 */
const itachi_core_1 = require("@dt/itachi_core");
const sql_1 = require("../../../sql");
const BaseCdt_1 = __importDefault(require("../BaseCdt"));
class Cdt extends BaseCdt_1.default {
    constructor(col, val, op) {
        super();
        if (op == null) {
            if (val instanceof Array) {
                op = 'in';
            }
            else {
                op = '=';
            }
        }
        this.col = col;
        this.val = val;
        this.op = op;
    }
    toEs() {
        return itachi_core_1.OperatorFac.get(this.op).toEs(this.col, this.val);
    }
    getCol() {
        return this.col;
    }
    getOp() {
        return this.op;
    }
    getVal() {
        return this.val;
    }
    toSql() {
        if (this.val instanceof Array && this.val.length == 0) {
            return new sql_1.Sql('1=2');
        }
        const _sql = new sql_1.Sql();
        _sql.add(new sql_1.ColSql(this.col));
        _sql.add(this.op);
        _sql.add(new sql_1.ValSql(this.val));
        return _sql;
    }
    isHit(obj) {
        var val = obj[this.col];
        var opt = itachi_core_1.OperatorFac.get(this.op);
        if (opt == null)
            return false;
        return opt.cal([val, this.val]);
    }
}
exports.default = Cdt;
