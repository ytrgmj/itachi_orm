/**
 * 查询的父类
 * async _findDefDatas(params:Array<any>);//产生查询结果没有时候的默认值
 * async _parseResult(data) //更改查询数据
 */
export default abstract class BaseInquiry {
    protected _opt: any;
    protected _cache: BaseCache;
    /**
     * 从数据库查找
     * @param params
     */
    protected abstract _findFromDb(params: any): any;
    /**
     * 返回数据的字符串化
     */
    abstract acqDataCode(data: any): string;
    /**
     * 返回查询参数的字符串化
     * @param param
     */
    abstract acqCode(param: any): string;
    constructor(opt?: any);
    protected get(key: any): any;
    protected acqSchCols(): any;
    /**
     * 注册的时候设置查询列
     * @param cols
     */
    setSchColsOnReg(cols: any): void;
    _acqCache(): BaseCache;
    couldSaveAll(): boolean;
    _checkOtherCdt(data: any): boolean;
    /**
     * 清空缓存
     */
    clearCache(): void;
    /**
     * 返回缓存中数组
     */
    keyArray(): Promise<string[]>;
    /**
     * 查询数据
     * @param params:Array|any 查询条件，支持数组或单个
     * @param col:可空。null的话返回整条数据，不为null则返回一个只有该字段的数组
     */
    find(params: any, col?: string): Promise<any>;
    _addDefData(list: any, opt: any): Promise<any>;
    _findNotOpt(list: any, opt: any): any[];
    protected parseRsult(list: Array<any>): Promise<Array<any>>;
    /**
     * 返回其他条件
     */
    acqOtherCdt(): any;
    /**
     * 返回查询的表名
     */
    getKey(): any;
    acqKeys(): any;
    setKey(key: string): void;
    getContext(): Context;
    setContext(context: any): void;
    getDao(): Dao;
    /**
     * 能否传入一个数组直接保存
     * 如果需要关联表的则不行
     */
    protected _couldSave(): boolean;
    save(array: any): Promise<boolean>;
    private _save;
    _hasFindArray(): boolean;
    _parseOpt(params: any): any;
    _findArray(params: Array<any>): Promise<Array<any>>;
    saveArray(params: any, dbs: any): Promise<boolean>;
    private _getFromCacheByArray;
    /**
     * 仅仅从缓存查找
     */
    acqFromCache(params: any): Promise<any[]>;
    removeCache(list: any): Promise<void>;
    one(params: any): Promise<any>;
}
import { Context } from "itachi_util";
import BaseCache from "./cache/BaseCache";
import { Dao } from "../../orm";
