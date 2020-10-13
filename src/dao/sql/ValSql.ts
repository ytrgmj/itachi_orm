/*
 * @Author       : kaikai.hou
 * @Email        : kaikai.hou@downtown8.com
 * @Description  : Balabala
 * @Date         : 2020-02-25 17:26:18
 * @LastEditors  : kaikai.hou
 * @LastEditTime : 2020-02-28 17:55:06
 */

import Sql from './Sql'
import { sqlType } from '../../constant'
import SqlUtilFactory from './SqlUtilFactory'

/**
 * 1. 每种 sql, 对于 value 的占位符并不相同, mysql: ? pg: $num
 */
export default class ValSql extends Sql {
    private val: any

    /**
     * @description sql 参数化处理
     * @param val
     */
    constructor(val) {
        super()
        this.val = val
        if (this.val instanceof Array && !this.val.length) this.val = [ false ]
    }

    /**
     * @description sql 参数化处理
     * @param type
     * @param count
     */
    toSql(type: string = sqlType.mysql, count: object = { pgCount: 0 }): string {
        const sqlUtil = new SqlUtilFactory().get(type)
        let res = ''

        if (this.val instanceof Array) {
            res = `(${
                this.val.map(_val => { 
                    return this.sqlStrAfterProcessing(
                        _val,
                        sqlUtil.escapeParameters(count)
                    )
                }).join(',')
            })`
        } else {
            res = this.sqlStrAfterProcessing(
                this.val,
                sqlUtil.escapeParameters(count)
            )
        }

        return res
    }

    protected sqlStrAfterProcessing(val: any, parmeterSqlStr: string): string {
        return parmeterSqlStr
    }

    toVal(): any {
        // TODO: value 转义
        if (this.val instanceof Array) return this.val
        return [ this.val ]
    }

    /**
     * @description sql 中的一个 value, 不支持 add, 一个 value 一个实例
     */
    add(): Sql { return this }
}