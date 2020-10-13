import Hat from './Hat';
import { Query } from '../../orm';
/**
 * _acqGroup //group 字段
 * acqCol //返回的查询字段
 * async _acqOtherCdt // 返回的其他字段
 * 通过group查询的帽子
 */
export default abstract class GroupHat extends Hat {
    protected abstract acqDataCol(): string;
    protected _schMap(list: any): Promise<{}>;
    protected _toMap(array: any): {};
    _processData(data: any, hatData: any): Promise<void>;
    /**
     * 返回列
     */
    protected acqCol(): string[];
    /**
     * 返回group字段
     */
    protected _acqGroup(): string[];
    protected _buildQuery(list: any): Promise<Query>;
    protected _acqOtherCdt(list: any): Promise<any>;
    protected _acqDefData(data: any): Promise<{
        [x: string]: any;
        cnt: number;
    }>;
}
