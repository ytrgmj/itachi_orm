/**
 * 查询条件的封装
 */
export default class Query {
    clazz: string;
    private _colArray;
    private _cols;
    private _groupArray;
    private _havingColArray;
    private _havingCol;
    private _groupColArray;
    private _joinTables;
    private _cdtArray;
    private _orders;
    private _pager;
    private _noResult;
    private _forUpdate;
    isHit(row: any): boolean;
    hitList(list: Array<any>): any[];
    /**
     * 查询 肯定没结果
     * in一个空数组
     */
    isNoResult(): boolean;
    acqCol(): Array<Col>;
    col(val: any): Query;
    getCol(): Array<string>;
    /**
     * 表示该query的col具有聚合列
     */
    colhasAgg(): boolean;
    acqGroupCol(): Array<Col>;
    acqHavingCols(): Array<Col>;
    getGroups(): Array<String>;
    group(val: string | Array<string>): Query;
    addGroup(group: string): Query;
    /**
    返回jointable
    */
    getJoinTables(): JoinTable[];
    /**
     * 关联jointable
     * @param table 表名或者 一个JoinTable 对象
     * @param col  主表字段 默认 table_id
     * @param id  次表主键 默认“id”
     */
    joinTable(table: string | JoinTable, col?: string, id?: string): Query;
    /**
    返回查询条件
    */
    getCdts(): Array<BaseCdt>;
    /**
    返回查询条件
    */
    getOrders(): Array<OrderItem>;
    order(col: string, desc?: string): Query;
    /**
     * 倒排一列
     * @param col
     */
    desc(col: string): Query;
    addOrder(col: any, desc?: string): this;
    /**
    返回分页
    */
    getPager(): any;
    /**
    设置长度
    */
    size(val: number): Query;
    /**
    设置初始页
    */
    first(first: number): Query;
    /**
    设置页长 和 第几页
    */
    setPage(pageth: number, len?: number): Query;
    constructor(opts?: any);
    addHaving(cdt: Cdt): this;
    getHaving(): Cdt[];
    /**
     * 增加查询条件
     * @param cdt 查询条件|数组
     */
    addCdt(cdt: BaseCdt | Array<Cdt>): this;
    ctor_map(map: any): void;
    ctor_array(array: Array<Cdt>): void;
    /**
     * 增加相等条件
     * @param col 字段
     * @param val 值
     */
    eq(col: string, val: any): Query;
    /**
     * 增加 in 查询
     * @param col 字段
     * @param val 查询数组
     */
    in(col: string, val: Array<any>): Query;
    /**
     * 增加 in 查询
     * @param col 字段
     * @param val 查询数组
     */
    notIn(col: any, val: any): Query;
    /**
     * 增加 like 查询
     * @param col 字段
     * @param val 查询值
     */
    like(col: string, val: any): Query;
    /**
     * 增加 大于 查询
     * @param col 字段
     * @param val 查询值
     */
    big(col: string, val: any): Query;
    /**
     * 增加 大于等于 查询
     * @param col 字段
     * @param val 查询值
     */
    bigEq(col: string, val: any): Query;
    /**
     * 增加 小于 查询
     * @param col 字段
     * @param val 查询值
     */
    less(col: string, val: any): Query;
    /**
     * 增加 小于等于 查询
     * @param col 字段
     * @param val 查询值
     */
    lessEq(col: string, val: any): Query;
    /**
     * 增加 不等于 查询
     * @param col 字段
     * @param val 查询值
     */
    notEq(col: string, val: any): Query;
    /**
     * 增加 为空 查询
     * @param col 字段
     */
    isNull(col: string): Query;
    /**
     * 增加 不为空 查询
     * @param col 字段
     */
    isNotNull(col: string): Query;
    /**
     * 增加 不等于 查询
     * @param col 字段
     * @param val 查询值
     */
    orCdt(): OrCdt;
    andCdt(): AndCdt;
    /**
     * 查询出来for updat
     */
    forUpdate(): Query;
    /**
     * 是否查询出来for update
     */
    isForUpdate(): boolean;
    /**
    创建一个查询条件相同的query，
    */
    cloneSameCdt(): Query;
    static parse(query: any): Query;
}
import Cdt from './cdt/imp/Cdt';
import JoinTable from './JoinTable';
import OrderItem from './OrderItem';
import BaseCdt from './cdt/BaseCdt';
import AndCdt from './cdt/imp/AndCdt';
import OrCdt from './cdt/imp/OrCdt';
import Col from '../col/Col';
