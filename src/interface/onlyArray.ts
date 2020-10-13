/*
 * @Author       : kaikai.hou
 * @Email        : kaikai.hou@downtown8.com
 * @Description  : Balabala
 * @Date         : 2020-02-11 16:26:01
 * @LastEditors  : kaikai.hou
 * @LastEditTime : 2020-02-12 14:44:32
 */
import Query from '../dao/query/Query'
import { AnyObject } from './anyObject'

interface sortFun {
    // 查询数据的排序方式 map.sort(sortFun)
    (obj1: AnyObject, obj2: AnyObject): number
}

interface checkUpdate {
    // 深度对比 oldData 和 data 是否需要更行
    (oldData: AnyObject, data: AnyObject): boolean
}



interface dataFormatFun {
    // 用于 add、update 数据的格式化
    (data: AnyObject): AnyObject
}

interface beforeUpdate {
    // 对于 oldData 数据, 和更新数据 data 的操作
    (data: AnyObject, oldData: AnyObject): AnyObject
}

interface isUpdate {
    // 对于 data 和 oldData 数据的更新条件判断
    (data: AnyObject, oldData: AnyObject): boolean
}

interface optExcute {
    // 新增、更新、删除数据, 默认为 Dao.addArray, Dao.updateArray, Dao.delArray
    (data: AnyObject[]): Promise<any>
}

export interface onlyArrayIntface {
    // 源数据
    array?: AnyObject[], // 数组, 和 query 结果对比后, 决定是新增、更新 array 数据, 还是删除 query 多余数据
    data?:Object,
    /**
     * 匹配的条件
     */
    mapFun: Function|string|Array<string>,

    // 数据库中查询出的对比数据
    query?: any, // 查询条件
    finds?: Function, // async 返回查询数组, 比 query 优先级高, 二者存一即可

    // 工具方法
    sortFun?: sortFun,
    /**
     * 判断更新的函数
     */
    checkUpdate?: checkUpdate,

    /*add 数据格式化*/
    addFun?: dataFormatFun, // array 经过 query 数据筛选根据 mapFun, 经过 addDataArray 补充
    /**
     * array 经过 query 数据筛选根据 mapFun, 经过 updateDataArray 补充
     */
    updateFun?: dataFormatFun, // array 经过 query 数据筛选根据 mapFun, 经过 updateDataArray 补充
    /**
     * del 之前的处理函数
     */
    delFun?: dataFormatFun, // query 数据经过 array 筛选根据 mapFun,

    beforeUpdate?: beforeUpdate

    // 操作条件判断
    noAdd?: boolean, // 不需要新增数据: true
    needUpdate?: boolean, // 需要对数据更新: true
    isUpdate?: isUpdate,
    needDel?: boolean, // 需要对数据删除: true

    // 操作执行
    /**
     * 真正执行增加的函数
     */
    adds?: optExcute,
    /**
     * 真正更新的函数
     */
    updates?: optExcute
    /**
     * 真正删除的函数
     */
    dels?: optExcute,

    // 后执行方法
    afterFun?: Function, // 后执行

    // 所有操作之后
    // 再次 query/finds 查出数据,
    // 按照 mapFun 进行分组,
    // 根据 sortFun 进行排序,
    // 是否返回每个分组的第一条数据
    noLastFind?: boolean, // 最后一次不需要返回
    // 第一条之外的数据是否删除(由于之前的所有更新也是第一条, 其他的未更新也会删除)
    noDel?: boolean, // 不需要删除: true;
}
