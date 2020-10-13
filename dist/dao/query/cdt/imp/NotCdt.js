"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 查询条件，
 * 支持sql 、monggo、es
 */
const Sql_1 = __importDefault(require("../../../sql/Sql"));
const BaseCdt_1 = __importDefault(require("../BaseCdt"));
class NotCdt extends BaseCdt_1.default {
    constructor(cdt) {
        super();
        this._cdt = cdt;
    }
    toEs() {
        return {
            bool: {
                must_not: [this._cdt.toEs()]
            }
        };
    }
    toSql() {
        var sql = new Sql_1.default();
        sql.add('not(');
        sql.add(this._cdt.toSql());
        sql.add(')');
        return sql;
    }
    isHit(obj) {
        return !this._cdt.isHit(obj);
    }
}
exports.default = NotCdt;
