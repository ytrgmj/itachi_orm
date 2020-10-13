"use strict";
/*
 * @Author       : kaikai.hou
 * @Email        : kaikai.hou@downtown8.com
 * @Description  : Balabala
 * @Date         : 2020-02-25 17:26:18
 * @LastEditors  : kaikai.hou
 * @LastEditTime : 2020-02-28 17:55:06
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Sql_1 = __importDefault(require("./Sql"));
const constant_1 = require("../../constant");
const SqlUtilFactory_1 = __importDefault(require("./SqlUtilFactory"));
/**
 * 1. 每种 sql, 对于 value 的占位符并不相同, mysql: ? pg: $num
 */
class ValSql extends Sql_1.default {
    /**
     * @description sql 参数化处理
     * @param val
     */
    constructor(val) {
        super();
        this.val = val;
        if (this.val instanceof Array && !this.val.length)
            this.val = [false];
    }
    /**
     * @description sql 参数化处理
     * @param type
     * @param count
     */
    toSql(type = constant_1.sqlType.mysql, count = { pgCount: 0 }) {
        const sqlUtil = new SqlUtilFactory_1.default().get(type);
        let res = '';
        if (this.val instanceof Array) {
            res = `(${this.val.map(_val => {
                return this.sqlStrAfterProcessing(_val, sqlUtil.escapeParameters(count));
            }).join(',')})`;
        }
        else {
            res = this.sqlStrAfterProcessing(this.val, sqlUtil.escapeParameters(count));
        }
        return res;
    }
    sqlStrAfterProcessing(val, parmeterSqlStr) {
        return parmeterSqlStr;
    }
    toVal() {
        // TODO: value 转义
        if (this.val instanceof Array)
            return this.val;
        return [this.val];
    }
    /**
     * @description sql 中的一个 value, 不支持 add, 一个 value 一个实例
     */
    add() { return this; }
}
exports.default = ValSql;
