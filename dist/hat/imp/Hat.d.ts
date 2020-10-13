import BaseHat from "../BaseHat";
import { Dao } from "../../orm";
/**
 * 跨表/接口 查询类
 * _filterList(list) //过滤条件
 * fun // 处理函数
 *
 *
 */
export default class Hat extends BaseHat {
    /**
     * 返回从数据中查询的字段名
     */
    protected acqHatCol(row: any): any;
    /**
     * 返回给主表的名称
     */
    protected acqDataName(): any;
    /**
    返回读取data中的字段
    */
    protected acqDataCol(): any;
    protected _acqMapKey(data: any): any;
    protected getKey(): any;
    protected getDao(key?: string): Dao;
    protected getSearcher<T>(key?: string): T;
    process(list: Array<any>): Promise<Array<any>>;
    protected _schMap(list: any): Promise<any>;
    protected _acqIdsFromList(list: Array<any>): any[];
    /**
     * 将查询结果转成map ，方便取值
     * @param array
     */
    protected _toMap(array: any): {};
    /**
     * 根据主键从 关联表取数据
     * @param list
     */
    protected _findByIds(list: any): Promise<any[]>;
    /**
     * 从map里面查询关联数据
     * @param data
     * @param map
     */
    protected _acqHatData(data: any, map: any): Promise<any>;
    protected _acqDefData(data: any): Promise<any>;
    protected _process(data: any, map: any): Promise<any>;
    protected _processData(data: any, hatData: any): void;
}
