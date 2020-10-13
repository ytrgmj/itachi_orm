/*
 * @Author       : kaikai.hou
 * @Email        : kaikai.hou@downtown8.com
 * @Description  : Balabala
 * @Date         : 2020-02-12 14:41:17
 * @LastEditors  : kaikai.hou
 * @LastEditTime : 2020-02-12 14:58:38
 */

import Query from '../dao/query/Query'
import { AnyObject } from './anyObject'

interface sortFun {
    // 查询数据的排序方式 map.sort(sortFun)
    (obj1: AnyObject, obj2: AnyObject): number
}

export interface onlyDataInterface {
    query: Query | AnyObject,
    data?: AnyObject,
    fun?: sortFun,
    noSch?: Boolean
}