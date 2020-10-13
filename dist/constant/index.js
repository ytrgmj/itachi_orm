"use strict";
/*
 * @Author       : kaikai.hou
 * @Email        : kaikai.hou@downtown8.com
 * @Description  : Balabala
 * @Date         : 2020-02-25 17:29:16
 * @LastEditors  : kaikai.hou
 * @LastEditTime : 2020-02-28 15:08:39
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.sqlPlaceHolder = exports.sqlColEscapeCharacter = exports.sqlType = void 0;
exports.sqlType = {
    mysql: 'mysql',
    pg: 'pg'
};
const sqlColEscapeCharacter = {};
exports.sqlColEscapeCharacter = sqlColEscapeCharacter;
sqlColEscapeCharacter[exports.sqlType.mysql] = '`';
sqlColEscapeCharacter[exports.sqlType.pg] = '"';
const sqlPlaceHolder = {};
exports.sqlPlaceHolder = sqlPlaceHolder;
sqlPlaceHolder[exports.sqlType.mysql] = '?';
sqlPlaceHolder[exports.sqlType.pg] = '$';
