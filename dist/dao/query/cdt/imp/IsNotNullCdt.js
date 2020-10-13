"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseCdt_1 = __importDefault(require("../BaseCdt"));
const sql_1 = require("../../../sql");
class IsNotNullCdt extends BaseCdt_1.default {
    constructor(col) {
        super();
        this._col = col;
    }
    toSql() {
        let sql = new sql_1.Sql();
        sql.add(new sql_1.ColSql(this._col));
        sql.add('is not null');
        return sql;
    }
    toEs() {
        return {
            exists: {
                field: this._col
            }
        };
    }
    isHit(obj) {
        return null != obj[this._col];
    }
}
exports.default = IsNotNullCdt;
