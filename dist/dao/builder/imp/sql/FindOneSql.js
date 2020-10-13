"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FindSql_1 = __importDefault(require("./FindSql"));
class FindOneSql extends FindSql_1.default {
    _buildPage(sql, query) {
        sql.add(' limit 1');
        return sql;
    }
}
exports.default = FindOneSql;
