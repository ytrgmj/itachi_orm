"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseFind_1 = __importDefault(require("./BaseFind"));
const sql_1 = require("../../../sql");
class default_1 extends BaseFind_1.default {
    _buildFind(query) {
        var opt = this._opt;
        var tableName = opt.getTableName();
        return new sql_1.Sql(`delete  from ${tableName} `);
    }
}
exports.default = default_1;
