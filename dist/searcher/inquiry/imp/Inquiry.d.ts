import BaseInquiry from "../BaseInquiry";
/**
 * 单条件查询
 */
export default class Inquiry extends BaseInquiry {
    protected _findFromDb(params: any): Promise<Array<any>>;
    acqDataCode(data: any): string;
    acqCode(param: any): string;
    acqCol(): string;
    protected processQuery(query: Query, params: any): Promise<Query>;
    /**
     * 构建查询条件
     * @param params
     */
    protected _buildCdt(params: any): Promise<any>;
    _addOtherCdt(optCdt: any): Promise<any>;
}
import Query from "../../../dao/query/Query";
