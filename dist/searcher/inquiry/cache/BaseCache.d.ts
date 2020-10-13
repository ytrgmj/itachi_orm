interface FindResult {
    /**
     * 查询结果
     */
    ret: Array<any>;
    /**
     * 不存在的key
     */
    list: Array<any>;
}
export default abstract class BaseCache {
    protected _inquiry: BaseInquiry;
    protected _key: string;
    abstract keyArray(): Promise<Array<string>>;
    abstract save(e: string, list: Array<any>): any;
    abstract get(e: any): Promise<Array<string>>;
    abstract _removeCache(keys: any): any;
    abstract acqKeys(): any;
    abstract clearCache(): any;
    constructor(baseInquiry: BaseInquiry);
    removeCache(params: any): Promise<void>;
    _parseKeyArray(params: any): any[];
    setKey(key: any): void;
    saveArray(opts: any, dbs: any): Promise<void>;
    onlySaveArray(dbs: any): Promise<void>;
    /**
    返回结果
    {
      ret, //从缓存中查出的结果
      list //从缓存中找不到的key值
    }
    */
    find(optArray: any): Promise<FindResult>;
    _find(hasArray: any): Promise<any[]>;
    _acqKey(): string;
}
import BaseInquiry from '../BaseInquiry';
export {};
