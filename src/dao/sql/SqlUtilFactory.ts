/*
 * @Author       : kaikai.hou
 * @Email        : kaikai.hou@downtown8.com
 * @Description  : Balabala
 * @Date         : 2020-03-01 15:36:34
 * @LastEditors  : kaikai.hou
 * @LastEditTime : 2020-03-01 16:32:40
 */
import { sqlType } from '../../constant'
import { SqlUtil, MysqlUtil, PgUtil } from '../sqlUtil'

export default class SqlUtilFactory {
    get(type: string): SqlUtil {
        switch (type) {
            case sqlType.mysql:
                return new MysqlUtil()
            case sqlType.pg:
                return new PgUtil()
            default:
                throw new Error('SqlUtil: missing sql type')
        }
    }
}