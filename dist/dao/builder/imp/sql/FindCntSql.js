"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseFind_1 = __importDefault(require("./BaseFind"));
const Sql_1 = __importDefault(require("../../../sql/Sql"));
class FindCntSql extends BaseFind_1.default {
    _buildFind(query) {
        var opt = this._opt;
        var tableName = opt.getTableName();
        return new Sql_1.default(`select count(*) as cnt from ${tableName} `);
    }
    _buildPage(sql, query) {
        return sql;
    }
    _buildOrder(query) {
        return null;
    }
}
exports.default = FindCntSql;
