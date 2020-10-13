/*
 * @Author       : kaikai.hou
 * @Email        : kaikai.hou@downtown8.com
 * @Description  : Balabala
 * @Date         : 2020-03-01 15:50:32
 * @LastEditors  : kaikai.hou
 * @LastEditTime : 2020-03-01 16:37:58
 */
import SqlUtil from './SqlUtil'

import { sqlType, sqlColEscapeCharacter, sqlPlaceHolder } from '../../constant'

export default class MysqlUtil extends SqlUtil {
    constructor() {
        super()
        this.type = sqlType.mysql
        this.escapeCharacter = sqlColEscapeCharacter[this.type]
        this.placeHolder = sqlPlaceHolder[this.type]

    }

    escapeParameters():string {
        return this.placeHolder 
    }

    returnStr(cols: string[]): string {
        return ''
    }
}