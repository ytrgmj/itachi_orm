/*
 * @Author       : kaikai.hou
 * @Email        : kaikai.hou@downtown8.com
 * @Description  : ColSql
 * @Date         : 2020-02-25 14:41:11
 * @LastEditors  : kaikai.hou
 * @LastEditTime : 2020-03-01 16:40:50
 */

import Sql from './Sql'
import { sqlType, sqlColEscapeCharacter } from '../../constant'
import SqlUtilFactory from './SqlUtilFactory'
import _ from 'lodash'

export default class ColSql extends Sql {
    protected cols: string[]

    /**
     * @description 列转义
     * @description 仅针对 表名、列名 等确定名称的列;
     * @description select 表达式中的列，过去复杂，禁止在其中使用
     * @param cols
     */
    constructor(cols: string | string[] = []){
        super()
        this.cols = this._colsToArray(cols)
    }

    toSql(type: string = sqlType.mysql): string {
        let sqlUtil = new SqlUtilFactory().get(type)
        const res = this.cols.map(col => {
            return sqlUtil.escapeId(col)
        })
        return res.join(',')
    }

    toVal(): null {
        return null
    }

    /**
     * @description 考虑抛弃, 感觉很容易误用， sql 中 col 的位置并不是连贯的
     * @param cols
     */
    add(col: string | ColSql ): ColSql {
        return this;
    }

}