"use strict";
/*
 * @Author       : kaikai.hou
 * @Email        : kaikai.hou@downtown8.com
 * @Description  : ColSql
 * @Date         : 2020-02-25 14:41:11
 * @LastEditors  : kaikai.hou
 * @LastEditTime : 2020-03-01 16:40:50
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Sql_1 = __importDefault(require("./Sql"));
const constant_1 = require("../../constant");
const SqlUtilFactory_1 = __importDefault(require("./SqlUtilFactory"));
class ColSql extends Sql_1.default {
    /**
     * @description 列转义
     * @description 仅针对 表名、列名 等确定名称的列;
     * @description select 表达式中的列，过去复杂，禁止在其中使用
     * @param cols
     */
    constructor(cols = []) {
        super();
        this.cols = this._colsToArray(cols);
    }
    toSql(type = constant_1.sqlType.mysql) {
        let sqlUtil = new SqlUtilFactory_1.default().get(type);
        const res = this.cols.map(col => {
            return sqlUtil.escapeId(col);
        });
        return res.join(',');
    }
    toVal() {
        return null;
    }
    /**
     * @description 考虑抛弃, 感觉很容易误用， sql 中 col 的位置并不是连贯的
     * @param cols
     */
    add(col) {
        return this;
    }
}
exports.default = ColSql;
