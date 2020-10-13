import BaseInquiry from '../BaseInquiry';
/**
 * 多表查询
 */
export default abstract class TablesInquiry extends BaseInquiry {
    constructor(opt?: any);
    protected _findFromDb(params: any): void;
    acqDataCode(data: any): string;
    acqCode(param: any): string;
    /**
    子类重写,从另外一个searcher 里面找
    */
    protected abstract _findFromOtherSearcher(params: any): any;
    protected _getName(): string;
    protected getSearcher<T>(key: string): T;
    _findArray(params: Array<any>): Promise<Array<any>>;
    _find(datas: any, opt: any): Promise<any>;
    protected _couldSave(): boolean;
}
