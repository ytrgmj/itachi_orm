"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author       : kaikai.hou
 * @Email        : kaikai.hou@downtown8.com
 * @Description  : Balabala
 * @Date         : 2020-03-01 15:50:32
 * @LastEditors  : kaikai.hou
 * @LastEditTime : 2020-03-01 16:37:58
 */
const SqlUtil_1 = __importDefault(require("./SqlUtil"));
const constant_1 = require("../../constant");
class MysqlUtil extends SqlUtil_1.default {
    constructor() {
        super();
        this.type = constant_1.sqlType.mysql;
        this.escapeCharacter = constant_1.sqlColEscapeCharacter[this.type];
        this.placeHolder = constant_1.sqlPlaceHolder[this.type];
    }
    escapeParameters() {
        return this.placeHolder;
    }
    returnStr(cols) {
        return '';
    }
}
exports.default = MysqlUtil;
