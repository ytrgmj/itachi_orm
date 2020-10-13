"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author       : kaikai.hou
 * @Email        : kaikai.hou@downtown8.com
 * @Description  : Balabala
 * @Date         : 2020-03-01 15:36:34
 * @LastEditors  : kaikai.hou
 * @LastEditTime : 2020-03-01 16:32:40
 */
const constant_1 = require("../../constant");
const sqlUtil_1 = require("../sqlUtil");
class SqlUtilFactory {
    get(type) {
        switch (type) {
            case constant_1.sqlType.mysql:
                return new sqlUtil_1.MysqlUtil();
            case constant_1.sqlType.pg:
                return new sqlUtil_1.PgUtil();
            default:
                throw new Error('SqlUtil: missing sql type');
        }
    }
}
exports.default = SqlUtilFactory;
