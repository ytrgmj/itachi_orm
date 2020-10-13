/*
 * @Author       : kaikai.hou
 * @Email        : kaikai.hou@downtown8.com
 * @Description  : Balabala
 * @Date         : 2020-02-25 17:29:16
 * @LastEditors  : kaikai.hou
 * @LastEditTime : 2020-02-28 15:08:39
 */

export const sqlType = {
    mysql: 'mysql',
    pg: 'pg'
}

const sqlColEscapeCharacter = {}
sqlColEscapeCharacter[sqlType.mysql] = '`'
sqlColEscapeCharacter[sqlType.pg] = '"'

const sqlPlaceHolder = {}
sqlPlaceHolder[sqlType.mysql] = '?'
sqlPlaceHolder[sqlType.pg] = '$'

export {
    sqlColEscapeCharacter,
    sqlPlaceHolder
}