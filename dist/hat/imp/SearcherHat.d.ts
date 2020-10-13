import Hat from './Hat';
/**
 * 直接从searcher查询的一个hat
 * 构造函数 {
 *  key:'store' ,//指定searcher
 *  needOne:true|false //是否只查询一条记录
 *  funName:string // 查询的方法名
 *  dataCol:string //主表查询的字段，
 * }
 */
export default class SearcherHat extends Hat {
    protected _parseListToParam(list: any): any[];
    protected _parseData(data: any): any;
    protected _schMap(list: Array<any>): Promise<any>;
    protected _acqHatData(data: any, map: any): Promise<any>;
    _afterSearch(params: Array<any>, retList: Array<any>): Promise<void>;
    protected _processData(data: any, hatData: any): void;
}
