import { AnyObject } from './anyObject';
interface sortFun {
    (obj1: AnyObject, obj2: AnyObject): number;
}
interface checkUpdate {
    (oldData: AnyObject, data: AnyObject): boolean;
}
interface dataFormatFun {
    (data: AnyObject): AnyObject;
}
interface beforeUpdate {
    (data: AnyObject, oldData: AnyObject): AnyObject;
}
interface isUpdate {
    (data: AnyObject, oldData: AnyObject): boolean;
}
interface optExcute {
    (data: AnyObject[]): Promise<any>;
}
export interface onlyArrayIntface {
    array?: AnyObject[];
    data?: Object;
    /**
     * 匹配的条件
     */
    mapFun: Function | string | Array<string>;
    query?: any;
    finds?: Function;
    sortFun?: sortFun;
    /**
     * 判断更新的函数
     */
    checkUpdate?: checkUpdate;
    addFun?: dataFormatFun;
    /**
     * array 经过 query 数据筛选根据 mapFun, 经过 updateDataArray 补充
     */
    updateFun?: dataFormatFun;
    /**
     * del 之前的处理函数
     */
    delFun?: dataFormatFun;
    beforeUpdate?: beforeUpdate;
    noAdd?: boolean;
    needUpdate?: boolean;
    isUpdate?: isUpdate;
    needDel?: boolean;
    /**
     * 真正执行增加的函数
     */
    adds?: optExcute;
    /**
     * 真正更新的函数
     */
    updates?: optExcute;
    /**
     * 真正删除的函数
     */
    dels?: optExcute;
    afterFun?: Function;
    noLastFind?: boolean;
    noDel?: boolean;
}
export {};
