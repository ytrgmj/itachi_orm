import Query from './query/Query';
import IExecutor from './executor/IExecutor';
import Builder from './builder/Builder';
import DaoOpt from './opt/DaoOpt';
import { Context } from 'itachi_core';
import { onlyArrayIntface, AnyObject, onlyDataInterface } from '../interface';
export default abstract class Dao {
    protected _opt: DaoOpt;
    protected _map: object;
    protected _context: Context;
    /**
     * 根据一个查询条件，进行更新
     * @param whereCdt 查询条件
     * @param data  //更新数据
     */
    updateByCdt(whereCdt: any, data: any): Promise<number>;
    /**
     * 根据一个查询条件，进行删除
     * @param cdt
     * @param data
     */
    delByCdt(cdt: any): Promise<number>;
    protected _checkNullCdt(cdt: any): void;
    getTableName(): string;
    setContext(context: Context): void;
    getContext(): Context;
    constructor(opt: any);
    /**
     * 根据主键判断有或者没有
     * @param data
     */
    save(data: any, whereObj?: any): Promise<any>;
    /**
     *
     * 增加一条数据
     * @param obj 数据
     */
    add(obj: object): Promise<any>;
    /**
     * @description 增加一组数据
     * @param arr objectp[]
     */
    addArray(arr: object[]): Promise<object[]>;
    /**
     * 修改一条数据
     * 返回值，更改数量，0/1
     * @param obj  数据
     * @param whereObj 其他条件
     *
     */
    update(obj: any, whereObj?: any): Promise<number>;
    /**
     * 更新一个数组
     * @param array
     */
    updateArray(array: Array<any>, other?: object, whereObj?: any): Promise<number>;
    /**
     *删除一条数据
     * @param obj
     * @param opts
     */
    del(obj: any, opts?: any): Promise<number>;
    /**
     * 删除一个数组
     * @param array
     */
    delArray(array: Array<any>, opts?: any): Promise<number>;
    /**
     * 这个方法 不会相应DaoUtil 的 事件
     * @param query
     */
    delByQuery(query: any): Promise<number>;
    /**
     * 查询
     * @param query 可以是个结构体，可以是个Cdt，可以是个Query
     */
    find(query: any): Promise<Array<any>>;
    /**
     * 查询数量
     * @param query  可以是个结构体，可以是个Cdt，可以是个Query
     */
    findCnt(query: any): Promise<number>;
    /**
     * 查询单条数据
     * @param query  可以是个结构体，可以是个Cdt，可以是个Query
     */
    findOne(query: any): Promise<any>;
    /**
     * 根据id查询一条数据
     * @param id
     */
    getById(id: string | number | object): Promise<any>;
    /**
     * 根据id数组查询一批数据
     * @param ids
     * @key 特定 key (findByKeys)
     * @col 单独列, distinct 数据
     */
    findByIds(ids: Array<string | number>, key?: string, col?: string): Promise<Array<any>>;
    onlyArray(opt: onlyArrayIntface): Promise<any>;
    /**
     * 只查询某一列 distinct col
     * @param {[type]} query         [description]
     * @param {[type]} col           [description]
     * @yield {[type]} [description]
     */
    protected _findCol(query: Query, col: string): Promise<any[]>;
    /**
     * 查询某一列
     * @param query
     * @param col
     */
    findCol(query: any, col: string): Promise<any[]>;
    findOneCol(query: any, col?: any): Promise<any>;
    protected _parseQuery(query: any): Query;
    /**
     * data可空
     * opt.query 查询条件
     * opt.noSch default false, 直接查询, 返回 opt.fun (sortFun) 第一条
     * opt.sortFun
     * opt.data 当 nosch: true, 不需要先查询时，插入 data, 再查询 query
     * 若仅新增一条, 即返回；若 sortFun 后，第一条不是该新增, 则返回第一条, 删除新增
     * @param opt AnyObject
     */
    onlyData(opt: onlyDataInterface): Promise<any>;
    /**
     * @description list 数组排序后, 只取第一条, 删除剩余数据
     * @param list
     * @param sortFun
     * @param delId
     */
    protected _delOther(list: AnyObject[], sortFun?: (obj1?: AnyObject, obj2?: AnyObject) => number): Promise<AnyObject>;
    /**
     * 返回sql的map
     * map 结构{key:class}
     */
    protected _acqMap(): object;
    protected abstract _initMap(): any;
    protected _execute(key: string, obj: any, opts?: any): Promise<any>;
    protected _query(key: string, obj: any, opts?: any): Promise<any>;
    /**
     * 返回sql的执行器，每个数据库重写
     */
    protected abstract _acqExecutor(): IExecutor;
    /**
     * 返回
     * @param key 操作，类似add ,update
     */
    protected _acqBuilder(key: string): Builder;
}
